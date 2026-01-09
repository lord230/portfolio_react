import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import 'dotenv/config';

// Load environment variables
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Error: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY must be set in .env');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);
const DOMAIN = 'https://amitverma.pro';

const staticRoutes = [
    '/',
    '/blogs',
    // Add other static routes here
];

const generateSitemap = async () => {
    console.log('Fetching blog posts...');
    const { data: posts, error } = await supabase
        .from('posts')
        .select('id, created_at');

    if (error) {
        console.error('Error fetching posts:', error);
        return;
    }

    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    // Add static routes
    staticRoutes.forEach(route => {
        sitemap += `
    <url>
        <loc>${DOMAIN}${route}</loc>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
    </url>`;
    });

    // Add dynamic blog posts
    posts.forEach(post => {
        sitemap += `
    <url>
        <loc>${DOMAIN}/blogs/${post.id}</loc>
        <lastmod>${new Date(post.created_at).toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.6</priority>
    </url>`;
    });

    sitemap += `
</urlset>`;

    const publicDir = path.resolve('public');
    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir);
    }

    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
    console.log('✅ Sitemap generated at public/sitemap.xml');
};

generateSitemap();
