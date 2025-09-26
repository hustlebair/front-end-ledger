// Build-time static generation for blog SEO
const fs = require('fs');
const path = require('path');

// This script generates static blog data at build time for better SEO
async function generateStaticBlogData() {
  try {
    console.log('Generating static blog data...');
    
    // Import the blog utilities (you'll need to adjust the path based on your build setup)
    const { generateStaticBlogData } = require('../src/lib/blog-utils');
    
    const { posts, sitemap } = await generateStaticBlogData();
    
    // Create public directory if it doesn't exist
    const publicDir = path.join(__dirname, '../public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    
    // Write sitemap
    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
    console.log('✅ Generated sitemap.xml');
    
    // Write blog posts data for static generation
    const blogData = {
      posts: posts.map(post => ({
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        thumbnail_url: post.thumbnail_url,
        author: post.author,
        featured: post.featured,
        published: post.published,
        created_at: post.created_at,
        updated_at: post.updated_at,
        published_at: post.published_at,
        reading_time: post.reading_time,
        meta_title: post.meta_title,
        meta_description: post.meta_description,
        meta_keywords: post.meta_keywords
      })),
      generatedAt: new Date().toISOString()
    };
    
    fs.writeFileSync(
      path.join(publicDir, 'blog-data.json'), 
      JSON.stringify(blogData, null, 2)
    );
    console.log('✅ Generated blog-data.json');
    
    // Generate individual post pages for static generation
    const postsDir = path.join(publicDir, 'blog');
    if (!fs.existsSync(postsDir)) {
      fs.mkdirSync(postsDir, { recursive: true });
    }
    
    for (const post of posts) {
      const postDir = path.join(postsDir, post.slug);
      if (!fs.existsSync(postDir)) {
        fs.mkdirSync(postDir, { recursive: true });
      }
      
      // Generate static HTML for each post (basic structure)
      const staticHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${post.meta_title || post.title} | Kidera Blog</title>
  <meta name="description" content="${post.meta_description || post.excerpt || ''}">
  <meta name="keywords" content="${post.meta_keywords?.join(', ') || 'parenting, memories, family, Kidera'}">
  <link rel="canonical" href="https://kidera.co/blog/${post.slug}">
  
  <!-- Open Graph -->
  <meta property="og:title" content="${post.meta_title || post.title}">
  <meta property="og:description" content="${post.meta_description || post.excerpt || ''}">
  <meta property="og:image" content="${post.thumbnail_url || 'https://kidera.co/logo_favicon.png'}">
  <meta property="og:url" content="https://kidera.co/blog/${post.slug}">
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="Kidera">
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${post.meta_title || post.title}">
  <meta name="twitter:description" content="${post.meta_description || post.excerpt || ''}">
  <meta name="twitter:image" content="${post.thumbnail_url || 'https://kidera.co/logo_favicon.png'}">
  
  <!-- Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "${post.title}",
    "description": "${post.meta_description || post.excerpt || ''}",
    "image": "${post.thumbnail_url || 'https://kidera.co/logo_favicon.png'}",
    "author": {
      "@type": "Organization",
      "name": "Kidera"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Kidera",
      "logo": {
        "@type": "ImageObject",
        "url": "https://kidera.co/logo_favicon.png"
      }
    },
    "datePublished": "${post.published_at || post.created_at}",
    "dateModified": "${post.updated_at}",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://kidera.co/blog/${post.slug}"
    },
    "wordCount": ${post.content.replace(/<[^>]*>/g, '').split(' ').length},
    "timeRequired": "PT${post.reading_time}M"
  }
  </script>
</head>
<body>
  <div id="root"></div>
  <script>
    // Redirect to the actual React app
    window.location.href = 'https://kidera.co/blog/${post.slug}';
  </script>
</body>
</html>`;
      
      fs.writeFileSync(path.join(postDir, 'index.html'), staticHtml);
    }
    
    console.log(`✅ Generated static pages for ${posts.length} blog posts`);
    console.log('🎉 Static blog data generation complete!');
    
  } catch (error) {
    console.error('❌ Error generating static blog data:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  generateStaticBlogData();
}

module.exports = { generateStaticBlogData };
