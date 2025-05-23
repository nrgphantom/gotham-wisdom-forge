
import React, { useState, useEffect } from 'react';
import { toast } from "sonner";

interface StockData {
  symbol: string;
  price: string;
  change: string;
  changePercent: string;
  isPositive: boolean;
}

const StockMarketInsights = () => {
  const [stockData, setStockData] = useState<StockData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const apiKey = "UKGSKJAABV7UTX8S";
  
  // Common stocks that Batman/Wayne Enterprises might track
  const stockSymbols = ['MSFT', 'AAPL', 'AMZN', 'TSLA', 'NVDA'];

  useEffect(() => {
    const fetchStockData = async () => {
      setLoading(true);
      try {
        const promises = stockSymbols.map(async (symbol) => {
          const response = await fetch(
            `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`
          );
          const data = await response.json();
          
          if (data["Global Quote"]) {
            const quote = data["Global Quote"];
            const price = quote["05. price"];
            const change = quote["09. change"];
            const changePercent = quote["10. change percent"];
            
            return {
              symbol,
              price: parseFloat(price).toFixed(2),
              change: parseFloat(change).toFixed(2),
              changePercent: changePercent,
              isPositive: parseFloat(change) >= 0
            };
          }
          return null;
        });
        
        const results = await Promise.all(promises);
        setStockData(results.filter((item): item is StockData => item !== null));
      } catch (error) {
        console.error("Error fetching stock data:", error);
        toast.error("Failed to retrieve market insights");
      } finally {
        setLoading(false);
      }
    };

    fetchStockData();
    
    // Refresh data every 30 minutes
    const interval = setInterval(fetchStockData, 30 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="gotham-card p-8 rounded-lg mb-8">
      <h2 className="font-batman font-bold text-2xl text-bat-yellow mb-6">
        WAYNE MARKET INSIGHTS
      </h2>
      
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="w-10 h-10 border-4 border-bat-yellow border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            {stockData.map((stock) => (
              <div key={stock.symbol} className="p-4 bg-gotham-gray rounded-lg">
                <div className="text-gray-300 font-bold mb-1">{stock.symbol}</div>
                <div className="text-xl font-mono font-bold">${stock.price}</div>
                <div className={`font-mono text-sm ${stock.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                  {stock.isPositive ? '+' : ''}{stock.change} ({stock.changePercent})
                </div>
              </div>
            ))}
          </div>
          
          <p className="text-gray-400 text-sm text-center">
            Latest market data from Alpha Vantage. Wayne Enterprises monitors these stocks daily.
          </p>
        </>
      )}
    </div>
  );
};

export default StockMarketInsights;
