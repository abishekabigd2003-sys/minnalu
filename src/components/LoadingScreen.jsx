import React from 'react';
import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-dark-900 text-white">
      <motion.div
        animate={{
          scale: [1, 1.25, 1, 1.25, 1],
          rotate: [0, -5, 5, 0]
        }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        className="text-rose-glow drop-shadow-[0_0_25px_rgba(255,46,99,0.9)]"
      >
        <FaHeart className="w-20 h-20 text-rose-glow" />
      </motion.div>
      <motion.h3
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.8, repeat: Infinity }}
        className="mt-6 text-xl font-serif font-semibold text-gold-shimmer tracking-wider"
      >
        Unveiling Romantic Memories... ✨
      </motion.h3>
    </div>
  );
};

export default LoadingScreen;
