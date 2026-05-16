import { useState } from 'react';
import { motion } from 'framer-motion';
import { mockChallenges } from '../../utils/mockData';
import { Award, Check, Clock, Info, Sparkles, Trophy, TrendingUp } from 'lucide-react';

const Challenges = () => {
  const [selectedChallenge, setSelectedChallenge] = useState(mockChallenges[0]);
  
  // Filter active and completed challenges
  const activeChallengers = mockChallenges.filter(challenge => !challenge.completed);
  const completedChallenges = mockChallenges.filter(challenge => challenge.completed);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold font-orbitron text-gradient mb-2">Challenges</h1>
        <p className="text-white/70">Complete challenges to earn rewards and boost your portfolio.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Challenge List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-1 space-y-6"
        >
          {/* Active Challenges */}
          <div className="card">
            <h2 className="text-xl font-orbitron mb-4 flex items-center">
              <Trophy size={20} className="text-neon-cyan mr-2" />
              Active Challenges
            </h2>
            
            <div className="space-y-3">
              {activeChallengers.map((challenge) => (
                <motion.button
                  key={challenge.id}
                  onClick={() => setSelectedChallenge(challenge)}
                  className={`w-full text-left p-3 rounded-lg transition-all ${
                    selectedChallenge.id === challenge.id
                      ? 'bg-neon-blue/20 border border-neon-blue/50'
                      : 'bg-grid-blue/20 border border-grid-blue/30 hover:bg-grid-blue/30'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-orbitron text-white">
                      {challenge.title}
                    </h3>
                    <div className="flex items-center text-xs text-white/70">
                      <Clock size={12} className="mr-1" />
                      {new Date(challenge.deadline).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <div className="mb-2 h-2 bg-dark-blue/70 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-neon-cyan" 
                      style={{ width: `${challenge.progress}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between items-center text-xs text-white/70">
                    <span>{challenge.progress}% complete</span>
                    <span className="text-neon-cyan font-orbitron">+${challenge.reward.toLocaleString()}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
          
          {/* Completed Challenges */}
          {completedChallenges.length > 0 && (
            <div className="card">
              <h2 className="text-xl font-orbitron mb-4 flex items-center">
                <Check size={20} className="text-success mr-2" />
                Completed Challenges
              </h2>
              
              <div className="space-y-3">
                {completedChallenges.map((challenge) => (
                  <motion.button
                    key={challenge.id}
                    onClick={() => setSelectedChallenge(challenge)}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      selectedChallenge.id === challenge.id
                        ? 'bg-success/20 border border-success/50'
                        : 'bg-grid-blue/20 border border-grid-blue/30 hover:bg-grid-blue/30'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-orbitron text-white">
                        {challenge.title}
                      </h3>
                      <div className="bg-success/20 text-success text-xs py-1 px-2 rounded">
                        Completed
                      </div>
                    </div>
                    
                    <div className="mb-2 h-2 bg-dark-blue/70 rounded-full overflow-hidden">
                      <div className="h-full bg-success" style={{ width: '100%' }}></div>
                    </div>
                    
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-white/70">100% complete</span>
                      <span className="text-success font-orbitron">+${challenge.reward.toLocaleString()}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Challenge Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <div className="card h-full flex flex-col">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-orbitron text-gradient">
                {selectedChallenge.title}
              </h2>
              
              <div className={`flex items-center text-xs py-1 px-3 rounded ${
                selectedChallenge.completed
                  ? 'bg-success/20 text-success' 
                  : 'bg-neon-blue/20 text-neon-blue'
              }`}>
                {selectedChallenge.completed ? 'Completed' : 'In Progress'}
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6 mb-6">
              <div className="flex-1 bg-grid-blue/20 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Info size={16} className="text-white/70 mr-2" />
                  <h3 className="font-medium">Challenge Description</h3>
                </div>
                <p className="text-white/70">{selectedChallenge.description}</p>
              </div>
              
              <div className="flex-1 bg-grid-blue/20 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Award size={16} className="text-neon-cyan mr-2" />
                  <h3 className="font-medium">Reward</h3>
                </div>
                <div className="text-neon-cyan font-orbitron text-2xl">
                  ${selectedChallenge.reward.toLocaleString()}
                </div>
                <p className="text-white/70 text-sm mt-1">Added to your portfolio balance</p>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Progress</h3>
                <span className="text-white/70 text-sm">
                  {selectedChallenge.progress}% Complete
                </span>
              </div>
              <div className="h-4 bg-dark-blue/70 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${selectedChallenge.completed ? 'bg-success' : 'bg-neon-cyan'}`} 
                  style={{ width: `${selectedChallenge.progress}%` }}
                ></div>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center mb-2">
                <Clock size={16} className="text-white/70 mr-2" />
                <h3 className="font-medium">Deadline</h3>
              </div>
              <p className="text-white/70">
                {new Date(selectedChallenge.deadline).toLocaleDateString(undefined, {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-grid-blue/30 to-dark-blue/80 rounded-lg p-4 mt-auto">
              <h3 className="font-orbitron mb-3 flex items-center">
                <Sparkles size={16} className="text-neon-cyan mr-2" />
                Tips to Complete This Challenge
              </h3>
              
              <ul className="space-y-2 text-white/80 text-sm">
                {selectedChallenge.title === 'Beat the Market' && (
                  <>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 mr-2">•</div>
                      <p>Focus on high-growth sectors like technology and renewable energy.</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 mr-2">•</div>
                      <p>Look for stocks with recent positive momentum and analyst upgrades.</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 mr-2">•</div>
                      <p>Monitor market news for opportunities to capitalize on positive events.</p>
                    </li>
                  </>
                )}
                
                {selectedChallenge.title === 'Diversification Pro' && (
                  <>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 mr-2">•</div>
                      <p>Add stocks from Technology, Financial Services, Healthcare, Consumer Goods, and Energy sectors.</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 mr-2">•</div>
                      <p>Balance your portfolio with both growth and value stocks.</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 mr-2">•</div>
                      <p>Include stocks with different market capitalizations (large, mid, small).</p>
                    </li>
                  </>
                )}
                
                {selectedChallenge.title === 'Trading Volume' && (
                  <>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 mr-2">•</div>
                      <p>Set aside specific times each day to research and execute trades.</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 mr-2">•</div>
                      <p>Look for stocks with high volatility to capitalize on price movements.</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 mr-2">•</div>
                      <p>Consider trading smaller amounts more frequently to increase volume.</p>
                    </li>
                  </>
                )}
                
                {selectedChallenge.title === 'Diamond Hands' && (
                  <>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 mr-2">•</div>
                      <p>Choose fundamentally strong companies that may experience short-term volatility.</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 mr-2">•</div>
                      <p>Set a specific stop-loss threshold that's beyond the 5% drop requirement.</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 mr-2">•</div>
                      <p>Stay informed about the company to maintain confidence during price drops.</p>
                    </li>
                  </>
                )}
                
                {selectedChallenge.title === 'Risk Management' && (
                  <>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 mr-2">•</div>
                      <p>Regularly rebalance your portfolio to maintain proper allocations.</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 mr-2">•</div>
                      <p>When a stock approaches 20% of your portfolio, consider selling a portion.</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 mr-2">•</div>
                      <p>Diversify across multiple sectors to naturally limit single-stock exposure.</p>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Upcoming Challenges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="card"
      >
        <h2 className="text-xl font-orbitron mb-6 flex items-center">
          <TrendingUp size={20} className="text-neon-purple mr-2" />
          Upcoming Challenges
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              title: "Options Master",
              description: "Successfully execute 5 profitable options trades",
              reward: 15000,
              date: "Starts May 1"
            },
            {
              title: "Sector Rotation",
              description: "Achieve gains by rotating between 3 different sectors",
              reward: 12000,
              date: "Starts May 15"
            },
            {
              title: "Earnings Season",
              description: "Trade 10 stocks before their earnings announcement",
              reward: 20000,
              date: "Starts June 1"
            }
          ].map((challenge, index) => (
            <motion.div
              key={index}
              className="bg-grid-blue/20 border border-grid-blue/30 p-4 rounded-lg"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-orbitron">{challenge.title}</h3>
                <div className="bg-neon-purple/20 text-neon-purple text-xs py-1 px-2 rounded">Coming Soon</div>
              </div>
              <p className="text-white/70 text-sm mb-3">{challenge.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="text-white/50">{challenge.date}</span>
                <span className="text-neon-purple font-orbitron">+${challenge.reward.toLocaleString()}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Challenges;