import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import LoveLetterModal from '../components/LoveLetterModal';
import { playTrack, pauseTrack } from '../utils/audioManager';
import { FaEnvelopeOpenText, FaArrowLeft } from 'react-icons/fa6';

const LoveLetterPage = () => {
  const navigate = useNavigate();
  const [isLetterOpen, setIsLetterOpen] = useState(true);

  // Play audio strictly while viewing the active letter, and stop immediately when closed or leaving page
  useEffect(() => {
    if (isLetterOpen) {
      playTrack(`${import.meta.env.BASE_URL}audio/hey-minnale.mp3`);
    } else {
      pauseTrack();
    }
    return () => {
      pauseTrack();
    };
  }, [isLetterOpen]);

  const handleReadComplete = () => {
    navigate('/end');
  };

  return (
    <div className="relative min-h-screen z-10 flex flex-col items-center justify-center p-6 text-center">
      {/* Back Button */}
      <button
        onClick={() => navigate('/gallery')}
        className="absolute top-6 left-6 flex items-center space-x-2 px-4 py-2 rounded-full glass-card text-rose-light hover:text-gold border border-rose-glow/30 transition-colors text-xs font-serif"
      >
        <FaArrowLeft className="w-4 h-4" />
        <span>GALLERY</span>
      </button>

      {/* Center Trigger Button if Modal Closed */}
      {!isLetterOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center"
        >
          <h2 className="text-3xl font-serif font-bold text-gold-shimmer mb-6">
            Read My Secret Heart Letter 💌
          </h2>
          <motion.button
            whileHover={{ scale: 1.08, boxShadow: "0 0 40px rgba(255,46,99,0.9)" }}
            whileTap={{ scale: 0.94 }}
            onClick={() => setIsLetterOpen(true)}
            className="px-10 py-5 rounded-full bg-gradient-to-r from-rose-crimson via-rose-ruby to-rose-glow text-white font-serif font-bold text-xl border-2 border-gold shadow-2xl flex items-center space-x-3 cursor-pointer"
          >
            <FaEnvelopeOpenText className="w-7 h-7 text-gold animate-bounce" />
            <span>Open My Heart ❤️</span>
          </motion.button>
        </motion.div>
      )}

      {/* Love Letter Modal Unfold Component */}
      <LoveLetterModal
        isOpen={isLetterOpen}
        onClose={() => setIsLetterOpen(false)}
        onReadComplete={handleReadComplete}
      />
    </div>
  );
};

export default LoveLetterPage;
