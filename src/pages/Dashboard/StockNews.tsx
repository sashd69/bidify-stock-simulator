import { ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const StockNews = () => {
  // Mock news data
  const mockNews = [
    {
      id: 1,
      title: "Apple Announces New AI Integration Across Product Line",
      source: "Tech Times",
      date: "2 hours ago",
      symbol: "AAPL",
      url: "#"
    },
    {
      id: 2,
      title: "Tesla Surpasses Production Targets in Q2",
      source: "EV News",
      date: "5 hours ago",
      symbol: "TSLA",
      url: "#"
    },
    {
      id: 3,
      title: "Microsoft's Azure Revenue Grows 40% Year-over-Year",
      source: "Cloud Computing Weekly",
      date: "8 hours ago",
      symbol: "MSFT",
      url: "#"
    },
    {
      id: 4,
      title: "Amazon Expands Same-Day Delivery to 15 New Markets",
      source: "Retail Insider",
      date: "12 hours ago",
      symbol: "AMZN",
      url: "#"
    },
    {
      id: 5,
      title: "NVIDIA Unveils Next-Generation Chip for AI Applications",
      source: "Semiconductor Today",
      date: "1 day ago",
      symbol: "NVDA",
      url: "#"
    }
  ];

  return (
    <div className="card">
      <h2 className="text-xl font-orbitron mb-4">Market News</h2>
      <div className="space-y-1">
        {mockNews.map((news, index) => (
          <motion.div 
            key={news.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex items-center p-3 rounded hover:bg-grid-blue/30 transition-colors"
          >
            <div className="flex-1">
              <div className="flex items-center mb-1">
                <span className="inline-block px-2 py-1 text-xs font-orbitron rounded bg-neon-blue/20 text-neon-blue mr-2">
                  {news.symbol}
                </span>
                <span className="text-white/50 text-xs">{news.date} · {news.source}</span>
              </div>
              <h3 className="text-white font-medium">{news.title}</h3>
            </div>
            <div>
              <a 
                href={news.url} 
                className="p-2 rounded-full hover:bg-grid-blue/40 transition-colors inline-flex"
                target="_blank" 
                rel="noopener noreferrer"
              >
                <ExternalLink size={16} className="text-neon-blue" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StockNews;