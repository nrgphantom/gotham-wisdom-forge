
import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import { fetchBatmanWisdom } from '../utils/batmanWisdom';
import { toast } from "sonner";

const AskBatman = () => {
  const [batmanWisdom, setBatmanWisdom] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleAskBatman = async () => {
    setIsLoading(true);
    try {
      const response = await fetchBatmanWisdom("askBatman");
      if (response) {
        setBatmanWisdom(response);
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
      <Navigation />
      
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-batman font-black text-4xl md:text-6xl text-bat-yellow mb-4">
              ASK BATMAN
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              "I'm here to listen. Ask me anything about life, justice, fear, or the path forward."
            </p>
          </div>

          {/* Batman Wisdom Section */}
          <div className="gotham-card rounded-lg overflow-hidden p-8">
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-20 h-20 bg-bat-yellow rounded-full flex items-center justify-center mb-8">
                <span className="text-gotham-black text-4xl">🦇</span>
              </div>
              
              {batmanWisdom ? (
                <div className="text-center animate-fade-in">
                  <blockquote className="text-xl md:text-2xl text-gray-300 italic leading-relaxed mb-10">
                    "{batmanWisdom}"
                  </blockquote>
                </div>
              ) : (
                <p className="text-xl text-center text-gray-400 mb-10">
                  Click below to receive wisdom from the Dark Knight.
                </p>
              )}
              
              <button
                onClick={handleAskBatman}
                disabled={isLoading}
                className="batman-button px-10 py-4 rounded-full font-batman font-bold text-gotham-black text-lg uppercase tracking-wide"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="w-5 h-5 border-2 border-gotham-black border-t-transparent rounded-full animate-spin mr-2"></div>
                    <span>Contacting Batman...</span>
                  </div>
                ) : (
                  "Ask Batman"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AskBatman;
