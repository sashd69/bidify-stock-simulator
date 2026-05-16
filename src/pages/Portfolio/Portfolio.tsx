import { useState } from 'react';
import { motion } from 'framer-motion';
import { Chart, registerables } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { mockHoldings } from '../../utils/mockData';
import { TrendingUp, TrendingDown, Search, ArrowUpDown } from 'lucide-react';

// Register Chart.js components
Chart.register(...registerables);

const Portfolio = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('symbol');
  const [sortDirection, setSortDirection] = useState('asc');

  // Calculate total portfolio value
  const totalPortfolioValue = mockHoldings.reduce((sum, holding) => sum + holding.totalValue, 0);

  // Prepare data for pie chart
  const chartData = {
    labels: mockHoldings.map(holding => holding.symbol),
    datasets: [
      {
        data: mockHoldings.map(holding => holding.totalValue),
        backgroundColor: [
          'rgba(0, 169, 255, 0.8)',
          'rgba(0, 255, 245, 0.8)',
          'rgba(138, 43, 226, 0.8)',
          'rgba(255, 20, 147, 0.8)',
          'rgba(0, 245, 160, 0.8)',
          'rgba(255, 193, 7, 0.8)',
        ],
        borderColor: 'rgba(4, 13, 33, 0.5)',
        borderWidth: 1,
        hoverOffset: 15,
      }
    ]
  };

  // Filter holdings based on search term
  const filteredHoldings = mockHoldings.filter(holding => 
    holding.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    holding.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort holdings
  const sortedHoldings = [...filteredHoldings].sort((a, b) => {
    let compareResult = 0;

    if (sortBy === 'symbol') {
      compareResult = a.symbol.localeCompare(b.symbol);
    } else if (sortBy === 'name') {
      compareResult = a.name.localeCompare(b.name);
    } else if (sortBy === 'quantity') {
      compareResult = a.quantity - b.quantity;
    } else if (sortBy === 'value') {
      compareResult = a.totalValue - b.totalValue;
    } else if (sortBy === 'profit') {
      compareResult = a.profit - b.profit;
    }

    return sortDirection === 'asc' ? compareResult : -compareResult;
  });

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDirection('asc');
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold font-orbitron text-gradient mb-2">Portfolio</h1>
        <p className="text-white/70">Manage and track your investments.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Portfolio Allocation Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="card lg:col-span-1"
        >
          <h2 className="text-xl font-orbitron mb-6">Portfolio Allocation</h2>
          <div className="h-80 flex items-center justify-center">
            <Doughnut 
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                cutout: '65%',
                plugins: {
                  legend: {
                    position: 'bottom',
                    labels: {
                      color: 'rgba(255, 255, 255, 0.7)',
                      font: {
                        family: "'Orbitron', sans-serif",
                        size: 10
                      },
                      padding: 20
                    }
                  },
                  tooltip: {
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
                        const value = context.raw as number;
                        const percentage = (value / totalPortfolioValue * 100).toFixed(1);
                        return `${context.label}: $${value.toLocaleString()} (${percentage}%)`;
                      }
                    }
                  }
                }
              }}
            />
          </div>
        </motion.div>

        {/* Holdings List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="card lg:col-span-2"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
            <h2 className="text-xl font-orbitron mb-2 sm:mb-0">Your Holdings</h2>
            
            <div className="relative w-full sm:w-64">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search size={16} className="text-white/50" />
              </div>
              <input
                type="text"
                className="bg-dark-blue/50 border border-grid-blue/50 text-white text-sm rounded-lg 
                           focus:ring-neon-blue focus:border-neon-blue block w-full pl-10 p-2.5"
                placeholder="Search by symbol or name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-grid-blue/30">
                  <th 
                    className="text-left py-3 px-2 text-white/70 font-normal cursor-pointer hover:text-white"
                    onClick={() => handleSort('symbol')}
                  >
                    <div className="flex items-center">
                      Symbol
                      {sortBy === 'symbol' && (
                        <ArrowUpDown size={14} className="ml-1" />
                      )}
                    </div>
                  </th>
                  <th 
                    className="text-left py-3 px-2 text-white/70 font-normal cursor-pointer hover:text-white"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center">
                      Name
                      {sortBy === 'name' && (
                        <ArrowUpDown size={14} className="ml-1" />
                      )}
                    </div>
                  </th>
                  <th 
                    className="text-right py-3 px-2 text-white/70 font-normal cursor-pointer hover:text-white"
                    onClick={() => handleSort('quantity')}
                  >
                    <div className="flex items-center justify-end">
                      Quantity
                      {sortBy === 'quantity' && (
                        <ArrowUpDown size={14} className="ml-1" />
                      )}
                    </div>
                  </th>
                  <th className="text-right py-3 px-2 text-white/70 font-normal">Avg. Price</th>
                  <th className="text-right py-3 px-2 text-white/70 font-normal">Current Price</th>
                  <th 
                    className="text-right py-3 px-2 text-white/70 font-normal cursor-pointer hover:text-white"
                    onClick={() => handleSort('value')}
                  >
                    <div className="flex items-center justify-end">
                      Total Value
                      {sortBy === 'value' && (
                        <ArrowUpDown size={14} className="ml-1" />
                      )}
                    </div>
                  </th>
                  <th 
                    className="text-right py-3 px-2 text-white/70 font-normal cursor-pointer hover:text-white"
                    onClick={() => handleSort('profit')}
                  >
                    <div className="flex items-center justify-end">
                      Profit/Loss
                      {sortBy === 'profit' && (
                        <ArrowUpDown size={14} className="ml-1" />
                      )}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedHoldings.map((holding, index) => (
                  <tr 
                    key={index} 
                    className="border-b border-grid-blue/20 hover:bg-grid-blue/20 transition-colors"
                  >
                    <td className="py-3 px-2 font-orbitron text-neon-blue">{holding.symbol}</td>
                    <td className="py-3 px-2">{holding.name}</td>
                    <td className="py-3 px-2 text-right">{holding.quantity}</td>
                    <td className="py-3 px-2 text-right">${holding.avgBuyPrice.toFixed(2)}</td>
                    <td className="py-3 px-2 text-right">${holding.currentPrice.toFixed(2)}</td>
                    <td className="py-3 px-2 text-right font-medium">${holding.totalValue.toLocaleString()}</td>
                    <td className="py-3 px-2 text-right">
                      <div className={`flex items-center justify-end ${holding.profit >= 0 ? 'text-success' : 'text-error'}`}>
                        {holding.profit >= 0 ? <TrendingUp size={14} className="mr-1" /> : <TrendingDown size={14} className="mr-1" />}
                        ${Math.abs(holding.profit).toFixed(2)} ({holding.profitPercent.toFixed(2)}%)
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredHoldings.length === 0 && (
            <div className="text-center py-8 text-white/50">
              No holdings match your search.
            </div>
          )}
        </motion.div>
      </div>

      {/* Performance Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { 
            title: "Total Portfolio Value", 
            value: `$${totalPortfolioValue.toLocaleString()}`, 
            subtext: "Based on current market prices",
            color: "from-neon-blue/20" 
          },
          { 
            title: "Total Profits", 
            value: "$3,218.76", 
            subtext: "Across all holdings",
            color: "from-success/20"
          },
          { 
            title: "Profit Percentage", 
            value: "15.44%", 
            subtext: "Return on investment",
            color: "from-neon-purple/20"
          }
        ].map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
            className="card relative overflow-hidden"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${metric.color} to-transparent`} />
            <div className="relative p-4">
              <h3 className="text-white/70 text-sm mb-2">{metric.title}</h3>
              <p className="text-3xl font-orbitron">{metric.value}</p>
              <p className="text-white/50 text-xs mt-2">{metric.subtext}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;