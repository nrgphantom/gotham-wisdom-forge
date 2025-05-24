
import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import WisdomCard from '../components/WisdomCard';
import { fetchBatmanWisdom, parseHealthProtocols } from '../utils/batmanWisdom';
import { toast } from "sonner";

const Health = () => {
  const [healthProtocols, setHealthProtocols] = useState<Array<{
    title: string;
    quote: string;
    category: string;
    icon: string;
  }>>([]);
  const [dailyChallenge, setDailyChallenge] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const fetchHealthContent = async () => {
    setLoading(true);
    try {
      // Fetch health protocols
      const protocolsResponse = await fetchBatmanWisdom("healthProtocols");
      const parsedProtocols = parseHealthProtocols(protocolsResponse);
      if (parsedProtocols.length > 0) {
        setHealthProtocols(parsedProtocols);
      }
      
      // Fetch health challenge
      const challengeResponse = await fetchBatmanWisdom("healthChallenge");
      if (challengeResponse) {
        setDailyChallenge(challengeResponse);
      }
    } catch (error) {
      console.error("Error fetching health content:", error);
      toast.error("Failed to communicate with the Batcomputer. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealthContent();
    
    // Set up content refresh every 30 minutes
    const refreshInterval = setInterval(() => {
      fetchHealthContent();
    }, 30 * 60 * 1000);
    
    return () => clearInterval(refreshInterval);
  }, []);

  // Enhanced health protocols with 10 unique cards
  const defaultHealthProtocols = [
    {
      title: "Physical Foundation",
      quote: "A strong mind needs a strong body. Train daily. Push beyond your limits. Your body is your primary weapon.",
      category: "Fitness",
      icon: "💪"
    },
    {
      title: "Recovery Protocols",
      quote: "Even Batman sleeps. Your body repairs itself in rest. 7-8 hours of quality sleep is non-negotiable.",
      category: "Recovery",
      icon: "😴"
    },
    {
      title: "Mental Discipline",
      quote: "Control your thoughts, control your life. Meditation isn't weakness—it's mental armor against chaos.",
      category: "Mental Health",
      icon: "🧠"
    },
    {
      title: "Nutrition as Fuel",
      quote: "Fuel your body like the machine it is. Clean food, clean mind, clean performance. You are what you eat.",
      category: "Diet",
      icon: "🥗"
    },
    {
      title: "Cardiovascular Mastery",
      quote: "Your heart is your engine. Cardio training builds the endurance to outlast any enemy, including yourself.",
      category: "Cardio",
      icon: "❤️"
    },
    {
      title: "Strength Building",
      quote: "Strength isn't just physical. Every rep builds mental resilience. Lift weights to lift your spirit.",
      category: "Strength",
      icon: "🏋️"
    },
    {
      title: "Flexibility & Mobility",
      quote: "A flexible body houses a flexible mind. Stretch your muscles and stretch your limits.",
      category: "Mobility",
      icon: "🤸"
    },
    {
      title: "Stress Management",
      quote: "Stress is inevitable. How you handle it defines you. Breathe through the chaos, think through the pressure.",
      category: "Stress Relief",
      icon: "🕯️"
    },
    {
      title: "Hydration Protocol",
      quote: "Water is life. Dehydration clouds judgment and weakens resolve. Drink like your mission depends on it.",
      category: "Hydration",
      icon: "💧"
    },
    {
      title: "Injury Prevention",
      quote: "The best injury is the one that never happens. Warm up properly, cool down completely, listen to your body.",
      category: "Prevention",
      icon: "🛡️"
    }
  ];

  const displayHealthProtocols = healthProtocols.length > 0 ? healthProtocols : defaultHealthProtocols;
  const displayChallenge = dailyChallenge || "Complete 100 push-ups today. Break them into sets throughout the day. Your future self will thank you for every single rep.";

  const dailyRoutine = [
    { time: "5:00 AM", activity: "Wake up, no snooze", icon: "⏰" },
    { time: "5:30 AM", activity: "Physical training", icon: "🏃" },
    { time: "7:00 AM", activity: "Meditation/Planning", icon: "🧘" },
    { time: "8:00 AM", activity: "Nutritious breakfast", icon: "🍳" },
    { time: "10:00 PM", activity: "Wind down routine", icon: "📖" },
    { time: "11:00 PM", activity: "Sleep (no devices)", icon: "😴" }
  ];

  return (
    <div className="min-h-screen bg-gotham-black">
      <Navigation />
      
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="font-batman font-black text-4xl md:text-6xl text-bat-yellow mb-4">
              BAT-HEALTH PROTOCOL
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              "Your body is your temple. Your mind is your weapon. Train both with equal dedication."
            </p>
          </div>

          {/* Health Protocols Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-16 h-16 border-4 border-bat-yellow border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {displayHealthProtocols.map((protocol, index) => (
                <WisdomCard
                  key={index}
                  title={protocol.title}
                  quote={protocol.quote}
                  category={protocol.category}
                  icon={protocol.icon}
                />
              ))}
            </div>
          )}

          {/* Daily Routine and Challenge */}
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="gotham-card p-8 rounded-lg">
              <h2 className="font-batman font-bold text-2xl text-bat-yellow mb-6">
                DAILY ROUTINE
              </h2>
              <div className="space-y-4">
                {dailyRoutine.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 bg-gotham-gray rounded-lg">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <span className="font-batman font-bold text-bat-yellow text-sm">{item.time}</span>
                      <p className="text-gray-300">{item.activity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="gotham-card p-8 rounded-lg">
              <h2 className="font-batman font-bold text-2xl text-bat-yellow mb-6">
                GOTHAM STRENGTH CHALLENGE
              </h2>
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl mb-4">🔥</div>
                  <h3 className="font-batman font-bold text-xl text-white mb-2">
                    DAILY PROTOCOL
                  </h3>
                  <p className="text-gray-300 mb-4">
                    {displayChallenge}
                  </p>
                  <div className="text-gray-400 text-sm">
                    "Discipline is choosing between what you want now and what you want most."
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Health;
