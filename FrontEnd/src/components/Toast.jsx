import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

const Toast = ({ toast, onClose }) => {
  const icon = toast.type === 'error' ? <AlertCircle className="text-red-500" /> : <CheckCircle className="text-accent" />;
  
  return (
    <motion.div
      initial={{ opacity: 0, x: 50, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 20, scale: 0.9 }}
      className="pointer-events-auto bg-luxury-dark/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl flex items-center gap-4 max-w-sm"
    >
      <div className="flex-shrink-0">
        {icon}
      </div>
      <p className="text-sm font-medium text-white/90">
        {toast.message}
      </p>
      <button 
        onClick={onClose}
        className="ml-auto text-white/30 hover:text-white transition-colors"
      >
        <X size={16} />
      </button>
    </motion.div>
  );
};

export default Toast;
