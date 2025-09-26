# Kidera Blog System Setup Guide

## 🚀 Quick Setup

### 1. Database Setup
Run this SQL in your Supabase SQL Editor:

```sql
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

-- Create indexes for better performance
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
```

### 2. Environment Variables
Create a `.env` file in your project root:

```env
VITE_SUPABASE_URL=https://qdcfcmqfinnnfdxexccv.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkY2ZjbXFmaW5ubmZkeGV4Y2N2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4NDMyNzAsImV4cCI6MjA3NDQxOTI3MH0.Kw57EqK7vVlGtm42YTHo1VFkwhOsscPqZIQOUckILvE
```

### 3. Install Dependencies
```bash
npm install react-helmet-async @types/react-helmet-async
```

### 4. Deploy to Vercel
1. Push your code to GitHub
2. Connect to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

## 📝 Admin Access

**Admin Dashboard**: `https://kidera.co/admin/blog`
**Email**: `ecombair@gmail.com`
**Password**: `kidera_admin_2024`

## 🎯 Features

### SEO Optimized
- ✅ React Helmet for dynamic meta tags
- ✅ Structured data (JSON-LD) for search engines
- ✅ Dynamic sitemap generation
- ✅ Open Graph and Twitter Card support
- ✅ Canonical URLs
- ✅ Reading time calculation
- ✅ Auto-generated slugs

### Admin Features
- ✅ Secure authentication
- ✅ Create/Edit/Delete posts
- ✅ Image upload to Supabase Storage
- ✅ Draft/Published status
- ✅ Featured post toggle
- ✅ SEO meta fields
- ✅ Real-time preview

### Public Features
- ✅ Responsive blog grid
- ✅ Individual post pages
- ✅ Related posts
- ✅ Social sharing ready
- ✅ Fast loading with lazy images

## 🔧 Usage

### Creating a Blog Post
1. Go to `/admin/blog`
2. Click "New Post"
3. Fill in title, content, and excerpt
4. Upload a featured image
5. Set SEO meta fields (optional)
6. Choose featured/published status
7. Save or Publish

### SEO Best Practices
- Use descriptive titles (50-60 characters)
- Write compelling meta descriptions (150-160 characters)
- Add relevant keywords
- Use high-quality featured images
- Write engaging excerpts
- Keep content readable and well-structured

## 🚀 Build Process

The build process now includes:
1. **Static Generation**: Blog data is generated at build time
2. **Sitemap Creation**: Dynamic sitemap with all blog posts
3. **SEO Optimization**: Meta tags and structured data

Run `npm run build` to build with static generation.

## 📊 SEO Benefits

- **Search Engine Visibility**: Proper meta tags and structured data
- **Social Media Ready**: Open Graph and Twitter Cards
- **Fast Loading**: Optimized images and lazy loading
- **Mobile Friendly**: Responsive design
- **Content Discovery**: Related posts and proper navigation

## 🔒 Security

- Row Level Security (RLS) enabled
- Admin-only access to management functions
- Secure image uploads
- No sensitive data in client-side code

## 📈 Analytics Ready

The blog system is ready for:
- Google Analytics
- Google Search Console
- Social media analytics
- Performance monitoring

## 🎨 Customization

All components are fully customizable:
- Styling via Tailwind CSS
- Component structure in `/src/components/`
- SEO settings in `/src/lib/seo-utils.ts`
- Blog utilities in `/src/lib/blog-utils.ts`

## 🆘 Troubleshooting

### Common Issues
1. **Images not uploading**: Check Supabase storage policies
2. **Posts not showing**: Verify RLS policies
3. **SEO not working**: Check environment variables
4. **Build failing**: Ensure all dependencies are installed

### Support
- Check browser console for errors
- Verify Supabase connection
- Test admin authentication
- Check Vercel deployment logs
