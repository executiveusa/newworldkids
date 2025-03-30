
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Leaf, Droplets, Zap, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/useLanguage';
import { getFirebaseData } from '@/integrations/firebase/client';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

// Helper to get the correct icon for each topic
const getTopicIcon = (topic: string) => {
  switch (topic) {
    case 'food':
      return <Leaf className="h-8 w-8 text-[#F2FF44]" />;
    case 'water':
      return <Droplets className="h-8 w-8 text-[#F2FF44]" />;
    case 'energy':
      return <Zap className="h-8 w-8 text-[#F2FF44]" />;
    case 'shelter':
      return <Home className="h-8 w-8 text-[#F2FF44]" />;
    default:
      return <Leaf className="h-8 w-8 text-[#F2FF44]" />;
  }
};

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

const TopicPage = () => {
  const { topic } = useParams<{ topic: string }>();
  const { translations } = useLanguage();
  
  // Fetch blog posts for this topic
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['blog_posts', topic],
    queryFn: async () => {
      const allPosts = await getFirebaseData('blog_posts');
      if (!allPosts) return [];
      
      // Convert object to array and filter by topic - fixed the spread operator issue
      return Object.entries(allPosts)
        .map(([id, post]) => ({ id, ...post as Record<string, unknown> } as BlogPost))
        .filter(post => post.topic === topic);
    }
  });
  
  // Get the correct category translations
  const categoryTitle = topic && translations.categories[topic as keyof typeof translations.categories] 
    ? translations.categories[topic as keyof typeof translations.categories].title 
    : '';
  
  const categoryDescription = topic && translations.categories[topic as keyof typeof translations.categories]
    ? translations.categories[topic as keyof typeof translations.categories].description
    : '';
  
  return (
    <div className="container mx-auto px-4 py-12">
      <Link to="/blog">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Button>
      </Link>
      
      <div className="flex items-center mb-8">
        <div className="bg-[#F2FF44]/10 p-3 rounded-full mr-4">
          {getTopicIcon(topic || '')}
        </div>
        <h1 className="text-4xl md:text-5xl font-bold shimmer-effect">
          {categoryTitle}
        </h1>
      </div>
      
      <p className="text-xl text-white/80 mb-12">
        {categoryDescription}
      </p>
      
      {isLoading ? (
        <div className="glass-effect p-8 rounded-xl mb-12">
          <p className="text-white/80">Loading posts...</p>
        </div>
      ) : error ? (
        <div className="glass-effect p-8 rounded-xl mb-12">
          <p className="text-white/80">Error loading posts: {(error as Error).message}</p>
        </div>
      ) : posts && posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <Link to={`/blog/${topic}/${post.slug}`} key={post.id}>
              <Card className="glass-effect border-0 hover-lift h-full">
                <CardHeader>
                  <CardTitle className="shimmer-effect">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80">{post.excerpt}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="text-[#F2FF44] hover:text-[#F2FF44]/80 p-0">
                    {translations.blogPost.readMore}
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="glass-effect p-8 rounded-xl mb-12">
          <h2 className="text-2xl font-bold mb-4 shimmer-effect">Coming Soon</h2>
          <p className="text-white/80">
            Our team is working on creating detailed content about this topic. Check back soon!
          </p>
        </div>
      )}
    </div>
  );
};

export default TopicPage;
