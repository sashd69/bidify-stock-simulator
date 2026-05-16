import { Link, useLocation } from 'react-router-dom';
import { Home, PieChart, LineChart, Trophy, Award, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const { user } = useAuth();

  const navItems = [
    { path: '/dashboard', name: 'Dashboard', icon: <Home size={20} /> },
    { path: '/portfolio', name: 'Portfolio', icon: <PieChart size={20} /> },
    { path: '/trading', name: 'Trading', icon: <LineChart size={20} /> },
    { path: '/leaderboard', name: 'Leaderboard', icon: <Trophy size={20} /> },
    { path: '/challenges', name: 'Challenges', icon: <Award size={20} /> },
  ];

  // Mobile sidebar backdrop
  const backdrop = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  // Sidebar animation
  const sidebar = {
    open: { x: 0 },
    closed: { x: '-100%' },
  };

  return (
    <>
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={backdrop}
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={sidebarOpen ? 'open' : 'closed'}
        variants={sidebar}
        className={`fixed md:sticky top-0 left-0 z-30 md:z-10 h-screen w-64 md:w-56 
                   bg-dark-blue/80 backdrop-blur-md md:translate-x-0
                   border-r border-grid-blue/30 pt-20 md:pt-16 transition-transform duration-300`}
      >
        <div className="md:hidden absolute top-4 right-4">
          <button 
            onClick={() => setSidebarOpen(false)}
            className="p-2 rounded-md text-neon-blue hover:bg-grid-blue/20"
          >
            <X size={20} />
          </button>
        </div>

        {user && (
          <div className="md:hidden px-4 py-3 border-b border-grid-blue/30 mb-4">
            <p className="text-neon-cyan font-orbitron text-sm">{user.username}</p>
            <p className="text-success font-orbitron text-sm mt-1">${user.balance.toLocaleString()}</p>
          </div>
        )}

        <ul className="px-2 space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-md font-orbitron text-sm
                          ${location.pathname === item.path
                    ? 'bg-neon-blue/20 text-neon-blue shadow-neon-blue border border-neon-blue/50'
                    : 'text-white/70 hover:bg-grid-blue/30 hover:text-white'
                  }`}
                onClick={() => setSidebarOpen(false)}
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
        
        <div className="absolute bottom-8 left-0 right-0 px-4">
          <div className="card bg-gradient-to-br from-grid-blue/50 to-dark-blue/50">
            <p className="text-xs text-center text-white/70 mb-2">Current Challenge</p>
            <p className="text-xs font-orbitron text-center text-neon-cyan">Beat the Market</p>
            <div className="mt-2 bg-dark-blue/50 h-2 rounded-full">
              <div className="bg-neon-cyan h-full rounded-full" style={{ width: '45%' }}></div>
            </div>
            <p className="text-xs text-right mt-1 text-white/70">45% complete</p>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;