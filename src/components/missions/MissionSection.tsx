
import React from 'react';
import MissionCard from './MissionCard';

interface Mission {
  id: number;
  title: string;
  description: string;
  difficulty: string;
  icon: string;
}

interface MissionSectionProps {
  title: string;
  missions: Mission[];
  inspirationalText: string;
  gridCols?: string;
}

const MissionSection = ({ title, missions, inspirationalText, gridCols = "md:grid-cols-2 lg:grid-cols-3" }: MissionSectionProps) => {
  return (
    <div className="mb-16">
      <h2 className="font-batman font-bold text-2xl text-bat-yellow mb-6">
        {title}
      </h2>
      <div className={`grid ${gridCols} gap-6`}>
        {missions.map((mission) => (
          <MissionCard 
            key={mission.id} 
            mission={mission} 
            inspirationalText={inspirationalText}
          />
        ))}
      </div>
    </div>
  );
};

export default MissionSection;
