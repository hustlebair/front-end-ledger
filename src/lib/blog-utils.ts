import { createClient } from '@supabase/supabase-js';

// Blog post type definition
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  content: string;
  thumbnail_url: string | null;
  author: string;
  featured: boolean;
  published: boolean;
  created_at: string;
  updated_at: string;
}

// Author name for all posts
export const AUTHOR_NAME = 'Kidera';

// Initialize Supabase client (you'll need to add your credentials)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Fetch published blog posts
export const fetchBlogPosts = async (options?: {
  featured?: boolean;
  limit?: number;
}) => {
  let query = supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false });

  if (options?.featured !== undefined) {
    query = query.eq('featured', options.featured);
  }

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  const { data, error } = await query;
  
  if (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }

  return data as BlogPost[];
};

// Fetch single blog post by slug
export const fetchBlogPost = async (slug: string) => {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }

  return data as BlogPost;
};

// Generate slug from title
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
};

// Format date for display
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Get reading time estimate
export const getReadingTime = (content: string): string => {
  const wordsPerMinute = 200;
  const words = content.split(' ').length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
};

// Get excerpt from content
export const getExcerpt = (content: string, maxLength: number = 150): string => {
  // Remove markdown formatting
  const plainText = content
    .replace(/#{1,6}\s/g, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/`(.*?)`/g, '$1');

  if (plainText.length <= maxLength) {
    return plainText;
  }

  return plainText.substring(0, maxLength).trim() + '...';
};

// Get all unique tags from published posts
export const fetchAllTags = async (): Promise<string[]> => {
  // Since we removed tags, return empty array
  return [];
};

// Upload image to Supabase storage
export const uploadBlogImage = async (file: File, path?: string): Promise<string | null> => {
  const fileName = `${Date.now()}-${file.name}`;
  const filePath = path ? `${path}/${fileName}` : fileName;

  console.log('Uploading image:', fileName);
  console.log('File size:', file.size, 'bytes');

  const { data, error } = await supabase.storage
    .from('kidera-blog-images')
    .upload(filePath, file);

  if (error) {
    console.error('Error uploading image:', error);
    return null;
  }

  console.log('Upload successful:', data);

  const { data: urlData } = supabase.storage
    .from('kidera-blog-images')
    .getPublicUrl(data.path);

  console.log('Public URL:', urlData.publicUrl);
  return urlData.publicUrl;
};

// Default placeholder image for posts without thumbnails
export const defaultThumbnail = '/placeholder.svg'; 