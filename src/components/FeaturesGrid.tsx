
import React from 'react';
import { Link } from 'react-router-dom';

const FeaturesGrid = () => {
  const features = [
    {
      title: "Justice Protocols",
      description: "Life guidance from Gotham's protector",
      icon: "⚖️",
      path: "/justice",
      color: "from-bat-yellow/20 to-bat-yellow/5"
    },
    {
      title: "Gotham Finance",
      description: "Strategic wealth management wisdom",
      icon: "💰",
      path: "/finance",
      color: "from-green-500/20 to-green-500/5"
    },
    {
      title: "Bat-Health Protocol",
      description: "Physical and mental conditioning",
      icon: "💪",
      path: "/health",
      color: "from-blue-500/20 to-blue-500/5"
    },
    {
      title: "Ask Batman",
      description: "Direct counsel from the Dark Knight",
      icon: "🦇",
      path: "/askbatman",
      color: "from-bat-crimson/20 to-bat-crimson/5"
    }
  ];

  return (
    <section className="py-20 bg-gotham-dark">
      <div className="container mx-auto px-6">
        <h2 className="font-batman font-bold text-3xl md:text-4xl text-center text-bat-yellow mb-4">
          PROTOCOLS
        </h2>
        <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
          Four pillars of wisdom to guide you through life's challenges
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Link 
              key={index}
              to={feature.path}
              className="group"
            >
              <div className={`gotham-card p-6 rounded-lg h-full hover:transform hover:scale-105 transition-all duration-300 bg-gradient-to-br ${feature.color}`}>
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="font-batman font-bold text-xl text-bat-yellow mb-3 group-hover:text-white transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                  {feature.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
