// soundEffects.js - Sound effect library and management
(function(){
  const SoundEffects = {
    // Sound effect definitions
    effects: {
      // Fishing sounds
      cast: { name: 'cast', url: 'assets/audio/sfx/cast.mp3', volume: 0.7 },
      bite: { name: 'bite', url: 'assets/audio/sfx/bite.mp3', volume: 0.8 },
      hook: { name: 'hook', url: 'assets/audio/sfx/hook.mp3', volume: 0.9 },
      reel: { name: 'reel', url: 'assets/audio/sfx/reel.mp3', volume: 0.6 },
      caught: { name: 'caught', url: 'assets/audio/sfx/caught.mp3', volume: 0.9 },
      lineBreak: { name: 'lineBreak', url: 'assets/audio/sfx/line_break.mp3', volume: 0.8 },
      
      // UI sounds
      menuSelect: { name: 'menuSelect', url: 'assets/audio/sfx/menu_select.mp3', volume: 0.5 },
      menuBack: { name: 'menuBack', url: 'assets/audio/sfx/menu_back.mp3', volume: 0.5 },
      buttonClick: { name: 'buttonClick', url: 'assets/audio/sfx/button_click.mp3', volume: 0.6 },
      
      // Horror sounds
      glitch: { name: 'glitch', url: 'assets/audio/sfx/glitch.mp3', volume: 0.7 },
      anomaly: { name: 'anomaly', url: 'assets/audio/sfx/anomaly.mp3', volume: 0.6 },
      strangeSound: { name: 'strangeSound', url: 'assets/audio/sfx/strange_sound.mp3', volume: 0.5 }
    },
    
    // Ambient sounds
    ambient: {
      waterLoop: { name: 'waterLoop', url: 'assets/audio/sfx/water_loop.mp3', volume: 0.3 },
      windLoop: { name: 'windLoop', url: 'assets/audio/sfx/wind_loop.mp3', volume: 0.2 },
      rainLoop: { name: 'rainLoop', url: 'assets/audio/sfx/rain_loop.mp3', volume: 0.4 }
    },
    
    isLoaded: false,
    
    /**
     * Load all sound effects
     */
    async loadAll() {
      if (!window.AudioManager || !window.AudioManager.isInitialized) {
        console.warn('AudioManager not initialized');
        return false;
      }
      
      try {
        // Load all effects
        for (const key in this.effects) {
          const effect = this.effects[key];
          try {
            await window.AudioManager.loadAudio(effect.name, effect.url);
          } catch (e) {
            console.warn(`Failed to load sound effect: ${effect.name}`);
          }
        }
        
        // Load all ambient sounds
        for (const key in this.ambient) {
          const sound = this.ambient[key];
          try {
            await window.AudioManager.loadAudio(sound.name, sound.url);
          } catch (e) {
            console.warn(`Failed to load ambient sound: ${sound.name}`);
          }
        }
        
        this.isLoaded = true;
        console.log('🔊 Sound effects loaded');
        return true;
      } catch (e) {
        console.error('Failed to load sound effects:', e);
        return false;
      }
    },
    
    /**
     * Play a fishing sound effect
     */
    playFishingSound(soundName) {
      if (!this.isLoaded) return;
      
      const effect = this.effects[soundName];
      if (!effect) {
        console.warn(`Unknown fishing sound: ${soundName}`);
        return;
      }
      
      window.AudioManager.playSound(effect.name, effect.volume);
    },
    
    /**
     * Play a UI sound effect
     */
    playUISound(soundName) {
      if (!this.isLoaded) return;
      
      const effect = this.effects[soundName];
      if (!effect) {
        console.warn(`Unknown UI sound: ${soundName}`);
        return;
      }
      
      window.AudioManager.playSound(effect.name, effect.volume);
    },
    
    /**
     * Play a horror sound effect
     */
    playHorrorSound(soundName) {
      if (!this.isLoaded) return;
      
      const effect = this.effects[soundName];
      if (!effect) {
        console.warn(`Unknown horror sound: ${soundName}`);
        return;
      }
      
      window.AudioManager.playSound(effect.name, effect.volume);
    },
    
    /**
     * Play ambient sound (looping)
     */
    playAmbientSound(soundName) {
      if (!this.isLoaded) return;
      
      const sound = this.ambient[soundName];
      if (!sound) {
        console.warn(`Unknown ambient sound: ${soundName}`);
        return;
      }
      
      window.AudioManager.playAmbient(sound.name, sound.volume);
    },
    
    /**
     * Stop ambient sound
     */
    stopAmbientSound(soundName) {
      const sound = this.ambient[soundName];
      if (sound) {
        window.AudioManager.stopAmbient(sound.name);
      }
    },
    
    /**
     * Stop all ambient sounds
     */
    stopAllAmbient() {
      window.AudioManager.stopAllAmbient();
    },
    
    /**
     * Get effect volume
     */
    getEffectVolume(soundName) {
      const effect = this.effects[soundName];
      return effect ? effect.volume : 1.0;
    }
  };
  
  if (typeof window !== 'undefined') window.SoundEffects = window.SoundEffects || SoundEffects;
  if (typeof module !== 'undefined') module.exports = SoundEffects;
})();
