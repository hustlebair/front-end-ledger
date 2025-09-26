import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { fetchBlogPosts } from '../lib/blog-utils';
import { BlogPost } from '../lib/seo-utils';

interface KideraBlogGridProps {
  limit?: number;
  showHeader?: boolean;
}

const KideraBlogGrid: React.FC<KideraBlogGridProps> = ({ 
  limit, 
  showHeader = true 
}) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const allPosts = await fetchBlogPosts();
        const limitedPosts = limit ? allPosts.slice(0, limit) : allPosts;
        setPosts(limitedPosts);
      } catch (error) {
        console.error('Error loading posts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [limit]);

  function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  function PostCard({ post }: { post: BlogPost }) {
    return (
      <Link 
        to={`/blog/${post.slug}`}
        className="group block bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
      >
        {post.thumbnail_url && (
          <div className="aspect-video overflow-hidden">
            <img
              src={post.thumbnail_url}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </div>
        )}
        
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-sm font-medium">
              By Kidera
            </span>
            {post.featured && (
              <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-medium">
                Featured
              </span>
            )}
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-pink-600 transition-colors duration-200 line-clamp-2">
            {post.title}
          </h3>
          
          {post.excerpt && (
            <p className="text-gray-600 mb-4 line-clamp-3">
              {post.excerpt}
            </p>
          )}
          
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(post.published_at || post.created_at)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{post.reading_time} min read</span>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </div>
        </div>
      </Link>
    );
  }

  function LoadingSkeleton() {
    return (
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
        <div className="aspect-video bg-gray-200 animate-pulse"></div>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="bg-gray-200 h-6 w-20 rounded-full animate-pulse"></div>
          </div>
          <div className="space-y-2 mb-4">
            <div className="bg-gray-200 h-6 w-full rounded animate-pulse"></div>
            <div className="bg-gray-200 h-6 w-3/4 rounded animate-pulse"></div>
          </div>
          <div className="space-y-2 mb-4">
            <div className="bg-gray-200 h-4 w-full rounded animate-pulse"></div>
            <div className="bg-gray-200 h-4 w-5/6 rounded animate-pulse"></div>
            <div className="bg-gray-200 h-4 w-2/3 rounded animate-pulse"></div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-gray-200 h-4 w-24 rounded animate-pulse"></div>
              <div className="bg-gray-200 h-4 w-16 rounded animate-pulse"></div>
            </div>
            <div className="bg-gray-200 h-4 w-4 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <section id="blog" className="pt-24 pb-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {showHeader && (
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Parenting Wisdom
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover tips, stories, and insights to help you capture and preserve your family's precious memories.
              </p>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: limit || 6 }).map((_, index) => (
              <LoadingSkeleton key={index} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (posts.length === 0) {
    return (
      <section id="blog" className="pt-24 pb-16 bg-gradient-to-b from-pink-50 via-yellow-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {showHeader && (
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">
                <span className="text-gray-800">Parenting</span>{' '}
                <span className="bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
                  Wisdom
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Tips, stories, and insights to support you on your parenting journey. From newborn care to toddler adventures, we're here to help.
              </p>
            </div>
          )}
          <div className="text-center py-12">
            <div className="text-6xl mb-6">👶</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">No stories found</h3>
            <p className="text-gray-600 mb-8">
              We couldn't find any articles matching your search. Try different keywords!
            </p>
            <button className="bg-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-pink-600 transition-colors duration-200">
              Show All Stories
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="pt-24 pb-16 bg-gradient-to-b from-pink-50 via-yellow-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showHeader && (
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-gray-800">Parenting</span>{' '}
              <span className="bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
                Wisdom
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tips, stories, and insights to support you on your parenting journey. From newborn care to toddler adventures, we're here to help.
            </p>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
        
        {limit && posts.length >= limit && (
          <div className="text-center mt-12">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:from-pink-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              View All Posts
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default KideraBlogGrid;