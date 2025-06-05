
import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import MotionGraphics from '../components/MotionGraphics';
import { toast } from "sonner";

const AskBatman = () => {
  const [batmanWisdom, setBatmanWisdom] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleAskBatman = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://api.adviceslip.com/advice');
      const data = await response.json();
      
      if (data && data.slip && data.slip.advice) {
        setBatmanWisdom(data.slip.advice);
      } else {
        toast.error("Batman is currently unavailable. Try again later.");
      }
    } catch (error) {
      console.error("Error fetching Batman wisdom:", error);
      toast.error("Failed to communicate with the Batcave. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gotham-black">
      <MotionGraphics theme="batman" />
      <Navigation />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-bat-yellow blur-lg opacity-20 rounded-full"></div>
              <h1 className="relative font-batman font-black text-4xl md:text-6xl text-bat-yellow">
                ASK BATMAN
              </h1>
            </div>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              "In the darkness, wisdom emerges. Seek guidance from the shadows."
            </p>
          </div>

          {/* Main Content Card */}
          <div className="gotham-card rounded-lg overflow-hidden p-6 md:p-8 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
            <div className="flex flex-col items-center justify-center">
              {/* Batman Symbol */}
              <div className="relative mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-bat-yellow to-amber-400 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-gotham-black text-5xl animate-pulse">🦇</span>
                </div>
                <div className="absolute inset-0 bg-bat-yellow rounded-full opacity-20 animate-ping"></div>
              </div>
              
              {/* Wisdom Display */}
              {batmanWisdom ? (
                <div className="text-center animate-fade-in-up mb-8">
                  <div className="relative">
                    <div className="absolute -top-4 -left-4 text-6xl text-bat-yellow opacity-30">"</div>
                    <blockquote className="text-xl md:text-2xl text-gray-200 italic leading-relaxed px-8">
                      {batmanWisdom}
                    </blockquote>
                    <div className="absolute -bottom-4 -right-4 text-6xl text-bat-yellow opacity-30">"</div>
                  </div>
                  <div className="mt-6 text-bat-yellow font-batman font-bold text-sm tracking-widest">
                    — THE DARK KNIGHT
                  </div>
                </div>
              ) : (
                <div className="text-center mb-8">
                  <p className="text-xl text-gray-400 mb-4">
                    The Dark Knight awaits your question...
                  </p>
                  <div className="w-32 h-1 bg-gradient-to-r from-transparent via-bat-yellow to-transparent mx-auto"></div>
                </div>
              )}
              
              {/* Action Button */}
              <button
                onClick={handleAskBatman}
                disabled={isLoading}
                className="group relative batman-button px-8 py-4 rounded-full font-batman font-bold text-gotham-black text-lg uppercase tracking-wide transform transition-all duration-300 hover:scale-105 disabled:scale-100 disabled:opacity-70"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="w-5 h-5 border-2 border-gotham-black border-t-transparent rounded-full animate-spin mr-3"></div>
                    <span>Consulting Oracle...</span>
                  </div>
                ) : (
                  <>
                    <span className="relative z-10">Seek Wisdom</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-bat-yellow to-amber-400 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  </>
                )}
              </button>

              {/* Decorative Elements */}
              <div className="mt-8 flex space-x-2">
                <div className="w-2 h-2 bg-bat-yellow rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-bat-yellow rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-bat-yellow rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>

          {/* Footer Quote */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-500 italic">
              "It's not who I am underneath, but what I do that defines me."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AskBatman;
