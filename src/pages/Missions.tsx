
import React, { useState } from 'react';
import Navigation from '../components/Navigation';

const Missions = () => {
  const [completedMissions, setCompletedMissions] = useState<Set<number>>(new Set());

  const dailyMissions = [
    {
      id: 1,
      title: "Dawn Patrol",
      description: "Wake up at 5 AM and start your day with intention",
      difficulty: "Rookie",
      icon: "🌅"
    },
    {
      id: 2,
      title: "Physical Training",
      description: "Complete 30 minutes of physical exercise",
      difficulty: "Standard",
      icon: "💪"
    },
    {
      id: 3,
      title: "Knowledge Acquisition",
      description: "Read for 20 minutes or learn something new",
      difficulty: "Standard",
      icon: "📖"
    },
    {
      id: 4,
      title: "Act of Justice",
      description: "Help someone who needs assistance today",
      difficulty: "Advanced",
      icon: "⚖️"
    },
    {
      id: 5,
      title: "Digital Detox",
      description: "Spend 1 hour without any devices or social media",
      difficulty: "Advanced",
      icon: "📱"
    }
  ];

  const weeklyMissions = [
    {
      id: 6,
      title: "Master Planner",
      description: "Plan your entire week every Sunday",
      difficulty: "Elite",
      icon: "📋"
    },
    {
      id: 7,
      title: "Financial Discipline",
      description: "Track every expense for 7 days",
      difficulty: "Elite",
      icon: "💰"
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Rookie': return 'text-green-400';
      case 'Standard': return 'text-bat-yellow';
      case 'Advanced': return 'text-orange-400';
      case 'Elite': return 'text-bat-crimson';
      default: return 'text-gray-400';
    }
  };

  const totalCompleted = completedMissions.size;

  return (
    <div className="min-h-screen bg-gotham-black">
      <Navigation />
      
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-batman font-black text-4xl md:text-6xl text-bat-yellow mb-4">
              GOTHAM MISSIONS
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              "Every day is a choice. Choose to be better than yesterday."
            </p>
          </div>

          {/* Stats Dashboard - Only showing Missions Completed */}
          <div className="flex justify-center mb-12">
            <div className="gotham-card p-6 rounded-lg text-center w-full max-w-xs">
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="font-batman font-bold text-bat-yellow text-lg">Missions Completed</h3>
              <p className="text-2xl text-white font-bold">{totalCompleted}</p>
            </div>
          </div>

          {/* Daily Missions */}
          <div className="mb-12">
            <h2 className="font-batman font-bold text-2xl text-bat-yellow mb-6">
              DAILY MISSIONS
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dailyMissions.map((mission) => (
                <div key={mission.id} className="gotham-card p-6 rounded-lg transition-all duration-300">
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
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Missions */}
          <div>
            <h2 className="font-batman font-bold text-2xl text-bat-yellow mb-6">
              WEEKLY MISSIONS
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {weeklyMissions.map((mission) => (
                <div key={mission.id} className="gotham-card p-6 rounded-lg transition-all duration-300">
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
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Missions;
