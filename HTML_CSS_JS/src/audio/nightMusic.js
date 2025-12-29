// NightMusic.js - Eerie A minor scale music for nighttime
(function(){
  const NightMusic = {
    synth: null,
    bass: null,
    volume: 0.6,
    isPlaying: false,
    currentNoteIndex: 0,
    
    // A minor scale notes - eerie and mysterious
    notes: ['A3', 'C4', 'E4', 'A4', 'E4', 'C4'],
    bassNotes: ['A2', 'A2', 'E2', 'E2', 'A2', 'A2'],
    
    init() {
      if (typeof Tone === 'undefined') {
        console.warn('⚠️ Tone.js not loaded, night music unavailable');
        return;
      }
      
      try {
        // Main melody synth - square wave for eerie sound
        this.synth = new Tone.PolySynth(Tone.Synth, {
          oscillator: { type: 'square' },
          envelope: { 
            attack: 0.01, 
            decay: 0.2, 
            sustain: 0.2, 
            release: 1.5 
          }
        }).toDestination();
        
        // Bass synth - sine wave for deep bass
        this.bass = new Tone.PolySynth(Tone.Synth, {
          oscillator: { type: 'sine' },
          envelope: { 
            attack: 0.01, 
            decay: 0.2, 
            sustain: 0.2, 
            release: 1.5 
          }
        }).toDestination();
        
        // Set volumes
        this.synth.volume.value = Tone.Destination.volume.value - 3;
        this.bass.volume.value = Tone.Destination.volume.value - 9;
        
        console.log('✅ Night music initialized');
      } catch (e) {
        console.error('❌ Night music initialization failed:', e);
      }
    },
    
    play() {
      if (!this.synth || !this.bass) {
        // Try to initialize if not already done
        if (typeof Tone !== 'undefined') {
          this.init();
        } else {
          console.warn('⚠️ Night music not initialized - Tone.js not available');
          return;
        }
      }
      
      if (this.isPlaying) return;
      this.isPlaying = true;
      
      console.log('🌙 Night music playing');
      this._playLoop();
    },
    
    _playLoop() {
      if (!this.isPlaying) return;
      
      const now = Tone.now();
      
      // Play current note
      const noteIndex = this.currentNoteIndex % this.notes.length;
      const bassIndex = this.currentNoteIndex % this.bassNotes.length;
      
      this.synth.triggerAttackRelease(this.notes[noteIndex], '0.6', now);
      this.bass.triggerAttackRelease(this.bassNotes[bassIndex], '0.6', now);
      
      this.currentNoteIndex++;
      
      // Schedule next note (0.8 seconds = slower, more eerie)
      setTimeout(() => this._playLoop(), 800);
    },
    
    stop() {
      this.isPlaying = false;
      if (this.synth) this.synth.triggerRelease();
      if (this.bass) this.bass.triggerRelease();
      console.log('⏹️ Night music stopped');
    },
    
    setVolume(volume) {
      this.volume = Math.max(0, Math.min(1, volume));
      if (this.synth) {
        this.synth.volume.value = this._dbFromVolume(this.volume) - 3;
      }
      if (this.bass) {
        this.bass.volume.value = this._dbFromVolume(this.volume) - 9;
      }
    },
    
    getVolume() {
      return this.volume;
    },
    
    _dbFromVolume(volume) {
      if (volume === 0) return -Infinity;
      return 20 * Math.log10(volume);
    },
    
    dispose() {
      this.stop();
      if (this.synth) this.synth.dispose();
      if (this.bass) this.bass.dispose();
    }
  };
  
  if (typeof window !== 'undefined') window.NightMusic = window.NightMusic || NightMusic;
  if (typeof module !== 'undefined') module.exports = NightMusic;
})();
