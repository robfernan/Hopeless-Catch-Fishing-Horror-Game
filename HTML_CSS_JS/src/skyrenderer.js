// SkyRenderer.js - Sky gradient, sun, moon, stars, and clouds
(function(){
  const SkyRenderer = {
    init() {
      this.cloudOffset = 0;
    },
    
    update(dt) {
      this.cloudOffset += dt * 5; // Cloud movement speed
    },
    
    draw(ctx, timeOfDay, waterY) {
      if (!ctx) return;
      
      const width = ctx.canvas.width;
      const height = ctx.canvas.height;
      
      // Only draw celestial bodies and effects on top of existing background
      // Don't redraw the sky gradient - that's done by World.drawBackground()
      
      // Draw celestial bodies
      this.drawCelestialBodies(ctx, timeOfDay, width, height);
      
      // Draw stars
      this.drawStars(ctx, timeOfDay, waterY);
      
      // Draw clouds
      this.drawClouds(ctx, timeOfDay, waterY, width);
    },
    
    drawSkyGradient(ctx, timeOfDay, width, height, waterY) {
      const colors = this.getSkyColors(timeOfDay);
      
      // Create gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, waterY);
      gradient.addColorStop(0, `rgba(${Math.floor(colors.top.r * 255)}, ${Math.floor(colors.top.g * 255)}, ${Math.floor(colors.top.b * 255)}, ${colors.top.a})`);
      gradient.addColorStop(1, `rgba(${Math.floor(colors.horizon.r * 255)}, ${Math.floor(colors.horizon.g * 255)}, ${Math.floor(colors.horizon.b * 255)}, ${colors.horizon.a})`);
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, waterY);
    },
    
    getSkyColors(timeOfDay) {
      let colors = {};
      
      if (timeOfDay >= 0.0 && timeOfDay < 0.2) {
        // Night
        colors.top = { r: 0.1, g: 0.1, b: 0.3, a: 1 };
        colors.horizon = { r: 0.2, g: 0.2, b: 0.4, a: 1 };
      } else if (timeOfDay >= 0.2 && timeOfDay < 0.35) {
        // Dawn
        const t = (timeOfDay - 0.2) / 0.15;
        colors.top = { r: 0.4 + t * 0.4, g: 0.5 + t * 0.3, b: 0.8, a: 1 };
        colors.horizon = { r: 0.8 + t * 0.2, g: 0.4 + t * 0.4, b: 0.6 + t * 0.2, a: 1 };
      } else if (timeOfDay >= 0.35 && timeOfDay < 0.65) {
        // Day
        colors.top = { r: 0.5, g: 0.8, b: 1, a: 1 };
        colors.horizon = { r: 0.8, g: 0.9, b: 1, a: 1 };
      } else if (timeOfDay >= 0.65 && timeOfDay < 0.8) {
        // Dusk
        const t = (timeOfDay - 0.65) / 0.15;
        colors.top = { r: 0.8 - t * 0.3, g: 0.4 - t * 0.2, b: 0.6 - t * 0.4, a: 1 };
        colors.horizon = { r: 1, g: 0.5 - t * 0.2, b: 0.3 - t * 0.2, a: 1 };
      } else {
        // Night
        colors.top = { r: 0.1, g: 0.1, b: 0.3, a: 1 };
        colors.horizon = { r: 0.2, g: 0.2, b: 0.4, a: 1 };
      }
      
      return colors;
    },
    
    drawCelestialBodies(ctx, timeOfDay, width, height) {
      // Sun (visible during day)
      if (timeOfDay > 0.2 && timeOfDay < 0.8) {
        const sunProgress = (timeOfDay - 0.2) / 0.6;
        const sunX = width * (0.1 + sunProgress * 0.8);
        const sunY = height * (0.6 - Math.sin(sunProgress * Math.PI) * 0.4);
        
        // Sun glow
        ctx.fillStyle = 'rgba(255, 255, 200, 0.3)';
        ctx.beginPath();
        ctx.arc(sunX, sunY, 60, 0, Math.PI * 2);
        ctx.fill();
        
        // Sun
        ctx.fillStyle = 'rgba(255, 255, 230, 0.9)';
        ctx.beginPath();
        ctx.arc(sunX, sunY, 40, 0, Math.PI * 2);
        ctx.fill();
        
        // Sun rays
        ctx.strokeStyle = 'rgba(255, 255, 200, 0.2)';
        ctx.lineWidth = 2;
        for (let i = 0; i < 8; i++) {
          const angle = (i / 8) * Math.PI * 2 + (performance.now() / 1000) * 0.5;
          const rayX = sunX + Math.cos(angle) * 80;
          const rayY = sunY + Math.sin(angle) * 80;
          ctx.beginPath();
          ctx.moveTo(sunX + Math.cos(angle) * 50, sunY + Math.sin(angle) * 50);
          ctx.lineTo(rayX, rayY);
          ctx.stroke();
        }
      }
      
      // Moon (visible during night)
      if (timeOfDay < 0.2 || timeOfDay > 0.8) {
        let moonProgress;
        if (timeOfDay > 0.8) {
          moonProgress = (timeOfDay - 0.8) / 0.4;
        } else {
          moonProgress = (timeOfDay + 0.2) / 0.4;
        }
        
        const moonX = width * (0.2 + moonProgress * 0.6);
        const moonY = height * (0.5 - Math.sin(moonProgress * Math.PI) * 0.3);
        
        // Moon glow
        ctx.fillStyle = 'rgba(200, 200, 255, 0.4)';
        ctx.beginPath();
        ctx.arc(moonX, moonY, 45, 0, Math.PI * 2);
        ctx.fill();
        
        // Moon
        ctx.fillStyle = 'rgba(230, 230, 255, 0.9)';
        ctx.beginPath();
        ctx.arc(moonX, moonY, 30, 0, Math.PI * 2);
        ctx.fill();
        
        // Moon craters
        ctx.fillStyle = 'rgba(180, 180, 230, 0.5)';
        ctx.beginPath();
        ctx.arc(moonX - 8, moonY - 5, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(moonX + 5, moonY + 3, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(moonX - 2, moonY + 8, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    },
    
    drawStars(ctx, timeOfDay, waterY) {
      let starAlpha = 1;
      
      // Fade stars during dawn/dusk
      if (timeOfDay > 0.15 && timeOfDay < 0.35) {
        starAlpha = Math.max(0, 1 - (timeOfDay - 0.15) / 0.2);
      } else if (timeOfDay > 0.65 && timeOfDay < 0.85) {
        starAlpha = Math.min(1, (timeOfDay - 0.65) / 0.2);
      }
      
      ctx.fillStyle = `rgba(255, 255, 255, ${starAlpha * 0.8})`;
      
      for (let i = 1; i <= 50; i++) {
        const x = (i * 123 + 50) % ctx.canvas.width;
        const y = (i * 67 + 30) % (waterY * 0.8);
        const twinkle = Math.sin((performance.now() / 1000) * 3 + i) * 0.3 + 0.7;
        
        ctx.globalAlpha = starAlpha * twinkle;
        ctx.beginPath();
        ctx.arc(x, y, 1, 0, Math.PI * 2);
        ctx.fill();
      }
      
      ctx.globalAlpha = 1;
    },
    
    drawClouds(ctx, timeOfDay, waterY, width) {
      let cloudAlpha = (timeOfDay > 0.2 && timeOfDay < 0.8) ? 0.7 : 0.3;
      ctx.fillStyle = `rgba(255, 255, 255, ${cloudAlpha})`;
      
      // Cloud formation 1
      const cloud1X = (150 + this.cloudOffset) % (width + 200) - 100;
      this.drawCloud(ctx, cloud1X, waterY * 0.2, 25);
      
      // Cloud formation 2
      const cloud2X = (400 + this.cloudOffset * 0.7) % (width + 200) - 100;
      this.drawCloud(ctx, cloud2X, waterY * 0.15, 20);
      
      // Cloud formation 3
      const cloud3X = (600 + this.cloudOffset * 1.3) % (width + 200) - 100;
      this.drawCloud(ctx, cloud3X, waterY * 0.25, 15);
    },
    
    drawCloud(ctx, x, y, size) {
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x + size * 0.8, y - size * 0.2, size * 0.8, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x + size * 1.6, y, size * 0.6, 0, Math.PI * 2);
      ctx.fill();
    }
  };
  
  if (typeof window !== 'undefined') window.SkyRenderer = window.SkyRenderer || SkyRenderer;
  if (typeof module !== 'undefined') module.exports = SkyRenderer;
})();
