import { createClient } from '@supabase/supabase-js';
import { BlogPost, calculateReadingTime, generateSlug } from './seo-utils';

// Environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://qdcfcmqfinnnfdxexccv.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_ACCESS_TOKEN || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkY2ZjbXFmaW5ubmZkeGV4Y2N2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4NDMyNzAsImV4cCI6MjA3NDQxOTI3MH0.Kw57EqK7vVlGtm42YTHo1VFkwhOsscPqZIQOUckILvE';

// Debug environment variables
console.log('🔧 Environment Debug:');
console.log('VITE_SUPABASE_URL:', import.meta.env.VITE_SUPABASE_URL);
console.log('VITE_SUPABASE_ANON_KEY:', import.meta.env.VITE_SUPABASE_ANON_KEY);
console.log('VITE_SUPABASE_ACCESS_TOKEN:', import.meta.env.VITE_SUPABASE_ACCESS_TOKEN);
console.log('Final supabaseUrl:', supabaseUrl);
console.log('Final supabaseAnonKey:', supabaseAnonKey ? 'Present' : 'Missing');

// Initialize Supabase client
let supabase: any = null;
if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
  console.log('✅ Supabase client initialized with URL:', supabaseUrl);
} else {
  console.error('❌ Supabase environment variables not found');
}

// Fetch all published blog posts
export async function fetchBlogPosts(): Promise<BlogPost[]> {
  if (!supabase) {
    console.warn('Supabase not initialized');
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .order('featured', { ascending: false })
      .order('published_at', { ascending: false });

    if (error) {
      console.error('Error fetching blog posts:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

// Fetch a single blog post by slug
export async function fetchBlogPost(slug: string): Promise<BlogPost | null> {
  if (!supabase) {
    console.warn('Supabase not initialized');
    return null;
  }

  try {
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

    return data;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

// Fetch all blog posts for admin (including unpublished)
export async function fetchAllBlogPosts(): Promise<BlogPost[]> {
  if (!supabase) {
    console.warn('Supabase not initialized');
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching all blog posts:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching all blog posts:', error);
    return [];
  }
}

// Create a new blog post
export async function createBlogPost(postData: Partial<BlogPost>): Promise<BlogPost | null> {
  if (!supabase) {
    console.warn('Supabase not initialized');
    return null;
  }

  try {
    // Generate slug if not provided
    if (!postData.slug && postData.title) {
      postData.slug = generateSlug(postData.title);
    }

    // Calculate reading time if not provided
    if (!postData.reading_time && postData.content) {
      postData.reading_time = calculateReadingTime(postData.content);
    }

    // Set published_at if publishing
    if (postData.published && !postData.published_at) {
      postData.published_at = new Date().toISOString();
    }

    const { data, error } = await supabase
      .from('blog_posts')
      .insert([{
        ...postData,
        author: 'Kidera',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating blog post:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error creating blog post:', error);
    return null;
  }
}

// Update a blog post
export async function updateBlogPost(id: string, postData: Partial<BlogPost>): Promise<BlogPost | null> {
  if (!supabase) {
    console.warn('Supabase not initialized');
    return null;
  }

  try {
    // Calculate reading time if content changed
    if (postData.content && !postData.reading_time) {
      postData.reading_time = calculateReadingTime(postData.content);
    }

    // Set published_at if publishing for the first time
    if (postData.published && !postData.published_at) {
      postData.published_at = new Date().toISOString();
    }

    const { data, error } = await supabase
      .from('blog_posts')
      .update({
        ...postData,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating blog post:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error updating blog post:', error);
    return null;
  }
}

// Delete a blog post
export async function deleteBlogPost(id: string): Promise<boolean> {
  if (!supabase) {
    console.warn('Supabase not initialized');
    return false;
  }

  try {
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting blog post:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return false;
  }
}

// Upload image to Supabase Storage
export async function uploadBlogImage(file: File): Promise<string | null> {
  if (!supabase) {
    console.warn('Supabase not initialized');
    return null;
  }

  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `blog-images/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('kidera-blog-images')
      .upload(filePath, file);

    if (uploadError) {
      console.error('Error uploading image:', uploadError);
      return null;
    }

    const { data } = supabase.storage
      .from('kidera-blog-images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    return null;
  }
}

// Generate static blog data for build-time generation
export async function generateStaticBlogData(): Promise<{ posts: BlogPost[]; sitemap: string }> {
  const posts = await fetchBlogPosts();
  
  // Generate sitemap
  const { generateSitemap } = await import('./seo-utils');
  const sitemap = generateSitemap(posts);
  
  return { posts, sitemap };
}