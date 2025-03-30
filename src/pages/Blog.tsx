
import React from 'react';
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar, User, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";

// Sample blog posts data
const blogPosts = [
  {
    id: 1,
    title: "Introduction to Web3 for Kids",
    excerpt: "Learn how blockchain technology can be taught to children in an engaging and educational way.",
    date: "May 15, 2024",
    author: "Sarah Johnson",
    category: "Education",
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
  },
  {
    id: 2,
    title: "The Future of Blockchain in Educational Systems",
    excerpt: "Exploring how distributed ledger technology is transforming education for the next generation.",
    date: "May 10, 2024",
    author: "Michael Chen",
    category: "Technology",
    imageUrl: "https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80"
  },
  {
    id: 3,
    title: "How NFTs Can Inspire Creativity in Children",
    excerpt: "Discover how non-fungible tokens are opening new creative avenues for kids in digital art.",
    date: "May 5, 2024",
    author: "Emma Davis",
    category: "Art & Creativity",
    imageUrl: "https://images.unsplash.com/photo-1636632520256-7d19511cd71d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
  },
  {
    id: 4,
    title: "Building Digital Literacy Through Blockchain Games",
    excerpt: "How gamified blockchain experiences can teach children important digital skills.",
    date: "April 28, 2024",
    author: "David Park",
    category: "Gaming",
    imageUrl: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80"
  }
];

const Blog = () => {
  return (
    <div className="min-h-screen bg-background py-20 px-4">
      <div className="max-w-7xl mx-auto pt-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6 font-archivo brand-gradient">
            <span className="shimmer-effect">Our Blog</span>
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Insights, stories, and updates from the New World Kids community
          </p>
          <Separator className="my-8 bg-white/10 max-w-md mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="glass-effect border-0 overflow-hidden hover-lift group cursor-pointer">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={post.imageUrl} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-brand-DEFAULT text-white">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 font-archivo">
                  {post.title}
                </h3>
                <p className="text-white/70 mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center text-white/60 text-sm">
                  <div className="flex items-center mr-4">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    <span>{post.author}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button className="bg-[#F2FF44] text-black hover:bg-[#E2EF34] px-8 py-6 font-archivo font-bold">
            View More Articles
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Blog;
