
import React, { useState } from 'react';
import Navigation from '../components/Navigation';

const Missions = () => {
  const [completedMissions, setCompletedMissions] = useState<Set<number>>(new Set());

  const dailyMissions = [
    {
      id: 1,
      title: "Dawn Patrol",
      description: "Wake up at 5 AM and start your day with intention and purpose",
      difficulty: "Rookie",
      icon: "🌅"
    },
    {
      id: 2,
      title: "Physical Training",
      description: "Complete 30 minutes of physical exercise - push your limits",
      difficulty: "Standard",
      icon: "💪"
    },
    {
      id: 3,
      title: "Knowledge Acquisition",
      description: "Read for 20 minutes or learn something new that expands your mind",
      difficulty: "Standard",
      icon: "📖"
    },
    {
      id: 4,
      title: "Act of Justice",
      description: "Help someone who needs assistance today - be someone's hero",
      difficulty: "Advanced",
      icon: "⚖️"
    },
    {
      id: 5,
      title: "Digital Detox",
      description: "Spend 1 hour without any devices or social media - reconnect with reality",
      difficulty: "Advanced",
      icon: "📱"
    },
    {
      id: 6,
      title: "Mindful Reflection",
      description: "Spend 10 minutes in meditation or quiet reflection",
      difficulty: "Standard",
      icon: "🧘"
    }
  ];

  const weeklyMissions = [
    {
      id: 7,
      title: "Master Planner",
      description: "Plan your entire week every Sunday - preparation is power",
      difficulty: "Elite",
      icon: "📋"
    },
    {
      id: 8,
      title: "Financial Discipline",
      description: "Track every expense for 7 days - know where your money goes",
      difficulty: "Elite",
      icon: "💰"
    },
    {
      id: 9,
      title: "Skill Development",
      description: "Dedicate time each day this week to improving one specific skill",
      difficulty: "Elite",
      icon: "🎯"
    },
    {
      id: 10,
      title: "Community Service",
      description: "Volunteer for a cause you believe in - make a difference",
      difficulty: "Elite",
      icon: "🤝"
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
              "Every day is a choice. Choose to be better than yesterday. These missions will forge you into the hero Gotham needs."
            </p>
          </div>

          {/* Stats Dashboard */}
          <div className="flex justify-center mb-12">
            <div className="gotham-card p-6 rounded-lg text-center w-full max-w-xs">
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="font-batman font-bold text-bat-yellow text-lg">Missions Completed</h3>
              <p className="text-2xl text-white font-bold">{totalCompleted}</p>
              <p className="text-gray-400 text-sm mt-2">Progress builds character</p>
            </div>
          </div>

          {/* Daily Missions */}
          <div className="mb-12">
            <h2 className="font-batman font-bold text-2xl text-bat-yellow mb-6">
              DAILY MISSIONS
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dailyMissions.map((mission) => (
                <div key={mission.id} className="gotham-card p-6 rounded-lg transition-all duration-300 hover:transform hover:scale-105">
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
                    "Small actions, big results"
                  </div>
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
                <div key={mission.id} className="gotham-card p-6 rounded-lg transition-all duration-300 hover:transform hover:scale-105">
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
                    "Consistency builds legends"
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Motivational Footer */}
          <div className="text-center mt-16">
            <div className="gotham-card p-8 rounded-lg">
              <h3 className="font-batman font-bold text-xl text-bat-yellow mb-4">
                MISSION PROTOCOL
              </h3>
              <p className="text-gray-300 leading-relaxed">
                "These missions aren't just tasks—they're training for life. Each one completed makes you stronger, 
                wiser, and more prepared for whatever challenges await. Gotham needs heroes, and heroes are made 
                through consistent action."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Missions;
