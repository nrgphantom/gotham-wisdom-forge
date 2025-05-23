
import React from 'react';

interface WisdomCardProps {
  title: string;
  quote: string;
  category: string;
  icon?: string;
}

const WisdomCard: React.FC<WisdomCardProps> = ({ title, quote, category, icon = "🦇" }) => {
  return (
    <div className="gotham-card p-6 rounded-lg hover:transform hover:scale-105 transition-all duration-300 animate-fade-in-up">
      <div className="flex items-center mb-4">
        <span className="text-2xl mr-3">{icon}</span>
        <div>
          <h3 className="font-batman font-bold text-bat-yellow text-lg">{title}</h3>
          <p className="text-gray-400 text-sm uppercase tracking-wide">{category}</p>
        </div>
      </div>
      <blockquote className="text-gray-300 italic leading-relaxed">
        "{quote}"
      </blockquote>
    </div>
  );
};

export default WisdomCard;
