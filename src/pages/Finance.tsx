
import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import WisdomCard from '../components/WisdomCard';
import { fetchBatmanWisdom, parseFinanceTips } from '../utils/batmanWisdom';
import { toast } from "sonner";
import StockMarketInsights from '../components/StockMarketInsights';
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
    "The market rewards patience and punishes haste. Build your wealth like you build your character - one disciplined decision at a time."
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
      "The market rewards patience and punishes haste. Build your wealth like you build your character - one disciplined decision at a time.",
      "Fear others when they are greedy, be greedy when others fear. Market psychology is often backwards.",
      "Your most important investment decision is asset allocation – how you divide your portfolio among stocks, bonds, and cash.",
      "Long-term thinking is harder than people think, and rarer than people realize. Think in decades, not days.",
      "Wealth isn't about having a lot of money; it's about having many options. Diversification protects those options.",
      "The goal of investing isn't to minimize risk – it's to maximize returns for the risk you're willing to take.",
      "The four most dangerous words in investing are: 'this time it's different.' History repeats itself.",
      "Markets can remain irrational longer than you can remain solvent. Never bet everything on one position.",
      "The best time to invest was yesterday. The second best time is now. Delaying only compounds your missed opportunities.",
      "Your portfolio is like your utility belt – each tool has a specific purpose. Don't expect a batarang to do what a grappling hook should."
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

  // Enhanced finance tips with 10 rookie and 20 Wayne protocol tips
  const defaultRookieTips = [
    {
      title: "Emergency Fund First",
      quote: "Before you invest a single dollar, build a fortress. Keep 6 months of expenses saved. You never know when you'll need to disappear.",
      category: "Safety Net",
      icon: "🛡️"
    },
    {
      title: "Track Every Dollar",
      quote: "Know where your money goes. Every criminal leaves a trail, and so does every expense. Track it all.",
      category: "Budgeting",
      icon: "📊"
    },
    {
      title: "Start Investing Early",
      quote: "Time is your greatest weapon. Start investing young, and let compound interest do the heavy lifting for decades.",
      category: "Long-term Growth",
      icon: "⏰"
    },
    {
      title: "Automate Your Savings",
      quote: "Set up automatic transfers. Remove emotion from the equation. Let discipline work while you sleep.",
      category: "Automation",
      icon: "🤖"
    },
    {
      title: "Avoid High-Interest Debt",
      quote: "Credit card debt is financial kryptonite. Pay it off immediately. Never carry a balance if you can help it.",
      category: "Debt Management",
      icon: "💳"
    },
    {
      title: "Index Funds First",
      quote: "Start with broad market index funds. They're boring, reliable, and perfect for beginners. Boring wins in investing.",
      category: "Investment Strategy",
      icon: "📈"
    },
    {
      title: "Dollar-Cost Averaging",
      quote: "Invest the same amount regularly, regardless of market conditions. It smooths out volatility and builds discipline.",
      category: "Investment Strategy",
      icon: "📅"
    },
    {
      title: "Learn Before You Leap",
      quote: "Study every investment before you make it. Ignorance is expensive. Knowledge is profitable.",
      category: "Education",
      icon: "📚"
    },
    {
      title: "Live Below Your Means",
      quote: "Spend less than you earn. The gap between income and expenses is where wealth is built.",
      category: "Lifestyle",
      icon: "🏠"
    },
    {
      title: "Start a Side Hustle",
      quote: "Create additional income streams. Your day job pays the bills, but side income builds wealth.",
      category: "Income Growth",
      icon: "💼"
    }
  ];

  const defaultWayneTips = [
    {
      title: "Asset Allocation Strategy",
      quote: "Spread your investments across asset classes like spreading operations across Gotham. Diversification is survival.",
      category: "Risk Management",
      icon: "🏢"
    },
    {
      title: "Market Psychology Mastery",
      quote: "Fear and greed move markets. When others panic, that's when opportunities reveal themselves. Be the calm in the storm.",
      category: "Strategic Investment",
      icon: "🧠"
    },
    {
      title: "Passive Income Empire",
      quote: "Build systems that work while you sleep. Dividend stocks, REITs, businesses. True wealth comes from assets, not labor.",
      category: "Wealth Building",
      icon: "🏭"
    },
    {
      title: "Tax Optimization",
      quote: "Minimize what you owe legally. Use 401k, IRA, HSA. Every tax dollar saved is a dollar that compounds for decades.",
      category: "Tax Strategy",
      icon: "📋"
    },
    {
      title: "International Diversification",
      quote: "Don't put all your money in one country. Global markets provide opportunities and reduce single-nation risk.",
      category: "Global Strategy",
      icon: "🌍"
    },
    {
      title: "Alternative Investments",
      quote: "Real estate, commodities, private equity. Build a portfolio as diverse as your skill set.",
      category: "Advanced Assets",
      icon: "🏗️"
    },
    {
      title: "Leverage Wisely",
      quote: "Debt can accelerate wealth or destroy it. Use leverage like you use explosives - carefully and with precise timing.",
      category: "Advanced Strategy",
      icon: "⚡"
    },
    {
      title: "Business Ownership",
      quote: "The ultimate wealth builder is owning businesses. Start, buy, or invest in companies that solve real problems.",
      category: "Entrepreneurship",
      icon: "🏪"
    },
    {
      title: "Value Investing",
      quote: "Buy quality companies when they're undervalued. Be patient. Great investments take time to mature.",
      category: "Stock Strategy",
      icon: "💎"
    },
    {
      title: "Economic Cycles",
      quote: "Understand market cycles. Bear markets create millionaires. Bull markets reveal them. Position accordingly.",
      category: "Market Timing",
      icon: "🔄"
    },
    {
      title: "Estate Planning",
      quote: "Plan for wealth transfer. Protect your legacy like you protect Gotham. Trusts, wills, insurance - all weapons in your arsenal.",
      category: "Legacy Planning",
      icon: "🏛️"
    },
    {
      title: "Cryptocurrency Strategy",
      quote: "Digital assets are the future. Allocate 5-10% of your portfolio. High risk, high reward. Diversify within crypto too.",
      category: "Digital Assets",
      icon: "₿"
    },
    {
      title: "Options Trading",
      quote: "Options can hedge risk or generate income. Learn covered calls, protective puts. Power requires precision.",
      category: "Advanced Trading",
      icon: "📊"
    },
    {
      title: "Private Equity Access",
      quote: "Accredited investors can access private markets. Higher returns, higher minimums. Build wealth to access better opportunities.",
      category: "Elite Investing",
      icon: "🏦"
    },
    {
      title: "Inflation Hedging",
      quote: "Protect against currency debasement. Real estate, commodities, inflation-protected bonds. Preserve purchasing power.",
      category: "Economic Defense",
      icon: "🛡️"
    },
    {
      title: "Quantitative Analysis",
      quote: "Use data to drive decisions. P/E ratios, debt-to-equity, ROE. Numbers don't lie, emotions do.",
      category: "Analysis",
      icon: "📉"
    },
    {
      title: "Sector Rotation",
      quote: "Different sectors lead at different times. Technology, healthcare, energy. Rotate capital based on economic cycles.",
      category: "Tactical Allocation",
      icon: "🔄"
    },
    {
      title: "Risk Parity",
      quote: "Equal risk contribution from each asset class. Not equal dollar amounts. Balance risk, not just allocation.",
      category: "Risk Management",
      icon: "⚖️"
    },
    {
      title: "Alpha Generation",
      quote: "Seek returns above the market. Research, analysis, contrarian thinking. Beat the market through superior intelligence.",
      category: "Performance",
      icon: "🎯"
    },
    {
      title: "Family Office Strategy",
      quote: "Multi-generational wealth requires professional management. When assets exceed $100M, consider family office structures.",
      category: "Ultra High Net Worth",
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
              "It's not about the money. It's about sending a message. But money helps."
            </p>
          </div>

          {/* Stock Market Insights Section */}
          <StockMarketInsights />

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
                Rookie Mode ({defaultRookieTips.length} Tips)
              </button>
              <button 
                onClick={() => setMode('wayne')} 
                className={`px-6 py-3 rounded-full font-batman font-bold text-sm uppercase tracking-wide transition-all duration-300 ${
                  mode === 'wayne' 
                    ? 'bg-bat-yellow text-gotham-black' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Wayne Protocols ({defaultWayneTips.length} Tips)
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
                <WisdomCard
                  key={index}
                  title={tip.title}
                  quote={tip.quote}
                  category={tip.category}
                  icon={tip.icon}
                />
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
