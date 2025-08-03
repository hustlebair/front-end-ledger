import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Heart, ArrowRight, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  BlogPost,
  fetchBlogPosts,
  formatDate,
  getReadingTime,
  getExcerpt,
  defaultThumbnail
} from '@/lib/blog-utils';

interface KideraBlogGridProps {
  showHeader?: boolean;
  maxPosts?: number;
  showFilters?: boolean;
}

const KideraBlogGrid: React.FC<KideraBlogGridProps> = ({
  showHeader = true,
  maxPosts,
  showFilters = true
}) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadBlogData();
  }, []);

  useEffect(() => {
    filterPosts();
  }, [posts, searchTerm]);

  const loadBlogData = async () => {
    setLoading(true);
    try {
      const allPosts = await fetchBlogPosts({ limit: maxPosts || 9 });

      // Sort posts: featured first, then by date
      const sortedPosts = allPosts.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      });

      setPosts(sortedPosts);
      setFeaturedPosts(sortedPosts.filter(post => post.featured));
    } catch (error) {
      console.error('Error loading blog data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterPosts = () => {
    let filtered = posts;

    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredPosts(filtered);
  };

  const clearFilters = () => {
    setSearchTerm('');
  };

  const PostCard = ({ post }: { post: BlogPost }) => {
    return (
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="group cursor-pointer"
        onClick={() => window.location.href = `/blog/${post.slug}`}
      >
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-pink-200">
          <div className="relative overflow-hidden h-48">
            <img
              src={post.thumbnail_url || defaultThumbnail}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="absolute top-4 left-4">
              <Badge className="bg-gradient-to-r from-pink-100 to-rose-100 text-pink-700 border-0 font-medium">
                <span className="mr-1">📝</span>
                By Kidera
              </Badge>
            </div>

            {post.featured && (
              <div className="absolute top-4 right-4">
                <Badge className="bg-gradient-to-r from-pink-500 to-rose-500 text-white border-0">
                  <Heart className="w-3 h-3 mr-1" />
                  Featured
                </Badge>
              </div>
            )}
          </div>

          <div className="p-6">
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
              <span className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {getReadingTime(post.content)}
              </span>
              <span>{formatDate(post.created_at)}</span>
            </div>

            <h3 className="font-bold text-gray-900 mb-3 group-hover:text-pink-600 transition-colors line-clamp-2 text-xl">
              {post.title}
            </h3>

            <p className="text-gray-600 mb-4 line-clamp-3">
              {post.description || getExcerpt(post.content)}
            </p>

            <div className="flex items-center text-pink-600 font-medium group-hover:text-pink-700">
              <span>Read full story</span>
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </motion.article>
    );
  };

  const LoadingSkeleton = () => {
    return (
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
        <div className="h-48 bg-gray-200 animate-pulse" />
        <div className="p-6">
          <div className="h-4 bg-gray-200 rounded mb-3 animate-pulse" />
          <div className="h-6 bg-gray-200 rounded mb-3 animate-pulse" />
          <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
        </div>
      </div>
    );
  };

  return (
    <section className="py-16 bg-gradient-to-br from-pink-50 via-orange-50 to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showHeader && (
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              <span className="text-gray-900">Parenting </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-orange-500 to-yellow-500">
                Wisdom
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Tips, stories, and insights to support you on your parenting journey. From newborn care to toddler adventures, we're here to help.
            </motion.p>
          </div>
        )}

        {showFilters && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Search for parenting tips, activities, or topics..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-gray-200 focus:border-pink-300 focus:ring-pink-200"
                  />
                </div>



                {searchTerm && (
                  <Button
                    variant="outline"
                    onClick={clearFilters}
                    className="border-gray-200 hover:bg-pink-50 hover:border-pink-300"
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Clear
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          {searchTerm && (
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {filteredPosts.length} {filteredPosts.length === 1 ? 'Story' : 'Stories'} Found
            </h3>
          )}

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 9 }).map((_, i) => (
                <LoadingSkeleton key={i} />
              ))}
            </div>
          ) : filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🤱</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No stories found</h3>
              <p className="text-gray-600 mb-6">
                We couldn't find any articles matching your search. Try different keywords!
              </p>
              <Button onClick={clearFilters} className="bg-pink-600 hover:bg-pink-700">
                Show All Stories
              </Button>
            </div>
          )}
        </motion.div>

        {maxPosts && posts.length >= maxPosts && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <Button
              onClick={() => window.location.href = '/blog'}
              className="bg-gradient-to-r from-pink-600 to-orange-500 hover:from-pink-700 hover:to-orange-600 text-white px-8 py-3 text-lg font-semibold rounded-lg"
            >
              Read More Parenting Stories
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default KideraBlogGrid; 