
import React from 'react';
import Navigation from '../components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

const Tools = () => {
  const tools = [
    {
      name: "Terminal",
      description: "Access the Batcomputer's advanced terminal interface",
      icon: "💻",
      url: "https://batterminal.vercel.app",
      category: "Development"
    },
    {
      name: "Market Scanner",
      description: "Real-time cryptocurrency and stock market analysis",
      icon: "📊",
      url: "#",
      category: "Finance"
    },
    {
      name: "Health Monitor",
      description: "Track global health metrics and personal wellness",
      icon: "🏥",
      url: "#",
      category: "Health"
    },
    {
      name: "Justice Analytics",
      description: "Crime pattern analysis and prediction tools",
      icon: "⚖️",
      url: "#",
      category: "Justice"
    },
    {
      name: "Wisdom Database",
      description: "Access Batman's complete knowledge repository",
      icon: "🧠",
      url: "#",
      category: "Knowledge"
    },
    {
      name: "Mission Planner",
      description: "Strategic mission planning and execution tools",
      icon: "🎯",
      url: "#",
      category: "Operations"
    }
  ];

  const categories = ["All", "Development", "Finance", "Health", "Justice", "Knowledge", "Operations"];

  return (
    <div className="min-h-screen bg-gotham-black">
      <Navigation />
      
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="font-batman font-black text-4xl md:text-6xl text-bat-yellow mb-4">
              BATCOIN ECOSYSTEM TOOLS
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              "The right tool for every mission. Access the complete arsenal of Gotham's technology."
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                className="px-6 py-2 rounded-full border-2 border-bat-yellow text-bat-yellow hover:bg-bat-yellow hover:text-gotham-black transition-all duration-300 font-batman font-bold text-sm uppercase tracking-wide"
              >
                {category}
              </button>
            ))}
          </div>

          {/* Tools Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool, index) => (
              <a
                key={index}
                href={tool.url}
                target={tool.url.startsWith('http') ? '_blank' : '_self'}
                rel={tool.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group"
              >
                <Card className="gotham-card h-full transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-bat-yellow/20">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                        {tool.icon}
                      </div>
                      <div>
                        <CardTitle className="text-bat-yellow font-batman group-hover:text-white transition-colors">
                          {tool.name}
                        </CardTitle>
                        <span className="text-xs text-gray-500 uppercase tracking-wide">
                          {tool.category}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 group-hover:text-gray-200 transition-colors">
                      {tool.description}
                    </p>
                    <div className="mt-4 flex items-center text-bat-yellow group-hover:text-white transition-colors">
                      <span className="text-sm font-batman font-bold uppercase tracking-wide">
                        Access Tool
                      </span>
                      <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">
                        →
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>

          {/* Coming Soon Section */}
          <div className="mt-20 text-center">
            <h2 className="font-batman font-bold text-2xl text-bat-yellow mb-4">
              MORE TOOLS COMING SOON
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              The Batcoin ecosystem is constantly evolving. New tools and capabilities 
              are being developed to enhance your mission capabilities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tools;
