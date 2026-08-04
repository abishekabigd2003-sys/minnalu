import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import MemoryCard from '../components/MemoryCard';
import { MEMORIES } from '../utils/memoriesData';
import { FaHeart, FaEnvelopeOpenText } from 'react-icons/fa6';

const GalleryPage = () => {
  const navigate = useNavigate();

  const handleCardClick = (memory) => {
    navigate(`/memory/${memory.id}`);
  };

  return (
    <div className="relative min-h-screen z-10 px-4 py-12 max-w-xl mx-auto flex flex-col items-center">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <span className="text-xs font-serif tracking-widest uppercase text-rose-light border-b border-rose-glow/30 pb-1">
          Our Secret Memories
        </span>
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-gold-shimmer mt-3 drop-shadow-md">
          Memory Vault ❤️
        </h1>
        <p className="text-xs md:text-sm text-gray-300 mt-2 font-sans">
          Tap any mysterious card to scratch & unveil the hidden memory...
        </p>
      </motion.div>

      {/* Vertical Memory Cards List */}
      <div className="w-full space-y-6">
        {MEMORIES.map((memory) => {
          return (
            <MemoryCard
              key={memory.id}
              memory={memory}
              isRevealed={false}
              onClick={handleCardClick}
            />
          );
        })}
      </div>

      {/* Bottom Love Letter Trigger Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-14 w-full flex flex-col items-center text-center p-8 rounded-3xl glass-modal border-2 border-gold/40 shadow-[0_0_40px_rgba(255,215,0,0.3)]"
      >
        <h3 className="text-2xl font-serif font-bold text-white mb-2">
          Read My Final Love Words 💌
        </h3>
        <p className="text-xs text-gray-300 mb-6 max-w-xs">
          A personal letter written straight from my heart to yours...
        </p>

        <motion.button
          whileHover={{ scale: 1.06, boxShadow: "0 0 35px rgba(255,46,99,0.9)" }}
          whileTap={{ scale: 0.94 }}
          onClick={() => navigate('/letter')}
          className="px-8 py-4 rounded-full bg-gradient-to-r from-rose-crimson via-rose-ruby to-rose-glow text-white font-serif font-bold text-lg border-2 border-gold/50 shadow-2xl flex items-center space-x-3 cursor-pointer"
        >
          <FaEnvelopeOpenText className="w-6 h-6 text-gold animate-bounce" />
          <span>Open My Heart ❤️</span>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default GalleryPage;
