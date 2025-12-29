// DayNightCycle.js - port of world/daynightcycle.lua
(function(){
  const DayNightCycle = {
    // Time is 0-1 where 0.0 = midnight, 0.3 = morning, 0.5 = noon, 0.8 = evening, 1.0 = midnight
    time: 0.3,
    timeScale: 1.0,
    currentDay: 1,
    maxDays: 30,
    
    // Lighting state
    ambientLight: { r: 1, g: 1, b: 1, a: 1 },
    
    // Phase names
    phases: {
      NIGHT: 'night',
      DAWN: 'dawn',
      DAY: 'day',
      DUSK: 'dusk'
    },
    
    init() {
      this.time = 0.3; // Start at morning
      this.timeScale = 1.0;
      this.currentDay = 1;
      this.updateLighting();
    },
    
    update(dt) {
      if (window.menuActive) return;
      
      // Advance time
      this.time += (dt * this.timeScale) / 600; // 600 seconds = 10 minutes real time = 1 full day
      
      // Wrap around to next day
      if (this.time >= 1.0) {
        this.time = 0.0;
        this.currentDay = Math.min(this.currentDay + 1, this.maxDays);
        console.log('🌅 Day ' + this.currentDay + ' begins');
      }
      
      this.updateLighting();
    },
    
    updateLighting() {
      // Calculate lighting based on time of day
      // 0.0-0.2 = night (dark)
      // 0.2-0.35 = dawn (brightening)
      // 0.35-0.65 = day (bright)
      // 0.65-0.8 = dusk (dimming)
      // 0.8-1.0 = night (dark)
      
      let r = 1, g = 1, b = 1, a = 1;
      
      if (this.time < 0.2) {
        // Night: very dark blue
        const t = this.time / 0.2;
        r = 0.3 + t * 0.2;
        g = 0.3 + t * 0.3;
        b = 0.5 + t * 0.2;
        a = 0.6;
      } else if (this.time < 0.35) {
        // Dawn: brightening
        const t = (this.time - 0.2) / 0.15;
        r = 0.5 + t * 0.5;
        g = 0.6 + t * 0.4;
        b = 0.7 - t * 0.2;
        a = 0.8 + t * 0.2;
      } else if (this.time < 0.65) {
        // Day: bright
        r = 1.0;
        g = 1.0;
        b = 0.5;
        a = 1.0;
      } else if (this.time < 0.8) {
        // Dusk: dimming
        const t = (this.time - 0.65) / 0.15;
        r = 1.0 - t * 0.5;
        g = 1.0 - t * 0.4;
        b = 0.5 - t * 0.2;
        a = 1.0 - t * 0.2;
      } else {
        // Night: dark
        const t = (this.time - 0.8) / 0.2;
        r = 0.5 - t * 0.2;
        g = 0.6 - t * 0.3;
        b = 0.3 + t * 0.2;
        a = 0.8 - t * 0.2;
      }
      
      this.ambientLight = { r, g, b, a };
    },
    
    getTime() {
      return this.time;
    },
    
    setTime(newTime) {
      this.time = Math.max(0, Math.min(1, newTime));
      this.updateLighting();
    },
    
    getCurrentDay() {
      return this.currentDay;
    },
    
    getDayCount() {
      return this.currentDay;
    },
    
    setCurrentDay(day) {
      this.currentDay = Math.max(1, Math.min(day, this.maxDays));
    },
    
    getPhase() {
      if (this.time < 0.2 || this.time >= 0.8) return this.phases.NIGHT;
      if (this.time < 0.35) return this.phases.DAWN;
      if (this.time < 0.65) return this.phases.DAY;
      return this.phases.DUSK;
    },
    
    isNight() {
      return this.time < 0.2 || this.time >= 0.8;
    },
    
    isDay() {
      return this.time >= 0.35 && this.time < 0.65;
    },
    
    isDawn() {
      return this.time >= 0.2 && this.time < 0.35;
    },
    
    isDusk() {
      return this.time >= 0.65 && this.time < 0.8;
    },
    
    getAmbientLight() {
      return this.ambientLight;
    },
    
    setTimeScale(scale) {
      this.timeScale = Math.max(0, scale);
    },
    
    getTimeScale() {
      return this.timeScale;
    },
    
    advanceToNextDay() {
      this.time = 0.3; // Morning
      this.currentDay = Math.min(this.currentDay + 1, this.maxDays);
      this.updateLighting();
      console.log('🌅 Advanced to Day ' + this.currentDay);
    },
    
    // Draw time indicator on HUD
    drawTimeIndicator() {
      const canvas = document.getElementById('game-canvas');
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      // Draw time display in top-left
      ctx.save();
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.fillRect(10, 10, 120, 50);
      
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 12px Arial';
      ctx.fillText('Day ' + this.currentDay, 15, 28);
      
      const hours = Math.floor(this.time * 24);
      const minutes = Math.floor((this.time * 24 - hours) * 60);
      const timeStr = String(hours).padStart(2, '0') + ':' + String(minutes).padStart(2, '0');
      ctx.fillText(timeStr, 15, 43);
      
      ctx.restore();
    },
    
    // Apply lighting to canvas (called before drawing game objects)
    beginLighting() {
      const canvas = document.getElementById('game-canvas');
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      const light = this.ambientLight;
      ctx.save();
      ctx.globalAlpha = light.a;
      ctx.fillStyle = 'rgb(' + Math.floor(light.r * 255) + ',' + Math.floor(light.g * 255) + ',' + Math.floor(light.b * 255) + ')';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    },
    
    // End lighting effects
    endLighting() {
      const canvas = document.getElementById('game-canvas');
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      ctx.restore();
    }
  };
  
  if (typeof window !== 'undefined') window.DayNightCycle = window.DayNightCycle || DayNightCycle;
  if (typeof module !== 'undefined') module.exports = DayNightCycle;
})();
