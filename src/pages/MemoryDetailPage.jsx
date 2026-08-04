import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ScratchCard from '../components/ScratchCard';
import MusicPlayer from '../components/MusicPlayer';
import { MEMORIES } from '../utils/memoriesData';
import { playTrack, pauseTrack } from '../utils/audioManager';
import { FaArrowLeft } from 'react-icons/fa6';

const MemoryDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const memoryId = parseInt(id, 10);
  const memoryIndex = MEMORIES.findIndex((m) => m.id === memoryId);
  const memory = MEMORIES[memoryIndex] || MEMORIES[0];

  const [unlockedThisSession, setUnlockedThisSession] = useState(false);

  const isRevealed = unlockedThisSession;

  // Reset unlocked state and scroll to top when memory ID changes
  useEffect(() => {
    setUnlockedThisSession(false);
    window.scrollTo(0, 0);
  }, [memory.id]);

  // Play song ONLY AFTER card is scratched and revealed
  useEffect(() => {
    if (isRevealed && memory && memory.songUrl && !memory.videoUrl) {
      playTrack(memory.songUrl);
    }
    return () => {
      pauseTrack();
    };
  }, [isRevealed, memory.id, memory.songUrl, memory.videoUrl]);

  const handleScratchComplete = () => {
    setUnlockedThisSession(true);
  };

  const handleNextTrack = () => {
    const nextIdx = (memoryIndex + 1) % MEMORIES.length;
    navigate(`/memory/${MEMORIES[nextIdx].id}`);
  };

  const handlePrevTrack = () => {
    const prevIdx = (memoryIndex - 1 + MEMORIES.length) % MEMORIES.length;
    navigate(`/memory/${MEMORIES[prevIdx].id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen z-10 px-4 py-8 max-w-lg mx-auto flex flex-col items-center justify-between"
    >
      {/* Top Back Navigation Bar */}
      <div className="w-full flex items-center justify-between mb-6">
        <button
          onClick={() => navigate('/gallery')}
          className="flex items-center space-x-2 px-4 py-2 rounded-full glass-card text-rose-light hover:text-gold border border-rose-glow/30 transition-colors text-xs font-serif"
        >
          <FaArrowLeft className="w-4 h-4" />
          <span>BACK TO GALLERY</span>
        </button>

        <span className="text-xs font-serif text-gold font-bold bg-gold/10 px-3 py-1 rounded-full border border-gold/30">
          MEMORY #{memory.id} / {MEMORIES.length}
        </span>
      </div>

      {/* Memory Title & Quote */}
      <div className="text-center mb-4">
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-gold-shimmer">
          {memory.title}
        </h2>
        {memory.subtitle && (
          <p className="text-sm font-serif font-semibold text-rose-glow mt-0.5">
            {memory.subtitle}
          </p>
        )}
        <p className="text-xs text-rose-light mt-1 font-medium">{memory.date}</p>
      </div>

      {/* Main Scratch Card Interaction */}
      <div className="w-full mb-6">
        <ScratchCard
          image={memory.image}
          videoUrl={memory.videoUrl}
          songUrl={memory.songUrl}
          isAlreadyRevealed={isRevealed}
          onScratchComplete={handleScratchComplete}
        />
      </div>

      {/* Detailed Romantic Memory Note Card */}
      {isRevealed && (memory.storyNote || memory.quote) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full mb-6 p-6 rounded-3xl glass-modal border-2 border-gold/40 text-left shadow-[0_0_35px_rgba(255,215,0,0.25)] space-y-3 relative overflow-hidden"
        >
          <div className="absolute top-2 right-4 text-3xl text-gold/20 font-serif font-black pointer-events-none">
            “
          </div>
          
          <h4 className="text-lg font-serif font-bold text-gold-shimmer border-b border-gold/30 pb-2 mb-3">
            A Memory Written in My Heart 💌
          </h4>

          {memory.storyNote ? (
            memory.storyNote.map((paragraph, pIdx) => (
              <p key={pIdx} className="text-xs md:text-sm text-gray-200 leading-relaxed font-sans font-medium">
                {paragraph}
              </p>
            ))
          ) : (
            <p className="text-xs md:text-sm text-gray-200 italic">
              "{memory.quote}"
            </p>
          )}

          <div className="pt-2 text-right">
            <span className="text-xs font-cursive text-rose-glow text-base">
              Forever Yours ❤️
            </span>
          </div>
        </motion.div>
      )}

      {/* Embedded Music Player with Prominent Play / Pause Button & Amazon Music Link */}
      {memory.songUrl && !memory.videoUrl && (
        <div className="w-full mb-6">
          <MusicPlayer
            songTitle={memory.songTitle || "Oh Shala Oh Shala"}
            songArtist={memory.songArtist || "Yuvan Shankar Raja"}
            songUrl={memory.songUrl}
            amazonMusicUrl={memory.amazonMusicUrl || "https://music.amazon.in/tracks/B01N184VRU"}
            albumArt={memory.albumArt}
            onNext={handleNextTrack}
            onPrev={handlePrevTrack}
            autoPlayOnMount={isRevealed}
          />
        </div>
      )}
    </motion.div>
  );
};

export default MemoryDetailPage;
