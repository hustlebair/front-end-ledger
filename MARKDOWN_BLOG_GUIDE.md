# Markdown-Based Blog System

This project has been converted from a database-driven blog system to a markdown-based system for easier content management.

## How It Works

### Blog Post Structure
Each blog post is a markdown file located in `public/content/blog/` with the following structure:

```markdown
---
title: "Your Blog Post Title"
slug: "your-blog-post-slug"
excerpt: "Brief description for SEO and previews"
thumbnail_url: "https://your-image-url.jpg"
featured: true
published: true
author: "Kidera"
published_at: "2024-01-15T10:00:00Z"
created_at: "2024-01-15T10:00:00Z"
updated_at: "2024-01-15T10:00:00Z"
reading_time: 4
meta_title: "SEO Title"
meta_description: "SEO Description"
meta_keywords: ["keyword1", "keyword2", "keyword3"]
---

# Your Blog Post Content

Write your markdown content here...

## Section 1
Your content...

## Section 2
More content...
```

### Front Matter Fields

- **title**: The blog post title
- **slug**: URL-friendly version of the title (used in URLs)
- **excerpt**: Short description shown in previews
- **thumbnail_url**: Image URL for the post thumbnail
- **featured**: Boolean - whether this post is featured
- **published**: Boolean - whether this post is published
- **author**: Author name (defaults to "Kidera")
- **published_at**: ISO date string when published
- **created_at**: ISO date string when created
- **updated_at**: ISO date string when last updated
- **reading_time**: Estimated reading time in minutes
- **meta_title**: SEO title
- **meta_description**: SEO description
- **meta_keywords**: Array of SEO keywords

## Adding New Blog Posts

1. Create a new markdown file in `public/content/blog/`
2. Use the filename format: `your-slug.md`
3. Add the front matter with all required fields
4. Write your content in markdown below the front matter
5. The post will automatically appear on the blog

## Markdown Features Supported

- Headers (# ## ###)
- Bold text (**text**)
- Italic text (*text*)
- Lists (- item)
- Paragraphs (separated by blank lines)
- Line breaks

## File Structure

```
public/
  content/
    blog/
      how-kidera-helps-you-remember-every-moment-instantly.md
      5-tips-capturing-perfect-family-moments.md
      your-new-post.md
```

## Benefits of Markdown System

1. **Version Control**: Blog posts are stored as files, so they can be version controlled with Git
2. **Easy Editing**: Use any text editor or markdown editor
3. **No Database**: No need to manage database connections or migrations
4. **Portable**: Easy to backup, move, or migrate
5. **Developer Friendly**: Developers can easily create and edit content

## Migration from Database

The existing blog posts have been converted from the database to markdown files:
- "How Kidera Helps You Remember Every Moment — Instantly"
- "5 Tips for Capturing Perfect Family Moments"

All existing functionality (blog listing, individual posts, admin dashboard) continues to work with the new markdown system.

## Admin Dashboard

The admin dashboard at `/admin/blog` now shows markdown-based posts. The create/edit/delete functions are currently placeholder implementations that log actions to the console. In a production environment, you would implement file system operations to actually create, update, and delete markdown files.
