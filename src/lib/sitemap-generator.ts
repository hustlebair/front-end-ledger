// Dynamic sitemap generation for better SEO
import { BlogPost } from './seo-utils';

export function generateSitemap(posts: BlogPost[], baseUrl: string = 'https://kidera.co'): string {
  const staticPages = [
    { 
      url: baseUrl, 
      lastmod: new Date().toISOString(), 
      changefreq: 'weekly', 
      priority: '1.0' 
    },
    { 
      url: `${baseUrl}/blog`, 
      lastmod: new Date().toISOString(), 
      changefreq: 'daily', 
      priority: '0.9' 
    },
    { 
      url: `${baseUrl}/contact`, 
      lastmod: new Date().toISOString(), 
      changefreq: 'monthly', 
      priority: '0.7' 
    },
    { 
      url: `${baseUrl}/privacy-policy`, 
      lastmod: new Date().toISOString(), 
      changefreq: 'yearly', 
      priority: '0.5' 
    },
    { 
      url: `${baseUrl}/terms`, 
      lastmod: new Date().toISOString(), 
      changefreq: 'yearly', 
      priority: '0.5' 
    },
    { 
      url: `${baseUrl}/refund`, 
      lastmod: new Date().toISOString(), 
      changefreq: 'yearly', 
      priority: '0.5' 
    }
  ];

  const blogPages = posts
    .filter(post => post.published)
    .map(post => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastmod: post.updated_at,
      changefreq: 'monthly',
      priority: post.featured ? '0.8' : '0.7'
    }));

  const allPages = [...staticPages, ...blogPages];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${allPages.map(page => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
}

export function generateRobotsTxt(baseUrl: string = 'https://kidera.co'): string {
  return `User-agent: *
Allow: /

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Disallow admin areas
Disallow: /admin/
Disallow: /admin/blog

# Allow blog posts
Allow: /blog/
Allow: /blog/*`;
}
