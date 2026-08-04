import React, { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import AnimatedBackground from './components/AnimatedBackground';
import NavbarMusicToggle from './components/NavbarMusicToggle';
import LoadingScreen from './components/LoadingScreen';

// Lazy loading pages for optimal performance & code splitting
const WelcomePage = lazy(() => import('./pages/WelcomePage'));
const PasscodePage = lazy(() => import('./pages/PasscodePage'));
const IntroLyricsPage = lazy(() => import('./pages/IntroLyricsPage'));
const GalleryPage = lazy(() => import('./pages/GalleryPage'));
const MemoryDetailPage = lazy(() => import('./pages/MemoryDetailPage'));
const LoveLetterPage = lazy(() => import('./pages/LoveLetterPage'));
const FinalEndingPage = lazy(() => import('./pages/FinalEndingPage'));

function App() {
  const location = useLocation();

  // Defensive cleanup: Ensure no lingering scratch progress is stored in localStorage
  useEffect(() => {
    try {
      localStorage.removeItem('minnalu_revealed_ids');
    } catch (e) {}
  }, []);

  return (
    <div className="relative min-h-screen bg-dark-900 text-white font-sans overflow-x-hidden selection:bg-rose-ruby selection:text-white">
      {/* Continuous Global Particle & Rose Petal Canvas */}
      <AnimatedBackground />

      {/* Global Ambient Sound Toggle Button */}
      <NavbarMusicToggle />

      {/* Main Page Routing with Suspense and AnimatePresence */}
      <Suspense fallback={<LoadingScreen />}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/passcode" element={<PasscodePage />} />
            <Route path="/intro" element={<IntroLyricsPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/memory/:id" element={<MemoryDetailPage />} />
            <Route path="/letter" element={<LoveLetterPage />} />
            <Route path="/end" element={<FinalEndingPage />} />
            <Route path="*" element={<WelcomePage />} />
          </Routes>
        </AnimatePresence>
      </Suspense>
    </div>
  );
}

export default App;
