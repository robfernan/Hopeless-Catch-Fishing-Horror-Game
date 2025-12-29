// DayMusic.js - Peaceful C major scale music for daytime
(function(){
  const DayMusic = {
    synth: null,
    bass: null,
    volume: 0.6,
    isPlaying: false,
    currentNoteIndex: 0,
    
    // C major scale notes
    notes: ['C4', 'E4', 'G4', 'C5', 'G4', 'E4'],
    bassNotes: ['C3', 'C3', 'G2', 'G2', 'C3', 'C3'],
    
    init() {
      if (typeof Tone === 'undefined') {
        console.warn('⚠️ Tone.js not loaded, day music unavailable');
        return;
      }
      
      try {
        // Main melody synth - triangle wave for smooth, peaceful sound
        this.synth = new Tone.PolySynth(Tone.Synth, {
          oscillator: { type: 'triangle' },
          envelope: { 
            attack: 0.005, 
            decay: 0.1, 
            sustain: 0.3, 
            release: 1 
          }
        }).toDestination();
        
        // Bass synth - sine wave for deep, warm bass
        this.bass = new Tone.PolySynth(Tone.Synth, {
          oscillator: { type: 'sine' },
          envelope: { 
            attack: 0.005, 
            decay: 0.1, 
            sustain: 0.3, 
            release: 1 
          }
        }).toDestination();
        
        // Set volumes
        this.synth.volume.value = Tone.Destination.volume.value - 3;
        this.bass.volume.value = Tone.Destination.volume.value - 9;
        
        console.log('✅ Day music initialized');
      } catch (e) {
        console.error('❌ Day music initialization failed:', e);
      }
    },
    
    play() {
      if (!this.synth || !this.bass) {
        console.warn('⚠️ Day music not initialized');
        return;
      }
      
      if (this.isPlaying) return;
      this.isPlaying = true;
      
      console.log('🎵 Day music playing');
      this._playLoop();
    },
    
    _playLoop() {
      if (!this.isPlaying) return;
      
      const now = Tone.now();
      
      // Play current note
      const noteIndex = this.currentNoteIndex % this.notes.length;
      const bassIndex = this.currentNoteIndex % this.bassNotes.length;
      
      this.synth.triggerAttackRelease(this.notes[noteIndex], '0.4', now);
      this.bass.triggerAttackRelease(this.bassNotes[bassIndex], '0.4', now);
      
      this.currentNoteIndex++;
      
      // Schedule next note (0.5 seconds = 120 BPM)
      setTimeout(() => this._playLoop(), 500);
    },
    
    stop() {
      this.isPlaying = false;
      if (this.synth) this.synth.triggerRelease();
      if (this.bass) this.bass.triggerRelease();
      console.log('⏹️ Day music stopped');
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
  
  if (typeof window !== 'undefined') window.DayMusic = window.DayMusic || DayMusic;
  if (typeof module !== 'undefined') module.exports = DayMusic;
})();
