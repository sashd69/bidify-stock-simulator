import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingUp, TrendingDown, DollarSign, Minus, Plus } from 'lucide-react';
import { Stock } from '../../utils/mockData';
import { useAuth } from '../../contexts/AuthContext';

interface StockDetailProps {
  stock: Stock;
  isOpen: boolean;
  onClose: () => void;
}

const StockDetail: React.FC<StockDetailProps> = ({ stock, isOpen, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [action, setAction] = useState<'buy' | 'sell'>('buy');
  const [isProcessing, setIsProcessing] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const { user } = useAuth();

  // Reset quantity when stock changes
  useEffect(() => {
    setQuantity(1);
    setAction('buy');
    setSuccessMessage('');
  }, [stock]);

  const totalCost = stock.price * quantity;
  const canAfford = user?.balance ? user.balance >= totalCost : false;

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const executeOrder = () => {
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setSuccessMessage(
        `Successfully ${action === 'buy' ? 'purchased' : 'sold'} ${quantity} shares of ${stock.symbol} at $${stock.price.toFixed(2)} per share.`
      );
      
      // Reset form after successful order
      setTimeout(() => {
        if (successMessage) {
          onClose();
        }
      }, 2000);
    }, 1500);
  };

  // Animate modal
  const modalVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 20, scale: 0.95 }
  };

  // Handle click outside of modal to close
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={handleBackdropClick}
      >
        <motion.div
          className="card max-w-lg w-full border border-neon-blue/30"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.3 }}
          onClick={e => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-orbitron text-gradient">Trade {stock.symbol}</h2>
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-grid-blue/30 transition-colors"
            >
              <X size={20} className="text-white/70" />
            </button>
          </div>
          
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <div>
                <span className="text-white/70">Current Price:</span>
                <span className="ml-2 text-xl font-orbitron">${stock.price.toFixed(2)}</span>
              </div>
              <div className={`flex items-center ${stock.change >= 0 ? 'text-success' : 'text-error'}`}>
                {stock.change >= 0 ? <TrendingUp size={16} className="mr-1" /> : <TrendingDown size={16} className="mr-1" />}
                {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)
              </div>
            </div>
            
            <div className="text-white/70 mb-3">
              {stock.name} · {stock.industry}
            </div>
            
            <div className="bg-grid-blue/20 p-3 rounded-md mb-4">
              <div className="text-white/70 text-sm mb-1">Available Balance:</div>
              <div className="flex items-center text-success font-orbitron">
                <DollarSign size={16} className="mr-1" />
                {user?.balance ? user.balance.toLocaleString() : '0.00'}
              </div>
            </div>
          </div>
          
          {successMessage ? (
            <div className="bg-success/10 border border-success/30 text-success p-4 rounded mb-4">
              {successMessage}
            </div>
          ) : (
            <>
              <div className="mb-6">
                <div className="flex justify-between mb-4">
                  <button
                    onClick={() => setAction('buy')}
                    className={`flex-1 py-3 rounded-l-md font-orbitron ${
                      action === 'buy'
                        ? 'bg-success/20 text-success border border-success/50'
                        : 'bg-dark-blue/50 text-white/70 border border-grid-blue/30'
                    }`}
                  >
                    Buy
                  </button>
                  <button
                    onClick={() => setAction('sell')}
                    className={`flex-1 py-3 rounded-r-md font-orbitron ${
                      action === 'sell'
                        ? 'bg-error/20 text-error border border-error/50'
                        : 'bg-dark-blue/50 text-white/70 border border-grid-blue/30'
                    }`}
                  >
                    Sell
                  </button>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="quantity" className="block text-white/70 mb-2">
                    Quantity
                  </label>
                  <div className="flex items-center">
                    <button
                      onClick={decreaseQuantity}
                      className="bg-dark-blue/70 border border-grid-blue/50 rounded-l-md p-3 
                               hover:bg-grid-blue/30 transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <input
                      type="number"
                      id="quantity"
                      value={quantity}
                      onChange={handleQuantityChange}
                      className="bg-dark-blue/50 border-y border-grid-blue/50 text-center py-3 px-4 text-white 
                               w-full focus:outline-none focus:border-neon-blue"
                      min="1"
                    />
                    <button
                      onClick={increaseQuantity}
                      className="bg-dark-blue/70 border border-grid-blue/50 rounded-r-md p-3 
                               hover:bg-grid-blue/30 transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
                
                <div className="bg-grid-blue/20 p-4 rounded-md mb-4">
                  <div className="flex justify-between mb-2">
                    <div className="text-white/70">Price per share:</div>
                    <div className="font-medium">${stock.price.toFixed(2)}</div>
                  </div>
                  <div className="flex justify-between mb-2">
                    <div className="text-white/70">Quantity:</div>
                    <div className="font-medium">{quantity}</div>
                  </div>
                  <div className="border-t border-grid-blue/30 my-2 pt-2"></div>
                  <div className="flex justify-between">
                    <div className="text-white/70">Total cost:</div>
                    <div className="font-orbitron text-neon-cyan">${totalCost.toFixed(2)}</div>
                  </div>
                </div>
                
                {action === 'buy' && !canAfford && (
                  <div className="bg-error/10 border border-error/30 text-error p-3 rounded mb-4 text-sm">
                    Insufficient funds for this transaction.
                  </div>
                )}
              </div>
              
              <button
                onClick={executeOrder}
                disabled={isProcessing || (action === 'buy' && !canAfford)}
                className={`w-full py-3 font-orbitron rounded ${
                  action === 'buy'
                    ? 'bg-success/20 hover:bg-success/30 text-success border border-success/50'
                    : 'bg-error/20 hover:bg-error/30 text-error border border-error/50'
                } ${
                  (isProcessing || (action === 'buy' && !canAfford))
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:shadow-neon-blue'
                }`}
              >
                {isProcessing
                  ? 'Processing...'
                  : `${action === 'buy' ? 'Buy' : 'Sell'} ${quantity} Shares for $${totalCost.toFixed(2)}`}
              </button>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default StockDetail;