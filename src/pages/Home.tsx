
import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CallToActionSection from '@/components/home/CallToActionSection';
import InteractiveMap from '@/components/InteractiveMap';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Globe2 } from 'lucide-react';

const Home = () => {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      
      <div className="container mx-auto px-4 py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/30 pointer-events-none"></div>
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center mb-3 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
            <Globe2 className="h-5 w-5 mr-2 text-[#F2FF44]" />
            <span className="text-white/80 text-sm font-medium">Global Impact</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 shimmer-effect">
            Explore Our Global Impact Projects
          </h2>
          <p className="text-center text-white/70 mb-8 max-w-2xl mx-auto">
            Interact with our 3D globe to discover where we're making a difference.
            Click on any marker to learn more about our initiatives.
          </p>
        </div>
        
        <InteractiveMap />
        
        <div className="text-center mt-6 text-white/70">
          <p className="text-sm">Rotate the globe and click on markers to explore our impact projects</p>
        </div>
      </div>
      
      <TestimonialsSection />
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Support Our Cause
        </h2>
        <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
          Your donations help us educate the next generation while supporting wildlife conservation efforts.
        </p>
        <Link to="/donate">
          <Button size="lg" className="bg-[#F2FF44] text-black hover:bg-[#E2EF34] text-lg px-8">
            Donate Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
      <CallToActionSection />
    </div>
  );
};

export default Home;
