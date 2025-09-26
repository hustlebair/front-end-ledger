import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Save, Eye, EyeOff } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { fetchBlogPost, createBlogPost, updateBlogPost, uploadBlogImage } from '../lib/blog-utils';
import { BlogPost, generateSlug } from '../lib/seo-utils';

const KideraCreatePost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    meta_title: '',
    meta_description: '',
    meta_keywords: '',
    featured: false,
    published: false
  });
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEdit && id) {
      loadPost();
    }
  }, [isEdit, id]);

  const loadPost = async () => {
    try {
      setLoading(true);
      const post = await fetchBlogPost(id!);
      if (post) {
        setFormData({
          title: post.title,
          content: post.content,
          excerpt: post.excerpt || '',
          meta_title: post.meta_title || '',
          meta_description: post.meta_description || '',
          meta_keywords: post.meta_keywords?.join(', ') || '',
          featured: post.featured,
          published: post.published
        });
        setThumbnailUrl(post.thumbnail_url || '');
      }
    } catch (error) {
      console.error('Error loading post:', error);
      setError('Failed to load post');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
      setThumbnailUrl(URL.createObjectURL(file));
    }
  };

  const handleSave = async (publish: boolean = false) => {
    try {
      setSaving(true);
      setError('');

      // Validate required fields
      if (!formData.title.trim()) {
        setError('Title is required');
        return;
      }
      if (!formData.content.trim()) {
        setError('Content is required');
        return;
      }

      // Upload thumbnail if new file selected
      let finalThumbnailUrl = thumbnailUrl;
      if (thumbnailFile) {
        const uploadedUrl = await uploadBlogImage(thumbnailFile);
        if (uploadedUrl) {
          finalThumbnailUrl = uploadedUrl;
        }
      }

      // Prepare post data
      const postData = {
        ...formData,
        slug: generateSlug(formData.title),
        thumbnail_url: finalThumbnailUrl,
        meta_keywords: formData.meta_keywords
          ? formData.meta_keywords.split(',').map(k => k.trim()).filter(Boolean)
          : [],
        published: publish ? true : formData.published
      };

      let result;
      if (isEdit) {
        result = await updateBlogPost(id!, postData);
      } else {
        result = await createBlogPost(postData);
      }

      if (result) {
        navigate('/admin/blog');
      } else {
        setError('Failed to save post');
      }
    } catch (error) {
      console.error('Error saving post:', error);
      setError('Failed to save post');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading post...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{isEdit ? 'Edit Post' : 'Create Post'} | Kidera Blog Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => navigate('/admin/blog')}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Button>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    {isEdit ? 'Edit Post' : 'Create New Post'}
                  </h1>
                  <p className="text-gray-600">
                    {isEdit ? 'Update your blog post' : 'Write a new blog post'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => handleSave(false)}
                  disabled={saving}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {saving ? 'Saving...' : 'Save Draft'}
                </Button>
                <Button
                  onClick={() => handleSave(true)}
                  disabled={saving}
                  className="flex items-center gap-2 bg-pink-600 hover:bg-pink-700"
                >
                  {formData.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  {saving ? 'Publishing...' : (formData.published ? 'Update' : 'Publish')}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Title */}
              <Card className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Post Content</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title *
                    </label>
                    <Input
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Enter post title..."
                      className="text-lg"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Content *
                    </label>
                    <Textarea
                      name="content"
                      value={formData.content}
                      onChange={handleInputChange}
                      placeholder="Write your post content here..."
                      rows={12}
                      className="resize-none"
                    />
                    <p className="text-sm text-gray-500 mt-2">
                      Use **bold** for bold text and *italic* for italic text.
                    </p>
                  </div>
                </div>
              </Card>

              {/* Thumbnail */}
              <Card className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Featured Image</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100"
                    />
                  </div>
                  
                  {thumbnailUrl && (
                    <div className="mt-4">
                      <img
                        src={thumbnailUrl}
                        alt="Thumbnail preview"
                        className="w-full max-w-md h-48 object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Publish Settings */}
              <Card className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Publish Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">
                      Featured Post
                    </label>
                    <input
                      type="checkbox"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">
                      Published
                    </label>
                    <input
                      type="checkbox"
                      name="published"
                      checked={formData.published}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                    />
                  </div>
                </div>
              </Card>

              {/* SEO Settings */}
              <Card className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">SEO Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Meta Title
                    </label>
                    <Input
                      name="meta_title"
                      value={formData.meta_title}
                      onChange={handleInputChange}
                      placeholder="SEO title (optional)"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Meta Description
                    </label>
                    <Textarea
                      name="meta_description"
                      value={formData.meta_description}
                      onChange={handleInputChange}
                      placeholder="SEO description (optional)"
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Keywords
                    </label>
                    <Input
                      name="meta_keywords"
                      value={formData.meta_keywords}
                      onChange={handleInputChange}
                      placeholder="parenting, memories, family (comma separated)"
                    />
                  </div>
                </div>
              </Card>

              {/* Excerpt */}
              <Card className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Excerpt</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Post Summary
                  </label>
                  <Textarea
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleInputChange}
                    placeholder="Brief description of your post..."
                    rows={4}
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    This will be shown in blog listings and social media previews.
                  </p>
                </div>
              </Card>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-6 bg-red-50 border border-red-200 rounded-md p-4">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default KideraCreatePost;