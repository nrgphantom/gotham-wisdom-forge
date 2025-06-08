
import React from 'react';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import FeaturesGrid from '../components/FeaturesGrid';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gotham-black">
      <Navigation />
      <HeroSection />
      <FeaturesGrid />
      <Footer />
    </div>
  );
};

export default Index;
