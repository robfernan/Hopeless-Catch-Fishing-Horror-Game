// UIManager.js - Enhanced HUD with progress bars, animations, and polish
(function(){
  const UIManager = {
    showControls: true,
    showWeather: true,
    showFishingState: true,
    showStats: true,
    showTime: true,
    animationTime: 0,
    
    init() {
      this.showControls = true;
      this.showWeather = true;
      this.showFishingState = true;
      this.showStats = true;
      this.showTime = true;
      this.animationTime = 0;
    },
    
    update(dt) {
      this.animationTime += dt;
      if (this.animationTime > 10) this.animationTime = 0;
    },
    
    draw(ctx) {
      if (!ctx) return;
      
      if (this.showControls) this.drawControls(ctx);
      if (this.showTime) this.drawTime(ctx);
      if (this.showWeather) this.drawWeather(ctx);
      if (this.showFishingState) this.drawFishingStateEnhanced(ctx);
      if (this.showStats) this.drawStats(ctx);
    },
    
    drawTime(ctx) {
      if (!window.DayNightCycle) return;
      
      const timeOfDay = window.DayNightCycle.getTime();
      const dayCount = window.DayNightCycle.getDayCount ? window.DayNightCycle.getDayCount() : 1;
      
      // Convert time to hours (0-24)
      const hours = Math.floor(timeOfDay * 24);
      const minutes = Math.floor((timeOfDay * 24 - hours) * 60);
      const timeStr = String(hours).padStart(2, '0') + ':' + String(minutes).padStart(2, '0');
      
      const boxX = ctx.canvas.width - 95;
      const boxY = ctx.canvas.height - 75;
      const boxW = 85;
      const boxH = 55;
      
      ctx.save();
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(boxX, boxY, boxW, boxH);
      
      // Center the time text
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.font = 'bold 16px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(timeStr, boxX + boxW / 2, boxY + boxH / 3);
      
      // Center the day text
      ctx.font = '11px Arial';
      ctx.fillStyle = 'rgba(200, 200, 200, 0.8)';
      ctx.fillText('Day ' + dayCount, boxX + boxW / 2, boxY + (boxH * 2) / 3);
      ctx.textAlign = 'left';
      ctx.textBaseline = 'alphabetic';
      
      ctx.restore();
    },
    
    drawControls(ctx) {
      ctx.save();
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.font = '11px Arial';
      
      let controlText = 'WASD: Move | SPACE: Cast/Reel | B: Bait | TAB: Journal | ESC: Menu';
      
      ctx.fillText(controlText, 10, 15);
      ctx.restore();
    },
    
    drawWeather(ctx) {
      if (!window.Weather) return;
      
      const weather = window.Weather.getWeatherData();
      const x = ctx.canvas.width - 140;
      const y = 10;
      
      ctx.save();
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(x - 5, y, 140, 70);
      
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.font = 'bold 11px Arial';
      ctx.textAlign = 'right';
      
      let weatherText = '☀️ Clear';
      if (weather.isRaining && weather.windSpeed > 15) {
        weatherText = '⛈️ Heavy Rain';
      } else if (weather.isRaining) {
        weatherText = '🌧️ Light Rain';
      }
      
      ctx.fillText('Weather: ' + weatherText, ctx.canvas.width - 8, y + 15);
      ctx.font = '10px Arial';
      ctx.fillText('Wind: ' + Math.floor(weather.windSpeed) + ' m/s', ctx.canvas.width - 8, y + 30);
      ctx.fillText('Rain: ' + Math.floor(weather.rainIntensity * 100) + '%', ctx.canvas.width - 8, y + 45);
      ctx.fillText('Humidity: ' + Math.floor(weather.humidity * 100) + '%', ctx.canvas.width - 8, y + 60);
      ctx.textAlign = 'left';
      
      ctx.restore();
    },
    
    drawFishingStateEnhanced(ctx) {
      if (!window.FishingController) return;
      
      const state = window.FishingController.getState();
      const isBiting = window.FishingController.isBiting();
      const x = ctx.canvas.width / 2 - 175;
      const y = 100;
      
      ctx.save();
      
      // Background with gradient
      const grad = ctx.createLinearGradient(x - 10, y - 20, x - 10, y + 100);
      grad.addColorStop(0, 'rgba(0, 0, 0, 0.7)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0.5)');
      ctx.fillStyle = grad;
      ctx.fillRect(x - 10, y - 20, 350, 120);
      
      // Border
      ctx.strokeStyle = 'rgba(255, 200, 100, 0.3)';
      ctx.lineWidth = 2;
      ctx.strokeRect(x - 10, y - 20, 350, 120);
      
      ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
      ctx.font = 'bold 14px Arial';
      ctx.textAlign = 'left';
      
      // State message with animation - only show when idle/ready
      let message = '';
      let color = 'rgba(255, 255, 255, 0.9)';
      let showMessage = false;
      
      if (state === 'idle') {
        message = 'IDLE: Press SPACE to cast';
        color = 'rgba(255, 255, 255, 0.9)';
        showMessage = true;
      } else if (state === 'ready') {
        message = 'READY: Press SPACE to cast';
        color = 'rgba(100, 200, 255, 0.95)';
        showMessage = true;
      } else if (state === 'casting') {
        message = 'CASTING: Building power...';
        color = 'rgba(255, 200, 100, 0.95)';
        showMessage = true;
      } else if (state === 'bobbing') {
        message = 'WAITING: Watch for bite...';
        color = 'rgba(150, 200, 150, 0.95)';
        showMessage = true;
      } else if (isBiting) {
        message = '🎣 BITE! Press SPACE NOW!';
        color = 'rgba(255, 100, 100, 0.95)';
        showMessage = true;
        // Pulse animation
        const pulse = Math.sin(this.animationTime * 6) * 0.3 + 0.7;
        ctx.globalAlpha = pulse;
      } else if (state === 'struggling') {
        message = 'STRUGGLING: Wait patiently...';
        color = 'rgba(255, 150, 100, 0.95)';
        showMessage = true;
      } else if (state === 'reeling') {
        message = 'REELING: Press SPACE repeatedly!';
        color = 'rgba(100, 255, 100, 0.95)';
        showMessage = true;
      }
      
      if (showMessage) {
        ctx.fillStyle = color;
        ctx.fillText(message, x, y);
      }
      ctx.globalAlpha = 1;
      
      // Progress bars
      if (state === 'reeling') {
        this.drawReelProgressEnhanced(ctx, x, y + 25);
        this.drawLineStressEnhanced(ctx, x, y + 55);
      } else if (state === 'struggling') {
        this.drawStrugglingIntensityEnhanced(ctx, x, y + 25);
      } else if (state === 'bobbing' && !isBiting) {
        this.drawBiteTimerEnhanced(ctx, x, y + 25);
      }
      
      ctx.restore();
    },
    
    drawReelProgressEnhanced(ctx, x, y) {
      if (!window.ReelingSystem) return;
      
      const progress = window.ReelingSystem.getReelProgress ? window.ReelingSystem.getReelProgress() : 0;
      const maxProgress = window.ReelingSystem.getMaxReelProgress ? window.ReelingSystem.getMaxReelProgress() : 100;
      const percent = Math.min(100, (progress / maxProgress) * 100);
      
      ctx.fillStyle = 'rgba(200, 200, 200, 0.8)';
      ctx.font = '10px Arial';
      ctx.textAlign = 'left';
      ctx.fillText('Reel:', x, y);
      
      const barWidth = 140;
      const barHeight = 11;
      
      // Background
      ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
      ctx.fillRect(x, y + 3, barWidth, barHeight);
      
      // Progress with gradient
      const grad = ctx.createLinearGradient(x, y + 3, x, y + 3 + barHeight);
      grad.addColorStop(0, 'rgba(100, 255, 100, 0.9)');
      grad.addColorStop(1, 'rgba(50, 200, 50, 0.9)');
      ctx.fillStyle = grad;
      ctx.fillRect(x, y + 3, (barWidth * percent) / 100, barHeight);
      
      // Border
      ctx.strokeStyle = 'rgba(100, 255, 100, 0.5)';
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y + 3, barWidth, barHeight);
      
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.fillText(Math.floor(percent) + '%', x + barWidth + 5, y + 11);
    },
    
    drawLineStressEnhanced(ctx, x, y) {
      if (!window.ReelingSystem) return;
      
      const stress = window.ReelingSystem.getLineStress ? window.ReelingSystem.getLineStress() : 0;
      const maxStress = window.ReelingSystem.getMaxLineStress ? window.ReelingSystem.getMaxLineStress() : 100;
      const percent = Math.min(100, (stress / maxStress) * 100);
      
      ctx.fillStyle = 'rgba(200, 200, 200, 0.8)';
      ctx.font = '10px Arial';
      ctx.textAlign = 'left';
      ctx.fillText('Tension:', x, y);
      
      const barWidth = 140;
      const barHeight = 11;
      
      // Background
      ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
      ctx.fillRect(x, y + 3, barWidth, barHeight);
      
      // Color based on stress
      let color1, color2;
      if (percent > 80) {
        color1 = 'rgba(255, 50, 50, 0.9)';
        color2 = 'rgba(200, 0, 0, 0.9)';
      } else if (percent > 50) {
        color1 = 'rgba(255, 200, 50, 0.9)';
        color2 = 'rgba(200, 150, 0, 0.9)';
      } else {
        color1 = 'rgba(100, 200, 100, 0.9)';
        color2 = 'rgba(50, 150, 50, 0.9)';
      }
      
      const grad = ctx.createLinearGradient(x, y + 3, x, y + 3 + barHeight);
      grad.addColorStop(0, color1);
      grad.addColorStop(1, color2);
      ctx.fillStyle = grad;
      ctx.fillRect(x, y + 3, (barWidth * percent) / 100, barHeight);
      
      // Border
      ctx.strokeStyle = color1;
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y + 3, barWidth, barHeight);
      
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.fillText(Math.floor(percent) + '%', x + barWidth + 5, y + 11);
    },
    
    drawStrugglingIntensityEnhanced(ctx, x, y) {
      if (!window.ReelingSystem) return;
      
      const intensity = window.ReelingSystem.getStrugglingIntensity ? window.ReelingSystem.getStrugglingIntensity() : 0;
      const maxIntensity = 10;
      const percent = Math.min(100, (intensity / maxIntensity) * 100);
      
      ctx.fillStyle = 'rgba(200, 200, 200, 0.8)';
      ctx.font = '10px Arial';
      ctx.textAlign = 'left';
      ctx.fillText('Struggle:', x, y);
      
      const barWidth = 140;
      const barHeight = 11;
      
      // Background
      ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
      ctx.fillRect(x, y + 3, barWidth, barHeight);
      
      const grad = ctx.createLinearGradient(x, y + 3, x, y + 3 + barHeight);
      grad.addColorStop(0, 'rgba(255, 150, 50, 0.9)');
      grad.addColorStop(1, 'rgba(200, 100, 0, 0.9)');
      ctx.fillStyle = grad;
      ctx.fillRect(x, y + 3, (barWidth * percent) / 100, barHeight);
      
      // Border
      ctx.strokeStyle = 'rgba(255, 150, 50, 0.5)';
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y + 3, barWidth, barHeight);
      
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.fillText(Math.floor(percent) + '%', x + barWidth + 5, y + 11);
    },
    
    drawBiteTimerEnhanced(ctx, x, y) {
      if (!window.BiteDetection) return;
      
      const timeRemaining = window.BiteDetection.getBiteTimeRemaining ? window.BiteDetection.getBiteTimeRemaining() : 0;
      const biteDelay = window.BiteDetection.getBiteDelay ? window.BiteDetection.getBiteDelay() : 5;
      const percent = Math.min(100, (timeRemaining / biteDelay) * 100);
      
      ctx.fillStyle = 'rgba(200, 200, 200, 0.8)';
      ctx.font = '10px Arial';
      ctx.textAlign = 'left';
      ctx.fillText('Waiting:', x, y);
      
      const barWidth = 140;
      const barHeight = 11;
      
      // Background
      ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
      ctx.fillRect(x, y + 3, barWidth, barHeight);
      
      const grad = ctx.createLinearGradient(x, y + 3, x, y + 3 + barHeight);
      grad.addColorStop(0, 'rgba(100, 150, 255, 0.9)');
      grad.addColorStop(1, 'rgba(50, 100, 200, 0.9)');
      ctx.fillStyle = grad;
      ctx.fillRect(x, y + 3, (barWidth * percent) / 100, barHeight);
      
      // Border
      ctx.strokeStyle = 'rgba(100, 150, 255, 0.5)';
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y + 3, barWidth, barHeight);
      
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.fillText(timeRemaining.toFixed(1) + 's', x + barWidth + 5, y + 11);
    },
    
    drawStats(ctx) {
      if (!window.Journal) return;
      
      const stats = window.Journal.getStats();
      const x = 10;
      const y = ctx.canvas.height - 75;
      
      ctx.save();
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(x - 5, y - 5, 300, 70);
      
      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.font = 'bold 11px Arial';
      ctx.textAlign = 'left';
      
      ctx.fillText('📊 Stats', x + 5, y + 10);
      ctx.font = '10px Arial';
      ctx.fillText('Catches: ' + stats.totalCatches + ' | Casts: ' + stats.totalCasts, x + 5, y + 25);
      ctx.fillText('Missed: ' + stats.bitesMissed + ' | Broken: ' + stats.linesBroken, x + 5, y + 40);
      ctx.fillText('Escaped: ' + stats.fishEscaped, x + 5, y + 55);
      
      ctx.restore();
    }
  };
  
  if (typeof window !== 'undefined') window.UIManager = window.UIManager || UIManager;
  if (typeof module !== 'undefined') module.exports = UIManager;
})();
