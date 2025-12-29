// ScreenShake.js - Visual feedback through screen shaking
(function(){
  const ScreenShake = {
    timer: 0,
    intensity: 0,
    x: 0,
    y: 0,
    
    init() {
      this.timer = 0;
      this.intensity = 0;
      this.x = 0;
      this.y = 0;
    },
    
    update(dt) {
      if (this.timer > 0) {
        this.timer -= dt;
        
        if (this.timer <= 0) {
          this.x = 0;
          this.y = 0;
          this.intensity = 0;
        } else {
          // Random shake
          this.x = (Math.random() - 0.5) * this.intensity;
          this.y = (Math.random() - 0.5) * this.intensity;
        }
      }
    },
    
    shake(duration, intensity) {
      this.timer = duration;
      this.intensity = intensity;
    },
    
    // Different shake types
    smallShake() {
      this.shake(0.1, 2);
    },
    
    mediumShake() {
      this.shake(0.2, 5);
    },
    
    largeShake() {
      this.shake(0.3, 10);
    },
    
    // Shake on fish hook
    hookShake() {
      this.shake(0.15, 3);
    },
    
    // Shake on line break
    breakShake() {
      this.shake(0.25, 8);
    },
    
    // Shake on anomaly
    anomalyShake() {
      this.shake(0.5, 4);
    },
    
    getOffset() {
      return { x: this.x, y: this.y };
    },
    
    isShaking() {
      return this.timer > 0;
    }
  };
  
  if (typeof window !== 'undefined') window.ScreenShake = window.ScreenShake || ScreenShake;
  if (typeof module !== 'undefined') module.exports = ScreenShake;
})();
