
import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CallToActionSection from '@/components/home/CallToActionSection';
import InteractiveMap from '@/components/InteractiveMap';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8 shimmer-effect">
          Our Global Impact Projects
        </h2>
        <InteractiveMap />
        <div className="text-center mt-4 text-white/70">
          <p>Click on any pin to explore our impact projects</p>
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
