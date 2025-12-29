// audioManager.js - Main audio controller using Web Audio API
(function(){
  const AudioManager = {
    // Audio context and state
    audioContext: null,
    isInitialized: false,
    
    // Volume levels (0-1)
    masterVolume: 0.8,
    musicVolume: 0.6,
    sfxVolume: 0.8,
    ambientVolume: 0.4,
    
    // Audio nodes
    masterGain: null,
    musicGain: null,
    sfxGain: null,
    ambientGain: null,
    
    // Currently playing audio
    currentMusic: null,
    ambientSounds: {},
    soundEffects: {},
    
    // Audio buffers cache
    buffers: {},
    
    /**
     * Initialize the audio manager
     */
    init() {
      try {
        // Create audio context (handle browser differences)
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) {
          console.warn('Web Audio API not supported');
          return false;
        }
        
        this.audioContext = new AudioContext();
        
        // Create gain nodes for volume control
        this.masterGain = this.audioContext.createGain();
        this.musicGain = this.audioContext.createGain();
        this.sfxGain = this.audioContext.createGain();
        this.ambientGain = this.audioContext.createGain();
        
        // Connect gain nodes to master
        this.musicGain.connect(this.masterGain);
        this.sfxGain.connect(this.masterGain);
        this.ambientGain.connect(this.masterGain);
        
        // Connect master to destination
        this.masterGain.connect(this.audioContext.destination);
        
        // Set initial volumes
        this.setMasterVolume(this.masterVolume);
        this.setMusicVolume(this.musicVolume);
        this.setSFXVolume(this.sfxVolume);
        this.setAmbientVolume(this.ambientVolume);
        
        this.isInitialized = true;
        console.log('🔊 Audio Manager initialized');
        return true;
      } catch (e) {
        console.error('Audio Manager init failed:', e);
        return false;
      }
    },
    
    /**
     * Resume audio context if suspended (required by browser autoplay policy)
     */
    async resumeContext() {
      if (this.audioContext && this.audioContext.state === 'suspended') {
        try {
          await this.audioContext.resume();
          console.log('Audio context resumed');
        } catch (e) {
          console.warn('Could not resume audio context:', e);
        }
      }
    },
    
    /**
     * Load audio file and cache the buffer
     */
    async loadAudio(name, url) {
      if (!this.isInitialized) return null;
      
      try {
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
        this.buffers[name] = audioBuffer;
        return audioBuffer;
      } catch (e) {
        console.warn(`Failed to load audio: ${name}, using placeholder`);
        // Create a silent placeholder buffer
        const duration = name.includes('Theme') || name.includes('Loop') ? 5.0 : 0.5;
        this.buffers[name] = this.audioContext.createBuffer(2, this.audioContext.sampleRate * duration, this.audioContext.sampleRate);
        return this.buffers[name];
      }
    },
    
    /**
     * Play a sound effect
     */
    playSound(name, volume = 1.0, loop = false) {
      if (!this.isInitialized || !this.buffers[name]) {
        console.warn(`Sound not loaded: ${name}`);
        return null;
      }
      
      try {
        const source = this.audioContext.createBufferSource();
        source.buffer = this.buffers[name];
        source.loop = loop;
        
        const gain = this.audioContext.createGain();
        gain.gain.value = volume * this.sfxVolume;
        
        source.connect(gain);
        gain.connect(this.sfxGain);
        
        source.start(0);
        
        // Store reference for potential stopping
        if (!this.soundEffects[name]) this.soundEffects[name] = [];
        this.soundEffects[name].push({ source, gain });
        
        // Clean up when finished (if not looping)
        if (!loop) {
          source.onended = () => {
            const idx = this.soundEffects[name].indexOf({ source, gain });
            if (idx >= 0) this.soundEffects[name].splice(idx, 1);
          };
        }
        
        return source;
      } catch (e) {
        console.error(`Error playing sound ${name}:`, e);
        return null;
      }
    },
    
    /**
     * Stop all instances of a sound
     */
    stopSound(name) {
      if (this.soundEffects[name]) {
        this.soundEffects[name].forEach(({ source }) => {
          try { source.stop(); } catch (e) {}
        });
        this.soundEffects[name] = [];
      }
    },
    
    /**
     * Play background music
     */
    playMusic(name, volume = 1.0, loop = true) {
      if (!this.isInitialized || !this.buffers[name]) {
        console.warn(`Music not loaded: ${name}`);
        return null;
      }
      
      try {
        // Stop current music
        if (this.currentMusic) {
          try { this.currentMusic.source.stop(); } catch (e) {}
        }
        
        const source = this.audioContext.createBufferSource();
        source.buffer = this.buffers[name];
        source.loop = loop;
        
        const gain = this.audioContext.createGain();
        gain.gain.value = volume * this.musicVolume;
        
        source.connect(gain);
        gain.connect(this.musicGain);
        
        source.start(0);
        
        this.currentMusic = { source, gain, name };
        return source;
      } catch (e) {
        console.error(`Error playing music ${name}:`, e);
        return null;
      }
    },
    
    /**
     * Stop background music
     */
    stopMusic() {
      if (this.currentMusic) {
        try { this.currentMusic.source.stop(); } catch (e) {}
        this.currentMusic = null;
      }
    },
    
    /**
     * Fade music in/out
     */
    fadeMusic(targetVolume, duration = 1.0) {
      if (!this.currentMusic) return;
      
      const startTime = this.audioContext.currentTime;
      const startVolume = this.currentMusic.gain.gain.value;
      
      const ramp = () => {
        const elapsed = this.audioContext.currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const volume = startVolume + (targetVolume - startVolume) * progress;
        this.currentMusic.gain.gain.value = volume;
        
        if (progress < 1) {
          requestAnimationFrame(ramp);
        }
      };
      
      ramp();
    },
    
    /**
     * Play ambient sound (looping)
     */
    playAmbient(name, volume = 1.0) {
      if (!this.isInitialized || !this.buffers[name]) {
        console.warn(`Ambient sound not loaded: ${name}`);
        return null;
      }
      
      try {
        const source = this.audioContext.createBufferSource();
        source.buffer = this.buffers[name];
        source.loop = true;
        
        const gain = this.audioContext.createGain();
        gain.gain.value = volume * this.ambientVolume;
        
        source.connect(gain);
        gain.connect(this.ambientGain);
        
        source.start(0);
        
        this.ambientSounds[name] = { source, gain };
        return source;
      } catch (e) {
        console.error(`Error playing ambient ${name}:`, e);
        return null;
      }
    },
    
    /**
     * Stop ambient sound
     */
    stopAmbient(name) {
      if (this.ambientSounds[name]) {
        try { this.ambientSounds[name].source.stop(); } catch (e) {}
        delete this.ambientSounds[name];
      }
    },
    
    /**
     * Stop all ambient sounds
     */
    stopAllAmbient() {
      for (const name in this.ambientSounds) {
        this.stopAmbient(name);
      }
    },
    
    /**
     * Set master volume (0-1)
     */
    setMasterVolume(volume) {
      this.masterVolume = Math.max(0, Math.min(1, volume));
      if (this.masterGain) {
        this.masterGain.gain.value = this.masterVolume;
      }
    },
    
    /**
     * Set music volume (0-1)
     */
    setMusicVolume(volume) {
      this.musicVolume = Math.max(0, Math.min(1, volume));
      if (this.musicGain) {
        this.musicGain.gain.value = this.musicVolume;
      }
    },
    
    /**
     * Set SFX volume (0-1)
     */
    setSFXVolume(volume) {
      this.sfxVolume = Math.max(0, Math.min(1, volume));
      if (this.sfxGain) {
        this.sfxGain.gain.value = this.sfxVolume;
      }
    },
    
    /**
     * Set ambient volume (0-1)
     */
    setAmbientVolume(volume) {
      this.ambientVolume = Math.max(0, Math.min(1, volume));
      if (this.ambientGain) {
        this.ambientGain.gain.value = this.ambientVolume;
      }
    },
    
    /**
     * Mute all audio
     */
    mute() {
      if (this.masterGain) {
        this.masterGain.gain.value = 0;
      }
    },
    
    /**
     * Unmute audio
     */
    unmute() {
      if (this.masterGain) {
        this.masterGain.gain.value = this.masterVolume;
      }
    },
    
    /**
     * Get current master volume
     */
    getMasterVolume() {
      return this.masterVolume;
    },
    
    /**
     * Get current music volume
     */
    getMusicVolume() {
      return this.musicVolume;
    },
    
    /**
     * Get current SFX volume
     */
    getSFXVolume() {
      return this.sfxVolume;
    },
    
    /**
     * Get current ambient volume
     */
    getAmbientVolume() {
      return this.ambientVolume;
    }
  };
  
  if (typeof window !== 'undefined') window.AudioManager = window.AudioManager || AudioManager;
  if (typeof module !== 'undefined') module.exports = AudioManager;
})();
