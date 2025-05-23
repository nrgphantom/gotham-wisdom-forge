
import React, { useState, useEffect } from 'react';
import { toast } from "sonner";

interface AssetData {
  symbol: string;
  price: string;
  change: string;
  changePercent: string;
  isPositive: boolean;
  assetType?: 'stock' | 'crypto' | 'commodity';
}

const StockMarketInsights = () => {
  const [assetData, setAssetData] = useState<AssetData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const apiKey = "UKGSKJAABV7UTX8S";
  
  // Assets that Batman/Wayne Enterprises might track
  const stockSymbols = ['MSFT', 'AAPL', 'AMZN', 'TSLA', 'NVDA'];
  const cryptoSymbols = ['BTC', 'ETH', 'SOL'];
  const commoditySymbols = ['XAUUSD']; // Gold

  useEffect(() => {
    const fetchStockData = async () => {
      setLoading(true);
      try {
        // Fetch stock data
        const stockPromises = stockSymbols.map(async (symbol) => {
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
              isPositive: parseFloat(change) >= 0,
              assetType: 'stock'
            };
          }
          return null;
        });

        // Fetch crypto data
        const cryptoPromises = cryptoSymbols.map(async (symbol) => {
          try {
            const response = await fetch(
              `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${symbol}&to_currency=USD&apikey=${apiKey}`
            );
            const data = await response.json();
            
            if (data["Realtime Currency Exchange Rate"]) {
              const exchangeRate = data["Realtime Currency Exchange Rate"];
              const price = parseFloat(exchangeRate["5. Exchange Rate"]).toFixed(2);
              
              return {
                symbol,
                price,
                change: "0.00", // AlphaVantage free tier doesn't provide change for crypto in this endpoint
                changePercent: "0.00%",
                isPositive: true,
                assetType: 'crypto'
              };
            }
            return null;
          } catch (error) {
            console.error(`Error fetching ${symbol} data:`, error);
            return null;
          }
        });

        // Fetch commodity data (Gold - XAUUSD)
        const commodityPromises = commoditySymbols.map(async (symbol) => {
          try {
            const response = await fetch(
              `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=XAU&to_currency=USD&apikey=${apiKey}`
            );
            const data = await response.json();
            
            if (data["Realtime Currency Exchange Rate"]) {
              const exchangeRate = data["Realtime Currency Exchange Rate"];
              const price = parseFloat(exchangeRate["5. Exchange Rate"]).toFixed(2);
              
              return {
                symbol: "GOLD",
                price,
                change: "0.00", // AlphaVantage free tier doesn't provide change for commodities in this endpoint
                changePercent: "0.00%",
                isPositive: true,
                assetType: 'commodity'
              };
            }
            return null;
          } catch (error) {
            console.error(`Error fetching Gold data:`, error);
            return null;
          }
        });
        
        // Combine all promises
        const allPromises = [...stockPromises, ...cryptoPromises, ...commodityPromises];
        const results = await Promise.all(allPromises);
        setAssetData(results.filter((item): item is AssetData => item !== null));
      } catch (error) {
        console.error("Error fetching asset data:", error);
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
            {assetData.map((asset) => (
              <div key={asset.symbol} className="p-4 bg-gotham-gray rounded-lg">
                <div className="text-gray-300 font-bold mb-1">
                  {asset.symbol}
                  {asset.assetType === 'crypto' && <span className="ml-1 text-xs text-bat-yellow">CRYPTO</span>}
                  {asset.assetType === 'commodity' && <span className="ml-1 text-xs text-bat-yellow">GOLD</span>}
                </div>
                <div className="text-xl font-mono font-bold">${asset.price}</div>
                <div className={`font-mono text-sm ${asset.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                  {asset.isPositive ? '+' : ''}{asset.change} ({asset.changePercent})
                </div>
              </div>
            ))}
          </div>
          
          <p className="text-gray-400 text-sm text-center">
            Latest market data from Alpha Vantage. Wayne Enterprises monitors these assets daily.
          </p>
        </>
      )}
    </div>
  );
};

export default StockMarketInsights;
