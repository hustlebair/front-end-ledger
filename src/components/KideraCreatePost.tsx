import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { 
  Upload, 
  X, 
  Save, 
  Eye, 
  Star,
  Tag,
  Image as ImageIcon
} from 'lucide-react';
import {
  BlogPost,
  generateSlug,
  uploadBlogImage,
  supabase
} from '@/lib/blog-utils';

interface KideraCreatePostProps {
  editPost?: BlogPost | null;
  onSave: () => void;
}

const KideraCreatePost: React.FC<KideraCreatePostProps> = ({ editPost, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    content: '',
    featured: false,
    published: false,
    thumbnail_url: ''
  });
  

  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setSaving] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);



  useEffect(() => {
    if (editPost) {
      setFormData({
        title: editPost.title,
        slug: editPost.slug,
        description: editPost.description || '',
        content: editPost.content,
        featured: editPost.featured,
        published: editPost.published,
        thumbnail_url: editPost.thumbnail_url || ''
      });
    }
  }, [editPost]);

  useEffect(() => {
    if (formData.title && !editPost) {
      setFormData(prev => ({
        ...prev,
        slug: generateSlug(prev.title)
      }));
    }
  }, [formData.title, editPost]);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    console.log('File selected:', file.name, file.size, 'bytes');
    setIsUploading(true);
    try {
      const imageUrl = await uploadBlogImage(file);
      console.log('Image URL returned:', imageUrl);
      if (imageUrl) {
        setFormData(prev => ({ ...prev, thumbnail_url: imageUrl }));
        console.log('Updated form data with image URL');
      } else {
        alert('Failed to upload image. Please check your Supabase storage bucket setup.');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };



  const handleSave = async () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      alert('Please fill in the title and content fields.');
      return;
    }

    setSaving(true);
    try {
      const postData = {
        title: formData.title.trim(),
        slug: formData.slug.trim(),
        description: formData.description.trim() || null,
        content: formData.content.trim(),
        featured: formData.featured,
        published: formData.published,
        thumbnail_url: formData.thumbnail_url || null,
        author: 'Kidera'
      };

      if (editPost) {
        // Update existing post
        const { error } = await supabase
          .from('blog_posts')
          .update(postData)
          .eq('id', editPost.id);

        if (error) {
          console.error('Error updating post:', error);
          alert('Failed to update post. Please try again.');
          return;
        }
      } else {
        // Create new post
        const { error } = await supabase
          .from('blog_posts')
          .insert([postData]);

        if (error) {
          console.error('Error creating post:', error);
          alert('Failed to create post. Please try again.');
          return;
        }
      }

      onSave();
    } catch (error) {
      console.error('Error saving post:', error);
      alert('Failed to save post. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const renderMarkdownPreview = (content: string) => {
    return content
      .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mb-4">$1</h1>')
      .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold mb-3">$1</h2>')
      .replace(/^### (.*$)/gim, '<h3 class="text-lg font-bold mb-2">$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .replace(/^- (.*$)/gim, '<li class="mb-1">$1</li>')
      .replace(/(<li.*<\/li>)/s, '<ul class="list-disc list-inside mb-4">$1</ul>')
      .replace(/\n\n/g, '</p><p class="mb-4">')
      .replace(/^(?!<[h|u|l])(.+)$/gm, '<p class="mb-4">$1</p>');
  };

  return (
    <div className="space-y-6">
      {/* Title and Slug */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title" className="text-sm font-medium text-gray-700 mb-2 block">
            Title *
          </Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Enter post title..."
            className="border-gray-200 focus:border-pink-300 focus:ring-pink-200"
          />
        </div>
        
        <div>
          <Label htmlFor="slug" className="text-sm font-medium text-gray-700 mb-2 block">
            URL Slug *
          </Label>
          <Input
            id="slug"
            value={formData.slug}
            onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
            placeholder="url-friendly-slug"
            className="border-gray-200 focus:border-pink-300 focus:ring-pink-200"
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <Label htmlFor="description" className="text-sm font-medium text-gray-700 mb-2 block">
          Description (SEO & Preview)
        </Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Brief description for SEO and social sharing..."
          rows={3}
          className="border-gray-200 focus:border-pink-300 focus:ring-pink-200"
        />
      </div>

      {/* Post Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">


        <div className="flex items-center space-x-6 pt-8">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
              className="w-4 h-4 text-pink-600 border-gray-300 rounded focus:ring-pink-200"
            />
            <span className="ml-2 text-sm text-gray-700 flex items-center">
              <Star className="w-4 h-4 mr-1" />
              Featured Post
            </span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.published}
              onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.checked }))}
              className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-200"
            />
            <span className="ml-2 text-sm text-gray-700 flex items-center">
              <Eye className="w-4 h-4 mr-1" />
              Published
            </span>
          </label>
        </div>
      </div>



      {/* Thumbnail Upload */}
      <div>
        <Label className="text-sm font-medium text-gray-700 mb-2 block">
          Thumbnail Image
        </Label>
        
        {formData.thumbnail_url ? (
          <div className="relative inline-block">
            <img
              src={formData.thumbnail_url}
              alt="Thumbnail preview"
              className="w-32 h-24 object-cover rounded-lg border border-gray-200"
            />
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, thumbnail_url: '' }))}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <label className="cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                disabled={isUploading}
              />
              <div className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                {isUploading ? (
                  <div className="w-4 h-4 border-2 border-pink-600 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <ImageIcon className="w-4 h-4" />
                )}
                <span className="text-sm text-gray-700">
                  {isUploading ? 'Uploading...' : 'Upload Image'}
                </span>
              </div>
            </label>
          </div>
        )}
      </div>

      {/* Content Editor */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <Label className="text-sm font-medium text-gray-700">
            Content * (Markdown supported)
          </Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setPreviewMode(!previewMode)}
            className="border-gray-200"
          >
            {previewMode ? 'Edit' : 'Preview'}
          </Button>
        </div>

        {previewMode ? (
          <div 
            className="min-h-[300px] p-4 border border-gray-200 rounded-lg bg-gray-50 prose max-w-none"
            dangerouslySetInnerHTML={{ __html: renderMarkdownPreview(formData.content) }}
          />
        ) : (
          <Textarea
            value={formData.content}
            onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
            placeholder="Write your parenting article here... 

You can use markdown formatting:
# Heading 1
## Heading 2
**Bold text**
*Italic text*
- List item"
            rows={15}
            className="border-gray-200 focus:border-pink-300 focus:ring-pink-200 font-mono text-sm"
          />
        )}
      </div>

      {/* Save Button */}
      <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-200">
        <Button
          type="button"
          variant="outline"
          onClick={() => onSave()}
          className="border-gray-200"
        >
          Cancel
        </Button>
        
        <Button
          onClick={handleSave}
          disabled={isSaving || !formData.title.trim() || !formData.content.trim()}
          className="bg-gradient-to-r from-pink-600 to-orange-500 hover:from-pink-700 hover:to-orange-600 text-white"
        >
          {isSaving ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
          ) : (
            <Save className="w-4 h-4 mr-2" />
          )}
          {editPost ? 'Update Post' : 'Create Post'}
        </Button>
      </div>
    </div>
  );
};

export default KideraCreatePost; 