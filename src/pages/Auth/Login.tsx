import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Lock, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid-bg flex items-center justify-center px-4 py-12">
      <div className="absolute top-0 left-0 w-full h-16 bg-dark-blue/80 backdrop-blur-md border-b border-grid-blue/30 flex items-center px-4">
        <Link to="/" className="flex items-center gap-2 text-neon-blue">
          <ArrowLeft size={18} />
          <span className="font-orbitron">Back to Home</span>
        </Link>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative"
      >
        <div className="card border-neon-blue/30 p-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-orbitron text-gradient mb-2">Sign In</h1>
            <p className="text-white/70">Access your trading dashboard</p>
          </div>
          
          {error && (
            <div className="bg-error/10 border border-error/30 text-error p-3 rounded mb-4 text-sm">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-white/80 mb-2 text-sm font-medium">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50">
                  <Mail size={18} />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-dark-blue/50 border border-grid-blue/50 rounded py-2 pl-10 pr-3 
                            text-white placeholder-white/30 focus:border-neon-blue focus:ring-1 focus:ring-neon-blue/50 
                            focus:outline-none transition-all duration-200"
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="password" className="block text-white/80 mb-2 text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50">
                  <Lock size={18} />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-dark-blue/50 border border-grid-blue/50 rounded py-2 pl-10 pr-3 
                            text-white placeholder-white/30 focus:border-neon-blue focus:ring-1 focus:ring-neon-blue/50 
                            focus:outline-none transition-all duration-200"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full neon-button-filled py-3 flex justify-center ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          
          <div className="mt-6 text-center text-white/70 text-sm">
            Don't have an account?{' '}
            <Link to="/register" className="text-neon-cyan hover:underline">
              Create one
            </Link>
          </div>
        </div>
        
        <div className="absolute -z-10 inset-0 blur-[100px] bg-neon-blue/20 rounded-full"></div>
      </motion.div>
    </div>
  );
};

export default Login;