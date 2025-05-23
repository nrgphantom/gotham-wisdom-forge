
import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import WisdomCard from '../components/WisdomCard';
import { fetchBatmanWisdom, parseFinanceTips } from '../utils/batmanWisdom';
import { toast } from "sonner";
import StockMarketInsights from '../components/StockMarketInsights';

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
    "A penny saved is a penny earned. But a dollar invested wisely becomes ten dollars in time. " +
    "Start today, even if it's just spare change."
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
      "The stock market is a device for transferring money from the impatient to the patient. Discipline is your greatest weapon.",
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

  // Default finance tips in case the API fails
  const defaultRookieTips = [{
    title: "Emergency Fund",
    quote: "Always have an escape route. Keep 6 months of expenses saved. You never know when you'll need to disappear.",
    category: "Safety Net",
    icon: "🛡️"
  }, {
    title: "Spend Wisely",
    quote: "Don't buy what you don't need. That's how they control you. Every purchase should serve a purpose.",
    category: "Smart Spending",
    icon: "💰"
  }, {
    title: "Invest Early",
    quote: "Time is your greatest weapon. Start investing young, and let compound interest do the heavy lifting.",
    category: "Long-term Growth",
    icon: "⏰"
  }];
  const defaultWayneTips = [{
    title: "Diversification",
    quote: "Never put all your resources in one place. Spread your investments like you spread your operations.",
    category: "Risk Management",
    icon: "🏢"
  }, {
    title: "Market Psychology",
    quote: "Fear and greed move markets. When others panic, that's when opportunities reveal themselves.",
    category: "Strategic Investment",
    icon: "🧠"
  }, {
    title: "Passive Income",
    quote: "Build systems that work while you sleep. True wealth comes from assets, not labor.",
    category: "Wealth Building",
    icon: "🏭"
  }];
  const currentTips = mode === 'rookie' ? financeTips.rookie.length > 0 ? financeTips.rookie : defaultRookieTips : financeTips.wayne.length > 0 ? financeTips.wayne : defaultWayneTips;
  
  return <div className="min-h-screen bg-gotham-black">
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

          {/* Mode Selector */}
          <div className="flex justify-center mb-12">
            <div className="bg-gotham-gray rounded-full p-1">
              <button onClick={() => setMode('rookie')} className={`px-6 py-3 rounded-full font-batman font-bold text-sm uppercase tracking-wide transition-all duration-300 ${mode === 'rookie' ? 'bg-bat-yellow text-gotham-black' : 'text-gray-400 hover:text-white'}`}>
                Rookie Mode
              </button>
              <button onClick={() => setMode('wayne')} className={`px-6 py-3 rounded-full font-batman font-bold text-sm uppercase tracking-wide transition-all duration-300 ${mode === 'wayne' ? 'bg-bat-yellow text-gotham-black' : 'text-gray-400 hover:text-white'}`}>
                Wayne Protocols
              </button>
            </div>
          </div>

          {/* Tips Grid */}
          {loading ? <div className="flex justify-center items-center py-20">
              <div className="w-16 h-16 border-4 border-bat-yellow border-t-transparent rounded-full animate-spin"></div>
            </div> : <div className="grid md:grid-cols-3 gap-8 mb-16">
              {currentTips.map((tip, index) => <WisdomCard key={index} title={tip.title} quote={tip.quote} category={tip.category} icon={tip.icon} />)}
            </div>}

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
                className="px-6 py-3 rounded-full border border-bat-yellow text-bat-yellow hover:bg-bat-yellow hover:text-gotham-black transition-all duration-300 font-batman font-bold text-sm uppercase tracking-wide">
                Investment Guide
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default Finance;
