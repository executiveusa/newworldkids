
import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CallToActionSection from '@/components/home/CallToActionSection';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
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
