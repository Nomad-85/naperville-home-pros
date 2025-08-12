import { NextResponse } from 'next/server';
import { getListings } from '@/lib/data';
import categories from '@/data/categories.json';
import blogs from '@/data/blogs.json';

// Base URL for the site
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://napervillehomepros.com';

// Current date in YYYY-MM-DD format
const getCurrentDate = () => {
  const date = new Date();
  return date.toISOString().split('T')[0];
};

/**
 * Generates a dynamic XML sitemap based on current content
 */
export async function GET() {
  try {
    // Start XML content
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Homepage -->
  <url>
    <loc>${BASE_URL}/</loc>
    <lastmod>${getCurrentDate()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>`;

    // Add category pages
    categories.forEach((category: any) => {
      xml += `
  <url>
    <loc>${BASE_URL}/${category.slug}</loc>
    <lastmod>${getCurrentDate()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    });

    // Add business listing pages - use the data helper for single source of truth
    const listings = getListings();
    listings.forEach((listing) => {
      xml += `
  <url>
    <loc>${BASE_URL}/${listing.category}/${listing.slug}</loc>
    <lastmod>${getCurrentDate()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
    });

    // Add blog index
    xml += `
  <url>
    <loc>${BASE_URL}/blog</loc>
    <lastmod>${getCurrentDate()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;

    // Add blog posts
    blogs.forEach((blog: any) => {
      xml += `
  <url>
    <loc>${BASE_URL}/blog/${blog.slug}</loc>
    <lastmod>${blog.updatedAt || getCurrentDate()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
    });

    // Add static pages
    const staticPages = [
      { path: '/about', changefreq: 'monthly', priority: '0.5' },
      { path: '/contact', changefreq: 'monthly', priority: '0.5' },
      { path: '/add-business', changefreq: 'monthly', priority: '0.6' },
      { path: '/privacy-policy', changefreq: 'yearly', priority: '0.3' },
      { path: '/terms-of-service', changefreq: 'yearly', priority: '0.3' },
      { path: '/accessibility', changefreq: 'yearly', priority: '0.3' },
    ];

    staticPages.forEach((page) => {
      xml += `
  <url>
    <loc>${BASE_URL}${page.path}</loc>
    <lastmod>${getCurrentDate()}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
    });

    // Close XML
    xml += `
</urlset>`;

    // Return XML response
    return new NextResponse(xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
}
