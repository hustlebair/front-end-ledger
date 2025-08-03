import React from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import KideraBlogPost from '@/components/KideraBlogPost';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📝</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Invalid Blog Post</h1>
          <p className="text-gray-600 mb-6">The blog post URL is not valid.</p>
          <button 
            onClick={() => window.location.href = '/blog'}
            className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <KideraBlogPost slug={slug} />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default BlogPost; 