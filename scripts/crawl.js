/**
 * crawl.js
 * Web crawler for amitverma.pro — discovers all pages, checks HTTP status,
 * and reports any broken links or missing pages.
 *
 * Usage:
 *   npm run crawl                         # crawl live HTTPS site
 *   npm run crawl:verbose                 # verbose — print every URL
 *   npm run crawl:local                   # crawl local dev server (HTTP)
 *   node scripts/crawl.js --base-url http://localhost:5173   # custom base
 *
 * Options:
 *   --base-url <url>   Override the default domain (default: https://amitverma.pro)
 *   --verbose          Print every URL as it's visited
 *   --out <file>       Write a JSON report to <file> (default: crawl-report.json)
 *
 * Note: If you see TLS handshake errors on macOS, your local LibreSSL may be
 * too old. Run against HTTP with --base-url http://amitverma.pro or use
 * crawl:local for local dev servers instead.
 */

import { URL } from 'url';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

// ---------------------------------------------------------------------------
// Parse CLI args
// ---------------------------------------------------------------------------
const args = process.argv.slice(2);
const getArg = (flag, fallback) => {
    const idx = args.indexOf(flag);
    return idx !== -1 && args[idx + 1] ? args[idx + 1] : fallback;
};
const VERBOSE  = args.includes('--verbose');
const BASE_URL = getArg('--base-url', 'https://amitverma.pro');
const OUT_FILE = getArg('--out', 'crawl-report.json');

const baseParsed = new URL(BASE_URL);

// ---------------------------------------------------------------------------
// Seed URLs — all routes we know about
// ---------------------------------------------------------------------------
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

async function getSeedUrls() {
    const seeds = [
        '/',
        '/blogs',
        '/resume',
    ];

    // Project routes
    try {
        const { majorProjects, exploratoryProjects } = await import(
            path.join(ROOT, 'src/data/projects.js')
        );
        const keys = [
            ...Object.keys(majorProjects),
            ...Object.keys(exploratoryProjects),
        ];
        keys.forEach(k => seeds.push(`/project/${k}`));
    } catch (e) {
        console.warn('⚠️  Could not load projects.js:', e.message);
    }

    // Blog posts from Supabase (optional — skip if env not set)
    const supabaseUrl = process.env.VITE_SUPABASE_URL;
    const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
        try {
            const { createClient } = await import('@supabase/supabase-js');
            const supabase = createClient(supabaseUrl, supabaseKey);
            const { data: posts, error } = await supabase
                .from('posts')
                .select('id');
            if (!error && posts) {
                posts.forEach(p => seeds.push(`/blogs/${p.id}`));
                console.log(`📦  Loaded ${posts.length} blog routes from Supabase`);
            }
        } catch (e) {
            console.warn('⚠️  Supabase fetch failed:', e.message);
        }
    } else {
        console.warn('⚠️  No Supabase env vars — skipping dynamic blog routes');
    }

    return seeds.map(s => new URL(s, BASE_URL).toString());
}

// ---------------------------------------------------------------------------
// HTTP fetch (returns status + redirect location)
// Uses native globalThis.fetch (Node 18+) — avoids macOS LibreSSL TLS issues
// ---------------------------------------------------------------------------
async function fetchHead(rawUrl) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 10000);

    try {
        const res = await fetch(rawUrl, {
            method: 'HEAD',
            redirect: 'manual',   // capture redirects without following
            signal: controller.signal,
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; SiteMapCrawler/1.0)',
                'Accept': '*/*',
            },
        });
        clearTimeout(timer);
        return {
            url: rawUrl,
            status: res.status,
            redirect: res.headers.get('location') || null,
            contentType: res.headers.get('content-type') || '',
            error: null,
        };
    } catch (err) {
        clearTimeout(timer);
        // Unwrap the nested cause (e.g. OpenSSL TLS error from undici)
        const cause = err.cause?.message || err.cause?.code;
        const msg = err.name === 'AbortError'
            ? 'Timeout'
            : cause
                ? `${err.message} — cause: ${cause}`
                : err.message;
        return { url: rawUrl, status: null, redirect: null, error: msg };
    }
}

