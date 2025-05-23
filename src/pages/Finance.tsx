
import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import WisdomCard from '../components/WisdomCard';

const Finance = () => {
  const [mode, setMode] = useState<'rookie' | 'wayne'>('rookie');

  const rookieTips = [
    {
      title: "Emergency Fund",
      quote: "Always have an escape route. Keep 6 months of expenses saved. You never know when you'll need to disappear.",
      category: "Safety Net",
      icon: "🛡️"
    },
    {
      title: "Spend Wisely",
      quote: "Don't buy what you don't need. That's how they control you. Every purchase should serve a purpose.",
      category: "Smart Spending",
      icon: "💰"
    },
    {
      title: "Invest Early",
      quote: "Time is your greatest weapon. Start investing young, and let compound interest do the heavy lifting.",
      category: "Long-term Growth",
      icon: "⏰"
    }
  ];

  const wayneTips = [
    {
      title: "Diversification",
      quote: "Never put all your resources in one place. Spread your investments like you spread your operations.",
      category: "Risk Management",
      icon: "🏢"
    },
    {
      title: "Market Psychology",
      quote: "Fear and greed move markets. When others panic, that's when opportunities reveal themselves.",
      category: "Strategic Investment",
      icon: "🧠"
    },
    {
      title: "Passive Income",
      quote: "Build systems that work while you sleep. True wealth comes from assets, not labor.",
      category: "Wealth Building",
      icon: "🏭"
    }
  ];

  const currentTips = mode === 'rookie' ? rookieTips : wayneTips;

  return (
    <div className="min-h-screen bg-gotham-black">
      <Navigation />
      
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="font-batman font-black text-4xl md:text-6xl text-bat-yellow mb-4">
              GOTHAM FINANCE
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              "It's not about the money. It's about sending a message. But money helps."
            </p>
          </div>

          {/* Mode Selector */}
          <div className="flex justify-center mb-12">
            <div className="bg-gotham-gray rounded-full p-1">
              <button
                onClick={() => setMode('rookie')}
                className={`px-6 py-3 rounded-full font-batman font-bold text-sm uppercase tracking-wide transition-all duration-300 ${
                  mode === 'rookie' 
                    ? 'bg-bat-yellow text-gotham-black' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Rookie Mode
              </button>
              <button
                onClick={() => setMode('wayne')}
                className={`px-6 py-3 rounded-full font-batman font-bold text-sm uppercase tracking-wide transition-all duration-300 ${
                  mode === 'wayne' 
                    ? 'bg-bat-yellow text-gotham-black' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Wayne Protocols
              </button>
            </div>
          </div>

          {/* Tips Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {currentTips.map((tip, index) => (
              <WisdomCard
                key={index}
                title={tip.title}
                quote={tip.quote}
                category={tip.category}
                icon={tip.icon}
              />
            ))}
          </div>

          {/* Daily Tip */}
          <div className="gotham-card p-8 rounded-lg text-center">
            <h2 className="font-batman font-bold text-2xl text-bat-yellow mb-4">
              DAILY FINANCIAL WISDOM
            </h2>
            <p className="text-lg text-gray-300 mb-6">
              "A penny saved is a penny earned. But a dollar invested wisely becomes ten dollars in time. 
              Start today, even if it's just spare change."
            </p>
            <div className="flex justify-center space-x-4">
              <button className="batman-button px-6 py-3 rounded-full font-batman font-bold text-gotham-black text-sm uppercase tracking-wide">
                Calculate Savings
              </button>
              <button className="px-6 py-3 rounded-full border border-bat-yellow text-bat-yellow hover:bg-bat-yellow hover:text-gotham-black transition-all duration-300 font-batman font-bold text-sm uppercase tracking-wide">
                Investment Guide
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Finance;
