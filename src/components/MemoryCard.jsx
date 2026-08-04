import React from 'react';
import { motion } from 'framer-motion';
import { FaLock, FaWandMagicSparkles } from 'react-icons/fa6';

const MemoryCard = ({ memory, onClick, isRevealed = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(memory)}
      className="relative group w-full cursor-pointer rounded-3xl overflow-hidden glass-card border border-rose-glow/30 hover:border-gold/60 transition-all duration-500 shadow-2xl"
    >
      {/* Aspect Ratio Container for Memory Card */}
      <div className="relative h-64 md:h-72 w-full overflow-hidden flex items-center justify-center">
        {/* Hidden / Blurred Image Background */}
        <img
          src={memory.image}
          alt={memory.title}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
            isRevealed ? 'filter-none scale-100' : 'filter blur-3xl scale-125 opacity-25'
          }`}
          loading="lazy"
        />

        {/* Heavy Dark Mysterious Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-800/80 to-rose-deep/40 group-hover:from-dark-900 group-hover:via-rose-dark/70 transition-all duration-500" />

        {/* Shimmering Golden Foil Overlay when locked */}
        {!isRevealed && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        )}

        {/* Card Center Mystery Lock Badge */}
        <div className="relative z-10 flex flex-col items-center justify-center p-6 text-center">
          <div className={`p-4 rounded-full glass-modal mb-3 border ${
            isRevealed ? 'border-gold text-gold shadow-[0_0_20px_#ffd700]' : 'border-rose-glow/40 text-rose-glow group-hover:scale-110 transition-transform'
          }`}>
            {isRevealed ? (
              <FaWandMagicSparkles className="w-7 h-7 text-gold animate-spin-slow" />
            ) : (
              <FaLock className="w-7 h-7 text-rose-glow" />
            )}
          </div>

          <h3 className="text-xl md:text-2xl font-serif font-bold text-white group-hover:text-gold-shimmer transition-colors">
            {memory.title}
          </h3>
          {memory.subtitle && (
            <p className="text-sm font-serif font-semibold text-rose-glow mt-0.5">
              {memory.subtitle}
            </p>
          )}

          <p className="text-xs text-rose-light mt-1 font-medium tracking-wide">
            {memory.date}
          </p>

          <p className="text-xs text-gray-300 mt-3 italic max-w-xs line-clamp-2 bg-dark-900/40 px-3 py-1.5 rounded-full border border-white/10">
            {isRevealed ? memory.quote : memory.hint}
          </p>

          <div className="mt-4 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider text-gold bg-gold/10 border border-gold/30 group-hover:bg-gold group-hover:text-dark-900 transition-all duration-300">
            {isRevealed ? "RE-EXAMINE MEMORY ✨" : "TAP TO SCRATCH & UNLOCK ❤️"}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MemoryCard;
