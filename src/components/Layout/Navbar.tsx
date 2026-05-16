import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Menu, X, CircleDollarSign } from 'lucide-react';

interface NavbarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-dark-blue/80 backdrop-blur-md border-b border-grid-blue/30 h-16 z-20">
      <div className="container-app h-full flex items-center justify-between">
        <div className="flex items-center">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="mr-4 p-2 rounded-md text-neon-blue hover:bg-grid-blue/20"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <span className="text-xl font-orbitron text-gradient font-bold tracking-wider">
            <span className="text-2xl">B</span>id<span className="text-2xl">d</span>ify
          </span>
        </div>
        
        {user && (
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center p-2 bg-grid-blue/30 rounded-md border border-grid-blue/50">
              <CircleDollarSign size={16} className="text-success mr-2" />
              <span className="text-success font-orbitron">
                ${user.balance.toLocaleString()}
              </span>
            </div>
            <div className="hidden md:block text-sm text-neon-cyan font-orbitron">
              {user.username}
            </div>
            <button 
              onClick={handleLogout}
              className="neon-button text-sm py-1 px-3"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;