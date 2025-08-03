import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff, 
  Star, 
  StarOff,
  Calendar,
  FileText,
  TrendingUp,
  Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  BlogPost,
  fetchBlogPosts,
  formatDate,
  getReadingTime,
  supabase
} from '@/lib/blog-utils';
import KideraCreatePost from './KideraCreatePost';

const KideraAdminDashboard = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    drafts: 0,
    featured: 0
  });

  useEffect(() => {
    loadPosts();
  }, []);

  useEffect(() => {
    filterPosts();
  }, [posts, searchTerm, statusFilter]);

  const loadPosts = async () => {
    setLoading(true);
    try {
      // Load all posts (published and unpublished) for admin
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching posts:', error);
        return;
      }

      setPosts(data as BlogPost[]);
      
      // Calculate stats
      const total = data.length;
      const published = data.filter(p => p.published).length;
      const drafts = total - published;
      const featured = data.filter(p => p.featured).length;
      
      setStats({ total, published, drafts, featured });
    } catch (error) {
      console.error('Error loading posts:', error);
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

    if (statusFilter !== 'all') {
      filtered = filtered.filter(post => 
        statusFilter === 'published' ? post.published : !post.published
      );
    }

    setFilteredPosts(filtered);
  };

  const togglePublished = async (post: BlogPost) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({ published: !post.published })
        .eq('id', post.id);

      if (error) {
        console.error('Error updating post:', error);
        return;
      }

      loadPosts(); // Reload to get fresh data
    } catch (error) {
      console.error('Error toggling publish status:', error);
    }
  };

  const toggleFeatured = async (post: BlogPost) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({ featured: !post.featured })
        .eq('id', post.id);

      if (error) {
        console.error('Error updating post:', error);
        return;
      }

      loadPosts(); // Reload to get fresh data
    } catch (error) {
      console.error('Error toggling featured status:', error);
    }
  };

  const deletePost = async (post: BlogPost) => {
    if (!confirm(`Are you sure you want to delete "${post.title}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', post.id);

      if (error) {
        console.error('Error deleting post:', error);
        return;
      }

      loadPosts(); // Reload to get fresh data
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const StatCard = ({ title, value, icon: Icon, color }: {
    title: string;
    value: number;
    icon: any;
    color: string;
  }) => (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`p-3 rounded-xl ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  const PostRow = ({ post }: { post: BlogPost }) => (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="font-semibold text-gray-900 text-lg">{post.title}</h3>
            <Badge className="bg-gradient-to-r from-pink-100 to-rose-100 text-pink-700 border-0 text-xs">
              <span className="mr-1">📝</span>
              By Kidera
            </Badge>
            {post.featured && (
              <Badge className="bg-gradient-to-r from-pink-500 to-rose-500 text-white border-0 text-xs">
                <Star className="w-3 h-3 mr-1" />
                Featured
              </Badge>
            )}
            {post.published ? (
              <Badge className="bg-green-100 text-green-700 border-0 text-xs">
                <Eye className="w-3 h-3 mr-1" />
                Published
              </Badge>
            ) : (
              <Badge className="bg-gray-100 text-gray-600 border-0 text-xs">
                <EyeOff className="w-3 h-3 mr-1" />
                Draft
              </Badge>
            )}
          </div>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {post.description || 'No description provided'}
          </p>
          
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center">
              <Calendar className="w-3 h-3 mr-1" />
              {formatDate(post.created_at)}
            </span>
            <span className="flex items-center">
              <FileText className="w-3 h-3 mr-1" />
              {getReadingTime(post.content)}
            </span>
            <span>By {post.author}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 ml-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => toggleFeatured(post)}
            className={`border-gray-200 ${post.featured ? 'bg-pink-50 border-pink-200' : ''}`}
          >
            {post.featured ? <StarOff className="w-4 h-4" /> : <Star className="w-4 h-4" />}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => togglePublished(post)}
            className={`border-gray-200 ${post.published ? 'bg-green-50 border-green-200' : ''}`}
          >
            {post.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setEditingPost(post)}
            className="border-gray-200"
          >
            <Edit className="w-4 h-4" />
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => deletePost(post)}
            className="border-red-200 text-red-600 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-yellow-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Kidera Blog Dashboard
          </h1>
          <p className="text-gray-600">
            Manage your parenting content and connect with families around the world.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Posts"
            value={stats.total}
            icon={FileText}
            color="bg-gradient-to-r from-blue-500 to-blue-600"
          />
          <StatCard
            title="Published"
            value={stats.published}
            icon={Eye}
            color="bg-gradient-to-r from-green-500 to-green-600"
          />
          <StatCard
            title="Drafts"
            value={stats.drafts}
            icon={EyeOff}
            color="bg-gradient-to-r from-gray-500 to-gray-600"
          />
          <StatCard
            title="Featured"
            value={stats.featured}
            icon={Star}
            color="bg-gradient-to-r from-pink-500 to-rose-500"
          />
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col lg:flex-row gap-4 flex-1">
              <Input
                placeholder="Search posts, categories, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-gray-200 focus:border-pink-300 focus:ring-pink-200"
              />
              
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:border-pink-300 focus:ring-pink-200 bg-white"
              >
                <option value="all">All Posts</option>
                <option value="published">Published Only</option>
                <option value="draft">Drafts Only</option>
              </select>
            </div>

            <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-pink-600 to-orange-500 hover:from-pink-700 hover:to-orange-600 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  New Post
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Create New Blog Post</DialogTitle>
                </DialogHeader>
                <KideraCreatePost onSave={() => {
                  setShowCreateModal(false);
                  loadPosts();
                }} />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Posts List */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-pulse">
                <div className="h-32 bg-gray-200 rounded-2xl mb-4" />
                <div className="h-32 bg-gray-200 rounded-2xl mb-4" />
                <div className="h-32 bg-gray-200 rounded-2xl" />
              </div>
            </div>
          ) : filteredPosts.length > 0 ? (
            filteredPosts.map(post => (
              <PostRow key={post.id} post={post} />
            ))
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No posts found</h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Try adjusting your search or filters'
                  : 'Create your first blog post to get started'
                }
              </p>
              {!searchTerm && statusFilter === 'all' && (
                <Button 
                  onClick={() => setShowCreateModal(true)}
                  className="bg-pink-600 hover:bg-pink-700"
                >
                  Create First Post
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Edit Modal */}
        {editingPost && (
          <Dialog open={!!editingPost} onOpenChange={() => setEditingPost(null)}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Edit Blog Post</DialogTitle>
              </DialogHeader>
              <KideraCreatePost 
                editPost={editingPost}
                onSave={() => {
                  setEditingPost(null);
                  loadPosts();
                }} 
              />
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default KideraAdminDashboard; 