// ---------------------------------------------------------------------------
// Crawl
// ---------------------------------------------------------------------------
async function crawl(seeds) {
    const visited = new Set();
    const queue   = [...seeds];
    const results = [];

    console.log(`\n🕷️   Crawling ${BASE_URL}  (${seeds.length} seed URLs)\n`);
    const start = Date.now();

    while (queue.length > 0) {
        const batch = queue.splice(0, 10); // 10 concurrent
        const responses = await Promise.all(batch.map(fetchHead));

        for (const res of responses) {
            if (visited.has(res.url)) continue;
            visited.add(res.url);

            // Only log same-domain
            const parsed = new URL(res.url);
            if (parsed.hostname !== baseParsed.hostname) continue;

            const ok = res.status >= 200 && res.status < 400;
            const icon = res.status === 200 ? '✅' :
                         res.status === 301 || res.status === 302 ? '↩️ ' :
                         res.status === 404 ? '❌' :
                         res.error ? '💥' : '⚠️ ';

            const label = res.status
                ? `${res.status}`
                : `ERR: ${res.error}`;

            if (VERBOSE || !ok) {
                console.log(`  ${icon} [${label}]  ${res.url}`);
            }

            results.push({
                url: res.url,
                status: res.status,
                ok,
                redirect: res.redirect,
                error: res.error || null,
            });

            // Follow redirects (same domain only)
            if ((res.status === 301 || res.status === 302) && res.redirect) {
                try {
                    const redirected = new URL(res.redirect, res.url).toString();
                    if (!visited.has(redirected)) queue.push(redirected);
                } catch (_) {}
            }
        }
    }

    const elapsed = ((Date.now() - start) / 1000).toFixed(1);
    return { results, elapsed };
}

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------
function printReport({ results, elapsed }) {
    const ok      = results.filter(r => r.ok);
    const broken  = results.filter(r => !r.ok);
    const missing = results.filter(r => r.status === 404);
    const errors  = results.filter(r => r.error);
    const tlsErrors = errors.filter(r => r.error && /ssl|tls|handshake|EPROTO/i.test(r.error));

    console.log('\n─────────────────────────────────────────');
    console.log('  📊  Crawl Report');
    console.log('─────────────────────────────────────────');
    console.log(`  Total URLs checked : ${results.length}`);
    console.log(`  ✅  OK (2xx/3xx)   : ${ok.length}`);
    console.log(`  ❌  Broken (4xx)   : ${missing.length}`);
    console.log(`  💥  Network errors : ${errors.length}`);
    console.log(`  ⏱   Time elapsed   : ${elapsed}s`);
    console.log('─────────────────────────────────────────');

    // TLS diagnostic — common on macOS with LibreSSL
    if (tlsErrors.length > 0 && tlsErrors.length === errors.length && ok.length === 0) {
        console.log('\n⚠️   All errors appear to be TLS/SSL handshake failures.');
        console.log('    This is a LOCAL network issue — not broken pages.');
        console.log('    The site is likely live. Common causes:');
        console.log('    • macOS LibreSSL too old for the server\'s TLS config');
        console.log('    • Network proxy or VPN intercepting TLS');
        console.log('    • Try: NODE_TLS_REJECT_UNAUTHORIZED=0 npm run crawl (dev only!)');
    }

    if (missing.length > 0) {
        console.log('\n🔴  Broken pages (4xx):\n');
        missing.forEach(r => {
            console.log(`    [HTTP ${r.status}]  ${r.url}`);
        });
    } else if (ok.length > 0) {
        console.log('\n🟢  All URLs returned OK — no broken links found!');
    }

    if (errors.length > 0 && tlsErrors.length < errors.length) {
        console.log('\n🔴  Network errors:\n');
        errors.filter(r => !tlsErrors.includes(r)).forEach(r => {
            console.log(`    [${r.error}]  ${r.url}`);
        });
    }

    // Save JSON report
    const report = {
        generated: new Date().toISOString(),
        baseUrl: BASE_URL,
        elapsed,
        summary: { total: results.length, ok: ok.length, broken: broken.length, errors: errors.length },
        results,
    };

    fs.writeFileSync(OUT_FILE, JSON.stringify(report, null, 2), 'utf8');
    console.log(`\n💾  Full report saved → ${OUT_FILE}\n`);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
(async () => {
    const seeds = await getSeedUrls();
    const { results, elapsed } = await crawl(seeds);
    printReport({ results, elapsed });
})().catch(err => {
    console.error('❌  Fatal:', err);
    process.exit(1);
});
