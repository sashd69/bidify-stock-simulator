import { useState } from 'react';
import { MessageSquare, Send, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your trading assistant. I can help you navigate the platform and provide market insights. What would you like to know?",
      sender: 'bot'
    }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user'
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse = getBotResponse(input.toLowerCase());
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot'
      }]);
    }, 1000);
  };

  const getBotResponse = (input: string): string => {
    if (input.includes('help') || input.includes('guide')) {
      return "I can help you navigate through different sections:\n• Dashboard: View your portfolio overview\n• Trading: Buy and sell stocks\n• Portfolio: Track your holdings\n• Leaderboard: Compare with other traders\n• Challenges: Complete tasks for rewards\n\nWhat would you like to know more about?";
    }
    
    if (input.includes('trade') || input.includes('buy') || input.includes('sell')) {
      return "To trade stocks:\n1. Go to the Trading page\n2. Search for a stock symbol\n3. Click 'Trade' button\n4. Enter quantity and choose buy/sell\n5. Confirm your order\n\nRemember to check your available balance before trading!";
    }
    
    if (input.includes('market') || input.includes('stocks')) {
      return "The market is currently experiencing moderate volatility. Tech stocks are showing strong momentum, while energy sectors are facing some headwinds. Consider diversifying your portfolio across different sectors.";
    }
    
    if (input.includes('balance') || input.includes('money')) {
      return "You can view your current balance in the top navigation bar. Each new user starts with $100,000 in virtual currency. Your balance updates automatically after each trade.";
    }
    
    if (input.includes('challenge') || input.includes('reward')) {
      return "Complete trading challenges to earn rewards! Current challenges include:\n• Beat the Market: Outperform S&P 500\n• Diversification Pro: Own stocks from 5 sectors\n• Trading Volume: Execute 20 trades\n\nCheck the Challenges page for more details!";
    }

    return "I'm here to help! You can ask me about:\n• How to trade\n• Market insights\n• Platform navigation\n• Challenges and rewards\n• Account balance\n\nWhat would you like to know?";
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-neon-blue/20 border border-neon-blue/50 
                   flex items-center justify-center shadow-neon-blue hover:bg-neon-blue/30 transition-all"
      >
        <MessageSquare className="text-neon-blue" />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] bg-dark-blue/90 backdrop-blur-md 
                     border border-neon-blue/30 rounded-lg shadow-lg overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-grid-blue/30 flex justify-between items-center">
              <h3 className="font-orbitron text-gradient">Trading Assistant</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full hover:bg-grid-blue/30 transition-colors"
              >
                <X size={18} className="text-white/70" />
              </button>
            </div>

            {/* Messages */}
            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-neon-blue/20 text-white border border-neon-blue/30'
                        : 'bg-grid-blue/30 text-white border border-grid-blue/30'
                    }`}
                  >
                    <p className="whitespace-pre-line text-sm">{message.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-grid-blue/30">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-dark-blue/50 border border-grid-blue/50 rounded-lg px-4 py-2 
                           text-white placeholder-white/50 focus:outline-none focus:border-neon-blue"
                />
                <button
                  onClick={handleSend}
                  className="p-2 rounded-lg bg-neon-blue/20 border border-neon-blue/50 
                           text-neon-blue hover:bg-neon-blue/30 transition-all"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;