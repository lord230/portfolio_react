/**
 * generate-sitemap.js
 * Generates public/sitemap.xml for amitverma.pro
 *
 * Covers:
 *   - Static routes (/, /blogs, /resume)
 *   - Dynamic project routes pulled from src/data/projects.js
 *   - Dynamic blog posts pulled from Supabase
 *
 * Usage:
 *   npm run generate-sitemap
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------
const DOMAIN = 'https://amitverma.pro';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// ---------------------------------------------------------------------------
// Supabase
// ---------------------------------------------------------------------------
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('❌  Error: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY must be set in .env');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// ---------------------------------------------------------------------------
// Static routes
// ---------------------------------------------------------------------------
const staticRoutes = [
    { path: '/',       changefreq: 'weekly',  priority: '1.0' },
    { path: '/blogs',  changefreq: 'daily',   priority: '0.9' },
    { path: '/resume', changefreq: 'monthly', priority: '0.7' },
];

// ---------------------------------------------------------------------------
// Project routes — read directly from the data file so no duplication
// ---------------------------------------------------------------------------
async function getProjectRoutes() {
    // Dynamically import the ES module
    const { majorProjects, exploratoryProjects } = await import(
        path.join(ROOT, 'src/data/projects.js')
    );

    const allKeys = [
        ...Object.keys(majorProjects),
        ...Object.keys(exploratoryProjects),
    ];

    return allKeys.map(key => ({
        path: `/project/${key}`,
        changefreq: 'monthly',
        priority: '0.7',
        lastmod: null,
    }));
}

// ---------------------------------------------------------------------------
// Blog routes — fetched from Supabase
// ---------------------------------------------------------------------------
async function getBlogRoutes() {
    console.log('🔍  Fetching blog posts from Supabase…');
    const { data: posts, error } = await supabase
        .from('posts')
        .select('id, created_at');

    if (error) {
        console.error('⚠️   Could not fetch posts from Supabase:', error.message);
        return [];
    }

    console.log(`✅  Found ${posts.length} blog post(s).`);
    return posts.map(post => ({
        path: `/blogs/${post.id}`,
        changefreq: 'weekly',
        priority: '0.6',
        lastmod: post.updated_at ?? post.created_at,
    }));
}

// ---------------------------------------------------------------------------
// XML helpers
// ---------------------------------------------------------------------------
function toIso(dateStr) {
    if (!dateStr) return null;
    return new Date(dateStr).toISOString().split('T')[0]; // YYYY-MM-DD
}

function urlEntry({ path: urlPath, changefreq, priority, lastmod }) {
    const loc      = `${DOMAIN}${urlPath}`;
    const modTag   = lastmod ? `\n        <lastmod>${toIso(lastmod)}</lastmod>` : '';
    return `
    <url>
        <loc>${loc}</loc>${modTag}
        <changefreq>${changefreq}</changefreq>
        <priority>${priority}</priority>
    </url>`;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function generateSitemap() {
    console.log('\n🚀  Starting sitemap generation…\n');

    const [projectRoutes, blogRoutes] = await Promise.all([
        getProjectRoutes(),
        getBlogRoutes(),
    ]);

    const allRoutes = [
        ...staticRoutes.map(r => ({ ...r, lastmod: null })),
        ...projectRoutes,
        ...blogRoutes,
    ];

    const today = new Date().toISOString().split('T')[0];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<!-- Generated: ${today} | ${allRoutes.length} URLs -->
<urlset
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">`;

    allRoutes.forEach(route => {
        xml += urlEntry(route);
    });

    xml += '\n</urlset>\n';

    // Write to public/
    const publicDir = path.join(ROOT, 'public');
    if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

    const sitemapPath = path.join(publicDir, 'sitemap.xml');
    fs.writeFileSync(sitemapPath, xml, 'utf8');

    console.log(`\n✅  Sitemap written → public/sitemap.xml`);
    console.log(`    Total URLs: ${allRoutes.length}`);
    console.log(`      Static  : ${staticRoutes.length}`);
    console.log(`      Projects: ${projectRoutes.length}`);
    console.log(`      Blogs   : ${blogRoutes.length}`);
    console.log(`\n🌐  Domain  : ${DOMAIN}`);
}

generateSitemap().catch(err => {
    console.error('❌  Fatal error:', err);
    process.exit(1);
});
