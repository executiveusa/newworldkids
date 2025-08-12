
import React from 'react';
import { ArrowLeft, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';

const Food = () => {
  const { translations } = useLanguage();
  
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
          <Leaf className="h-8 w-8 text-[#F2FF44]" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold shimmer-effect">
          {translations.categories.food.title}
        </h1>
      </div>
      
      <p className="text-xl text-white/80 mb-12">
        {translations.categories.food.description}
      </p>
      
      <div className="glass-effect p-8 rounded-xl mb-12">
        <h2 className="text-2xl font-bold mb-4 shimmer-effect">Coming Soon</h2>
        <p className="text-white/80">
          Our team is working on creating detailed content about regenerative agriculture, 
          heirloom seed banking, hydroponics, and vertical gardens. Check back soon!
        </p>
      </div>
    </div>
  );
};

export default Food;
