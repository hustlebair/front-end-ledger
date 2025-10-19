import { supabase } from '../integrations/supabase/client';
import { BlogPost, calculateReadingTime, generateSlug } from './seo-utils';
import { loadMarkdownBlogPost, loadAllMarkdownBlogPosts, loadPublishedMarkdownBlogPosts } from './markdown-blog-utils';

// Fetch all published blog posts
export async function fetchBlogPosts(): Promise<BlogPost[]> {
  try {
    return await loadPublishedMarkdownBlogPosts();
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

// Fetch a single blog post by slug
export async function fetchBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    return await loadMarkdownBlogPost(slug);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

// Fetch all blog posts for admin (including unpublished)
export async function fetchAllBlogPosts(): Promise<BlogPost[]> {
  try {
    return await loadAllMarkdownBlogPosts();
  } catch (error) {
    console.error('Error fetching all blog posts:', error);
    return [];
  }
}

// Create a new blog post (markdown-based)
export async function createBlogPost(postData: Partial<BlogPost>): Promise<BlogPost | null> {
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

    // Create the blog post object
    const blogPost: BlogPost = {
      id: postData.slug || generateSlug(postData.title || ''),
      title: postData.title || '',
      slug: postData.slug || generateSlug(postData.title || ''),
      excerpt: postData.excerpt || '',
      content: postData.content || '',
      thumbnail_url: postData.thumbnail_url || null,
      featured: postData.featured || false,
      published: postData.published || false,
      author: postData.author || 'Kidera',
      published_at: postData.published_at || null,
      created_at: postData.created_at || new Date().toISOString(),
      updated_at: postData.updated_at || new Date().toISOString(),
      reading_time: postData.reading_time || 3,
      meta_title: postData.meta_title || postData.title || '',
      meta_description: postData.meta_description || postData.excerpt || '',
      meta_keywords: postData.meta_keywords || []
    };

    // In a real implementation, you would save this to a markdown file
    // For now, we'll just return the created post
    console.log('Blog post created (markdown-based):', blogPost.title);
    
    return blogPost;
  } catch (error) {
    console.error('Error creating blog post:', error);
    return null;
  }
}

// Update a blog post (markdown-based)
export async function updateBlogPost(id: string, postData: Partial<BlogPost>): Promise<BlogPost | null> {
  try {
    // Calculate reading time if content changed
    if (postData.content && !postData.reading_time) {
      postData.reading_time = calculateReadingTime(postData.content);
    }

    // Set published_at if publishing for the first time
    if (postData.published && !postData.published_at) {
      postData.published_at = new Date().toISOString();
    }

    // In a real implementation, you would update the markdown file
    // For now, we'll just return the updated post data
    console.log('Blog post updated (markdown-based):', id);
    
    // Load the existing post and merge with updates
    const existingPost = await loadMarkdownBlogPost(id);
    if (!existingPost) {
      return null;
    }

    const updatedPost: BlogPost = {
      ...existingPost,
      ...postData,
      updated_at: new Date().toISOString()
    };

    return updatedPost;
  } catch (error) {
    console.error('Error updating blog post:', error);
    return null;
  }
}

// Delete a blog post (markdown-based)
export async function deleteBlogPost(id: string): Promise<boolean> {
  try {
    // In a real implementation, you would delete the markdown file
    // For now, we'll just log the action
    console.log('Blog post deleted (markdown-based):', id);
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
    // Check if user is authenticated as admin
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || user.email !== 'ecombair@gmail.com') {
      console.warn('Unauthorized access to admin functions');
      return null;
    }

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