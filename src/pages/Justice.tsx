
import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import WisdomCard from '../components/WisdomCard';
import { fetchBatmanWisdom, parseWisdomQuotes } from '../utils/batmanWisdom';
import { toast } from "sonner";

const Justice = () => {
  const [wisdomQuotes, setWisdomQuotes] = useState<Array<{
    title: string;
    quote: string;
    category: string;
    icon: string;
  }>>([]);
  const [dailyChallenge, setDailyChallenge] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const fetchWisdomContent = async () => {
    setLoading(true);
    try {
      // Fetch wisdom quotes
      const wisdomResponse = await fetchBatmanWisdom("wisdomQuotes");
      const parsedWisdom = parseWisdomQuotes(wisdomResponse);
      if (parsedWisdom.length > 0) {
        setWisdomQuotes(parsedWisdom);
      }
      
      // Fetch justice challenge
      const challengeResponse = await fetchBatmanWisdom("justiceChallenge");
      if (challengeResponse) {
        setDailyChallenge(challengeResponse);
      }
    } catch (error) {
      console.error("Error fetching Batman wisdom:", error);
      toast.error("Failed to communicate with the Batcomputer. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWisdomContent();
    
    // Set up content refresh every 30 minutes
    const refreshInterval = setInterval(() => {
      fetchWisdomContent();
    }, 30 * 60 * 1000);
    
    return () => clearInterval(refreshInterval);
  }, []);

  // Updated justice wisdom with fresh content
  const defaultWisdomQuotes = [
    {
      title: "The Foundation of Honor",
      quote: "True justice begins with self-accountability. Before you judge others, master yourself. Your actions set the standard.",
      category: "Self-Mastery",
      icon: "⚖️"
    },
    {
      title: "Courage in Darkness",
      quote: "Darkness reveals who you truly are. When no one is watching, your choices define your character. Choose wisely.",
      category: "Character Building",
      icon: "🦇"
    },
    {
      title: "The Shield of Truth",
      quote: "Lies are temporary solutions to permanent problems. Truth might hurt initially, but deception destroys everything eventually.",
      category: "Integrity",
      icon: "🛡️"
    },
    {
      title: "Protecting the Vulnerable",
      quote: "Your strength exists to protect those who cannot protect themselves. Use your power responsibly, not selfishly.",
      category: "Service",
      icon: "🏛️"
    },
    {
      title: "Strategic Patience",
      quote: "Rush to action and you'll stumble. Take time to understand the situation fully before making your move.",
      category: "Wisdom",
      icon: "🎯"
    },
    {
      title: "Moral Courage",
      quote: "Standing up for what's right when it's unpopular is the true test of your moral fiber. Be willing to stand alone.",
      category: "Leadership",
      icon: "💪"
    },
    {
      title: "Learning from Failure",
      quote: "Every defeat teaches something that victory cannot. Embrace your failures as stepping stones to greatness.",
      category: "Growth",
      icon: "📈"
    },
    {
      title: "The Power of Example",
      quote: "People watch what you do more than they listen to what you say. Be the example you want to see in the world.",
      category: "Influence",
      icon: "👥"
    },
    {
      title: "Discipline as Freedom",
      quote: "Discipline yourself so others don't have to. Self-control is the ultimate expression of personal freedom.",
      category: "Self-Control",
      icon: "🔒"
    },
    {
      title: "Justice Never Sleeps",
      quote: "The moment you stop fighting for what's right is the moment evil gains ground. Stay vigilant, stay committed.",
      category: "Persistence",
      icon: "🌟"
    }
  ];

  const displayWisdomQuotes = wisdomQuotes.length > 0 ? wisdomQuotes : defaultWisdomQuotes;
  const displayChallenge = dailyChallenge || "Today, speak up for someone who cannot speak for themselves. Justice is not a spectator sport—it requires action.";

  return (
    <div className="min-h-screen bg-gotham-black">
      <Navigation />
      
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="font-batman font-black text-4xl md:text-6xl text-bat-yellow mb-4">
              JUSTICE PROTOCOLS
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              "Justice is not about revenge. It's about balance. It's about doing what's right, even when it's hard."
            </p>
          </div>

          {/* Wisdom Cards Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-16 h-16 border-4 border-bat-yellow border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {displayWisdomQuotes.map((wisdom, index) => (
                <WisdomCard
                  key={index}
                  title={wisdom.title}
                  quote={wisdom.quote}
                  category={wisdom.category}
                  icon={wisdom.icon}
                />
              ))}
            </div>
          )}

          {/* Daily Challenge Section */}
          <div className="gotham-card p-8 rounded-lg text-center">
            <h2 className="font-batman font-bold text-2xl text-bat-yellow mb-4">
              TODAY'S JUSTICE CHALLENGE
            </h2>
            <p className="text-lg text-gray-300 mb-6">
              "{displayChallenge}"
            </p>
            <div className="text-gray-400 text-sm">
              "Small acts of justice ripple outward and change the world."
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Justice;
