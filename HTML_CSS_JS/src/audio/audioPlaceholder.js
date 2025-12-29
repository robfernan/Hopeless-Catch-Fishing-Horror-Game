// audioPlaceholder.js - Generate audio buffers as placeholders
// This allows the game to run without actual audio files
(function(){
  const AudioPlaceholder = {
    /**
     * Create a silent audio buffer
     */
    createSilentBuffer(audioContext, duration = 1.0) {
      const sampleRate = audioContext.sampleRate;
      const length = sampleRate * duration;
      const buffer = audioContext.createBuffer(2, length, sampleRate);
      return buffer;
    },
    
    /**
     * Create a simple beep sound (for testing)
     */
    createBeepBuffer(audioContext, frequency = 440, duration = 0.1) {
      const sampleRate = audioContext.sampleRate;
      const length = sampleRate * duration;
      const buffer = audioContext.createBuffer(1, length, sampleRate);
      const data = buffer.getChannelData(0);
      
      for (let i = 0; i < length; i++) {
        data[i] = Math.sin(2 * Math.PI * frequency * i / sampleRate) * 0.3;
      }
      
      return buffer;
    },
    
    /**
     * Create a peaceful day theme (C major scale melody)
     */
    createDayThemeBuffer(audioContext, duration = 5.0) {
      const sampleRate = audioContext.sampleRate;
      const length = sampleRate * duration;
      const buffer = audioContext.createBuffer(1, length, sampleRate);
      const data = buffer.getChannelData(0);
      
      // C major scale: C D E F G A B C
      const notes = [262, 294, 330, 349, 392, 440, 494, 523];
      const noteDuration = duration / notes.length;
      const noteLength = sampleRate * noteDuration;
      
      let pos = 0;
      for (let n = 0; n < notes.length; n++) {
        const freq = notes[n];
        for (let i = 0; i < noteLength && pos < length; i++, pos++) {
          // Sine wave with envelope (fade in/out)
          const envelope = Math.sin((i / noteLength) * Math.PI);
          data[pos] = Math.sin(2 * Math.PI * freq * i / sampleRate) * envelope * 0.2;
        }
      }
      
      return buffer;
    },
    
    /**
     * Create an eerie night theme (A minor scale melody)
     */
    createNightThemeBuffer(audioContext, duration = 5.0) {
      const sampleRate = audioContext.sampleRate;
      const length = sampleRate * duration;
      const buffer = audioContext.createBuffer(1, length, sampleRate);
      const data = buffer.getChannelData(0);
      
      // A minor scale: A B C D E F G A
      const notes = [220, 247, 262, 294, 330, 349, 392, 440];
      const noteDuration = duration / notes.length;
      const noteLength = sampleRate * noteDuration;
      
      let pos = 0;
      for (let n = 0; n < notes.length; n++) {
        const freq = notes[n];
        for (let i = 0; i < noteLength && pos < length; i++, pos++) {
          // Sine wave with envelope (fade in/out) - slightly lower volume for eerie feel
          const envelope = Math.sin((i / noteLength) * Math.PI);
          data[pos] = Math.sin(2 * Math.PI * freq * i / sampleRate) * envelope * 0.15;
        }
      }
      
      return buffer;
    },
    
    /**
     * Load placeholder audio for all missing files
     */
    loadPlaceholders(audioManager) {
      if (!audioManager || !audioManager.audioContext) return;
      
      const ctx = audioManager.audioContext;
      
      // Create placeholder buffers for all sound effects
      const effects = [
        'cast', 'bite', 'hook', 'reel', 'caught', 'lineBreak',
        'menuSelect', 'menuBack', 'buttonClick',
        'glitch', 'anomaly', 'strangeSound'
      ];
      
      effects.forEach(name => {
        if (!audioManager.buffers[name]) {
          audioManager.buffers[name] = this.createSilentBuffer(ctx, 0.5);
        }
      });
      
      // Create placeholder buffers for music tracks with procedural themes
      if (!audioManager.buffers['dayTheme']) {
        audioManager.buffers['dayTheme'] = this.createDayThemeBuffer(ctx, 5.0);
      }
      if (!audioManager.buffers['nightTheme']) {
        audioManager.buffers['nightTheme'] = this.createNightThemeBuffer(ctx, 5.0);
      }
      
      const otherTracks = ['cabinTheme', 'menuTheme', 'stormTheme', 'tensionTheme'];
      otherTracks.forEach(name => {
        if (!audioManager.buffers[name]) {
          audioManager.buffers[name] = this.createSilentBuffer(ctx, 5.0);
        }
      });
      
      // Create placeholder buffers for ambient sounds
      const ambient = [
        'waterLoop', 'windLoop', 'rainLoop'
      ];
      
      ambient.forEach(name => {
        if (!audioManager.buffers[name]) {
          audioManager.buffers[name] = this.createSilentBuffer(ctx, 10.0);
        }
      });
      
      console.log('🔊 Audio placeholders loaded');
    }
  };
  
  if (typeof window !== 'undefined') window.AudioPlaceholder = window.AudioPlaceholder || AudioPlaceholder;
  if (typeof module !== 'undefined') module.exports = AudioPlaceholder;
})();
