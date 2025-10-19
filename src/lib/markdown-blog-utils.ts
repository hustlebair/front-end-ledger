import { BlogPost } from './seo-utils';

// Front matter interface
interface FrontMatter {
  title: string;
  slug: string;
  excerpt?: string;
  thumbnail_url?: string;
  featured?: boolean;
  published?: boolean;
  author?: string;
  published_at?: string;
  created_at?: string;
  updated_at?: string;
  reading_time?: number;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string[];
}

// Parse front matter from markdown content
function parseFrontMatter(content: string): { frontMatter: FrontMatter; markdownContent: string } {
  // Try multiple regex patterns to handle different line endings
  const patterns = [
    /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/,
    /^---\n([\s\S]*?)\n---\n([\s\S]*)$/,
    /^---\r\n([\s\S]*?)\r\n---\r\n([\s\S]*)$/
  ];
  
  let match = null;
  for (const pattern of patterns) {
    match = content.match(pattern);
    if (match) break;
  }
  
  if (!match) {
    console.error('No front matter found. Content preview:', content.substring(0, 200));
    console.error('Content ends with:', content.substring(content.length - 200));
    throw new Error('No front matter found in markdown file');
  }
  
  const frontMatterText = match[1];
  const markdownContent = match[2];
  
  // Parse YAML-like front matter
  const frontMatter: Partial<FrontMatter> = {};
  const lines = frontMatterText.split(/\r?\n/);
  console.log('Front matter text:', frontMatterText.substring(0, 200));
  console.log('Number of lines:', lines.length);
  
  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;
    
    const key = line.substring(0, colonIndex).trim();
    let value = line.substring(colonIndex + 1).trim();
    
    // Remove quotes if present
    if ((value.startsWith('"') && value.endsWith('"')) || 
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    
    // Parse boolean values
    if (value === 'true') {
      (frontMatter as any)[key] = true;
    } else if (value === 'false') {
      (frontMatter as any)[key] = false;
    } else if (value.startsWith('[') && value.endsWith(']')) {
      // Parse array values
      const arrayContent = value.slice(1, -1);
      (frontMatter as any)[key] = arrayContent.split(',').map(item => item.trim().replace(/['"]/g, ''));
    } else {
      (frontMatter as any)[key] = value;
    }
  }
  
  return { frontMatter: frontMatter as FrontMatter, markdownContent };
}

// Convert markdown to HTML (simple implementation)
function markdownToHtml(markdown: string): string {
  return markdown
    // Headers
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Lists
    .replace(/^- (.*$)/gim, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
    // Paragraphs
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>')
    .replace(/^/, '<p>')
    .replace(/$/, '</p>')
    // Clean up nested lists
    .replace(/<\/li><br><li>/g, '</li><li>')
    .replace(/<ul><li>/g, '<ul><li>')
    .replace(/<\/li><\/ul>/g, '</li></ul>');
}

// Load a single blog post from markdown file
export async function loadMarkdownBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    console.log(`Loading markdown blog post: ${slug}`);
    const response = await fetch(`/content/blog/${slug}.md`);
    
    if (!response.ok) {
      console.error(`Failed to load markdown file: ${response.status}`);
      return null;
    }
    
    const content = await response.text();
    console.log(`Loaded content length: ${content.length}`);
    console.log('Content starts with:', content.substring(0, 100));
    console.log('Content has --- at start:', content.startsWith('---'));
    console.log('Content has --- at end:', content.includes('\n---\n'));
    
    const { frontMatter, markdownContent } = parseFrontMatter(content);
    console.log('Parsed front matter:', frontMatter);
    
    // Convert to BlogPost format
    const blogPost: BlogPost = {
      id: slug, // Use slug as ID for markdown posts
      title: frontMatter.title,
      slug: frontMatter.slug,
      excerpt: frontMatter.excerpt || '',
      content: markdownToHtml(markdownContent),
      thumbnail_url: frontMatter.thumbnail_url || null,
      featured: frontMatter.featured || false,
      published: frontMatter.published || false,
      author: frontMatter.author || 'Kidera',
      published_at: frontMatter.published_at || null,
      created_at: frontMatter.created_at || new Date().toISOString(),
      updated_at: frontMatter.updated_at || new Date().toISOString(),
      reading_time: frontMatter.reading_time || 3,
      meta_title: frontMatter.meta_title || frontMatter.title,
      meta_description: frontMatter.meta_description || frontMatter.excerpt || '',
      meta_keywords: frontMatter.meta_keywords || []
    };
    
    return blogPost;
  } catch (error) {
    console.error('Error loading markdown blog post:', error);
    return null;
  }
}

// Load all blog posts from markdown files
export async function loadAllMarkdownBlogPosts(): Promise<BlogPost[]> {
  try {
    console.log('Loading all markdown blog posts...');
    // In a real implementation, you'd get a list of markdown files from your file system
    // For now, we'll hardcode the known posts
    const slugs = [
      'how-kidera-helps-you-remember-every-moment-instantly',
      '5-tips-capturing-perfect-family-moments'
    ];
    
    const posts = await Promise.allSettled(
      slugs.map(slug => loadMarkdownBlogPost(slug))
    );
    
    // Extract successful results and log failures
    const successfulPosts = posts
      .map((result, index) => {
        if (result.status === 'fulfilled') {
          return result.value;
        } else {
          console.error(`Failed to load post ${slugs[index]}:`, result.reason);
          return null;
        }
      })
      .filter((post): post is BlogPost => post !== null);
    
    console.log(`Loaded ${successfulPosts.length} posts successfully`);
    
    // Sort by published_at
    const validPosts = successfulPosts.sort((a, b) => {
      const dateA = new Date(a.published_at || a.created_at);
      const dateB = new Date(b.published_at || b.created_at);
      return dateB.getTime() - dateA.getTime();
    });
    
    console.log(`Returning ${validPosts.length} valid posts:`, validPosts.map(p => p.title));
    return validPosts;
  } catch (error) {
    console.error('Error loading markdown blog posts:', error);
    return [];
  }
}

// Load published blog posts only
export async function loadPublishedMarkdownBlogPosts(): Promise<BlogPost[]> {
  const allPosts = await loadAllMarkdownBlogPosts();
  return allPosts.filter(post => post.published);
}
