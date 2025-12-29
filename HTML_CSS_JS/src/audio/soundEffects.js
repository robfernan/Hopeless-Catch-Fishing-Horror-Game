// SoundEffects.js - 8-bit style sound effects using Web Audio API
(function(){
  const SoundEffects = {
    audioContext: null,
    volume: 0.8,
    
    init() {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          this.audioContext = new AudioContext();
          console.log('✅ Sound effects initialized');
        } else {
          console.warn('⚠️ Web Audio API not available');
        }
      } catch (e) {
        console.error('❌ Sound effects initialization failed:', e);
      }
    },
    
    // Play a simple beep sound
    playBeep(frequency = 800, duration = 100, type = 'sine') {
      if (!this.audioContext) return;
      
      try {
        const now = this.audioContext.currentTime;
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        
        osc.connect(gain);
        gain.connect(this.audioContext.destination);
        
        osc.frequency.value = frequency;
        osc.type = type;
        
        gain.gain.setValueAtTime(this.volume * 0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + duration / 1000);
        
        osc.start(now);
        osc.stop(now + duration / 1000);
      } catch (e) {
        console.warn('⚠️ Beep sound failed:', e);
      }
    },
    
    // Casting sound - whoosh
    playCast() {
      if (!this.audioContext) return;
      
      try {
        const now = this.audioContext.currentTime;
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        
        osc.connect(gain);
        gain.connect(this.audioContext.destination);
        
        // Sweep from high to low frequency
        osc.frequency.setValueAtTime(1200, now);
        osc.frequency.exponentialRampToValueAtTime(400, now + 0.2);
        osc.type = 'triangle';
        
        gain.gain.setValueAtTime(this.volume * 0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
        
        osc.start(now);
        osc.stop(now + 0.2);
        
        console.log('🎣 Cast sound');
      } catch (e) {
        console.warn('⚠️ Cast sound failed:', e);
      }
    },
    
    // Bite sound - alert beep
    playBite() {
      if (!this.audioContext) return;
      
      try {
        const now = this.audioContext.currentTime;
        
        // Two quick beeps
        for (let i = 0; i < 2; i++) {
          const osc = this.audioContext.createOscillator();
          const gain = this.audioContext.createGain();
          
          osc.connect(gain);
          gain.connect(this.audioContext.destination);
          
          osc.frequency.value = 1000;
          osc.type = 'sine';
          
          const startTime = now + (i * 0.15);
          gain.gain.setValueAtTime(this.volume * 0.3, startTime);
          gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.1);
          
          osc.start(startTime);
          osc.stop(startTime + 0.1);
        }
        
        console.log('🐟 Bite sound');
      } catch (e) {
        console.warn('⚠️ Bite sound failed:', e);
      }
    },
    
    // Reel sound - mechanical clicking
    playReel() {
      if (!this.audioContext) return;
      
      try {
        const now = this.audioContext.currentTime;
        
        // Multiple clicks for reel effect
        for (let i = 0; i < 3; i++) {
          const osc = this.audioContext.createOscillator();
          const gain = this.audioContext.createGain();
          
          osc.connect(gain);
          gain.connect(this.audioContext.destination);
          
          osc.frequency.value = 600 + (i * 100);
          osc.type = 'square';
          
          const startTime = now + (i * 0.08);
          gain.gain.setValueAtTime(this.volume * 0.2, startTime);
          gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.06);
          
          osc.start(startTime);
          osc.stop(startTime + 0.06);
        }
        
        console.log('⚙️ Reel sound');
      } catch (e) {
        console.warn('⚠️ Reel sound failed:', e);
      }
    },
    
    // Catch sound - success chime
    playCatch() {
      if (!this.audioContext) return;
      
      try {
        const now = this.audioContext.currentTime;
        
        // Ascending notes for success
        const notes = [800, 1000, 1200];
        
        for (let i = 0; i < notes.length; i++) {
          const osc = this.audioContext.createOscillator();
          const gain = this.audioContext.createGain();
          
          osc.connect(gain);
          gain.connect(this.audioContext.destination);
          
          osc.frequency.value = notes[i];
          osc.type = 'sine';
          
          const startTime = now + (i * 0.15);
          gain.gain.setValueAtTime(this.volume * 0.4, startTime);
          gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.2);
          
          osc.start(startTime);
          osc.stop(startTime + 0.2);
        }
        
        console.log('✨ Catch sound');
      } catch (e) {
        console.warn('⚠️ Catch sound failed:', e);
      }
    },
    
    // UI click sound
    playClick() {
      if (!this.audioContext) return;
      
      try {
        const now = this.audioContext.currentTime;
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        
        osc.connect(gain);
        gain.connect(this.audioContext.destination);
        
        osc.frequency.value = 500;
        osc.type = 'sine';
        
        gain.gain.setValueAtTime(this.volume * 0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
        
        osc.start(now);
        osc.stop(now + 0.05);
      } catch (e) {
        console.warn('⚠️ Click sound failed:', e);
      }
    },
    
    // Rare fish catch sound - special chime
    playRareCatch() {
      if (!this.audioContext) return;
      
      try {
        const now = this.audioContext.currentTime;
        
        // Higher, more impressive notes
        const notes = [1200, 1400, 1600, 1400];
        
        for (let i = 0; i < notes.length; i++) {
          const osc = this.audioContext.createOscillator();
          const gain = this.audioContext.createGain();
          
          osc.connect(gain);
          gain.connect(this.audioContext.destination);
          
          osc.frequency.value = notes[i];
          osc.type = 'sine';
          
          const startTime = now + (i * 0.12);
          gain.gain.setValueAtTime(this.volume * 0.5, startTime);
          gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.25);
          
          osc.start(startTime);
          osc.stop(startTime + 0.25);
        }
        
        console.log('🌟 Rare catch sound');
      } catch (e) {
        console.warn('⚠️ Rare catch sound failed:', e);
      }
    },
    
    setVolume(volume) {
      this.volume = Math.max(0, Math.min(1, volume));
    },
    
    getVolume() {
      return this.volume;
    },
    
    dispose() {
      if (this.audioContext) {
        this.audioContext.close();
      }
    }
  };
  
  if (typeof window !== 'undefined') window.SoundEffects = window.SoundEffects || SoundEffects;
  if (typeof module !== 'undefined') module.exports = SoundEffects;
})();
