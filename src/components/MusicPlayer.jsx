import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaPause, FaForwardStep, FaBackwardStep, FaVolumeHigh, FaVolumeXmark, FaArrowUpRightFromSquare } from 'react-icons/fa6';
import { subscribeAudioState, toggleTrack, seekGlobalAudio, getGlobalAudio } from '../utils/audioManager';

const MusicPlayer = ({ songTitle, songArtist, songUrl, amazonMusicUrl, albumArt, onNext, onPrev }) => {
  const [audioState, setAudioState] = useState({ isPlaying: false, currentTime: 0, duration: 0, currentTrackUrl: '' });
  const [isMuted, setIsMuted] = useState(false);

  const targetSongUrl = songUrl || '/audio/Oh-Shala.mp3';
  const displayTitle = songTitle || "Oh Shala Oh Shala";
  const displayArtist = songArtist || "Yuvan Shankar Raja";
  const displayAmazonUrl = amazonMusicUrl || "https://music.amazon.in/tracks/B01N184VRU";

  const isCurrentSongActive = audioState.currentTrackUrl === targetSongUrl;
  const isThisSongPlaying = audioState.isPlaying && isCurrentSongActive;

  useEffect(() => {
    const unsubscribe = subscribeAudioState((state) => {
      setAudioState(state);
    });
    return () => unsubscribe();
  }, []);

  const handleTogglePlay = () => {
    toggleTrack(targetSongUrl);
  };

  const handleSeek = (e) => {
    if (!isCurrentSongActive) return;
    const newTime = parseFloat(e.target.value);
    seekGlobalAudio(newTime);
  };

  const toggleMute = () => {
    const audio = getGlobalAudio();
    if (!audio) return;
    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const formatTime = (secs) => {
    if (isNaN(secs) || secs <= 0) return "0:00";
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full glass-modal rounded-3xl p-5 border border-gold/40 shadow-[0_0_35px_rgba(255,46,99,0.3)] flex flex-col space-y-4"
    >
      {/* Prominent Play / Pause Button Below Image */}
      <motion.button
        whileHover={{ scale: 1.03, boxShadow: "0 0 35px rgba(255,215,0,0.7)" }}
        whileTap={{ scale: 0.97 }}
        onClick={handleTogglePlay}
        className={`w-full py-4 px-6 rounded-2xl border-2 font-serif font-bold text-base md:text-lg flex items-center justify-center space-x-3 cursor-pointer shadow-2xl transition-all duration-300 ${
          isThisSongPlaying
            ? 'bg-gradient-to-r from-rose-crimson via-rose-ruby to-rose-glow text-white border-gold shadow-[0_0_30px_rgba(255,46,99,0.8)]'
            : 'bg-gradient-to-r from-gold-dark via-gold to-gold-light text-dark-900 border-white shadow-[0_0_25px_rgba(255,215,0,0.6)]'
        }`}
      >
        {isThisSongPlaying ? (
          <>
            <FaPause className="w-6 h-6 animate-pulse" />
            <span>PAUSE SONG 🎵</span>
          </>
        ) : (
          <>
            <FaPlay className="w-6 h-6 translate-x-0.5 animate-bounce" />
            <span>PLAY '{displayTitle.toUpperCase()}' 🎵</span>
          </>
        )}
      </motion.button>

      {/* Amazon Music Direct Link Badge */}
      <a
        href={displayAmazonUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full py-2.5 px-4 rounded-xl glass-card border border-gold/30 hover:border-gold text-gold text-xs font-semibold flex items-center justify-center space-x-2 transition-all hover:bg-gold/10 shadow-md"
      >
        <span>LISTEN ON AMAZON MUSIC 🎧</span>
        <FaArrowUpRightFromSquare className="w-3 h-3" />
      </a>

      {/* Song Details & Album Cover */}
      <div className="flex items-center space-x-4 pt-1">
        <div
          onClick={handleTogglePlay}
          className="relative w-14 h-14 rounded-2xl overflow-hidden border border-gold/40 hover:border-gold shadow-lg flex-shrink-0 cursor-pointer transition-all hover:scale-105"
        >
          <img
            src={albumArt || `${import.meta.env.BASE_URL}images/memory1.jpg`}
            alt="Album Art"
            className={`w-full h-full object-cover ${isThisSongPlaying ? 'animate-spin-slow' : ''}`}
          />
          <div className="absolute inset-0 bg-dark-900/20" />
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="text-base md:text-lg font-serif font-bold text-white truncate text-gold-shimmer">
            {displayTitle}
          </h4>
          <p className="text-xs text-rose-light truncate font-sans font-medium">
            {displayArtist}
          </p>

          {/* Equalizer */}
          {isThisSongPlaying && (
            <div className="flex items-end space-x-1 h-3 mt-1.5">
              <span className="w-1 bg-rose-glow rounded animate-[bounce_0.6s_infinite_100ms] h-full" />
              <span className="w-1 bg-gold rounded animate-[bounce_0.8s_infinite_200ms] h-full" />
              <span className="w-1 bg-rose-light rounded animate-[bounce_0.5s_infinite_150ms] h-full" />
              <span className="w-1 bg-gold-light rounded animate-[bounce_0.7s_infinite_300ms] h-full" />
            </div>
          )}
        </div>

        {/* Mute Button */}
        <button
          onClick={toggleMute}
          className="text-gray-400 hover:text-gold p-2.5 rounded-full glass-card transition-colors border border-gold/20"
        >
          {isMuted ? <FaVolumeXmark className="w-4 h-4 text-rose-glow" /> : <FaVolumeHigh className="w-4 h-4" />}
        </button>
      </div>

      {/* Seek Progress Bar */}
      <div className="flex flex-col space-y-1">
        <input
          type="range"
          min="0"
          max={isCurrentSongActive ? (audioState.duration || 100) : 100}
          value={isCurrentSongActive ? audioState.currentTime : 0}
          onChange={handleSeek}
          className="w-full h-1.5 bg-dark-800 rounded-lg appearance-none cursor-pointer accent-rose-glow"
        />
        <div className="flex justify-between text-[11px] text-gray-400 font-mono">
          <span>{isCurrentSongActive ? formatTime(audioState.currentTime) : "0:00"}</span>
          <span>{isCurrentSongActive ? formatTime(audioState.duration) : "0:00"}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center space-x-6 pt-1">
        <motion.button
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          onClick={onPrev}
          className="p-3 text-rose-light hover:text-gold transition-colors"
        >
          <FaBackwardStep className="w-5 h-5" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleTogglePlay}
          className="p-4 rounded-full bg-gradient-to-r from-rose-crimson via-rose-ruby to-rose-glow text-white shadow-[0_0_20px_rgba(255,46,99,0.7)] border border-gold/40"
        >
          {isThisSongPlaying ? <FaPause className="w-6 h-6" /> : <FaPlay className="w-6 h-6 translate-x-0.5" />}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          onClick={onNext}
          className="p-3 text-rose-light hover:text-gold transition-colors"
        >
          <FaForwardStep className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default MusicPlayer;
