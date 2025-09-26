-- Blog Schema Setup for Kidera
-- Run this in your Supabase SQL Editor

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  thumbnail_url TEXT,
  author TEXT DEFAULT 'Kidera',
  featured BOOLEAN DEFAULT FALSE,
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  published_at TIMESTAMP WITH TIME ZONE,
  reading_time INTEGER DEFAULT 5,
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT[]
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published, published_at);
CREATE INDEX IF NOT EXISTS idx_blog_posts_featured ON blog_posts(featured);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_blog_posts_updated_at 
    BEFORE UPDATE ON blog_posts 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Admin can do everything (based on email)
CREATE POLICY "Admin full access" ON blog_posts
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE auth.users.id = auth.uid() 
      AND auth.users.email = 'ecombair@gmail.com'
    )
  );

-- Public can only read published posts
CREATE POLICY "Public read published posts" ON blog_posts
  FOR SELECT USING (published = true);

-- Create storage bucket for blog images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('kidera-blog-images', 'kidera-blog-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Public can view blog images" ON storage.objects
  FOR SELECT USING (bucket_id = 'kidera-blog-images');

CREATE POLICY "Admin can upload blog images" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'kidera-blog-images' AND
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE auth.users.id = auth.uid() 
      AND auth.users.email = 'ecombair@gmail.com'
    )
  );

CREATE POLICY "Admin can update blog images" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'kidera-blog-images' AND
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE auth.users.id = auth.uid() 
      AND auth.users.email = 'ecombair@gmail.com'
    )
  );

CREATE POLICY "Admin can delete blog images" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'kidera-blog-images' AND
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE auth.users.id = auth.uid() 
      AND auth.users.email = 'ecombair@gmail.com'
    )
  );
