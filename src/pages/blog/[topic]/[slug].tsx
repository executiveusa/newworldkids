
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/useLanguage';
import { getFirebaseData } from '@/integrations/firebase/client';
import { useQuery } from '@tanstack/react-query';
import LanguageToggle from '@/components/blog/LanguageToggle';
import { format } from 'date-fns';

// Define type for blog post
interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  topic: string;
  content?: string;
  createdAt?: {
    seconds: number;
    nanoseconds: number;
  };
  author?: string;
}

const BlogPostDetail = () => {
  const { topic, slug } = useParams<{ topic: string; slug: string }>();
  const { translations } = useLanguage();
  
  // Fetch this specific blog post
  const { data: post, isLoading, error } = useQuery({
    queryKey: ['blog_post', topic, slug],
    queryFn: async () => {
      const allPosts = await getFirebaseData('blog_posts');
      if (!allPosts) return null;
      
      // Convert object to array and find the specific post
      const posts = Object.entries(allPosts)
        .map(([id, post]) => ({ id, ...post as object } as BlogPost))
        .filter(post => post.topic === topic && post.slug === slug);
      
      return posts.length > 0 ? posts[0] : null;
    }
  });
  
  // Get the category title for the breadcrumb
  const categoryTitle = topic && translations.categories[topic as keyof typeof translations.categories] 
    ? translations.categories[topic as keyof typeof translations.categories].title 
    : topic;
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="glass-effect p-8 rounded-xl">
          <p className="text-white/80">{translations.blogPost.loading}</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="glass-effect p-8 rounded-xl">
          <p className="text-white/80">Error: {(error as Error).message}</p>
        </div>
      </div>
    );
  }
  
  if (!post) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="glass-effect p-8 rounded-xl">
          <h2 className="text-2xl font-bold mb-4 shimmer-effect">{translations.blogPost.notFound}</h2>
          <p className="text-white/80">
            The blog post you're looking for doesn't exist or has been moved.
          </p>
          <Link to={`/blog/${topic}`}>
            <Button variant="outline" className="mt-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {translations.blogPost.backToCategory} {categoryTitle}
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <Link to={`/blog/${topic}`}>
          <Button variant="ghost">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {translations.blogPost.backToCategory} {categoryTitle}
          </Button>
        </Link>
        <LanguageToggle />
      </div>
      
      <article className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 shimmer-effect">
          {post.title}
        </h1>
        
        <div className="flex items-center mb-8 text-white/70">
          {post.createdAt && (
            <div className="flex items-center mr-6">
              <Calendar className="h-4 w-4 mr-2" />
              <span>{translations.blogPost.publishedOn} {format(new Date(post.createdAt.seconds * 1000), 'MMMM d, yyyy')}</span>
            </div>
          )}
          
          {post.author && (
            <div className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              <span>{post.author}</span>
            </div>
          )}
        </div>
        
        <div className="glass-effect p-8 rounded-xl mb-12">
          {post.content ? (
            <div 
              className="prose prose-invert max-w-none" 
              dangerouslySetInnerHTML={{ __html: post.content }} 
            />
          ) : (
            <div className="text-white/80">
              <p className="mb-4">{post.excerpt}</p>
              <p>Full blog content coming soon...</p>
            </div>
          )}
        </div>
      </article>
    </div>
  );
};

export default BlogPostDetail;
