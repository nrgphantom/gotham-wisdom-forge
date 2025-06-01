
import React, { useState } from 'react';
import Navigation from '../components/Navigation';

const Missions = () => {
  const [completedMissions, setCompletedMissions] = useState<Set<number>>(new Set());

  const dailyMissions = [
    {
      id: 1,
      title: "Dawn Warrior",
      description: "Rise at 5 AM and conquer the morning with purpose and intention—before the world wakes up",
      difficulty: "Rookie",
      icon: "🌅"
    },
    {
      id: 2,
      title: "Physical Dominance",
      description: "Complete 45 minutes of intense physical training—push your body beyond yesterday's limits",
      difficulty: "Standard",
      icon: "💪"
    },
    {
      id: 3,
      title: "Knowledge Weaponization",
      description: "Read for 30 minutes or master a new skill that makes you more dangerous in your field",
      difficulty: "Standard",
      icon: "📖"
    },
    {
      id: 4,
      title: "Justice in Action",
      description: "Perform one meaningful act of service—help someone who cannot help themselves today",
      difficulty: "Advanced",
      icon: "⚖️"
    },
    {
      id: 5,
      title: "Digital Detox Protocol",
      description: "Spend 2 hours completely disconnected from all devices—reconnect with reality and yourself",
      difficulty: "Advanced",
      icon: "📱"
    },
    {
      id: 6,
      title: "Mental Clarity Session",
      description: "Complete 15 minutes of focused meditation or deep reflection—sharpen your mental blade",
      difficulty: "Standard",
      icon: "🧘"
    },
    {
      id: 7,
      title: "Nutrition Excellence",
      description: "Eat only whole, unprocessed foods today—fuel your body like the high-performance machine it is",
      difficulty: "Advanced",
      icon: "🥗"
    },
    {
      id: 8,
      title: "Social Connection",
      description: "Have a meaningful conversation with someone important to you—relationships are your true wealth",
      difficulty: "Rookie",
      icon: "💬"
    }
  ];

  const weeklyMissions = [
    {
      id: 9,
      title: "Strategic Planning Mastery",
      description: "Plan your entire week every Sunday—preparation separates winners from everyone else",
      difficulty: "Elite",
      icon: "📋"
    },
    {
      id: 10,
      title: "Financial Intelligence",
      description: "Track every expense and review your financial position—knowledge is power, ignorance is expensive",
      difficulty: "Elite",
      icon: "💰"
    },
    {
      id: 11,
      title: "Skill Development Protocol",
      description: "Dedicate 1 hour daily to improving one specific professional skill—compound learning creates legends",
      difficulty: "Elite",
      icon: "🎯"
    },
    {
      id: 12,
      title: "Community Impact Mission",
      description: "Volunteer for a cause larger than yourself—true heroes serve something greater than their own interests",
      difficulty: "Elite",
      icon: "🤝"
    },
    {
      id: 13,
      title: "Network Expansion",
      description: "Connect with 3 new people in your field this week—your network determines your net worth",
      difficulty: "Elite",
      icon: "🌐"
    },
    {
      id: 14,
      title: "Creative Expression",
      description: "Spend time on creative pursuits—writing, art, music—creativity solves problems logic cannot touch",
      difficulty: "Elite",
      icon: "🎨"
    }
  ];

  const monthlyMissions = [
    {
      id: 15,
      title: "Physical Transformation",
      description: "Complete a 30-day fitness challenge—your body is capable of more than your mind believes",
      difficulty: "Legendary",
      icon: "🏆"
    },
    {
      id: 16,
      title: "Fear Elimination Protocol",
      description: "Do something that genuinely scares you—courage is not the absence of fear, but action despite it",
      difficulty: "Legendary",
      icon: "🦇"
    },
    {
      id: 17,
      title: "Relationship Investment",
      description: "Strengthen your most important relationships through consistent, meaningful actions",
      difficulty: "Legendary",
      icon: "❤️"
    },
    {
      id: 18,
      title: "Financial Fortress Building",
      description: "Increase your savings rate by 5% and optimize one investment strategy",
      difficulty: "Legendary",
      icon: "🏰"
    }
  ];

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
              "Excellence isn't an act, but a habit. These missions will forge you into the person Gotham—and the world—needs."
            </p>
          </div>

          {/* Stats Dashboard */}
          <div className="flex justify-center mb-12">
            <div className="gotham-card p-6 rounded-lg text-center w-full max-w-xs">
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="font-batman font-bold text-bat-yellow text-lg">Missions Completed</h3>
              <p className="text-2xl text-white font-bold">{totalCompleted}</p>
              <p className="text-gray-400 text-sm mt-2">Progress builds legends</p>
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
                    "Daily excellence creates lifetime legends"
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Missions */}
          <div className="mb-12">
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
                    "Weekly consistency builds monthly momentum"
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly Missions */}
          <div className="mb-12">
            <h2 className="font-batman font-bold text-2xl text-bat-yellow mb-6">
              MONTHLY MISSIONS
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {monthlyMissions.map((mission) => (
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
                    "Monthly transformations create yearly revolutions"
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Motivational Footer */}
          <div className="text-center mt-16">
            <div className="gotham-card p-8 rounded-lg">
              <h3 className="font-batman font-bold text-xl text-bat-yellow mb-4">
                THE MISSION PROTOCOL
              </h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                "These aren't just tasks—they're the building blocks of an extraordinary life. Each mission completed 
                makes you stronger, wiser, and more prepared for whatever challenges await. The world needs heroes, 
                and heroes are forged through consistent, deliberate action."
              </p>
              <p className="text-bat-yellow font-batman font-bold">
                "Excellence is not a destination. It's a way of traveling."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Missions;
