
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
  const [challengeCompleted, setChallengeCompleted] = useState<boolean>(false);

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
    
    // Check if the challenge was completed today
    const today = new Date().toISOString().split('T')[0];
    const lastCompleted = localStorage.getItem('batmanHealthChallengeCompleted');
    if (lastCompleted === today) {
      setChallengeCompleted(true);
    } else {
      setChallengeCompleted(false);
    }
    
    // Set up content refresh every 30 minutes
    const refreshInterval = setInterval(() => {
      fetchHealthContent();
    }, 30 * 60 * 1000);
    
    return () => clearInterval(refreshInterval);
  }, []);

  const handleChallengeComplete = () => {
    const today = new Date().toISOString().split('T')[0];
    localStorage.setItem('batmanHealthChallengeCompleted', today);
    setChallengeCompleted(true);
    toast.success("Challenge completed! The Bat approves.");
  };

  // Default health protocols in case the API fails
  const defaultHealthProtocols = [
    {
      title: "Physical Training",
      quote: "A strong mind needs a strong body. Train daily. Push beyond your limits. Your body is your primary weapon.",
      category: "Fitness",
      icon: "💪"
    },
    {
      title: "Rest & Recovery",
      quote: "Even Batman sleeps. Your body repairs itself in rest. 7-8 hours of quality sleep is non-negotiable.",
      category: "Recovery",
      icon: "😴"
    },
    {
      title: "Mental Discipline",
      quote: "Control your thoughts, control your life. Meditation isn't weakness—it's mental armor.",
      category: "Mental Health",
      icon: "🧠"
    },
    {
      title: "Nutrition",
      quote: "Fuel your body like the machine it is. Clean food, clean mind, clean performance.",
      category: "Diet",
      icon: "🥗"
    }
  ];

  const displayHealthProtocols = healthProtocols.length > 0 ? healthProtocols : defaultHealthProtocols;
  const displayChallenge = dailyChallenge || "Complete 100 push-ups today. Break them into sets. Your future self will thank you.";

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
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
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

          {/* Daily Routine */}
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
                TODAY'S CHALLENGE
              </h2>
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl mb-4">🔥</div>
                  <h3 className="font-batman font-bold text-xl text-white mb-2">
                    GOTHAM STRENGTH
                  </h3>
                  <p className="text-gray-300 mb-4">
                    {displayChallenge}
                  </p>
                  <button 
                    onClick={handleChallengeComplete} 
                    disabled={challengeCompleted}
                    className={`batman-button px-6 py-3 rounded-full font-batman font-bold text-sm uppercase tracking-wide w-full ${
                      challengeCompleted ? 'bg-green-500 cursor-default' : 'bg-bat-yellow text-gotham-black'
                    }`}
                  >
                    {challengeCompleted ? 'Challenge Completed ✓' : 'Challenge Completed'}
                  </button>
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
