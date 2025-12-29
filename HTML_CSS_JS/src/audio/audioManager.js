// AudioManager.js - Central audio management system
(function(){
  const AudioManager = {
    masterVolume: 0.7,
    musicVolume: 0.6,
    sfxVolume: 0.8,
    isMuted: false,
    isInitialized: false,
    
    // Audio context
    audioContext: null,
    buffers: {}, // For compatibility with audioPlaceholder
    currentMusic: null,
    
    init() {
      if (this.isInitialized) return;
      
      try {
        // Initialize Web Audio API
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          this.audioContext = new AudioContext();
          console.log('✅ Web Audio API initialized');
        }
        
        // Initialize Tone.js if available
        if (typeof Tone !== 'undefined') {
          console.log('✅ Tone.js available');
        }
        
        // Initialize Jsfxr if available
        if (typeof jsfxr !== 'undefined') {
          console.log('✅ Jsfxr available');
        }
        
        this.isInitialized = true;
        console.log('🔊 AudioManager initialized');
      } catch (e) {
        console.warn('⚠️ Audio initialization failed:', e);
      }
    },
    
    // Compatibility methods for musicManager
    loadAudio(name, url) {
      // Placeholder - audio is procedurally generated
      return Promise.resolve();
    },
    
    playMusic(name, volume, loop) {
      // Use our new music system
      if (name === 'dayTheme' && window.DayMusic) {
        window.DayMusic.setVolume(volume);
        window.DayMusic.play();
        this.currentMusic = window.DayMusic;
      } else if (name === 'nightTheme' && window.NightMusic) {
        window.NightMusic.setVolume(volume);
        window.NightMusic.play();
        this.currentMusic = window.NightMusic;
      }
    },
    
    stopMusic() {
      if (this.currentMusic && typeof this.currentMusic.stop === 'function') {
        this.currentMusic.stop();
      }
      this.currentMusic = null;
    },
    
    fadeMusic(targetVolume, duration) {
      // Simple fade - just set volume
      if (this.currentMusic && typeof this.currentMusic.setVolume === 'function') {
        this.currentMusic.setVolume(targetVolume);
      }
    },
    
    resumeContext() {
      if (this.audioContext && this.audioContext.state === 'suspended') {
        this.audioContext.resume().then(() => {
          console.log('✅ Audio context resumed');
        });
      }
    },
    
    setMasterVolume(volume) {
      this.masterVolume = Math.max(0, Math.min(1, volume));
      if (typeof Tone !== 'undefined') {
        Tone.Destination.volume.value = this.dbFromVolume(this.masterVolume);
      }
    },
    
    setMusicVolume(volume) {
      this.musicVolume = Math.max(0, Math.min(1, volume));
      if (window.DayMusic) window.DayMusic.setVolume(this.musicVolume);
      if (window.NightMusic) window.NightMusic.setVolume(this.musicVolume);
    },
    
    setSFXVolume(volume) {
      this.sfxVolume = Math.max(0, Math.min(1, volume));
      if (window.SoundEffects) window.SoundEffects.setVolume(this.sfxVolume);
    },
    
    getMasterVolume() {
      return this.masterVolume;
    },
    
    getMusicVolume() {
      return this.musicVolume;
    },
    
    getSFXVolume() {
      return this.sfxVolume;
    },
    
    mute() {
      this.isMuted = true;
      if (typeof Tone !== 'undefined') {
        Tone.Destination.mute = true;
      }
      console.log('🔇 Audio muted');
    },
    
    unmute() {
      this.isMuted = false;
      if (typeof Tone !== 'undefined') {
        Tone.Destination.mute = false;
      }
      console.log('🔊 Audio unmuted');
    },
    
    toggleMute() {
      if (this.isMuted) {
        this.unmute();
      } else {
        this.mute();
      }
    },
    
    isMuted() {
      return this.isMuted;
    },
    
    // Convert 0-1 volume to dB
    dbFromVolume(volume) {
      if (volume === 0) return -Infinity;
      return 20 * Math.log10(volume);
    },
    
    // Convert dB to 0-1 volume
    volumeFromDb(db) {
      return Math.pow(10, db / 20);
    },
    
    // Resume audio context (required for user interaction)
    resume() {
      this.resumeContext();
    },
    
    // Cleanup
    dispose() {
      this.stopMusic();
      if (window.DayMusic && typeof window.DayMusic.dispose === 'function') {
        window.DayMusic.dispose();
      }
      if (window.NightMusic && typeof window.NightMusic.dispose === 'function') {
        window.NightMusic.dispose();
      }
      if (window.SoundEffects && typeof window.SoundEffects.dispose === 'function') {
        window.SoundEffects.dispose();
      }
    }
  };
  
  if (typeof window !== 'undefined') window.AudioManager = window.AudioManager || AudioManager;
  if (typeof module !== 'undefined') module.exports = AudioManager;
})();
