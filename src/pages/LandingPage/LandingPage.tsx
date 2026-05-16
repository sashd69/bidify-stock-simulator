import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Trophy, Users, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import CandlestickAnimation from './CandlestickAnimation';
import { useAuth } from '../../contexts/AuthContext';

const LandingPage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen grid-bg overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-10 bg-dark-blue/80 backdrop-blur-md h-16 border-b border-grid-blue/30">
        <div className="container-app h-full flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-xl font-orbitron text-gradient">
              <span className="text-2xl">B</span>id<span className="text-2xl">d</span>ify
            </span>
          </div>
          <div className="space-x-4">
            {isAuthenticated ? (
              <Link to="/dashboard" className="neon-button-filled">
                Dashboard
              </Link>
            ) : (
              <>
                <Link to="/login" className="neon-button">
                  Sign In
                </Link>
                <Link to="/register" className="neon-button-filled">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 relative">
        <div className="container-app relative z-[1]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <motion.div 
              className="max-w-xl"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-gradient text-4xl md:text-5xl font-bold mb-4 font-orbitron leading-tight">
                Enter the Stock Market Arena
              </h1>
              <p className="text-white/80 mb-8 text-lg">
                Trade with virtual currency. Master real market strategies. Compete for the top spot on the leaderboard.
              </p>
              <div className="flex gap-4">
                <Link to="/register" className="neon-button-filled py-3 px-8 flex items-center gap-2">
                  Start Trading <ArrowRight size={18} />
                </Link>
                <Link to="/leaderboard" className="neon-button py-3 px-8">
                  View Leaderboard
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              className="w-full md:w-1/2 flex justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <CandlestickAnimation />
            </motion.div>
          </div>
        </div>

        {/* Animated background elements */}
        <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-neon-blue/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-neon-cyan/20 rounded-full blur-[100px]"></div>
      </section>

      {/* Features Section */}
      <section className="py-16 relative bg-gradient-to-b from-transparent to-dark-blue/50">
        <div className="container-app">
          <h2 className="text-3xl font-orbitron font-bold text-center mb-12 text-gradient">
            Game-Changing Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <TrendingUp className="text-neon-cyan" size={32} />,
                title: "Real-Time Trading",
                description: "Practice trading with real market data without risking real money."
              },
              {
                icon: <Users className="text-neon-pink" size={32} />,
                title: "Compete & Compare",
                description: "Climb the leaderboard and compare strategies with other traders."
              },
              {
                icon: <Trophy className="text-neon-purple" size={32} />,
                title: "Trading Challenges",
                description: "Complete challenges to earn rewards and boost your portfolio."
              },
              {
                icon: <Zap className="text-success" size={32} />,
                title: "Learn & Improve",
                description: "Analyze your performance and develop winning strategies."
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                className="card hover:shadow-neon-blue transition-all duration-500 flex flex-col items-center text-center p-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 rounded-full glassmorphism flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-orbitron mb-3 text-white">{feature.title}</h3>
                <p className="text-white/70">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="container-app relative z-[1]">
          <motion.div 
            className="card max-w-4xl mx-auto p-8 border border-neon-blue/30"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-orbitron font-bold text-center mb-6 text-gradient">
              Ready to Play the Market?
            </h2>
            <p className="text-white/80 text-center mb-8 max-w-2xl mx-auto">
              Join thousands of traders in our virtual stock market arena. Start with $100,000 in virtual currency and test your trading strategies risk-free.
            </p>
            <div className="flex justify-center">
              <Link to="/register" className="neon-button-filled py-3 px-8 flex items-center gap-2">
                Create Free Account <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Background gradient */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-full h-96 bg-neon-blue/10 rounded-full blur-[120px]"></div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-grid-blue/30 bg-dark-blue/50">
        <div className="container-app">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gradient text-xl font-orbitron mb-4 md:mb-0">
              <span className="text-2xl">B</span>id<span className="text-2xl">d</span>ify
            </div>
            <div className="text-white/50 text-sm">
              © 2025 Bidify. All rights reserved. Virtual trading platform for educational purposes only.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;