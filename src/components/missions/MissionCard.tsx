
import React from 'react';

interface Mission {
  id: number;
  title: string;
  description: string;
  difficulty: string;
  icon: string;
}

interface MissionCardProps {
  mission: Mission;
  inspirationalText: string;
}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Rookie': return 'text-green-400';
    case 'Standard': return 'text-bat-yellow';
    case 'Advanced': return 'text-orange-400';
    case 'Elite': return 'text-bat-crimson';
    case 'Legendary': return 'text-purple-400';
    default: return 'text-gray-400';
  }
};

const MissionCard = ({ mission, inspirationalText }: MissionCardProps) => {
  return (
    <div className="gotham-card p-6 rounded-lg transition-all duration-300 hover:transform hover:scale-105">
      <div className="flex justify-between items-start mb-4">
        <div className="text-3xl">{mission.icon}</div>
        <span className={`text-xs font-batman font-bold px-2 py-1 rounded ${getDifficultyColor(mission.difficulty)}`}>
          {mission.difficulty}
        </span>
      </div>
      <h3 className="font-batman font-bold text-white text-lg mb-2">
        {mission.title}
      </h3>
      <p className="text-gray-400 text-sm mb-4 leading-relaxed">
        {mission.description}
      </p>
      <div className="text-xs text-gray-500 italic">
        "{inspirationalText}"
      </div>
    </div>
  );
};

export default MissionCard;
