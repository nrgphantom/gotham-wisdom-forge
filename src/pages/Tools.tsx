import React from 'react';
import Navigation from '../components/Navigation';
import WaveBackground from '../components/WaveBackground';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

const Tools = () => {
  const tools = [
    {
      name: "Terminal",
      description: "Access the Batcomputer's advanced terminal interface",
      image: "/lovable-uploads/fc4495a3-df42-4127-8aca-65cfe0b18a2d.png",
      url: "https://batterminal.vercel.app",
      category: "Development"
    },
    {
      name: "WayneProtocol",
      description: "Advanced Wayne Enterprises protocol system",
      image: "/lovable-uploads/59745761-3ed3-48e6-9f1c-8e70d3421637.png",
      url: "https://wayneprotocol.vercel.app",
      category: "Protocol"
    },
    {
      name: "0xCineZed",
      description: "Decentralized cinema and entertainment platform",
      image: "/lovable-uploads/222f5f7d-9efb-4462-a321-9cbf5b27916c.png",
      url: "https://cinezed.vercel.app",
      category: "Entertainment"
    },
    {
      name: "EulerFlow",
      description: "Precision futures trading calculator for every position",
      image: "/lovable-uploads/73be7392-13ed-4a8c-9635-13591e7fc4e4.png",
      url: "https://eulerflow.vercel.app",
      category: "Trading"
    }
  ];

  return (
    <div className="min-h-screen bg-gotham-black">
      <WaveBackground />
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
                <Card className="gotham-card h-full transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-bat-yellow/20 overflow-hidden">
                  {/* Full Image Display */}
                  <div className="w-full h-auto overflow-hidden">
                    <img 
                      src={tool.image} 
                      alt={tool.name}
                      className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-bat-yellow font-batman group-hover:text-white transition-colors">
                          {tool.name}
                        </CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 group-hover:text-gray-200 transition-colors mb-4">
                      {tool.description}
                    </p>
                    <div className="flex items-center text-bat-yellow group-hover:text-white transition-colors">
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
