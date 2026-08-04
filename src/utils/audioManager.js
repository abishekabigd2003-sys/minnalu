// Dynamic Multi-Track Single-Instance Global Audio Manager

let audioInstance = null;
let listeners = new Set();
let isPlaying = false;
let currentTime = 0;
let duration = 0;
let currentTrackUrl = '';

const notifyListeners = () => {
  listeners.forEach((cb) => cb({ isPlaying, currentTime, duration, currentTrackUrl }));
};

export const getGlobalAudio = () => {
  if (typeof window === 'undefined') return null;

  if (!audioInstance) {
    audioInstance = new Audio();
    audioInstance.preload = 'auto';

    audioInstance.addEventListener('play', () => {
      isPlaying = true;
      notifyListeners();
    });

    audioInstance.addEventListener('pause', () => {
      isPlaying = false;
      notifyListeners();
    });

    audioInstance.addEventListener('ended', () => {
      isPlaying = false;
      notifyListeners();
    });

    audioInstance.addEventListener('timeupdate', () => {
      currentTime = audioInstance.currentTime || 0;
      notifyListeners();
    });

    audioInstance.addEventListener('loadedmetadata', () => {
      duration = audioInstance.duration || 0;
      notifyListeners();
    });

    audioInstance.addEventListener('error', (e) => {
      console.warn("Audio file playback error", e);
    });
  }

  return audioInstance;
};

export const playTrack = async (songUrl) => {
  const audio = getGlobalAudio();
  if (!audio) return;

  const targetUrl = songUrl || '/audio/Oh-Shala.mp3';

  // If switching to a new song, stop previous song & load new track
  if (currentTrackUrl !== targetUrl) {
    audio.pause();
    audio.src = targetUrl;
    currentTrackUrl = targetUrl;
    currentTime = 0;
  }

  try {
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      await playPromise;
      isPlaying = true;
      notifyListeners();
    }
  } catch (err) {
    console.warn("Audio playback failed or requires user gesture", err);
    isPlaying = false;
    notifyListeners();
  }
};

export const pauseTrack = () => {
  const audio = getGlobalAudio();
  if (!audio) return;
  audio.pause();
  isPlaying = false;
  notifyListeners();
};

export const toggleTrack = async (songUrl) => {
  const targetUrl = songUrl || '/audio/Oh-Shala.mp3';

  if (currentTrackUrl !== targetUrl) {
    await playTrack(targetUrl);
  } else {
    if (isPlaying) {
      pauseTrack();
    } else {
      await playTrack(targetUrl);
    }
  }
};

export const seekGlobalAudio = (time) => {
  const audio = getGlobalAudio();
  if (!audio) return;
  audio.currentTime = time;
  currentTime = time;
  notifyListeners();
};

export const subscribeAudioState = (callback) => {
  listeners.add(callback);
  callback({ isPlaying, currentTime, duration, currentTrackUrl });
  return () => {
    listeners.delete(callback);
  };
};

export const getAudioState = () => ({ isPlaying, currentTime, duration, currentTrackUrl });

// Legacy compatibility exports
export const playGlobalAudio = (songUrl) => playTrack(songUrl);
export const pauseGlobalAudio = () => pauseTrack();
export const toggleGlobalAudio = (songUrl) => toggleTrack(songUrl);
