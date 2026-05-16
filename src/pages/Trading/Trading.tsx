import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { mockStocks, getUpdatedStocks, Stock } from '../../utils/mockData';
import { Search, TrendingUp, TrendingDown, RefreshCw, Filter } from 'lucide-react';
import StockDetail from './StockDetail';

const Trading = () => {
  const [stocks, setStocks] = useState<Stock[]>(mockStocks);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [filterIndustry, setFilterIndustry] = useState<string>('');
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'ascending' | 'descending';
  }>({
    key: 'symbol',
    direction: 'ascending',
  });
  const [isLoading, setIsLoading] = useState(false);

  // Get unique industries from stocks
  const industries = Array.from(new Set(mockStocks.map(stock => stock.industry)));

  // Refresh stock data periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setStocks(getUpdatedStocks());
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Handle manual refresh
  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setStocks(getUpdatedStocks());
      setIsLoading(false);
    }, 800);
  };

  // Handle sort
  const requestSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    
    setSortConfig({ key, direction });
  };

  // Sort stocks
  const sortedStocks = [...stocks].sort((a, b) => {
    if (a[sortConfig.key as keyof Stock] < b[sortConfig.key as keyof Stock]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key as keyof Stock] > b[sortConfig.key as keyof Stock]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  // Filter stocks by search term and industry
  const filteredStocks = sortedStocks.filter(stock => {
    const matchesSearch = 
      stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesIndustry = filterIndustry === '' || stock.industry === filterIndustry;
    
    return matchesSearch && matchesIndustry;
  });

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold font-orbitron text-gradient mb-2">Trading</h1>
        <p className="text-white/70">Buy and sell stocks with real-time market data.</p>
      </motion.div>

      {/* Filters and Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-col md:flex-row justify-between gap-4"
      >
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search size={16} className="text-white/50" />
          </div>
          <input
            type="text"
            className="bg-dark-blue/50 border border-grid-blue/50 text-white text-sm rounded-lg 
                     focus:ring-neon-blue focus:border-neon-blue block w-full pl-10 p-3"
            placeholder="Search by symbol or company name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Filter size={16} className="text-white/50" />
            </div>
            <select
              className="bg-dark-blue/50 border border-grid-blue/50 text-white text-sm rounded-lg 
                         focus:ring-neon-blue focus:border-neon-blue block w-full pl-10 p-3 pr-8"
              value={filterIndustry}
              onChange={(e) => setFilterIndustry(e.target.value)}
            >
              <option value="">All Industries</option>
              {industries.map((industry, index) => (
                <option key={index} value={industry}>
                  {industry}
                </option>
              ))}
            </select>
          </div>
          
          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className="flex items-center justify-center bg-dark-blue/50 border border-grid-blue/50 
                     text-white rounded-lg p-3 focus:ring-neon-blue focus:border-neon-blue
                     hover:bg-grid-blue/30 transition-colors"
          >
            <RefreshCw size={16} className={`${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </motion.div>

      {/* Stocks Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="card"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-grid-blue/30">
                <th 
                  className="text-left py-4 px-4 text-white/70 font-normal cursor-pointer hover:text-white"
                  onClick={() => requestSort('symbol')}
                >
                  <div className="flex items-center">
                    Symbol
                    {sortConfig.key === 'symbol' && (
                      <span className="ml-1">
                        {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
                <th 
                  className="text-left py-4 px-4 text-white/70 font-normal cursor-pointer hover:text-white"
                  onClick={() => requestSort('name')}
                >
                  <div className="flex items-center">
                    Company
                    {sortConfig.key === 'name' && (
                      <span className="ml-1">
                        {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
                <th 
                  className="text-right py-4 px-4 text-white/70 font-normal cursor-pointer hover:text-white"
                  onClick={() => requestSort('price')}
                >
                  <div className="flex items-center justify-end">
                    Price
                    {sortConfig.key === 'price' && (
                      <span className="ml-1">
                        {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
                <th 
                  className="text-right py-4 px-4 text-white/70 font-normal cursor-pointer hover:text-white"
                  onClick={() => requestSort('changePercent')}
                >
                  <div className="flex items-center justify-end">
                    Change
                    {sortConfig.key === 'changePercent' && (
                      <span className="ml-1">
                        {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
                <th className="text-right py-4 px-4 text-white/70 font-normal">Volume</th>
                <th className="text-center py-4 px-4 text-white/70 font-normal">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredStocks.map((stock, index) => (
                <tr 
                  key={index} 
                  className="border-b border-grid-blue/20 hover:bg-grid-blue/20 transition-colors"
                >
                  <td className="py-4 px-4 font-orbitron text-neon-blue">{stock.symbol}</td>
                  <td className="py-4 px-4">
                    <div className="flex flex-col">
                      <span className="text-white">{stock.name}</span>
                      <span className="text-white/50 text-xs">{stock.industry}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right font-medium">${stock.price.toFixed(2)}</td>
                  <td className="py-4 px-4 text-right">
                    <div className={`flex items-center justify-end ${stock.change >= 0 ? 'text-success' : 'text-error'}`}>
                      {stock.change >= 0 ? <TrendingUp size={14} className="mr-1" /> : <TrendingDown size={14} className="mr-1" />}
                      {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right text-white/70">
                    {(stock.volume / 1000000).toFixed(2)}M
                  </td>
                  <td className="py-4 px-4 text-center">
                    <button
                      onClick={() => {
                        setSelectedStock(stock);
                        setIsDetailOpen(true);
                      }}
                      className="neon-button-filled py-1 px-3 text-sm"
                    >
                      Trade
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredStocks.length === 0 && (
            <div className="text-center py-8 text-white/50">
              No stocks match your search criteria.
            </div>
          )}
        </div>
      </motion.div>

      {/* Stock Detail Modal */}
      {selectedStock && (
        <StockDetail 
          stock={selectedStock} 
          isOpen={isDetailOpen} 
          onClose={() => setIsDetailOpen(false)} 
        />
      )}
    </div>
  );
};

export default Trading;