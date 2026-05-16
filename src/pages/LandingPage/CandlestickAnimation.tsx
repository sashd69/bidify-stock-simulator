import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Candlestick {
  id: number;
  isPositive: boolean;
  height: number;
  wickTop: number;
  wickBottom: number;
}

const CandlestickAnimation = () => {
  const [candlesticks, setCandlesticks] = useState<Candlestick[]>([]);
  
  useEffect(() => {
    // Generate initial candlesticks
    const initialCandlesticks = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      isPositive: Math.random() > 0.4,
      height: 30 + Math.random() * 60,
      wickTop: 5 + Math.random() * 15,
      wickBottom: 5 + Math.random() * 15
    }));
    
    setCandlesticks(initialCandlesticks);
    
    // Update candlesticks periodically
    const interval = setInterval(() => {
      setCandlesticks(prev => {
        // Remove first candlestick and add a new one
        const newCandlesticks = [...prev.slice(1)];
        
        // Base new candlestick on the last one
        const lastCandle = newCandlesticks[newCandlesticks.length - 1];
        const lastPrice = lastCandle.height;
        
        // Create random price movement
        const priceChange = (Math.random() - 0.5) * 30;
        const newPrice = Math.max(20, Math.min(90, lastPrice + priceChange));
        const isPositive = newPrice > lastPrice;
        
        newCandlesticks.push({
          id: lastCandle.id + 1,
          isPositive,
          height: newPrice,
          wickTop: 5 + Math.random() * 15,
          wickBottom: 5 + Math.random() * 15
        });
        
        return newCandlesticks;
      });
    }, 1500);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-md h-80 p-4 card">
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      
      <div className="relative h-full flex items-end justify-around">
        <AnimatePresence>
          {candlesticks.map((candle, index) => (
            <motion.div
              key={candle.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ 
                opacity: 1,
                height: candle.height,
                transition: { duration: 0.5 }
              }}
              exit={{ opacity: 0, width: 0 }}
              className={`relative w-5 rounded ${
                candle.isPositive ? 'bg-success/80' : 'bg-error/80'
              }`}
              style={{
                boxShadow: candle.isPositive 
                  ? '0 0 10px rgba(0, 245, 160, 0.5)' 
                  : '0 0 10px rgba(255, 7, 58, 0.5)'
              }}
            >
              {/* Top wick */}
              <motion.div
                initial={{ height: 0 }}
                animate={{ 
                  height: candle.wickTop,
                  transition: { duration: 0.3, delay: 0.2 }
                }}
                className="absolute top-0 left-1/2 w-0.5 bg-white/80"
                style={{ transform: 'translate(-50%, -100%)' }}
              />
              
              {/* Bottom wick */}
              <motion.div
                initial={{ height: 0 }}
                animate={{ 
                  height: candle.wickBottom,
                  transition: { duration: 0.3, delay: 0.2 }
                }}
                className="absolute bottom-0 left-1/2 w-0.5 bg-white/80"
                style={{ transform: 'translate(-50%, 100%)' }}
              />
              
              {/* Price indicator (only on last candle) */}
              {index === candlesticks.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="absolute -right-16 top-0 bg-dark-blue/90 px-2 py-1 text-xs font-orbitron rounded border border-grid-blue/50"
                >
                  <span className={candle.isPositive ? 'text-success' : 'text-error'}>
                    ${(200 + candle.height * 2).toFixed(2)}
                  </span>
                </motion.div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      {/* Chart grid lines */}
      <div className="absolute inset-x-0 top-1/4 border-t border-grid-blue/30" />
      <div className="absolute inset-x-0 top-1/2 border-t border-grid-blue/30" />
      <div className="absolute inset-x-0 top-3/4 border-t border-grid-blue/30" />
      
      {/* Chart labels */}
      <div className="absolute -left-2 top-1/4 transform -translate-y-1/2 text-xs text-white/50">$400</div>
      <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 text-xs text-white/50">$300</div>
      <div className="absolute -left-2 top-3/4 transform -translate-y-1/2 text-xs text-white/50">$200</div>
    </div>
  );
};

export default CandlestickAnimation;