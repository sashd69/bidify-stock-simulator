import { useState } from 'react';
import { motion } from 'framer-motion';
import { mockLeaderboard } from '../../utils/mockData';
import { Trophy, ArrowUp, ArrowDown, ArrowRight, Medal, Search } from 'lucide-react';

const Leaderboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [timeFrame, setTimeFrame] = useState<'weekly' | 'monthly' | 'allTime'>('weekly');

  // Filter leaderboard data based on search
  const filteredLeaderboard = mockLeaderboard.filter(user => 
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get top 3 users
  const topUsers = filteredLeaderboard.slice(0, 3);
  const otherUsers = filteredLeaderboard.slice(3);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold font-orbitron text-gradient mb-2">Leaderboard</h1>
        <p className="text-white/70">See who's topping the trading charts.</p>
      </motion.div>

      {/* Time frame selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex justify-between items-center"
      >
        <div className="flex space-x-2">
          <button
            onClick={() => setTimeFrame('weekly')}
            className={`px-4 py-2 rounded-md font-orbitron text-sm ${
              timeFrame === 'weekly'
                ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue/50'
                : 'bg-dark-blue/50 text-white/70 hover:bg-grid-blue/30 border border-grid-blue/30'
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => setTimeFrame('monthly')}
            className={`px-4 py-2 rounded-md font-orbitron text-sm ${
              timeFrame === 'monthly'
                ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue/50'
                : 'bg-dark-blue/50 text-white/70 hover:bg-grid-blue/30 border border-grid-blue/30'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setTimeFrame('allTime')}
            className={`px-4 py-2 rounded-md font-orbitron text-sm ${
              timeFrame === 'allTime'
                ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue/50'
                : 'bg-dark-blue/50 text-white/70 hover:bg-grid-blue/30 border border-grid-blue/30'
            }`}
          >
            All Time
          </button>
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search size={16} className="text-white/50" />
          </div>
          <input
            type="text"
            className="bg-dark-blue/50 border border-grid-blue/50 text-white text-sm rounded-lg 
                     focus:ring-neon-blue focus:border-neon-blue block w-full pl-10 p-2.5"
            placeholder="Search players"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </motion.div>

      {/* Top 3 Winners Podium */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative h-64 flex items-end justify-center gap-6 mb-12"
      >
        {topUsers.map((user, index) => {
          // Define podium heights and medal colors
          const heights = ['h-40', 'h-56', 'h-32'];
          const medalColors = ['text-white', 'text-yellow-400', 'text-amber-600'];
          const positions = [1, 0, 2]; // 1st in middle, 2nd on left, 3rd on right
          const pos = positions[index];
          
          return (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + (pos * 0.1) }}
              className="relative flex flex-col items-center"
            >
              <div className="absolute -top-8 flex flex-col items-center">
                <div className={`text-2xl ${medalColors[pos]}`}>
                  {pos === 0 && <Trophy size={32} />}
                  {pos === 1 && <Medal size={28} />}
                  {pos === 2 && <Medal size={24} />}
                </div>
                <p className="text-xs text-white/70 mt-1">#{pos + 1}</p>
              </div>
              
              <div className="bg-grid-blue/30 w-24 rounded-t-lg flex flex-col items-center p-3">
                <p className="font-orbitron text-sm truncate max-w-full">{user.username}</p>
                <p className="text-neon-cyan font-orbitron text-xs">${user.portfolioValue.toLocaleString()}</p>
                <div className="flex items-center text-xs mt-1">
                  <span className={user.weeklyReturn >= 0 ? 'text-success' : 'text-error'}>
                    {user.weeklyReturn >= 0 ? '+' : ''}{user.weeklyReturn}%
                  </span>
                </div>
              </div>
              
              <div className={`${heights[pos]} w-24 bg-gradient-to-t from-neon-blue/50 to-neon-cyan/30 rounded-t-lg border-t border-x border-neon-blue/50`}>
              </div>
            </motion.div>
          );
        })}
        
        {/* Podium base */}
        <div className="absolute bottom-0 w-full h-4 bg-gradient-to-r from-dark-blue via-neon-blue/30 to-dark-blue rounded"></div>
      </motion.div>

      {/* Leaderboard Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="card"
      >
        <h2 className="text-xl font-orbitron mb-6">Rankings</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-grid-blue/30">
                <th className="text-left py-3 px-4 text-white/70 font-normal">Rank</th>
                <th className="text-left py-3 px-4 text-white/70 font-normal">Trader</th>
                <th className="text-right py-3 px-4 text-white/70 font-normal">Portfolio Value</th>
                <th className="text-right py-3 px-4 text-white/70 font-normal">
                  {timeFrame === 'weekly' && 'Weekly Return'}
                  {timeFrame === 'monthly' && 'Monthly Return'}
                  {timeFrame === 'allTime' && 'All-Time Return'}
                </th>
                <th className="text-right py-3 px-4 text-white/70 font-normal">Change</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeaderboard.map((user, index) => {
                const rankChange = user.previousRank - user.rank;
                
                return (
                  <tr 
                    key={user.id} 
                    className={`border-b border-grid-blue/20 hover:bg-grid-blue/20 transition-colors ${
                      index < 3 ? 'bg-grid-blue/10' : ''
                    }`}
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full mr-2 font-orbitron text-sm
                                        ${index === 0 ? 'bg-yellow-400/20 text-yellow-400' : 
                                          index === 1 ? 'bg-gray-300/20 text-gray-300' : 
                                          index === 2 ? 'bg-amber-600/20 text-amber-600' : 
                                          'bg-grid-blue/30 text-white/70'}`}>
                          {user.rank}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-orbitron">{user.username}</td>
                    <td className="py-4 px-4 text-right font-medium">${user.portfolioValue.toLocaleString()}</td>
                    <td className="py-4 px-4 text-right">
                      <span className={user.weeklyReturn >= 0 ? 'text-success' : 'text-error'}>
                        {user.weeklyReturn >= 0 ? '+' : ''}{user.weeklyReturn}%
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end">
                        {rankChange > 0 ? (
                          <div className="flex items-center text-success">
                            <ArrowUp size={14} className="mr-1" />
                            <span>{rankChange}</span>
                          </div>
                        ) : rankChange < 0 ? (
                          <div className="flex items-center text-error">
                            <ArrowDown size={14} className="mr-1" />
                            <span>{Math.abs(rankChange)}</span>
                          </div>
                        ) : (
                          <div className="flex items-center text-white/50">
                            <ArrowRight size={14} className="mr-1" />
                            <span>0</span>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          
          {filteredLeaderboard.length === 0 && (
            <div className="text-center py-8 text-white/50">
              No traders match your search.
            </div>
          )}
        </div>
      </motion.div>

      {/* Tips for climbing the leaderboard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="card bg-gradient-to-br from-grid-blue/30 to-dark-blue/80"
      >
        <h2 className="text-xl font-orbitron mb-4">Climb the Leaderboard</h2>
        <ul className="space-y-3 text-white/80">
          <li className="flex items-start">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-neon-blue/20 flex items-center justify-center mr-3 mt-1">
              <span className="text-neon-blue text-xs">1</span>
            </div>
            <p>Complete trading challenges to earn bonus points and rewards.</p>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-neon-blue/20 flex items-center justify-center mr-3 mt-1">
              <span className="text-neon-blue text-xs">2</span>
            </div>
            <p>Diversify your portfolio to minimize risk and maximize consistent returns.</p>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-neon-blue/20 flex items-center justify-center mr-3 mt-1">
              <span className="text-neon-blue text-xs">3</span>
            </div>
            <p>Practice timing your trades during market fluctuations for optimal gains.</p>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-neon-blue/20 flex items-center justify-center mr-3 mt-1">
              <span className="text-neon-blue text-xs">4</span>
            </div>
            <p>Stay updated with market news and trade frequently to catch opportunities.</p>
          </li>
        </ul>
      </motion.div>
    </div>
  );
};

export default Leaderboard;