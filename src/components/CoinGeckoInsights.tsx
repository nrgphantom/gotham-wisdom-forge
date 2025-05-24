
import React, { useState, useEffect } from 'react';
import { toast } from "sonner";

interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d: number;
  market_cap: number;
  market_cap_rank: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  circulating_supply: number;
  image: string;
  ath: number;
  ath_change_percentage: number;
  atl: number;
  atl_change_percentage: number;
}

interface MarketData {
  active_cryptocurrencies: number;
  market_cap_change_percentage_24h_usd: number;
  total_market_cap: { usd: number };
  total_volume: { usd: number };
}

const CoinGeckoInsights = () => {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [marketData, setMarketData] = useState<MarketData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<'top' | 'defi' | 'layer1'>('top');
  const apiKey = "CG-Jj6itLQiEkq1bekEgbmveXAw";
  
  // Different cryptocurrency categories
  const cryptoCategories = {
    top: ['bitcoin', 'ethereum', 'binancecoin', 'solana', 'cardano', 'avalanche-2', 'polkadot', 'chainlink'],
    defi: ['uniswap', 'aave', 'compound-governance-token', 'maker', 'curve-dao-token', 'synthetix-network-token', 'yearn-finance', 'sushiswap'],
    layer1: ['ethereum', 'solana', 'cardano', 'avalanche-2', 'polkadot', 'cosmos', 'algorand', 'near']
  };

  useEffect(() => {
    const fetchCryptoData = async () => {
      setLoading(true);
      try {
        const currentIds = cryptoCategories[selectedCategory];
        
        // Fetch detailed crypto data
        const cryptoResponse = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${currentIds.join(',')}&order=market_cap_desc&per_page=8&page=1&sparkline=false&price_change_percentage=24h,7d&include_24hr_high_low=true`,
          {
            headers: {
              'X-CG-DEMO-API-KEY': apiKey
            }
          }
        );
        
        if (!cryptoResponse.ok) {
          throw new Error('Failed to fetch crypto data');
        }
        
        const cryptoDataResult = await cryptoResponse.json();
        setCryptoData(cryptoDataResult);

        // Fetch global market data
        const globalResponse = await fetch(
          'https://api.coingecko.com/api/v3/global',
          {
            headers: {
              'X-CG-DEMO-API-KEY': apiKey
            }
          }
        );
        
        if (globalResponse.ok) {
          const globalData = await globalResponse.json();
          setMarketData(globalData.data);
        }
        
      } catch (error) {
        console.error("Error fetching CoinGecko data:", error);
        toast.error("Failed to retrieve crypto market data");
      } finally {
        setLoading(false);
      }
    };

    fetchCryptoData();
    
    // Refresh data every 5 minutes for more real-time data
    const interval = setInterval(fetchCryptoData, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [selectedCategory]);

  const formatPrice = (price: number) => {
    if (price < 0.01) {
      return `$${price.toFixed(8)}`;
    } else if (price < 1) {
      return `$${price.toFixed(6)}`;
    }
    return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1e12) {
      return `$${(marketCap / 1e12).toFixed(2)}T`;
    } else if (marketCap >= 1e9) {
      return `$${(marketCap / 1e9).toFixed(2)}B`;
    } else if (marketCap >= 1e6) {
      return `$${(marketCap / 1e6).toFixed(2)}M`;
    }
    return `$${marketCap.toLocaleString()}`;
  };

  const formatVolume = (volume: number) => {
    if (volume >= 1e9) {
      return `$${(volume / 1e9).toFixed(2)}B`;
    } else if (volume >= 1e6) {
      return `$${(volume / 1e6).toFixed(2)}M`;
    }
    return `$${volume.toLocaleString()}`;
  };

  return (
    <div className="gotham-card p-8 rounded-lg mb-8">
      <h2 className="font-batman font-bold text-2xl text-bat-yellow mb-6">
        CRYPTO MARKET INTELLIGENCE
      </h2>
      
      {/* Global Market Stats */}
      {marketData && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-gotham-gray rounded-lg">
          <div className="text-center">
            <div className="text-sm text-gray-400">Total Market Cap</div>
            <div className="text-lg font-mono font-bold">{formatMarketCap(marketData.total_market_cap.usd)}</div>
            <div className={`text-sm ${marketData.market_cap_change_percentage_24h_usd >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {marketData.market_cap_change_percentage_24h_usd >= 0 ? '+' : ''}{marketData.market_cap_change_percentage_24h_usd?.toFixed(2)}%
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-400">24h Volume</div>
            <div className="text-lg font-mono font-bold">{formatMarketCap(marketData.total_volume.usd)}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-400">Active Cryptos</div>
            <div className="text-lg font-mono font-bold">{marketData.active_cryptocurrencies.toLocaleString()}</div>
          </div>
        </div>
      )}

      {/* Category Selector */}
      <div className="flex justify-center mb-6">
        <div className="bg-gotham-gray rounded-full p-1">
          <button 
            onClick={() => setSelectedCategory('top')} 
            className={`px-4 py-2 rounded-full font-batman font-bold text-xs uppercase tracking-wide transition-all duration-300 ${
              selectedCategory === 'top' 
                ? 'bg-bat-yellow text-gotham-black' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Top 8
          </button>
          <button 
            onClick={() => setSelectedCategory('defi')} 
            className={`px-4 py-2 rounded-full font-batman font-bold text-xs uppercase tracking-wide transition-all duration-300 ${
              selectedCategory === 'defi' 
                ? 'bg-bat-yellow text-gotham-black' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            DeFi
          </button>
          <button 
            onClick={() => setSelectedCategory('layer1')} 
            className={`px-4 py-2 rounded-full font-batman font-bold text-xs uppercase tracking-wide transition-all duration-300 ${
              selectedCategory === 'layer1' 
                ? 'bg-bat-yellow text-gotham-black' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Layer 1
          </button>
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="w-10 h-10 border-4 border-bat-yellow border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {cryptoData.map((crypto) => (
              <div key={crypto.id} className="p-4 bg-gotham-gray rounded-lg hover:transform hover:scale-105 hover:bg-opacity-80 transition-all duration-300 cursor-pointer">
                <div className="flex items-center mb-2">
                  <img src={crypto.image} alt={crypto.name} className="w-6 h-6 mr-2" />
                  <div>
                    <div className="text-gray-300 font-bold text-sm">
                      {crypto.symbol.toUpperCase()}
                    </div>
                    <div className="text-xs text-gray-500">#{crypto.market_cap_rank}</div>
                  </div>
                </div>
                <div className="text-lg font-mono font-bold mb-1">{formatPrice(crypto.current_price)}</div>
                
                <div className="flex justify-between mb-2">
                  <div className={`font-mono text-xs ${crypto.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    24h: {crypto.price_change_percentage_24h >= 0 ? '+' : ''}{crypto.price_change_percentage_24h?.toFixed(2)}%
                  </div>
                  <div className={`font-mono text-xs ${crypto.price_change_percentage_7d >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    7d: {crypto.price_change_percentage_7d >= 0 ? '+' : ''}{crypto.price_change_percentage_7d?.toFixed(2)}%
                  </div>
                </div>
                
                <div className="text-xs text-gray-400 space-y-1">
                  <div>Cap: {formatMarketCap(crypto.market_cap)}</div>
                  <div>Vol: {formatVolume(crypto.total_volume)}</div>
                  <div className="flex justify-between">
                    <span>H: {formatPrice(crypto.high_24h)}</span>
                    <span>L: {formatPrice(crypto.low_24h)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <p className="text-gray-400 text-sm text-center">
            Real-time crypto data from CoinGecko. Wayne Enterprises Digital Asset Division. Updates every 5 minutes.
          </p>
        </>
      )}
    </div>
  );
};

export default CoinGeckoInsights;
