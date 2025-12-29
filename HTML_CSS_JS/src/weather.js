// Weather.js - port of world/weather.lua
(function(){
  const Weather = {
    isRaining: false,
    rainIntensity: 0,
    windSpeed: 0,
    windDirection: 0,
    weatherTimer: 0,
    weatherDuration: 0,
    rainParticles: [],
    
    init() {
      this.isRaining = false;
      this.rainIntensity = 0;
      this.windSpeed = 0;
      this.windDirection = 0;
      this.weatherTimer = 0;
      this.weatherDuration = 0;
      this.rainParticles = [];
    },
    
    update(dt) {
      if (window.menuActive) return;
      
      this.weatherTimer += dt;
      
      // Random weather changes every 30-120 seconds
      if (this.weatherTimer >= this.weatherDuration) {
        this.changeWeather();
      }
      
      // Update rain
      if (this.isRaining) {
        this.rainIntensity = Math.min(1, this.rainIntensity + dt * 0.5);
        this.updateRainParticles(dt);
      } else {
        this.rainIntensity = Math.max(0, this.rainIntensity - dt * 0.3);
        this.rainParticles = [];
      }
      
      // Update wind
      this.windSpeed += (Math.random() - 0.5) * dt * 5;
      this.windSpeed = Math.max(0, Math.min(30, this.windSpeed));
      this.windDirection += (Math.random() - 0.5) * dt * 0.5;
    },
    
    changeWeather() {
      const roll = Math.random();
      
      if (roll < 0.7) {
        // Clear weather
        this.isRaining = false;
        this.windSpeed = Math.random() * 10;
      } else if (roll < 0.95) {
        // Light rain
        this.isRaining = true;
        this.windSpeed = 5 + Math.random() * 10;
      } else {
        // Heavy rain and wind
        this.isRaining = true;
        this.windSpeed = 15 + Math.random() * 15;
      }
      
      this.weatherTimer = 0;
      this.weatherDuration = 30 + Math.random() * 90; // 30-120 seconds
    },
    
    updateRainParticles(dt) {
      // Create new rain particles
      if (this.rainParticles.length < Math.floor(this.rainIntensity * 100)) {
        const canvas = document.getElementById('game-canvas');
        if (canvas) {
          this.rainParticles.push({
            x: Math.random() * canvas.width,
            y: -10,
            vx: this.windSpeed * 0.5,
            vy: 200 + Math.random() * 100,
            life: 1.0
          });
        }
      }
      
      // Update particles
      for (let i = this.rainParticles.length - 1; i >= 0; i--) {
        const p = this.rainParticles[i];
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.life -= dt * 0.5;
        
        const canvas = document.getElementById('game-canvas');
        if (canvas && (p.y > canvas.height || p.life <= 0)) {
          this.rainParticles.splice(i, 1);
        }
      }
    },
    
    draw() {
      const canvas = document.getElementById('game-canvas');
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      // Draw rain
      if (this.rainIntensity > 0) {
        ctx.save();
        ctx.strokeStyle = 'rgba(200, 220, 255, ' + (this.rainIntensity * 0.6) + ')';
        ctx.lineWidth = 1;
        
        for (const p of this.rainParticles) {
          ctx.globalAlpha = p.life * this.rainIntensity;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + p.vx * 0.05, p.y + p.vy * 0.05);
          ctx.stroke();
        }
        
        ctx.restore();
      }
      
      // Draw wind effect (visual indicator)
      if (this.windSpeed > 5) {
        ctx.save();
        ctx.strokeStyle = 'rgba(255, 255, 255, ' + ((this.windSpeed - 5) / 30 * 0.2) + ')';
        ctx.lineWidth = 1;
        
        for (let i = 0; i < 3; i++) {
          const y = 50 + i * 30;
          const offset = (performance.now() / 100 + i * 10) % 100;
          ctx.beginPath();
          ctx.moveTo(offset - 50, y);
          ctx.lineTo(offset + 50, y);
          ctx.stroke();
        }
        
        ctx.restore();
      }
    },
    
    getWeatherData() {
      return {
        isRaining: this.isRaining,
        rainIntensity: this.rainIntensity,
        windSpeed: this.windSpeed,
        windDirection: this.windDirection,
        castingAccuracy: this.isRaining ? 0.7 : (this.windSpeed > 15 ? 0.8 : 1.0)
      };
    },
    
    getWindEffect() {
      return {
        strength: this.windSpeed,
        direction: this.windDirection
      };
    },
    
    isStormy() {
      return this.isRaining && this.windSpeed > 15;
    },
    
    isClear() {
      return !this.isRaining && this.windSpeed < 5;
    }
  };
  
  if (typeof window !== 'undefined') window.Weather = window.Weather || Weather;
  if (typeof module !== 'undefined') module.exports = Weather;
})();
