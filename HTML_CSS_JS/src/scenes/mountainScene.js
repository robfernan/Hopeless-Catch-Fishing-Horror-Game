// scenes/mountainScene.js - Mountain Stream location
(function(){
  const MountainScene = Object.create(window.BaseScene || {});
  
  MountainScene.name = 'MountainScene';
  MountainScene.locationId = 'mountain_stream';
  
  MountainScene.init = async function() {
    if (window.World && typeof window.World.init === 'function') {
      window.World.init(800, 600);
    }
    if (window.Player && typeof window.Player.init === 'function') {
      window.Player.init(400, window.World.getGrassY() - 16);
    }
    if (window.FishingController && typeof window.FishingController.init === 'function') {
      window.FishingController.init();
    }
    if (window.CastingSystem && typeof window.CastingSystem.init === 'function') {
      window.CastingSystem.init();
    }
  };
  
  MountainScene.onEnter = function() {
    if (window.GameState) {
      window.GameState.enterPlaying();
    }
  };
  
  MountainScene.onExit = function() {};
  
  MountainScene.update = function(dt) {
    this._updateGameSystems(dt);
  };
  
  MountainScene.draw = function(ctx) {
    try {
      ctx.clearRect(0, 0, 800, 600);
      const shake = (window.ScreenShake && typeof window.ScreenShake.getOffset === 'function') 
        ? window.ScreenShake.getOffset() 
        : { x: 0, y: 0 };
      ctx.save();
      ctx.translate(shake.x, shake.y);
      
      const timeOfDay = (window.DayNightCycle && typeof window.DayNightCycle.getTime === 'function') 
        ? window.DayNightCycle.getTime() 
        : 0.5;
      
      this.drawBackground(ctx, timeOfDay);
      
      const waterY = (window.World && typeof window.World.getWaterY === 'function') 
        ? window.World.getWaterY() 
        : 480;
      if (window.SkyRenderer && typeof window.SkyRenderer.draw === 'function') {
        window.SkyRenderer.draw(ctx, timeOfDay, waterY);
      }
      
      if (window.Player && typeof window.Player.draw === 'function') {
        window.Player.draw(ctx);
      }
      if (window.World && typeof window.World.drawForeground === 'function') {
        window.World.drawForeground(ctx);
      }
      
      const rodX = (window.Player && window.Player.x) ? window.Player.x + 8 : 400;
      const rodY = (window.Player && window.Player.y) ? window.Player.y - 8 : 300;
      const fstate = window.FishingController ? window.FishingController.getState() : 'idle';
      const isBite = window.FishingController ? window.FishingController.isBiting() : false;
      if (window.CastingSystem && typeof window.CastingSystem.draw === 'function') {
        window.CastingSystem.draw(ctx, rodX, rodY, fstate, isBite);
      }
      
      if (window.Weather && typeof window.Weather.draw === 'function') {
        window.Weather.draw();
      }
      if (window.Anomalies && typeof window.Anomalies.draw === 'function') {
        window.Anomalies.draw(ctx);
      }
      if (window.Cabin && typeof window.Cabin.draw === 'function') {
        window.Cabin.draw();
      }
      
      ctx.restore();
      
      if (window.UIManager && typeof window.UIManager.draw === 'function') {
        window.UIManager.draw(ctx);
      }
    } catch (e) {
      console.error('Error drawing mountain scene:', e);
    }
  };
  
  MountainScene.drawBackground = function(ctx, timeOfDay) {
    // Draw mountain-specific background
    const width = 800;
    const height = 600;
    const grassY = 460;
    
    const colors = this.getSkyColors(timeOfDay);
    
    // Sky gradient
    const g = ctx.createLinearGradient(0, 0, 0, grassY);
    g.addColorStop(0, colors.top);
    g.addColorStop(1, colors.bottom);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, width, grassY);
    
    // Grass/ground
    ctx.fillStyle = colors.ground;
    ctx.fillRect(0, grassY, width, height - grassY);
    
    // Water - narrow stream in center
    const waterY = grassY + 10;
    const waterGrad = ctx.createLinearGradient(0, waterY, 0, waterY + 120);
    waterGrad.addColorStop(0, colors.waterTop);
    waterGrad.addColorStop(1, colors.waterBottom);
    ctx.fillStyle = waterGrad;
    const waterX = Math.floor(width * 0.4);
    const waterW = Math.floor(width * 0.2);
    ctx.fillRect(waterX, waterY, waterW, 90);
    
    // Mountain-specific elements
    this.drawMountainPeaks(ctx, timeOfDay);
    this.drawRocks(ctx, timeOfDay);
    this.drawWaterCurrent(ctx);
  };
  
  MountainScene.getSkyColors = function(timeOfDay) {
    if (timeOfDay < 0.2 || timeOfDay >= 0.8) {
      return { top: '#0a0a1a', bottom: '#1a1a2a', ground: '#5a5a4a', waterTop: '#1a7a9a', waterBottom: '#0a5a7a' };
    } else if (timeOfDay < 0.35) {
      const t = (timeOfDay - 0.2) / 0.15;
      return {
        top: `rgb(${Math.floor(76 + t * 102)},${Math.floor(102 + t * 76)},${Math.floor(153 + t * 76)})`,
        bottom: `rgb(${Math.floor(102 + t * 76)},${Math.floor(128 + t * 51)},${Math.floor(178 + t * 51)})`,
        ground: '#5a5a4a', waterTop: '#1a7a9a', waterBottom: '#0a5a7a'
      };
    } else if (timeOfDay < 0.65) {
      return { top: '#6a9adb', bottom: '#8abaff', ground: '#5a5a4a', waterTop: '#1a7a9a', waterBottom: '#0a5a7a' };
    } else if (timeOfDay < 0.8) {
      const t = (timeOfDay - 0.65) / 0.15;
      return {
        top: `rgb(${Math.floor(178 - t * 102)},${Math.floor(128 - t * 76)},${Math.floor(102 - t * 76)})`,
        bottom: `rgb(255,${Math.floor(153 - t * 76)},${Math.floor(102 - t * 51)})`,
        ground: '#5a5a4a', waterTop: '#1a7a9a', waterBottom: '#0a5a7a'
      };
    }
  };
  
  MountainScene.drawWaterCurrent = function(ctx) {
    const grassY = 460;
    const waterY = grassY + 10;
    const waterX = Math.floor(800 * 0.3);
    const waterW = Math.floor(800 * 0.7);
    
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.moveTo(waterX, waterY + 20 + i * 20);
      ctx.lineTo(waterX + waterW, waterY + 25 + i * 20);
      ctx.stroke();
    }
  };
  
  MountainScene.drawRocks = function(ctx, timeOfDay) {
    const rockColor = timeOfDay < 0.2 || timeOfDay >= 0.8 ? '#3a3a2a' : '#5a5a4a';
    ctx.fillStyle = rockColor;
    
    // Scattered rocks around the stream
    ctx.fillRect(30, 420, 60, 80);
    ctx.fillRect(100, 440, 50, 60);
    ctx.fillRect(350, 480, 40, 40);
    ctx.fillRect(410, 485, 35, 35);
    ctx.fillRect(650, 450, 50, 60);
    ctx.fillRect(710, 430, 60, 70);
    
    // Additional small rocks
    ctx.fillRect(200, 475, 25, 25);
    ctx.fillRect(550, 478, 25, 25);
  };
  
  MountainScene.drawMountainPeaks = function(ctx, timeOfDay) {
    const peakColor = timeOfDay < 0.2 || timeOfDay >= 0.8 ? '#2a2a1a' : '#4a4a3a';
    ctx.fillStyle = peakColor;
    
    // Large LEFT mountain peak
    ctx.beginPath();
    ctx.moveTo(-50, 460);
    ctx.lineTo(150, 200);
    ctx.lineTo(300, 460);
    ctx.closePath();
    ctx.fill();
    
    // Large RIGHT mountain peak
    ctx.beginPath();
    ctx.moveTo(500, 460);
    ctx.lineTo(650, 180);
    ctx.lineTo(850, 460);
    ctx.closePath();
    ctx.fill();
  };
  
  MountainScene.drawCliffs = function(ctx, timeOfDay) {
    const cliffColor = timeOfDay < 0.2 || timeOfDay >= 0.8 ? '#2a2a1a' : '#4a4a3a';
    ctx.fillStyle = cliffColor;
    
    ctx.beginPath();
    ctx.moveTo(0, 200);
    ctx.lineTo(150, 350);
    ctx.lineTo(0, 350);
    ctx.closePath();
    ctx.fill();
    
    ctx.beginPath();
    ctx.moveTo(800, 220);
    ctx.lineTo(650, 350);
    ctx.lineTo(800, 350);
    ctx.closePath();
    ctx.fill();
  };
  
  MountainScene._updateGameSystems = function(dt) {
    try {
      if (window.Player && typeof window.Player.update === 'function') {
        window.Player.update(dt, window.currentKeys || {});
      }
      if (window.World && typeof window.World.update === 'function') window.World.update(dt);
      if (window.DayNightCycle && typeof window.DayNightCycle.update === 'function') window.DayNightCycle.update(dt);
      if (window.Weather && typeof window.Weather.update === 'function') window.Weather.update(dt);
      if (window.UIManager && typeof window.UIManager.update === 'function') window.UIManager.update(dt);
      if (window.Cabin && typeof window.Cabin.update === 'function') window.Cabin.update(dt);
      if (window.Anomalies && typeof window.Anomalies.update === 'function') window.Anomalies.update(dt);
      if (window.ScreenShake && typeof window.ScreenShake.update === 'function') window.ScreenShake.update(dt);
      if (window.SkyRenderer && typeof window.SkyRenderer.update === 'function') window.SkyRenderer.update(dt);
      if (window.CastingSystem && typeof window.CastingSystem.update === 'function') {
        const fstate = window.FishingController ? window.FishingController.getState() : 'idle';
        window.CastingSystem.update(dt, null, fstate);
      }
      if (window.FishingController && typeof window.FishingController.update === 'function') window.FishingController.update(dt);
      if (window.Anomalies && typeof window.Anomalies.checkForAnomalies === 'function' && window.Player) {
        window.Anomalies.checkForAnomalies(window.Player.x, window.Player.y);
      }
    } catch (e) {
      console.error('Error updating game systems:', e);
    }
  };
  
  if (typeof window !== 'undefined') window.MountainScene = window.MountainScene || MountainScene;
  if (typeof module !== 'undefined') module.exports = MountainScene;
})();
