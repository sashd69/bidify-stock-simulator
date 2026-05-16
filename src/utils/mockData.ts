// Mock data for the stock market simulator

export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  industry: string;
  volume: number;
}

export interface Trade {
  id: string;
  symbol: string;
  type: 'buy' | 'sell';
  quantity: number;
  price: number;
  total: number;
  timestamp: Date;
}

export interface StockHolding {
  symbol: string;
  name: string;
  quantity: number;
  avgBuyPrice: number;
  currentPrice: number;
  totalValue: number;
  profit: number;
  profitPercent: number;
}

export interface LeaderboardUser {
  id: string;
  username: string;
  portfolioValue: number;
  weeklyReturn: number;
  rank: number;
  previousRank: number;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  reward: number;
  progress: number;
  deadline: Date;
  completed: boolean;
}

// Generate mock stocks
export const mockStocks: Stock[] = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 172.34,
    change: 2.34,
    changePercent: 1.37,
    industry: 'Technology',
    volume: 58432100
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    price: 378.56,
    change: 3.22,
    changePercent: 0.86,
    industry: 'Technology',
    volume: 25678900
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    price: 178.12,
    change: -1.23,
    changePercent: -0.68,
    industry: 'Consumer Cyclical',
    volume: 33456700
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    price: 141.28,
    change: 1.56,
    changePercent: 1.12,
    industry: 'Technology',
    volume: 16789500
  },
  {
    symbol: 'META',
    name: 'Meta Platforms Inc.',
    price: 472.95,
    change: -4.38,
    changePercent: -0.92,
    industry: 'Technology',
    volume: 19874300
  },
  {
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    price: 218.96,
    change: 5.67,
    changePercent: 2.66,
    industry: 'Automotive',
    volume: 94562100
  },
  {
    symbol: 'NFLX',
    name: 'Netflix Inc.',
    price: 612.13,
    change: 8.94,
    changePercent: 1.48,
    industry: 'Entertainment',
    volume: 7856200
  },
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    price: 924.67,
    change: 12.45,
    changePercent: 1.36,
    industry: 'Technology',
    volume: 42567800
  },
  {
    symbol: 'JPM',
    name: 'JPMorgan Chase & Co.',
    price: 195.23,
    change: -1.45,
    changePercent: -0.74,
    industry: 'Financial Services',
    volume: 12345600
  },
  {
    symbol: 'DIS',
    name: 'The Walt Disney Company',
    price: 103.48,
    change: 0.26,
    changePercent: 0.25,
    industry: 'Entertainment',
    volume: 9876500
  }
];

// Mock portfolio holdings
export const mockHoldings: StockHolding[] = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    quantity: 10,
    avgBuyPrice: 165.20,
    currentPrice: 172.34,
    totalValue: 1723.40,
    profit: 71.40,
    profitPercent: 4.32
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    quantity: 5,
    avgBuyPrice: 350.45,
    currentPrice: 378.56,
    totalValue: 1892.80,
    profit: 140.55,
    profitPercent: 8.02
  },
  {
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    quantity: 8,
    avgBuyPrice: 230.10,
    currentPrice: 218.96,
    totalValue: 1751.68,
    profit: -89.12,
    profitPercent: -4.84
  },
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    quantity: 3,
    avgBuyPrice: 880.25,
    currentPrice: 924.67,
    totalValue: 2774.01,
    profit: 133.26,
    profitPercent: 5.05
  }
];

// Mock recent trades
export const mockTrades: Trade[] = [
  {
    id: '1',
    symbol: 'AAPL',
    type: 'buy',
    quantity: 5,
    price: 170.25,
    total: 851.25,
    timestamp: new Date('2025-04-10T10:30:00')
  },
  {
    id: '2',
    symbol: 'NVDA',
    type: 'buy',
    quantity: 2,
    price: 915.50,
    total: 1831.00,
    timestamp: new Date('2025-04-09T14:45:00')
  },
  {
    id: '3',
    symbol: 'AMZN',
    type: 'sell',
    quantity: 3,
    price: 180.30,
    total: 540.90,
    timestamp: new Date('2025-04-08T11:15:00')
  },
  {
    id: '4',
    symbol: 'MSFT',
    type: 'buy',
    quantity: 1,
    price: 375.80,
    total: 375.80,
    timestamp: new Date('2025-04-07T09:20:00')
  },
  {
    id: '5',
    symbol: 'TSLA',
    type: 'buy',
    quantity: 4,
    price: 210.40,
    total: 841.60,
    timestamp: new Date('2025-04-05T15:10:00')
  }
];

