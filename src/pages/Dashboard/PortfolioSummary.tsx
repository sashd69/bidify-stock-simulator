import { ArrowUpRight, ArrowDownRight, Layers, DollarSign, BarChart3, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

interface PortfolioSummaryProps {
  currentValue: number;
  weeklyChange: number;
  weeklyChangePercent: number;
}

const PortfolioSummary: React.FC<PortfolioSummaryProps> = ({ 
  currentValue, 
  weeklyChange, 
  weeklyChangePercent 
}) => {
  const isPositive = weeklyChange >= 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Portfolio Value Card */}
      <motion.div 
        className="card h-40 relative overflow-hidden"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/20 to-transparent" />
        <div className="absolute top-0 right-0 p-4">
          <Layers size={24} className="text-neon-blue" />
        </div>
        <div className="relative h-full flex flex-col justify-between p-4">
          <div>
            <p className="text-white/70 mb-1">Portfolio Value</p>
            <h3 className="text-2xl font-orbitron text-white">${currentValue.toLocaleString()}</h3>
          </div>
          <div className="flex items-center text-sm">
            <div className={`flex items-center ${isPositive ? 'text-success' : 'text-error'}`}>
              {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
              <span className="ml-1">{weeklyChangePercent.toFixed(2)}%</span>
            </div>
            <span className="text-white/50 ml-2">this week</span>
          </div>
        </div>
      </motion.div>

      {/* Available Cash Card */}
      <motion.div 
        className="card h-40 relative overflow-hidden"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-success/20 to-transparent" />
        <div className="absolute top-0 right-0 p-4">
          <DollarSign size={24} className="text-success" />
        </div>
        <div className="relative h-full flex flex-col justify-between p-4">
          <div>
            <p className="text-white/70 mb-1">Available Cash</p>
            <h3 className="text-2xl font-orbitron text-white">$25,438.92</h3>
          </div>
          <div className="text-sm text-white/50">
            24.5% of portfolio
          </div>
        </div>
      </motion.div>

      {/* Day's Gain/Loss Card */}
      <motion.div 
        className="card h-40 relative overflow-hidden"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/20 to-transparent" />
        <div className="absolute top-0 right-0 p-4">
          <BarChart3 size={24} className="text-neon-cyan" />
        </div>
        <div className="relative h-full flex flex-col justify-between p-4">
          <div>
            <p className="text-white/70 mb-1">Today's Gain/Loss</p>
            <h3 className="text-2xl font-orbitron text-success">+$876.45</h3>
          </div>
          <div className="flex items-center text-sm">
            <div className="flex items-center text-success">
              <ArrowUpRight size={16} />
              <span className="ml-1">0.82%</span>
            </div>
            <span className="text-white/50 ml-2">today</span>
          </div>
        </div>
      </motion.div>

      {/* Total Return Card */}
      <motion.div 
        className="card h-40 relative overflow-hidden"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/20 to-transparent" />
        <div className="absolute top-0 right-0 p-4">
          <TrendingUp size={24} className="text-neon-purple" />
        </div>
        <div className="relative h-full flex flex-col justify-between p-4">
          <div>
            <p className="text-white/70 mb-1">Total Return</p>
            <h3 className="text-2xl font-orbitron text-white">+$15,800.00</h3>
          </div>
          <div className="flex items-center text-sm">
            <div className="flex items-center text-success">
              <ArrowUpRight size={16} />
              <span className="ml-1">15.8%</span>
            </div>
            <span className="text-white/50 ml-2">all time</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PortfolioSummary;