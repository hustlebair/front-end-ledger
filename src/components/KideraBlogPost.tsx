import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Heart, Share2, Facebook, Twitter, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  BlogPost,
  fetchBlogPost,
  fetchBlogPosts,
  formatDate,
  getReadingTime,
  defaultThumbnail
} from '@/lib/blog-utils';

interface KideraBlogPostProps {
  slug: string;
}

const KideraBlogPost: React.FC<KideraBlogPostProps> = ({ slug }) => {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    loadPost();
  }, [slug]);

  const loadPost = async () => {
    setLoading(true);
    try {
      const [postData, related] = await Promise.all([
        fetchBlogPost(slug),
        fetchBlogPosts({ limit: 3 })
      ]);

      if (postData) {
        setPost(postData);
        // Filter related posts, excluding current post
        const filteredRelated = related
          .filter(p => p.id !== postData.id)
          .slice(0, 3);
        setRelatedPosts(filteredRelated);
      }
    } catch (error) {
      console.error('Error loading post:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async (platform: string) => {
    if (!post) return;

    const url = window.location.href;
    const title = post.title;
    const text = post.description || 'Check out this parenting article from Kidera!';

    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'copy':
        try {
          await navigator.clipboard.writeText(url);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch (error) {
          console.error('Failed to copy URL:', error);
        }
        break;
    }
  };

  const renderMarkdown = (content: string) => {
    // Simple markdown rendering - you might want to use a proper markdown library
    return content
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold text-gray-900 mb-6 mt-8">$1</h1>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-gray-900 mb-4 mt-6">$1</h2>')
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold text-gray-900 mb-3 mt-5">$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .replace(/^- (.*$)/gim, '<li class="mb-2">$1</li>')
      .replace(/(<li.*<\/li>)/s, '<ul class="list-disc list-inside mb-4 space-y-2 text-gray-700">$1</ul>')
      .replace(/\n\n/g, '</p><p class="text-gray-700 leading-relaxed mb-4">')
      .replace(/^(?!<[h|u|l])(.+)$/gm, '<p class="text-gray-700 leading-relaxed mb-4">$1</p>');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-yellow-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-6" />
            <div className="h-64 bg-gray-200 rounded-2xl mb-8" />
            <div className="h-6 bg-gray-200 rounded mb-4" />
            <div className="h-4 bg-gray-200 rounded mb-2" />
            <div className="h-4 bg-gray-200 rounded mb-2" />
            <div className="h-4 bg-gray-200 rounded w-3/4" />
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📝</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Article Not Found</h1>
          <p className="text-gray-600 mb-6">We couldn't find the article you're looking for.</p>
          <Button onClick={() => window.location.href = '/blog'} className="bg-pink-600 hover:bg-pink-700">
            Back to Blog
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-yellow-50">
      {/* Back Navigation */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button
            variant="ghost"
            onClick={() => window.history.back()}
            className="text-gray-600 hover:text-gray-900 hover:bg-pink-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Parenting Stories
          </Button>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          {/* Category and Date */}
          <div className="flex items-center gap-4 mb-6">
            <Badge className="bg-gradient-to-r from-pink-100 to-rose-100 text-pink-700 border-0 font-medium">
              <span className="mr-1">📝</span>
              By Kidera
            </Badge>
            {post.featured && (
              <Badge className="bg-gradient-to-r from-pink-500 to-rose-500 text-white border-0">
                <Heart className="w-3 h-3 mr-1" />
                Featured
              </Badge>
            )}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
            {post.title}
          </h1>

          {/* Description */}
          {post.description && (
            <p className="text-xl text-gray-600 leading-relaxed mb-6">
              {post.description}
            </p>
          )}

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-gray-500 mb-8">
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              {getReadingTime(post.content)}
            </span>
            <span>{formatDate(post.created_at)}</span>
            <span>By {post.author}</span>
          </div>

          {/* Featured Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-lg mb-8">
            <img
              src={post.thumbnail_url || defaultThumbnail}
              alt={post.title}
              className="w-full h-64 md:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>


        </motion.header>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="prose prose-lg max-w-none mb-12"
        >
          <div 
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
          />
        </motion.div>

        {/* Share Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm mb-12"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Share2 className="w-5 h-5 mr-2 text-pink-600" />
            Share this story with other parents
          </h3>
          <div className="flex flex-wrap gap-4">
            <Button
              onClick={() => handleShare('facebook')}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Facebook className="w-4 h-4 mr-2" />
              Facebook
            </Button>
            <Button
              onClick={() => handleShare('twitter')}
              className="bg-sky-500 hover:bg-sky-600 text-white"
            >
              <Twitter className="w-4 h-4 mr-2" />
              Twitter
            </Button>
            <Button
              onClick={() => handleShare('copy')}
              variant="outline"
              className="border-gray-200 hover:bg-pink-50 hover:border-pink-300"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-2 text-green-600" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Link
                </>
              )}
            </Button>
          </div>
        </motion.div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-12"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-8">More Parenting Stories</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map(relatedPost => (
                <article
                  key={relatedPost.id}
                  className="group cursor-pointer"
                  onClick={() => window.location.href = `/blog/${relatedPost.slug}`}
                >
                  <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-pink-200">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={relatedPost.thumbnail_url || defaultThumbnail}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4">
                                        <Badge className="bg-gradient-to-r from-pink-100 to-rose-100 text-pink-700 border-0 font-medium text-xs">
                  <span className="mr-1">📝</span>
                  By Kidera
                </Badge>
                      </div>
                    </div>
                    <div className="p-6">
                      <h4 className="font-bold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h4>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {relatedPost.description}
                      </p>
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="w-3 h-3 mr-1" />
                        {getReadingTime(relatedPost.content)}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </motion.section>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-gradient-to-r from-pink-100 via-orange-100 to-yellow-100 rounded-2xl p-8 text-center"
        >
          <div className="text-4xl mb-4">📱</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Start Your Own Parenting Journal
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Capture your family's precious moments with Kidera. From daily milestones to magical memories, 
            preserve your parenting journey in a beautiful, organized space.
          </p>
          <Button 
            onClick={() => window.location.href = '#pricing'}
            className="bg-gradient-to-r from-pink-600 to-orange-500 hover:from-pink-700 hover:to-orange-600 text-white px-8 py-3 text-lg font-semibold rounded-lg"
          >
            Start Your Journal
          </Button>
        </motion.div>
      </article>

      <style jsx global>{`
        .blog-content h1,
        .blog-content h2,
        .blog-content h3 {
          font-family: inherit;
        }
        
        .blog-content ul {
          margin-left: 1.5rem;
        }
        
        .blog-content li {
          position: relative;
        }
        
        .blog-content p {
          line-height: 1.7;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default KideraBlogPost; 