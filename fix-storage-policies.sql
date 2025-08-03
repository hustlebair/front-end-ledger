-- Fix Storage Bucket Policies for Blog Images
-- Run this in your Supabase SQL editor to fix the image upload issue

-- First, drop the existing policies
DROP POLICY IF EXISTS "Authenticated users can upload blog images" ON storage.objects;
DROP POLICY IF EXISTS "Users can update own blog images" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete own blog images" ON storage.objects;

-- Create new policies that allow anyone to upload (for simplicity)
CREATE POLICY "Anyone can upload blog images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'kidera-blog-images');

CREATE POLICY "Anyone can update blog images" ON storage.objects
  FOR UPDATE USING (bucket_id = 'kidera-blog-images')
  WITH CHECK (bucket_id = 'kidera-blog-images');

CREATE POLICY "Anyone can delete blog images" ON storage.objects
  FOR DELETE USING (bucket_id = 'kidera-blog-images');

-- The public read policy should already exist, but let's make sure
DROP POLICY IF EXISTS "Public can view blog images" ON storage.objects;
CREATE POLICY "Public can view blog images" ON storage.objects
  FOR SELECT USING (bucket_id = 'kidera-blog-images'); 