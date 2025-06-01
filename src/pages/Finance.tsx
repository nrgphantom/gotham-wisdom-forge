
import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import WisdomCard from '../components/WisdomCard';
import { fetchBatmanWisdom, parseFinanceTips } from '../utils/batmanWisdom';
import { toast } from "sonner";
import CoinGeckoInsights from '../components/CoinGeckoInsights';

const Finance = () => {
  const [mode, setMode] = useState<'rookie' | 'wayne'>('rookie');
  const [financeTips, setFinanceTips] = useState<{
    rookie: Array<{
      title: string;
      quote: string;
      category: string;
      icon: string;
    }>;
    wayne: Array<{
      title: string;
      quote: string;
      category: string;
      icon: string;
    }>;
  }>({
    rookie: [],
    wayne: []
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [dailyWisdom, setDailyWisdom] = useState<string>(
    "Wealth is not about having more money—it's about having more options. Build your financial fortress one brick at a time."
  );
  
  const fetchFinanceContent = async () => {
    setLoading(true);
    try {
      const response = await fetchBatmanWisdom("financeTips");
      const parsed = parseFinanceTips(response);
      if (parsed.rookie.length > 0 || parsed.wayne.length > 0) {
        setFinanceTips(parsed);
      }
    } catch (error) {
      console.error("Error fetching finance tips:", error);
      toast.error("Failed to communicate with the Batcomputer. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  
  // Function to get a new daily financial wisdom based on the date
  const getDailyFinancialWisdom = () => {
    const wisdomList = [
      "Wealth is not about having more money—it's about having more options. Build your financial fortress one brick at a time.",
      "The market is driven by emotion, but wealth is built through logic. Stay rational when others panic.",
      "Your net worth is not your self-worth, but financial freedom gives you the power to help others.",
      "Invest in assets that generate income while you sleep. Passive income is the path to true freedom.",
      "The biggest risk is not taking any risk at all. Calculated risks lead to extraordinary returns.",
      "Time in the market beats timing the market. Consistency trumps perfection every time.",
      "Your money should work harder than you do. Make every dollar a soldier in your wealth army.",
      "Debt is a tool when used wisely, a weapon when used foolishly. Master the difference.",
      "Financial intelligence is more valuable than a high income. Learn the language of money.",
      "Build multiple income streams like you build multiple escape routes. Never depend on just one."
    ];
    
    // Get a wisdom based on the day of the year (0-364)
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - startOfYear.getTime();
    const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    return wisdomList[dayOfYear % wisdomList.length];
  };
  
  useEffect(() => {
    fetchFinanceContent();
    
    // Set daily wisdom based on current date
    setDailyWisdom(getDailyFinancialWisdom());

    // Set up content refresh every 30 minutes
    const refreshInterval = setInterval(() => {
      fetchFinanceContent();
      setDailyWisdom(getDailyFinancialWisdom());
    }, 30 * 60 * 1000);
    
    return () => clearInterval(refreshInterval);
  }, []);

  // Updated finance tips with fresh content
  const defaultRookieTips = [
    {
      title: "Financial Foundation",
      quote: "Build your emergency fund before you build anything else. A secure foundation allows you to take calculated risks.",
      category: "Security",
      icon: "🛡️"
    },
    {
      title: "Budget Like Batman",
      quote: "Every dollar has a mission. Track your spending like you track criminals—with precision and purpose.",
      category: "Budgeting",
      icon: "📊"
    },
    {
      title: "The Compound Effect",
      quote: "Small investments made consistently over time create massive wealth. Start today, no matter how small the amount.",
      category: "Investing",
      icon: "⏰"
    },
    {
      title: "Debt Elimination Protocol",
      quote: "High-interest debt is financial kryptonite. Attack it aggressively before it weakens your financial strength.",
      category: "Debt Management",
      icon: "💳"
    },
    {
      title: "Automated Wealth Building",
      quote: "Set up automatic transfers to savings and investments. Remove emotion and excuses from wealth building.",
      category: "Automation",
      icon: "🤖"
    },
    {
      title: "Index Fund Strategy",
      quote: "Start with broad market index funds. They're boring, reliable, and perfect for building long-term wealth.",
      category: "Investment Strategy",
      icon: "📈"
    },
    {
      title: "Dollar-Cost Averaging",
      quote: "Invest the same amount regularly regardless of market conditions. This strategy smooths volatility and builds discipline.",
      category: "Investment Technique",
      icon: "📅"
    },
    {
      title: "Financial Education",
      quote: "Invest in your financial knowledge first. An educated investor makes better decisions than a wealthy fool.",
      category: "Learning",
      icon: "📚"
    },
    {
      title: "Living Below Your Means",
      quote: "True wealth comes from spending less than you earn. The gap between income and expenses is where fortunes are built.",
      category: "Lifestyle",
      icon: "🏠"
    },
    {
      title: "Multiple Income Streams",
      quote: "Don't depend on a single source of income. Build multiple revenue streams to create financial security.",
      category: "Income Diversification",
      icon: "💼"
    }
  ];

  const defaultWayneTips = [
    {
      title: "Strategic Asset Allocation",
      quote: "Diversify across asset classes like diversifying your skills. Real estate, stocks, bonds, commodities—each serves a purpose.",
      category: "Portfolio Strategy",
      icon: "🏢"
    },
    {
      title: "Market Psychology Mastery",
      quote: "Fear and greed drive markets more than fundamentals. When others are fearful, be greedy. When others are greedy, be cautious.",
      category: "Behavioral Finance",
      icon: "🧠"
    },
    {
      title: "Passive Income Empire",
      quote: "Build systems that generate money while you sleep. Dividend stocks, rental properties, business ownership—true wealth is passive.",
      category: "Income Generation",
      icon: "🏭"
    },
    {
      title: "Tax Optimization Strategies",
      quote: "It's not what you make, it's what you keep. Master tax-advantaged accounts and legal tax reduction strategies.",
      category: "Tax Planning",
      icon: "📋"
    },
    {
      title: "Global Investment Approach",
      quote: "Don't limit yourself to domestic markets. International diversification reduces risk and increases opportunities.",
      category: "International Investing",
      icon: "🌍"
    },
    {
      title: "Alternative Investment Mastery",
      quote: "Beyond stocks and bonds lies a world of opportunities. REITs, commodities, private equity—expand your arsenal.",
      category: "Alternative Assets",
      icon: "🏗️"
    },
    {
      title: "Leverage and Risk Management",
      quote: "Leverage can amplify returns or amplify losses. Use debt strategically, with proper risk management protocols in place.",
      category: "Advanced Strategy",
      icon: "⚡"
    },
    {
      title: "Business Ownership Philosophy",
      quote: "The ultimate wealth builder is owning productive assets. Buy businesses that solve problems and generate cash flow.",
      category: "Business Investment",
      icon: "🏪"
    },
    {
      title: "Value Investing Principles",
      quote: "Buy quality companies when they're undervalued. Be patient. Great investments take time to reach their potential.",
      category: "Investment Philosophy",
      icon: "💎"
    },
    {
      title: "Economic Cycle Navigation",
      quote: "Understand economic cycles and position accordingly. Recessions create millionaires who know how to capitalize on chaos.",
      category: "Market Timing",
      icon: "🔄"
    },
    {
      title: "Estate Planning Excellence",
      quote: "Plan for wealth transfer across generations. Trusts, wills, tax strategies—protect your legacy like you protect Gotham.",
      category: "Legacy Planning",
      icon: "🏛️"
    },
    {
      title: "Cryptocurrency Integration",
      quote: "Digital assets are reshaping finance. Allocate 5-10% to crypto, but treat it as high-risk, high-reward speculation.",
      category: "Digital Assets",
      icon: "₿"
    },
    {
      title: "Options and Derivatives",
      quote: "Advanced instruments for advanced investors. Use options to hedge risk or generate income, never for speculation alone.",
      category: "Advanced Trading",
      icon: "📊"
    },
    {
      title: "Private Market Access",
      quote: "Private equity and venture capital offer superior returns for qualified investors. Build wealth to access better opportunities.",
      category: "Private Investing",
      icon: "🏦"
    },
    {
      title: "Inflation Defense Strategy",
      quote: "Inflation erodes purchasing power silently. Invest in assets that appreciate faster than currency debasement.",
      category: "Inflation Hedging",
      icon: "🛡️"
    },
    {
      title: "Quantitative Analysis Mastery",
      quote: "Let data drive decisions, not emotions. Financial ratios, metrics, and models reveal what marketing cannot hide.",
      category: "Financial Analysis",
      icon: "📉"
    },
    {
      title: "Sector Rotation Tactics",
      quote: "Different sectors lead at different economic phases. Rotate capital based on market cycles and economic indicators.",
      category: "Tactical Allocation",
      icon: "🔄"
    },
    {
      title: "Risk Parity Framework",
      quote: "Balance risk contribution, not just dollar allocation. Each asset class should contribute equally to portfolio risk.",
      category: "Risk Management",
      icon: "⚖️"
    },
    {
      title: "Alpha Generation Strategies",
      quote: "Seek returns above market benchmarks through research, analysis, and contrarian thinking. Alpha separates good from great.",
      category: "Performance Enhancement",
      icon: "🎯"
    },
    {
      title: "Ultra-High Net Worth Management",
      quote: "At $100M+, consider family office structures. Multi-generational wealth requires institutional-level management.",
      category: "Wealth Management",
      icon: "👑"
    }
  ];

  const currentTips = mode === 'rookie' 
    ? financeTips.rookie.length > 0 ? financeTips.rookie : defaultRookieTips 
    : financeTips.wayne.length > 0 ? financeTips.wayne : defaultWayneTips;
  
  return (
    <div className="min-h-screen bg-gotham-black">
      <Navigation />
      
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="font-batman font-black text-4xl md:text-6xl text-bat-yellow mb-4">
              GOTHAM FINANCE
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              "Money is a tool. When you have it, doors open. When you don't, you become the tool of others."
            </p>
          </div>

          {/* CoinGecko Crypto Insights Section */}
          <CoinGeckoInsights />

          {/* Mode Selector */}
          <div className="flex justify-center mb-12">
            <div className="bg-gotham-gray rounded-full p-1">
              <button 
                onClick={() => setMode('rookie')} 
                className={`px-6 py-3 rounded-full font-batman font-bold text-sm uppercase tracking-wide transition-all duration-300 ${
                  mode === 'rookie' 
                    ? 'bg-bat-yellow text-gotham-black' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Rookie Mode
              </button>
              <button 
                onClick={() => setMode('wayne')} 
                className={`px-6 py-3 rounded-full font-batman font-bold text-sm uppercase tracking-wide transition-all duration-300 ${
                  mode === 'wayne' 
                    ? 'bg-bat-yellow text-gotham-black' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Wayne Protocols
              </button>
            </div>
          </div>

          {/* Tips Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-16 h-16 border-4 border-bat-yellow border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {currentTips.map((tip, index) => (
                <div key={index} className="hover:transform hover:scale-105 transition-all duration-300">
                  <WisdomCard
                    title={tip.title}
                    quote={tip.quote}
                    category={tip.category}
                    icon={tip.icon}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Daily Tip */}
          <div className="gotham-card p-8 rounded-lg text-center">
            <h2 className="font-batman font-bold text-2xl text-bat-yellow mb-4">
              DAILY FINANCIAL WISDOM
            </h2>
            <p className="text-lg text-gray-300 mb-6">
              "{dailyWisdom}"
            </p>
            <div className="flex justify-center space-x-4">
              <a 
                href="https://drive.google.com/file/d/1sDWlNWjrl-zLlc0EVIxe_Ix9xFwGEpJU/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer" 
                className="px-6 py-3 rounded-full border border-bat-yellow text-bat-yellow hover:bg-bat-yellow hover:text-gotham-black transition-all duration-300 font-batman font-bold text-sm uppercase tracking-wide"
              >
                Investment Guide
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Finance;
