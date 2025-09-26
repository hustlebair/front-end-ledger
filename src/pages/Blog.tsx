import React from 'react';
import { Helmet } from 'react-helmet-async';
import KideraBlogGrid from '../components/KideraBlogGrid';
import { generateBlogListSEO } from '../lib/seo-utils';

const Blog: React.FC = () => {
  const seoData = generateBlogListSEO();

  return (
    <>
      <Helmet>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        <meta name="keywords" content={seoData.keywords.join(', ')} />
        <link rel="canonical" href={seoData.canonical} />
        
        {/* Open Graph */}
        <meta property="og:title" content={seoData.title} />
        <meta property="og:description" content={seoData.description} />
        <meta property="og:image" content={seoData.ogImage} />
        <meta property="og:url" content={seoData.canonical} />
        <meta property="og:type" content={seoData.ogType} />
        <meta property="og:site_name" content="Kidera" />
        
        {/* Twitter */}
        <meta name="twitter:card" content={seoData.twitterCard} />
        <meta name="twitter:title" content={seoData.title} />
        <meta name="twitter:description" content={seoData.description} />
        <meta name="twitter:image" content={seoData.ogImage} />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(seoData.structuredData)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <KideraBlogGrid showHeader={true} />
      </div>
    </>
  );
};

export default Blog;