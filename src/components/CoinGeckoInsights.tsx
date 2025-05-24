
import React, { useState, useEffect } from 'react';
import { toast } from "sonner";

interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
  image: string;
}

const CoinGeckoInsights = () => {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const apiKey = "CG-Jj6itLQiEkq1bekEgbmveXAw";
  
  // Top cryptocurrencies that Batman/Wayne Enterprises might track
  const cryptoIds = ['bitcoin', 'ethereum', 'solana', 'cardano', 'polkadot', 'chainlink', 'polygon-pos', 'avalanche-2'];

  useEffect(() => {
    const fetchCryptoData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${cryptoIds.join(',')}&order=market_cap_desc&per_page=8&page=1&sparkline=false&price_change_percentage=24h`,
          {
            headers: {
              'X-CG-DEMO-API-KEY': apiKey
            }
          }
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        
        const data = await response.json();
        setCryptoData(data);
      } catch (error) {
        console.error("Error fetching CoinGecko data:", error);
        toast.error("Failed to retrieve crypto market data");
      } finally {
        setLoading(false);
      }
    };

    fetchCryptoData();
    
    // Refresh data every 30 minutes
    const interval = setInterval(fetchCryptoData, 30 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  const formatPrice = (price: number) => {
    if (price < 1) {
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

  return (
    <div className="gotham-card p-8 rounded-lg mb-8">
      <h2 className="font-batman font-bold text-2xl text-bat-yellow mb-6">
        CRYPTO MARKET INTELLIGENCE
      </h2>
      
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="w-10 h-10 border-4 border-bat-yellow border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {cryptoData.map((crypto) => (
              <div key={crypto.id} className="p-4 bg-gotham-gray rounded-lg">
                <div className="flex items-center mb-2">
                  <img src={crypto.image} alt={crypto.name} className="w-6 h-6 mr-2" />
                  <div className="text-gray-300 font-bold text-sm">
                    {crypto.symbol.toUpperCase()}
                  </div>
                </div>
                <div className="text-lg font-mono font-bold">{formatPrice(crypto.current_price)}</div>
                <div className={`font-mono text-sm ${crypto.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {crypto.price_change_percentage_24h >= 0 ? '+' : ''}{crypto.price_change_percentage_24h?.toFixed(2)}%
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  Cap: {formatMarketCap(crypto.market_cap)}
                </div>
              </div>
            ))}
          </div>
          
          <p className="text-gray-400 text-sm text-center">
            Real-time crypto data from CoinGecko. Wayne Enterprises Digital Asset Division.
          </p>
        </>
      )}
    </div>
  );
};

export default CoinGeckoInsights;
