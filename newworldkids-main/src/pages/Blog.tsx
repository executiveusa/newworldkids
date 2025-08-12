
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Globe, Leaf, Droplets, Zap, Home } from "lucide-react";
import { Link } from "react-router-dom";
import LanguageToggle from "@/components/blog/LanguageToggle";
import { useLanguage } from "@/hooks/useLanguage";
import BlogChatbot from "@/components/blog/BlogChatbot";

const Blog = () => {
  const { language, translations } = useLanguage();
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-4xl md:text-5xl font-bold shimmer-effect">
          {translations.blogTitle}
        </h1>
        <LanguageToggle />
      </div>
      
      <div className="mb-12 glass-effect p-6 rounded-xl">
        <h2 className="text-2xl font-semibold mb-4 shimmer-effect">{translations.whoWeAre.title}</h2>
        <p className="text-lg text-white/80 mb-6">{translations.whoWeAre.description}</p>
        
        <h2 className="text-2xl font-semibold mb-4 shimmer-effect">{translations.whatWeDo.title}</h2>
        <ul className="list-disc list-inside space-y-2 text-white/80 mb-6">
          {translations.whatWeDo.items.map((item, index) => (
            <li key={index} className="text-lg">{item}</li>
          ))}
        </ul>
        
        <h2 className="text-2xl font-semibold mb-4 shimmer-effect">{translations.whyWeDoIt.title}</h2>
        <p className="text-lg text-white/80">{translations.whyWeDoIt.description}</p>
      </div>
      
      <h2 className="text-3xl font-bold mb-6 shimmer-effect">{translations.theBigFour}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <BlogCategoryCard 
          icon={<Leaf className="h-8 w-8 text-[#F2FF44]" />}
          title={translations.categories.food.title}
          description={translations.categories.food.description}
          path="/blog/food"
        />
        <BlogCategoryCard 
          icon={<Droplets className="h-8 w-8 text-[#F2FF44]" />}
          title={translations.categories.water.title}
          description={translations.categories.water.description}
          path="/blog/water"
        />
        <BlogCategoryCard 
          icon={<Zap className="h-8 w-8 text-[#F2FF44]" />}
          title={translations.categories.energy.title}
          description={translations.categories.energy.description}
          path="/blog/energy"
        />
        <BlogCategoryCard 
          icon={<Home className="h-8 w-8 text-[#F2FF44]" />}
          title={translations.categories.shelter.title}
          description={translations.categories.shelter.description}
          path="/blog/shelter"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <Card className="glass-effect border-0">
          <CardHeader>
            <CardTitle className="shimmer-effect">{translations.automation.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2 text-white/80">
              {translations.automation.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
        
        <Card className="glass-effect border-0">
          <CardHeader>
            <CardTitle className="shimmer-effect">{translations.web3Transparency.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/80 mb-4">{translations.web3Transparency.description}</p>
            <Button variant="outline" className="border-[#F2FF44] text-[#F2FF44]">
              {translations.web3Transparency.button}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <div className="fixed bottom-6 right-6 z-50">
        <BlogChatbot />
      </div>
    </div>
  );
};

const BlogCategoryCard = ({ icon, title, description, path }) => (
  <Link to={path}>
    <Card className="glass-effect border-0 h-full hover-lift">
      <CardHeader>
        <div className="mb-4">{icon}</div>
        <CardTitle className="shimmer-effect">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-white/70">{description}</CardDescription>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" className="text-[#F2FF44] hover:text-[#F2FF44]/80 p-0">
          Learn More <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  </Link>
);

export default Blog;
