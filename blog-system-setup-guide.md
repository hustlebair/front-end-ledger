# Complete Blog System Setup Guide

## Overview
This guide provides a comprehensive prompt to add a complete blog system to any website, including database setup, frontend components, and admin functionality.

## Database Setup (Supabase)

First, run this SQL in your Supabase SQL editor:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create blog_posts table
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  content TEXT NOT NULL,
  thumbnail_url TEXT,
  author TEXT DEFAULT 'Admin',
  featured BOOLEAN DEFAULT FALSE,
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_blog_posts_published ON blog_posts(published);
CREATE INDEX idx_blog_posts_featured ON blog_posts(featured);
CREATE INDEX idx_blog_posts_created_at ON blog_posts(created_at DESC);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);

-- Enable Row Level Security (RLS)
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Policy: Public can read published posts
CREATE POLICY "Public can read published posts" ON blog_posts
  FOR SELECT USING (published = true);

-- Policy: Admin can manage all posts (insert, update, delete)
-- Replace 'admin@example.com' with your actual admin email
CREATE POLICY "Admin can manage all posts" ON blog_posts
  FOR ALL USING (
    auth.jwt() ->> 'email' = 'admin@example.com'
  );

-- Create storage bucket for blog images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('blog-images', 'blog-images', true);

-- Storage policy: Anyone can view images
CREATE POLICY "Public can view blog images" ON storage.objects
  FOR SELECT USING (bucket_id = 'blog-images');

-- Storage policy: Admin can upload images
CREATE POLICY "Admin can upload blog images" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'blog-images' AND
    auth.jwt() ->> 'email' = 'admin@example.com'
  );

-- Storage policy: Admin can update images
CREATE POLICY "Admin can update blog images" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'blog-images' AND
    auth.jwt() ->> 'email' = 'admin@example.com'
  );

-- Storage policy: Admin can delete images
CREATE POLICY "Admin can delete blog images" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'blog-images' AND
    auth.jwt() ->> 'email' = 'admin@example.com'
  );
```

**Note:** Replace `'admin@example.com'` with your actual admin email address in the RLS policies.

## Main Implementation Prompt

Copy and paste this complete prompt to implement a blog system:

```
Create a complete blog system for my website with the following requirements:

## Environment Variables
Set up: VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY, VITE_SUPABASE_SERVICE_ROLE_KEY with error handling

## Environment Variables
Set up: VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY, VITE_SUPABASE_SERVICE_ROLE_KEY with error handling

## Backend Utilities
Create utility functions:
- fetchBlogPosts() - get published posts with optional filtering
- fetchBlogPost(slug) - get single post by slug
- uploadBlogImage() - upload images to Supabase storage
- Helper functions for date formatting, reading time, excerpt generation
- Error handling for when Supabase is not configured
- TypeScript interfaces for BlogPost

## Frontend Components
Create these components:

1. Blog Grid Component:
- Responsive 3-column grid on desktop, 2 on tablet, 1 on mobile
- Shows featured posts first, then by date
- Search functionality
- Loading skeletons
- Post cards with title, description, date, reading time
- Links to individual post pages

2. Individual Blog Post Component:
- Renders markdown content with proper styling
- Shows post metadata (date, reading time, author)
- Social sharing buttons
- Related posts section
- Featured post badges
- Responsive design for mobile reading

3. Admin Dashboard Component:
- Statistics (total posts, published, drafts, featured)
- Lists all posts with edit/delete functionality
- Search and filter capabilities
- Post status badges
- Toggle buttons for featured/published status
- 'New Post' button that opens create/edit modal

4. Create/Edit Post Component:
- Title and slug fields (auto-generate slug from title)
- Description field for SEO
- Markdown content editor with preview
- Image upload functionality
- Featured and published toggles
- Save/draft functionality
- Form validation and error handling

## Page Components
Create these pages:

1. Blog Listing Page (/blog):
- Hero section with title and description
- Blog grid component
- Search and filter functionality
- Pagination or 'load more' button
- Proper SEO meta tags

2. Individual Blog Post Page (/blog/[slug]):
- Fetches and displays individual blog posts
- Blog post component
- Proper SEO meta tags
- Breadcrumb navigation
- Handles 404 for non-existent posts

3. Admin Page (/admin/blog):
- Admin dashboard component
- Authentication protection (optional)
- Admin-specific styling
- Navigation back to main site

## Integration
- Add 'Blog' link to main navigation menu
- Add blog section to homepage showing recent posts (limit 4-6) under the pricing section
- Update app routing to include /blog, /blog/:slug, /admin/blog routes
- Create vercel.json with rewrites for React Router routes

## Deployment
- Add environment variables to hosting platform
- Configure proper 404 handling
- Ensure all routes work correctly

## Content Management
Provide instructions for:
- How to access admin dashboard
- How to create new posts
- How to edit existing posts
- How to upload images
- How to manage featured/published status

Make sure all components are responsive, have proper error handling, and follow modern React/TypeScript best practices.
```

## Implementation Notes

### Branding Customization
- Update colors, fonts, and styling to match site theme
- Customize blog section titles and descriptions
- Adjust post card styling to match design system

### Content Customization
- Replace sample content with relevant topics
- Update meta descriptions and SEO content
- Customize admin dashboard branding

### Feature Extensions
- Add categories/tags if needed
- Implement comments system
- Add newsletter signup integration
- Include analytics tracking

### Security Considerations
- Keep Supabase credentials secure
- Regularly update dependencies
- Monitor for security vulnerabilities
- Implement proper authentication if needed

### Maintenance Tasks
- Monitor blog performance
- Update content regularly
- Check for broken links
- Review and update posts
- Backup database regularly 