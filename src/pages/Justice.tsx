
import React from 'react';
import Navigation from '../components/Navigation';
import WisdomCard from '../components/WisdomCard';

const Justice = () => {
  const wisdomQuotes = [
    {
      title: "The Path of Justice",
      quote: "Justice isn't just law. It's doing what's right when nobody's watching. Start by being disciplined with yourself.",
      category: "Daily Discipline",
      icon: "⚖️"
    },
    {
      title: "Facing Fear",
      quote: "Fear is real. So is courage. The difference is what you choose to feed. Face your fears head-on, every single day.",
      category: "Mental Strength",
      icon: "🦇"
    },
    {
      title: "Preparation",
      quote: "I don't rely on luck. I rely on preparation. Plan for every scenario, then execute with precision.",
      category: "Strategic Thinking",
      icon: "🎯"
    },
    {
      title: "Integrity",
      quote: "Your word is your bond. Make promises you can keep, and keep every promise you make.",
      category: "Character",
      icon: "🛡️"
    }
  ];

  return (
    <div className="min-h-screen bg-gotham-black">
      <Navigation />
      
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="font-batman font-black text-4xl md:text-6xl text-bat-yellow mb-4">
              JUSTICE PROTOCOLS
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              "The training is nothing. The will is everything. The will to act."
            </p>
          </div>

          {/* Wisdom Cards Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {wisdomQuotes.map((wisdom, index) => (
              <WisdomCard
                key={index}
                title={wisdom.title}
                quote={wisdom.quote}
                category={wisdom.category}
                icon={wisdom.icon}
              />
            ))}
          </div>

          {/* Daily Challenge Section */}
          <div className="gotham-card p-8 rounded-lg text-center">
            <h2 className="font-batman font-bold text-2xl text-bat-yellow mb-4">
              TODAY'S JUSTICE CHALLENGE
            </h2>
            <p className="text-lg text-gray-300 mb-6">
              "Stand up for someone who cannot stand up for themselves. 
              Justice begins with the smallest acts of courage."
            </p>
            <button className="batman-button px-8 py-3 rounded-full font-batman font-bold text-gotham-black uppercase tracking-wide">
              Accept Challenge
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Justice;