// Mock leaderboard data
export const mockLeaderboard: LeaderboardUser[] = [
  {
    id: '101',
    username: 'tradingmaster',
    portfolioValue: 152480.75,
    weeklyReturn: 3.2,
    rank: 1,
    previousRank: 2
  },
  {
    id: '102',
    username: 'stockguru',
    portfolioValue: 143950.30,
    weeklyReturn: 2.5,
    rank: 2,
    previousRank: 1
  },
  {
    id: '103',
    username: 'wallstreetpro',
    portfolioValue: 138720.60,
    weeklyReturn: 4.1,
    rank: 3,
    previousRank: 4
  },
  {
    id: '104',
    username: 'investorelite',
    portfolioValue: 129840.25,
    weeklyReturn: 1.8,
    rank: 4,
    previousRank: 3
  },
  {
    id: '105',
    username: 'marketwhiz',
    portfolioValue: 128350.10,
    weeklyReturn: 2.9,
    rank: 5,
    previousRank: 6
  },
  {
    id: '106',
    username: 'bullbearer',
    portfolioValue: 124567.80,
    weeklyReturn: 1.5,
    rank: 6,
    previousRank: 5
  },
  {
    id: '107',
    username: 'wealthbuilder',
    portfolioValue: 121980.50,
    weeklyReturn: 0.9,
    rank: 7,
    previousRank: 8
  },
  {
    id: '108',
    username: 'daytrader',
    portfolioValue: 116740.25,
    weeklyReturn: -1.2,
    rank: 8,
    previousRank: 7
  },
  {
    id: '109',
    username: 'cryptoking',
    portfolioValue: 112890.75,
    weeklyReturn: 3.4,
    rank: 9,
    previousRank: 12
  },
  {
    id: '110',
    username: 'investmentninja',
    portfolioValue: 108450.30,
    weeklyReturn: 0.6,
    rank: 10,
    previousRank: 9
  }
];

// Mock challenges
export const mockChallenges: Challenge[] = [
  {
    id: '1',
    title: 'Beat the Market',
    description: 'Achieve a 5% higher return than the S&P 500 index this week',
    reward: 10000,
    progress: 45,
    deadline: new Date('2025-04-20'),
    completed: false
  },
  {
    id: '2',
    title: 'Diversification Pro',
    description: 'Own stocks from at least 5 different sectors',
    reward: 5000,
    progress: 60,
    deadline: new Date('2025-04-25'),
    completed: false
  },
  {
    id: '3',
    title: 'Trading Volume',
    description: 'Execute at least 20 trades this month',
    reward: 8000,
    progress: 30,
    deadline: new Date('2025-04-30'),
    completed: false
  },
  {
    id: '4',
    title: 'Diamond Hands',
    description: 'Hold a stock for more than 2 weeks while it experiences at least one 5% drop',
    reward: 7500,
    progress: 75,
    deadline: new Date('2025-04-22'),
    completed: false
  },
  {
    id: '5',
    title: 'Risk Management',
    description: 'Maintain a portfolio with no single stock comprising more than 20% of total value',
    reward: 6000,
    progress: 100,
    deadline: new Date('2025-04-15'),
    completed: true
  }
];

// Mock portfolio performance over time (for charts)
export const mockPortfolioHistory = [
  { date: '2025-03-15', value: 97500 },
  { date: '2025-03-16', value: 98200 },
  { date: '2025-03-17', value: 99100 },
  { date: '2025-03-18', value: 100500 },
  { date: '2025-03-19', value: 100200 },
  { date: '2025-03-20', value: 101400 },
  { date: '2025-03-21', value: 102300 },
  { date: '2025-03-22', value: 101800 },
  { date: '2025-03-23', value: 102500 },
  { date: '2025-03-24', value: 103200 },
  { date: '2025-03-25', value: 102900 },
  { date: '2025-03-26', value: 104100 },
  { date: '2025-03-27', value: 105200 },
  { date: '2025-03-28', value: 104500 },
  { date: '2025-03-29', value: 105800 },
  { date: '2025-03-30', value: 106700 },
  { date: '2025-03-31', value: 107400 },
  { date: '2025-04-01', value: 106900 },
  { date: '2025-04-02', value: 107800 },
  { date: '2025-04-03', value: 108300 },
  { date: '2025-04-04', value: 109100 },
  { date: '2025-04-05', value: 108700 },
  { date: '2025-04-06', value: 109500 },
  { date: '2025-04-07', value: 110200 },
  { date: '2025-04-08', value: 111400 },
  { date: '2025-04-09', value: 112300 },
  { date: '2025-04-10', value: 113500 },
  { date: '2025-04-11', value: 114200 },
  { date: '2025-04-12', value: 113800 },
  { date: '2025-04-13', value: 114700 },
  { date: '2025-04-14', value: 115800 }
];

// Function to get random price movement (for simulating real-time updates)
export function getRandomPriceChange() {
  return (Math.random() - 0.5) * 2; // Random value between -1 and 1
}

// Function to simulate real-time stock updates
export function getUpdatedStocks() {
  return mockStocks.map(stock => {
    const change = getRandomPriceChange();
    const newPrice = parseFloat((stock.price + change).toFixed(2));
    const newChange = parseFloat((stock.change + change).toFixed(2));
    const newChangePercent = parseFloat(((newChange / (newPrice - newChange)) * 100).toFixed(2));
    
    return {
      ...stock,
      price: newPrice,
      change: newChange,
      changePercent: newChangePercent
    };
  });
}