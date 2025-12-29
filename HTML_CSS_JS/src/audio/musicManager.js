// musicManager.js - Background music system with time-of-day variations
(function(){
  const MusicManager = {
    // Music tracks
    tracks: {
      dayTheme: { name: 'dayTheme', url: 'assets/audio/music/day_theme.mp3', volume: 0.6 },
      nightTheme: { name: 'nightTheme', url: 'assets/audio/music/night_theme.mp3', volume: 0.6 },
      cabinTheme: { name: 'cabinTheme', url: 'assets/audio/music/cabin_theme.mp3', volume: 0.5 },
      menuTheme: { name: 'menuTheme', url: 'assets/audio/music/menu_theme.mp3', volume: 0.6 },
      stormTheme: { name: 'stormTheme', url: 'assets/audio/music/storm_theme.mp3', volume: 0.5 },
      tensionTheme: { name: 'tensionTheme', url: 'assets/audio/music/tension_theme.mp3', volume: 0.5 }
    },
    
    isLoaded: false,
    currentTrack: null,
    lastTimeOfDay: null,
    lastWeatherState: null,
    isMuted: false,
    
    /**
     * Load all music tracks
     */
    async loadAll() {
      if (!window.AudioManager || !window.AudioManager.isInitialized) {
        console.warn('AudioManager not initialized');
        return false;
      }
      
      try {
        for (const key in this.tracks) {
          const track = this.tracks[key];
          try {
            await window.AudioManager.loadAudio(track.name, track.url);
          } catch (e) {
            console.warn(`Failed to load music track: ${track.name}`);
          }
        }
        
        this.isLoaded = true;
        console.log('🎵 Music tracks loaded');
        return true;
      } catch (e) {
        console.error('Failed to load music tracks:', e);
        return false;
      }
    },
    
    /**
     * Play menu music
     */
    playMenuMusic() {
      if (!this.isLoaded) return;
      
      this.stopCurrent();
      const track = this.tracks.menuTheme;
      window.AudioManager.playMusic(track.name, track.volume, true);
      this.currentTrack = 'menu';
    },
    
    /**
     * Play cabin music
     */
    playCabinMusic() {
      if (!this.isLoaded) return;
      
      this.stopCurrent();
      const track = this.tracks.cabinTheme;
      window.AudioManager.playMusic(track.name, track.volume, true);
      this.currentTrack = 'cabin';
    },
    
    /**
     * Update music based on time of day and weather
     * Call this from the main game loop
     */
    update(timeOfDay, weatherState) {
      if (!this.isLoaded || this.isMuted) return;
      
      // Determine which track should play based on time and weather
      let targetTrack = null;
      
      // Check weather first (storm overrides time)
      if (weatherState === 'storm' || weatherState === 'heavy_rain') {
        targetTrack = 'storm';
      } else if (timeOfDay < 0.2 || timeOfDay >= 0.8) {
        // Night (0-0.2 and 0.8-1.0)
        targetTrack = 'night';
      } else if (timeOfDay < 0.35) {
        // Dawn (0.2-0.35) - transition to day
        targetTrack = 'day';
      } else if (timeOfDay < 0.65) {
        // Day (0.35-0.65)
        targetTrack = 'day';
      } else if (timeOfDay < 0.8) {
        // Dusk (0.65-0.8) - transition to night
        targetTrack = 'night';
      }
      
      // Only change music if it's different from current
      if (targetTrack && targetTrack !== this.currentTrack) {
        this.playTrack(targetTrack);
      }
      
      this.lastTimeOfDay = timeOfDay;
      this.lastWeatherState = weatherState;
    },
    
    /**
     * Play a specific track
     */
    playTrack(trackName) {
      if (!this.isLoaded) return;
      
      const trackKey = trackName + 'Theme';
      const track = this.tracks[trackKey];
      
      if (!track) {
        console.warn(`Unknown music track: ${trackName}`);
        return;
      }
      
      // Fade out current music and fade in new music
      if (window.AudioManager.currentMusic) {
        window.AudioManager.fadeMusic(0, 0.5);
        setTimeout(() => {
          window.AudioManager.playMusic(track.name, track.volume, true);
          window.AudioManager.fadeMusic(track.volume, 0.5);
        }, 500);
      } else {
        window.AudioManager.playMusic(track.name, track.volume, true);
      }
      
      this.currentTrack = trackName;
    },
    
    /**
     * Stop current music
     */
    stopCurrent() {
      window.AudioManager.stopMusic();
      this.currentTrack = null;
    },
    
    /**
     * Mute music
     */
    mute() {
      this.isMuted = true;
      window.AudioManager.setMusicVolume(0);
    },
    
    /**
     * Unmute music
     */
    unmute() {
      this.isMuted = false;
      window.AudioManager.setMusicVolume(this.getMusicVolume());
    },
    
    /**
     * Set music volume
     */
    setMusicVolume(volume) {
      window.AudioManager.setMusicVolume(volume);
    },
    
    /**
     * Get music volume
     */
    getMusicVolume() {
      return window.AudioManager.getMusicVolume();
    },
    
    /**
     * Get current track name
     */
    getCurrentTrack() {
      return this.currentTrack;
    }
  };
  
  if (typeof window !== 'undefined') window.MusicManager = window.MusicManager || MusicManager;
  if (typeof module !== 'undefined') module.exports = MusicManager;
})();
