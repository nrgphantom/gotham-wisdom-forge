
import React from 'react';
import { Link } from 'react-router-dom';
import BatSignal from './BatSignal';
import VideoPlayer from './VideoPlayer';
import SocialLinks from './SocialLinks';

const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <BatSignal />
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="mb-8">
          <div className="w-32 h-32 flex items-center justify-center mx-auto mb-6">
            <img 
              src="/lovable-uploads/bb67fb31-0dc2-4b9e-8027-8461a0dfc6fc.png" 
              alt="Batcoin Logo" 
              className="w-20 h-20 object-contain"
            />
          </div>
          <h1 className="font-batman font-black text-5xl md:text-7xl text-bat-yellow mb-4">
            BATCOIN
          </h1>
          <p className="font-batman text-xl md:text-2xl text-gray-300 mb-2 tracking-wider">
            WISDOM FORGE
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto mb-12">
          <p className="text-xl text-gray-300 leading-relaxed mb-8">
            "Forged in darkness. Built to guide."
          </p>
          <p className="text-gray-400 leading-relaxed">
            Access the wisdom of Gotham's greatest protector. Get guidance on justice, finance, 
            health, and life itself from Batman's proven methodologies.
          </p>
        </div>

        <VideoPlayer />

        {/* BATPAPER Button - Above all others */}
        <div className="flex justify-center mb-8">
          <a 
            href="https://drive.google.com/file/d/1PcFeIn5dJT3p5im3NOcHWsOmALlEBLEh/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            className="batman-button px-8 py-4 rounded-full font-batman font-bold text-gotham-black uppercase tracking-wide"
          >
            BATPAPER
          </a>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link 
            to="/askbatman" 
            className="batman-button px-8 py-4 rounded-full font-batman font-bold text-gotham-black uppercase tracking-wide"
          >
            Consult Batman
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link 
            to="/tools"
            className="px-8 py-4 rounded-full border-2 border-bat-yellow text-bat-yellow hover:bg-bat-yellow hover:text-gotham-black transition-all duration-300 font-batman font-bold uppercase tracking-wide"
          >
            TOOLS
          </Link>
          <Link 
            to="/donate" 
            className="px-8 py-4 rounded-full border-2 border-bat-yellow text-bat-yellow hover:bg-bat-yellow hover:text-gotham-black transition-all duration-300 font-batman font-bold uppercase tracking-wide"
          >
            Donate
          </Link>
        </div>

        {/* Launch Announcement Card */}
        <div className="max-w-md mx-auto mb-8">
          <div className="gotham-card p-6 rounded-lg bg-gradient-to-br from-bat-yellow/20 to-bat-yellow/5 border-2 border-bat-yellow/30 hover:border-bat-yellow/50 hover:bg-gradient-to-br hover:from-bat-yellow/30 hover:to-bat-yellow/10 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-bat-yellow/20">
            <div className="text-center">
              <div className="text-3xl mb-3">🚀</div>
              <h3 className="font-batman font-bold text-xl text-bat-yellow mb-2">
                LAUNCHING SOON
              </h3>
              <p className="text-gray-300 font-semibold mb-1">
                BATCOIN ($BAT)
              </p>
              <p className="text-bat-yellow font-batman font-bold text-lg">
                18 NOV 2025
              </p>
            </div>
          </div>
        </div>

        <SocialLinks />
      </div>
    </section>
  );
};

export default HeroSection;
