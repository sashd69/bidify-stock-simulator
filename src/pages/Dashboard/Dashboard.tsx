import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { mockPortfolioHistory, mockHoldings, mockTrades } from '../../utils/mockData';
import PortfolioSummary from './PortfolioSummary';
import StockNews from './StockNews';
import { TrendingUp, TrendingDown } from 'lucide-react';

// Register Chart.js components
Chart.register(...registerables);

const Dashboard = () => {
  // Format data for the portfolio performance chart
  const [chartData, setChartData] = useState({
    labels: mockPortfolioHistory.map(entry => {
      const date = new Date(entry.date);
      return `${date.getMonth() + 1}/${date.getDate()}`;
    }),
    datasets: [
      {
        label: 'Portfolio Value',
        data: mockPortfolioHistory.map(entry => entry.value),
        fill: true,
        borderColor: '#00A9FF',
        backgroundColor: 'rgba(0, 169, 255, 0.1)',
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: '#00FFF5',
        pointHoverBorderColor: '#00FFF5',
        pointHoverBorderWidth: 2,
      }
    ]
  });

  // Calculate portfolio metrics
  const currentValue = mockPortfolioHistory[mockPortfolioHistory.length - 1].value;
  const previousValue = mockPortfolioHistory[mockPortfolioHistory.length - 8].value;
  const weeklyChange = currentValue - previousValue;
  const weeklyChangePercent = (weeklyChange / previousValue) * 100;

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold font-orbitron text-gradient mb-2">Dashboard</h1>
        <p className="text-white/70">Welcome back. Here's your trading overview.</p>
      </motion.div>

      {/* Portfolio Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <PortfolioSummary 
          currentValue={currentValue}
          weeklyChange={weeklyChange}
          weeklyChangePercent={weeklyChangePercent}
        />
      </motion.div>

      {/* Portfolio Performance Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="card"
      >
        <h2 className="text-xl font-orbitron mb-4">Portfolio Performance</h2>
        <div className="h-80">
          <Line 
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false
                },
                tooltip: {
                  mode: 'index',
                  intersect: false,
                  backgroundColor: 'rgba(4, 13, 33, 0.8)',
                  titleColor: '#00FFF5',
                  bodyColor: '#FFFFFF',
                  borderColor: 'rgba(0, 169, 255, 0.5)',
                  borderWidth: 1,
                  padding: 10,
                  titleFont: {
                    family: "'Orbitron', sans-serif",
                    size: 12
                  },
                  bodyFont: {
                    family: "'Roboto', sans-serif"
                  },
                  callbacks: {
                    label: function(context) {
                      return `$${context.raw.toLocaleString()}`;
                    }
                  }
                }
              },
              scales: {
                x: {
                  grid: {
                    color: 'rgba(12, 30, 62, 0.3)'
                  },
                  ticks: {
                    color: 'rgba(255, 255, 255, 0.7)'
                  }
                },
                y: {
                  grid: {
                    color: 'rgba(12, 30, 62, 0.3)'
                  },
                  ticks: {
                    color: 'rgba(255, 255, 255, 0.7)',
                    callback: function(value) {
                      return `$${value.toLocaleString()}`;
                    }
                  }
                }
              }
            }}
          />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Holdings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="card"
        >
          <h2 className="text-xl font-orbitron mb-4">Top Holdings</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-grid-blue/30">
                  <th className="text-left py-3 text-white/70 font-normal">Symbol</th>
                  <th className="text-left py-3 text-white/70 font-normal">Quantity</th>
                  <th className="text-right py-3 text-white/70 font-normal">Value</th>
                  <th className="text-right py-3 text-white/70 font-normal">Profit/Loss</th>
                </tr>
              </thead>
              <tbody>
                {mockHoldings.slice(0, 4).map((holding, index) => (
                  <tr key={index} className="border-b border-grid-blue/20">
                    <td className="py-3 font-orbitron text-white">{holding.symbol}</td>
                    <td className="py-3">{holding.quantity}</td>
                    <td className="py-3 text-right">${holding.totalValue.toLocaleString()}</td>
                    <td className="py-3 text-right">
                      <div className={`flex items-center justify-end ${holding.profit >= 0 ? 'text-success' : 'text-error'}`}>
                        {holding.profit >= 0 ? <TrendingUp size={14} className="mr-1" /> : <TrendingDown size={14} className="mr-1" />}
                        {holding.profit.toFixed(2)} ({holding.profitPercent.toFixed(2)}%)
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Recent Trades */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="card"
        >
          <h2 className="text-xl font-orbitron mb-4">Recent Trades</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-grid-blue/30">
                  <th className="text-left py-3 text-white/70 font-normal">Date</th>
                  <th className="text-left py-3 text-white/70 font-normal">Symbol</th>
                  <th className="text-left py-3 text-white/70 font-normal">Type</th>
                  <th className="text-right py-3 text-white/70 font-normal">Amount</th>
                </tr>
              </thead>
              <tbody>
                {mockTrades.slice(0, 5).map((trade, index) => (
                  <tr key={index} className="border-b border-grid-blue/20">
                    <td className="py-3 text-sm">
                      {new Date(trade.timestamp).toLocaleDateString()}
                    </td>
                    <td className="py-3 font-orbitron">{trade.symbol}</td>
                    <td className={`py-3 ${trade.type === 'buy' ? 'text-success' : 'text-error'}`}>
                      {trade.type.toUpperCase()}
                    </td>
                    <td className="py-3 text-right">${trade.total.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      {/* Market News */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <StockNews />
      </motion.div>
    </div>
  );
};

export default Dashboard;