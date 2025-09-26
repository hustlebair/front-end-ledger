// SEO utilities for blog posts
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  thumbnail_url?: string;
  author: string;
  featured: boolean;
  published: boolean;
  created_at: string;
  updated_at: string;
  published_at?: string;
  reading_time: number;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string[];
}

export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  canonical: string;
  ogImage?: string;
  ogType: string;
  twitterCard: string;
  structuredData?: any;
}

export function generateBlogSEO(post: BlogPost, baseUrl: string = 'https://kidera.co'): SEOData {
  const title = post.meta_title || post.title;
  const description = post.meta_description || post.excerpt || 
    post.content.replace(/<[^>]*>/g, '').substring(0, 160) + '...';
  const keywords = post.meta_keywords || ['parenting', 'memories', 'family', 'children', 'Kidera'];
  
  return {
    title: `${title} | Kidera Blog`,
    description,
    keywords,
    canonical: `${baseUrl}/blog/${post.slug}`,
    ogImage: post.thumbnail_url || `${baseUrl}/logo_favicon.png`,
    ogType: 'article',
    twitterCard: 'summary_large_image',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title,
      "description": description,
      "image": post.thumbnail_url || `${baseUrl}/logo_favicon.png`,
      "author": {
        "@type": "Organization",
        "name": "Kidera"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Kidera",
        "logo": {
          "@type": "ImageObject",
          "url": `${baseUrl}/logo_favicon.png`
        }
      },
      "datePublished": post.published_at || post.created_at,
      "dateModified": post.updated_at,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `${baseUrl}/blog/${post.slug}`
      },
      "wordCount": post.content.replace(/<[^>]*>/g, '').split(' ').length,
      "timeRequired": `PT${post.reading_time}M`
    }
  };
}

export function generateBlogListSEO(baseUrl: string = 'https://kidera.co'): SEOData {
  return {
    title: 'Parenting Wisdom Blog | Kidera',
    description: 'Discover parenting tips, family memories, and insights from Kidera. Expert advice for capturing and preserving your family\'s precious moments.',
    keywords: ['parenting blog', 'family memories', 'parenting tips', 'children', 'Kidera'],
    canonical: `${baseUrl}/blog`,
    ogImage: `${baseUrl}/logo_favicon.png`,
    ogType: 'website',
    twitterCard: 'summary_large_image',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "Kidera Parenting Blog",
      "description": "Parenting tips and family memory preservation",
      "url": `${baseUrl}/blog`,
      "publisher": {
        "@type": "Organization",
        "name": "Kidera",
        "logo": {
          "@type": "ImageObject",
          "url": `${baseUrl}/logo_favicon.png`
        }
      }
    }
  };
}

export function generateSitemap(posts: BlogPost[], baseUrl: string = 'https://kidera.co'): string {
  const staticPages = [
    { url: baseUrl, lastmod: new Date().toISOString(), changefreq: 'weekly', priority: '1.0' },
    { url: `${baseUrl}/blog`, lastmod: new Date().toISOString(), changefreq: 'daily', priority: '0.9' },
    { url: `${baseUrl}/contact`, lastmod: new Date().toISOString(), changefreq: 'monthly', priority: '0.7' },
    { url: `${baseUrl}/privacy-policy`, lastmod: new Date().toISOString(), changefreq: 'yearly', priority: '0.5' },
    { url: `${baseUrl}/terms`, lastmod: new Date().toISOString(), changefreq: 'yearly', priority: '0.5' },
    { url: `${baseUrl}/refund`, lastmod: new Date().toISOString(), changefreq: 'yearly', priority: '0.5' }
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
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
}

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}
