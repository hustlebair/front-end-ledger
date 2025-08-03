# Kidera Blog System - Supabase Database Schema

## SQL Commands to Execute in Supabase

### 1. Create blog_posts table

```sql
-- Create blog_posts table
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  content TEXT NOT NULL,
  thumbnail_url TEXT,
  author TEXT DEFAULT 'Kidera',
  featured BOOLEAN DEFAULT FALSE,
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 2. Create updated_at trigger

```sql
-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for blog_posts
CREATE TRIGGER update_blog_posts_updated_at 
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();
```

### 3. Create indexes for performance

```sql
-- Create indexes for better query performance
CREATE INDEX idx_blog_posts_published ON blog_posts(published);
CREATE INDEX idx_blog_posts_featured ON blog_posts(featured);
CREATE INDEX idx_blog_posts_created_at ON blog_posts(created_at DESC);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
```

### 4. Row Level Security (RLS) Policies

```sql
-- Enable RLS on blog_posts table
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read published posts
CREATE POLICY "Public can read published posts" ON blog_posts
  FOR SELECT USING (published = true);

-- Policy: Admin can manage all posts (you'll need to set up admin authentication)
-- For now, we'll allow all operations for simplicity
-- You can restrict this later by adding admin user checks
CREATE POLICY "Admin can manage all posts" ON blog_posts
  FOR ALL USING (true);
```

### 5. Create Storage Bucket for Blog Images

```sql
-- Insert storage bucket for blog images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('kidera-blog-images', 'kidera-blog-images', true);
```

### 6. Storage Policies for Blog Images

```sql
-- Policy: Anyone can view blog images
CREATE POLICY "Public can view blog images" ON storage.objects
  FOR SELECT USING (bucket_id = 'kidera-blog-images');

-- Policy: Authenticated users can upload blog images
CREATE POLICY "Authenticated users can upload blog images" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'kidera-blog-images' 
    AND auth.role() = 'authenticated'
  );

-- Policy: Users can update their own uploaded images
CREATE POLICY "Users can update own blog images" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'kidera-blog-images' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Policy: Users can delete their own uploaded images
CREATE POLICY "Users can delete own blog images" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'kidera-blog-images' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );
```

### 7. Sample Data (Optional)

```sql
-- Insert sample blog posts
INSERT INTO blog_posts (
  title, 
  slug, 
  description, 
  content, 
  featured, 
  published,
  author
) VALUES 
(
  'Creating Your First Baby Memory Book', 
  'creating-your-first-baby-memory-book',
  'Tips and ideas for documenting your little one''s precious moments from day one.',
  '# Creating Your First Baby Memory Book

Starting a memory book for your baby is one of the most meaningful things you can do as a new parent. Here are some tips to get started:

## Getting Started
- Choose your format (digital or physical)
- Set up a routine for regular entries
- Don''t stress about perfection

## What to Include
- Daily firsts and milestones
- Photos from different angles
- Your thoughts and feelings
- Family reactions and stories

## Making It Sustainable
The key is consistency, not perfection. Even a few words each day can create something magical.',
  true,
  true,
  'Kidera'
),
(
  '10 Fun Activities for Rainy Days with Toddlers',
  '10-fun-activities-rainy-days-toddlers', 
  'Keep your little ones entertained and engaged when stuck indoors.',
  '# 10 Fun Activities for Rainy Days with Toddlers

Rainy days don''t have to mean bored toddlers! Here are some creative activities to keep them engaged:

## Indoor Adventures
1. Build a blanket fort
2. Create an obstacle course
3. Have a dance party
4. Set up a treasure hunt
5. Make playdough sculptures

## Creative Projects  
6. Finger painting masterpieces
7. Collage with magazines
8. Simple cooking together
9. Story time with voices
10. Indoor picnic lunch

Remember, the goal is connection and fun, not perfection!',
  false,
  true,
  'Kidera'
);
```

## Setup Instructions

1. **Copy each SQL block above and execute in your Supabase SQL editor**
2. **Create storage bucket** using the SQL command or through Supabase dashboard
3. **Test the policies** by trying to insert/read data
4. **Add sample data** to test the blog functionality

## Environment Variables

Add these to your `.env.local` file:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## How to Create a New Blog Post

### Option 1: Using the Admin Dashboard
1. **Go to** `/admin/blog` in your browser
2. **Click "New Post"** button
3. **Fill in the form:**
   - Title (auto-generates slug)
   - Description (for SEO)
   - Content (markdown supported)
   - Upload thumbnail image
   - Toggle "Featured" if important
   - Toggle "Published" to make it live
4. **Click "Create Post"**

### Option 2: Direct Database Insert
```sql
INSERT INTO blog_posts (
  title,
  slug,
  description,
  content,
  thumbnail_url,
  featured,
  published,
  author
) VALUES (
  'Your Post Title',
  'your-post-slug',
  'Brief description for SEO',
  '# Your Post Content

Write your markdown content here...

## Section 1
Your content...

## Section 2
More content...',
  'https://your-image-url.jpg',
  false,
  true,
  'Kidera'
);
```

## Notes

- All posts are authored by "Kidera"
- No categories or tags needed
- Storage bucket allows public read access for blog images
- Indexes are optimized for published posts and featured content
- Simple structure for easy management 