
import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CallToActionSection from '@/components/home/CallToActionSection';

const Home = () => {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CallToActionSection />
    </div>
  );
};

export default Home;
