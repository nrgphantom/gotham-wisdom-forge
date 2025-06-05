import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import WaveBackground from '../components/WaveBackground';
import WisdomCard from '../components/WisdomCard';
import StockMarketInsights from '../components/StockMarketInsights';
import CoinGeckoInsights from '../components/CoinGeckoInsights';
import { fetchBatmanWisdom } from '../utils/batmanWisdom';
import { toast } from "sonner";

const Finance = () => {
  const [activeTab, setActiveTab] = useState('wisdom');
  const [financeTips, setFinanceTips] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const tabs = [
    { id: 'wisdom', label: 'Wayne Wisdom', icon: '🦇' },
    { id: 'stocks', label: 'Stock Insights', icon: '📈' },
    { id: 'crypto', label: 'Crypto Intel', icon: '₿' }
  ];

  const [stockWisdom, setStockWisdom] = useState<string>('');
  const [cryptoWisdom, setCryptoWisdom] = useState<string>('');
  const [stockLoading, setStockLoading] = useState(false);
  const [cryptoLoading, setCryptoLoading] = useState(false);

  const getFinanceWisdom = async () => {
    setIsLoading(true);
    try {
      const wisdom = await fetchBatmanWisdom();
      const parseFinanceTips = (advice: string) => {
        const financeKeywords = ['money', 'wealth', 'investment', 'financial', 'economic', 'business', 'success', 'planning', 'strategy'];
        if (financeKeywords.some(keyword => advice.toLowerCase().includes(keyword))) {
          return advice;
        }
        return `"${advice}" - Apply this wisdom to your financial strategy and investment decisions.`;
      };
      setFinanceTips(parseFinanceTips(wisdom));
    } catch (error) {
      toast.error("Failed to fetch Wayne's financial wisdom. The Batcomputer might be offline.");
    } finally {
      setIsLoading(false);
    }
  };

  const getStockWisdom = async () => {
    setStockLoading(true);
    try {
      const wisdom = await fetchBatmanWisdom();
      setStockWisdom(`"${wisdom}" - Consider this wisdom when analyzing market movements and stock investments.`);
    } catch (error) {
      toast.error("Failed to fetch stock market wisdom.");
    } finally {
      setStockLoading(false);
    }
  };

  const getCryptoWisdom = async () => {
    setCryptoLoading(true);
    try {
      const wisdom = await fetchBatmanWisdom();
      setCryptoWisdom(`"${wisdom}" - Apply this insight to your cryptocurrency investment strategy.`);
    } catch (error) {
      toast.error("Failed to fetch crypto wisdom.");
    } finally {
      setCryptoLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'wisdom':
        return (
          <div className="space-y-8">
            {financeTips && (
              <WisdomCard 
                quote={financeTips}
                onNewWisdom={getFinanceWisdom}
                isLoading={isLoading}
              />
            )}
            {!financeTips && (
              <div className="text-center">
                <button
                  onClick={getFinanceWisdom}
                  disabled={isLoading}
                  className="batman-button px-8 py-4 rounded-full font-batman font-bold text-gotham-black text-lg uppercase tracking-wide"
                >
                  {isLoading ? 'Consulting Wayne...' : 'Get Financial Wisdom'}
                </button>
              </div>
            )}
          </div>
        );
      case 'stocks':
        return (
          <div className="space-y-8">
            <StockMarketInsights />
            {stockWisdom && (
              <WisdomCard 
                quote={stockWisdom}
                onNewWisdom={getStockWisdom}
                isLoading={stockLoading}
              />
            )}
            {!stockWisdom && (
              <div className="text-center">
                <button
                  onClick={getStockWisdom}
                  disabled={stockLoading}
                  className="batman-button px-6 py-3 rounded-full font-batman font-bold text-gotham-black uppercase tracking-wide"
                >
                  {stockLoading ? 'Analyzing...' : 'Get Stock Wisdom'}
                </button>
              </div>
            )}
          </div>
        );
      case 'crypto':
        return (
          <div className="space-y-8">
            <CoinGeckoInsights />
            {cryptoWisdom && (
              <WisdomCard 
                quote={cryptoWisdom}
                onNewWisdom={getCryptoWisdom}
                isLoading={cryptoLoading}
              />
            )}
            {!cryptoWisdom && (
              <div className="text-center">
                <button
                  onClick={getCryptoWisdom}
                  disabled={cryptoLoading}
                  className="batman-button px-6 py-3 rounded-full font-batman font-bold text-gotham-black uppercase tracking-wide"
                >
                  {cryptoLoading ? 'Processing...' : 'Get Crypto Wisdom'}
                </button>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gotham-black">
      <WaveBackground />
      <Navigation />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-8">
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-bat-yellow blur-lg opacity-20 rounded-full"></div>
              <h1 className="relative font-batman font-black text-4xl md:text-6xl text-bat-yellow">
                GOTHAM FINANCE
              </h1>
            </div>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              "It's not about the money. It's about sending a message... and building wealth strategically."
            </p>
          </div>

          <div className="flex justify-center mb-8">
            <div className="flex bg-gotham-dark rounded-lg p-1 border border-gotham-gray">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-md font-batman font-bold text-sm uppercase tracking-wide transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-bat-yellow text-gotham-black'
                      : 'text-gray-400 hover:text-bat-yellow'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default Finance;
