// scenes/forestScene.js - Deep Forest Pond location
(function(){
  const ForestScene = Object.create(window.BaseScene || {});
  
  ForestScene.name = 'ForestScene';
  ForestScene.locationId = 'forest_pond';
  
  ForestScene.init = async function() {
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
  
  ForestScene.onEnter = function() {
    if (window.GameState) {
      window.GameState.enterPlaying();
    }
  };
  
  ForestScene.onExit = function() {};
  
  ForestScene.update = function(dt) {
    this._updateGameSystems(dt);
  };
  
  ForestScene.draw = function(ctx) {
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
      console.error('Error drawing forest scene:', e);
    }
  };
  
  ForestScene.drawBackground = function(ctx, timeOfDay) {
    // Draw forest-specific background
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
    
    // Water - narrower in forest
    const waterY = grassY + 10;
    const waterGrad = ctx.createLinearGradient(0, waterY, 0, waterY + 120);
    waterGrad.addColorStop(0, colors.waterTop);
    waterGrad.addColorStop(1, colors.waterBottom);
    ctx.fillStyle = waterGrad;
    const waterX = Math.floor(width * 0.35);
    const waterW = Math.floor(width * 0.3);
    ctx.fillRect(waterX, waterY, waterW, 90);
    
    // Forest-specific elements
    this.drawTrees(ctx, timeOfDay);
    this.drawBridge(ctx, timeOfDay);
    this.drawBushes(ctx, timeOfDay);
  };
  
  ForestScene.getSkyColors = function(timeOfDay) {
    if (timeOfDay < 0.2 || timeOfDay >= 0.8) {
      return { top: '#0d0d2b', bottom: '#1a1a3a', ground: '#2a5a3a', waterTop: '#1a7a7a', waterBottom: '#0a5a5a' };
    } else if (timeOfDay < 0.35) {
      const t = (timeOfDay - 0.2) / 0.15;
      return {
        top: `rgb(${Math.floor(51 + t * 76)},${Math.floor(64 + t * 51)},${Math.floor(102 + t * 102)})`,
        bottom: `rgb(${Math.floor(64 + t * 51)},${Math.floor(51 + t * 76)},${Math.floor(76 + t * 76)})`,
        ground: '#2a5a3a', waterTop: '#1a7a7a', waterBottom: '#0a5a5a'
      };
    } else if (timeOfDay < 0.65) {
      return { top: '#5a7a8a', bottom: '#6a8a9a', ground: '#2a5a3a', waterTop: '#1a7a7a', waterBottom: '#0a5a5a' };
    } else if (timeOfDay < 0.8) {
      const t = (timeOfDay - 0.65) / 0.15;
      return {
        top: `rgb(${Math.floor(153 - t * 102)},${Math.floor(102 - t * 51)},${Math.floor(102 - t * 76)})`,
        bottom: `rgb(204,${Math.floor(102 - t * 51)},${Math.floor(51 - t * 25)})`,
        ground: '#2a5a3a', waterTop: '#1a7a7a', waterBottom: '#0a5a5a'
      };
    }
  };
  
  ForestScene.drawTrees = function(ctx, timeOfDay) {
    const treeColor = timeOfDay < 0.2 || timeOfDay >= 0.8 ? '#1a2a1a' : '#2a4a2a';
    ctx.fillStyle = treeColor;
    
    // Dense trees on LEFT side
    ctx.fillRect(0, 300, 50, 160);
    ctx.fillRect(20, 280, 45, 180);
    ctx.fillRect(40, 310, 40, 150);
    
    // Dense trees on RIGHT side
    ctx.fillRect(750, 305, 50, 155);
    ctx.fillRect(735, 285, 45, 175);
    ctx.fillRect(720, 315, 40, 145);
  };
  
  ForestScene.drawBridge = function(ctx, timeOfDay) {
    const grassY = 460;
    const waterY = grassY + 10;
    const bridgeStart = Math.floor(800 * 0.35);
    const bridgeW = 100;
    
    // Bridge planks
    ctx.fillStyle = '#6a4a2a';
    ctx.fillRect(bridgeStart, waterY - 20, bridgeW, 15);
    
    // Bridge supports
    ctx.strokeStyle = '#4a3a1a';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(bridgeStart + 10, waterY - 20);
    ctx.lineTo(bridgeStart + 10, waterY - 35);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(bridgeStart + bridgeW - 10, waterY - 20);
    ctx.lineTo(bridgeStart + bridgeW - 10, waterY - 35);
    ctx.stroke();
  };
  
  ForestScene.drawBushes = function(ctx, timeOfDay) {
    const bushColor = timeOfDay < 0.2 || timeOfDay >= 0.8 ? '#1a3a1a' : '#2a5a2a';
    ctx.fillStyle = bushColor;
    
    // Few bushes in the forest
    ctx.fillRect(100, 445, 16, 15);
    ctx.fillRect(700, 448, 16, 12);
  };
  
  ForestScene._updateGameSystems = function(dt) {
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
  
  if (typeof window !== 'undefined') window.ForestScene = window.ForestScene || ForestScene;
  if (typeof module !== 'undefined') module.exports = ForestScene;
})();
