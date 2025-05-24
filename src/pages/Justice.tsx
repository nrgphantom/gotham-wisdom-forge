
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

  // Enhanced justice wisdom with 10 unique cards
  const defaultWisdomQuotes = [
    {
      title: "The Path of Justice",
      quote: "Justice isn't just law. It's doing what's right when nobody's watching. Start by being disciplined with yourself.",
      category: "Daily Discipline",
      icon: "⚖️"
    },
    {
      title: "Facing Fear",
      quote: "Fear is real. So is courage. The difference is what you choose to feed. Face your fears head-on, every single day.",
      category: "Mental Strength",
      icon: "🦇"
    },
    {
      title: "Preparation Over Luck",
      quote: "I don't rely on luck. I rely on preparation. Plan for every scenario, then execute with precision.",
      category: "Strategic Thinking",
      icon: "🎯"
    },
    {
      title: "Integrity Above All",
      quote: "Your word is your bond. Make promises you can keep, and keep every promise you make. Trust is earned in drops and lost in buckets.",
      category: "Character",
      icon: "🛡️"
    },
    {
      title: "Perseverance Through Adversity",
      quote: "When you fall, the question isn't whether you'll get back up. It's how quickly you'll learn from the fall.",
      category: "Resilience",
      icon: "💪"
    },
    {
      title: "Protecting the Innocent",
      quote: "Power without purpose is meaningless. Use your strength to protect those who cannot protect themselves.",
      category: "Service",
      icon: "🏛️"
    },
    {
      title: "The Weight of Choice",
      quote: "Every choice has consequences. Think three moves ahead. Your decisions today shape the world tomorrow.",
      category: "Decision Making",
      icon: "🤔"
    },
    {
      title: "Leading by Example",
      quote: "Don't tell people what to do. Show them. Actions speak louder than words, and consistency speaks loudest of all.",
      category: "Leadership",
      icon: "👥"
    },
    {
      title: "Continuous Improvement",
      quote: "Yesterday's training prepares you for today's challenges. Today's training prepares you for tomorrow's impossible.",
      category: "Growth",
      icon: "📈"
    },
    {
      title: "Standing Alone",
      quote: "Sometimes doing what's right means standing alone. Be prepared to be misunderstood by many to save even one.",
      category: "Moral Courage",
      icon: "🌟"
    }
  ];

  const displayWisdomQuotes = wisdomQuotes.length > 0 ? wisdomQuotes : defaultWisdomQuotes;
  const displayChallenge = dailyChallenge || "Stand up for someone who cannot stand up for themselves. Justice begins with the smallest acts of courage. Make one person's day better today.";

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
              "The training is nothing. The will is everything. The will to act."
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
              "The smallest act of justice can change someone's entire world."
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Justice;
