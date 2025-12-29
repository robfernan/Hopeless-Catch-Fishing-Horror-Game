// Anomalies.js - Subtle horror elements and glitches
(function(){
  const Anomalies = {
    enabled: true,
    anomalyTimer: 0,
    anomalyChance: 0.001, // Very rare
    currentAnomalies: [],
    glitchIntensity: 0,
    
    init() {
      this.enabled = !window.GameSettings || !window.GameSettings.peacefulMode;
      this.anomalyTimer = 0;
      this.currentAnomalies = [];
      this.glitchIntensity = 0;
    },
    
    update(dt) {
      if (!this.enabled) return;
      
      this.anomalyTimer += dt;
      
      // Check for new anomalies (very rare)
      if (Math.random() < this.anomalyChance * dt) {
        this.triggerRandomAnomaly();
      }
      
      // Update active anomalies
      for (let i = this.currentAnomalies.length - 1; i >= 0; i--) {
        const anomaly = this.currentAnomalies[i];
        anomaly.duration -= dt;
        
        if (anomaly.duration <= 0) {
          this.currentAnomalies.splice(i, 1);
        }
      }
      
      // Decay glitch intensity
      this.glitchIntensity = Math.max(0, this.glitchIntensity - dt * 0.5);
    },
    
    triggerRandomAnomaly() {
      const anomalies = [
        'screen_glitch',
        'audio_distortion',
        'time_skip',
        'fish_shadow',
        'water_ripple',
        'strange_sound'
      ];
      
      const choice = anomalies[Math.floor(Math.random() * anomalies.length)];
      this.triggerAnomaly(choice);
    },
    
    triggerAnomaly(type) {
      const anomaly = {
        type: type,
        duration: 0.5 + Math.random() * 1.5,
        intensity: Math.random() * 0.5 + 0.5
      };
      
      this.currentAnomalies.push(anomaly);
      this.glitchIntensity = Math.min(1, this.glitchIntensity + 0.3);
      
      console.log('🌀 Anomaly triggered:', type);
    },
    
    draw(ctx) {
      if (!ctx || !this.enabled) return;
      
      // Draw screen glitches
      for (const anomaly of this.currentAnomalies) {
        if (anomaly.type === 'screen_glitch') {
          this.drawScreenGlitch(ctx, anomaly);
        } else if (anomaly.type === 'water_ripple') {
          this.drawWaterDistortion(ctx, anomaly);
        }
      }
      
      // Overall glitch effect
      if (this.glitchIntensity > 0) {
        this.drawGlitchOverlay(ctx);
      }
    },
    
    drawScreenGlitch(ctx, anomaly) {
      const progress = 1 - (anomaly.duration / (0.5 + 1.5));
      const glitchAmount = anomaly.intensity * 20 * (1 - Math.abs(progress - 0.5) * 2);
      
      ctx.save();
      ctx.globalAlpha = anomaly.intensity * 0.3;
      
      // Random horizontal lines
      for (let i = 0; i < 5; i++) {
        const y = Math.random() * ctx.canvas.height;
        const height = Math.random() * 10 + 2;
        const offset = (Math.random() - 0.5) * glitchAmount;
        
        ctx.fillStyle = 'rgba(255, 0, 0, 0.2)';
        ctx.fillRect(0, y, ctx.canvas.width, height);
        
        ctx.fillStyle = 'rgba(0, 255, 0, 0.1)';
        ctx.fillRect(offset, y, ctx.canvas.width - Math.abs(offset), height);
      }
      
      ctx.restore();
    },
    
    drawWaterDistortion(ctx, anomaly) {
      const canvas = document.getElementById('game-canvas');
      if (!canvas) return;
      
      const waterY = (window.World && window.World.getWaterY) ? window.World.getWaterY() : 480;
      const progress = 1 - (anomaly.duration / (0.5 + 1.5));
      
      ctx.save();
      ctx.globalAlpha = anomaly.intensity * 0.4;
      ctx.strokeStyle = 'rgba(100, 200, 255, 0.6)';
      ctx.lineWidth = 2;
      
      // Distorted ripples
      for (let i = 0; i < 3; i++) {
        const rippleSize = 30 + i * 20 + progress * 100;
        const centerX = canvas.width / 2 + (Math.random() - 0.5) * 100;
        
        ctx.beginPath();
        ctx.arc(centerX, waterY, rippleSize, 0, Math.PI * 2);
        ctx.stroke();
      }
      
      ctx.restore();
    },
    
    drawGlitchOverlay(ctx) {
      ctx.save();
      ctx.globalAlpha = this.glitchIntensity * 0.1;
      
      // Random color shift
      const hue = Math.random() * 360;
      ctx.fillStyle = `hsla(${hue}, 100%, 50%, 0.05)`;
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      
      ctx.restore();
    },
    
    // Trigger specific anomalies
    triggerScreenGlitch() {
      this.triggerAnomaly('screen_glitch');
    },
    
    triggerWaterDistortion() {
      this.triggerAnomaly('water_ripple');
    },
    
    triggerTimeSkip() {
      if (window.DayNightCycle) {
        const currentTime = window.DayNightCycle.getTime();
        const skip = (Math.random() * 0.1 + 0.05); // Skip 5-15% of day
        window.DayNightCycle.setTime(currentTime + skip);
      }
      this.triggerAnomaly('time_skip');
    },
    
    // Check if player is in anomaly zone
    checkForAnomalies(playerX, playerY) {
      // Anomalies can trigger near deep water
      const waterY = (window.World && window.World.getWaterY) ? window.World.getWaterY() : 480;
      
      if (playerY > waterY - 50) {
        // Near water - higher chance of anomalies
        if (Math.random() < 0.0005) {
          this.triggerRandomAnomaly();
        }
      }
    },
    
    // Get anomaly intensity for other systems
    getGlitchIntensity() {
      return this.glitchIntensity;
    },
    
    // Check if peaceful mode is enabled
    isPeacefulMode() {
      return window.GameSettings && window.GameSettings.peacefulMode;
    }
  };
  
  if (typeof window !== 'undefined') window.Anomalies = window.Anomalies || Anomalies;
  if (typeof module !== 'undefined') module.exports = Anomalies;
})();
