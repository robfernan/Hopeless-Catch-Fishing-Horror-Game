// scenes/lakeScene.js - Starting location: peaceful lake
(function(){
  const LakeScene = Object.create(window.BaseScene || {});
  
  LakeScene.name = 'LakeScene';
  LakeScene.locationId = 'lake';
  
  LakeScene.init = async function() {
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
  
  LakeScene.onEnter = function() {
    if (window.GameState) {
      window.GameState.enterPlaying();
    }
  };
  
  LakeScene.onExit = function() {};
  
  LakeScene.update = function(dt) {
    this._updateGameSystems(dt);
  };
  
  LakeScene.draw = function(ctx) {
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
      console.error('Error drawing lake scene:', e);
    }
  };
  
  LakeScene.drawBackground = function(ctx, timeOfDay) {
    // Draw lake-specific background
    const colors = this.getSkyColors(timeOfDay);
    
    // Sky gradient
    const g = ctx.createLinearGradient(0, 0, 0, 460);
    g.addColorStop(0, colors.top);
    g.addColorStop(1, colors.bottom);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 800, 460);
    
    // Grass/ground
    ctx.fillStyle = colors.ground;
    ctx.fillRect(0, 460, 800, 140);
    
    // Water
    const waterY = 470;
    const waterGrad = ctx.createLinearGradient(0, waterY, 0, waterY + 120);
    waterGrad.addColorStop(0, colors.waterTop);
    waterGrad.addColorStop(1, colors.waterBottom);
    ctx.fillStyle = waterGrad;
    ctx.fillRect(0, waterY, 800, 90);
    
    // Lake-specific elements
    this.drawDock(ctx, timeOfDay);
    this.drawTrees(ctx, timeOfDay);
    this.drawBushes(ctx, timeOfDay);
  };
  
  LakeScene.getSkyColors = function(timeOfDay) {
    if (timeOfDay < 0.2 || timeOfDay >= 0.8) {
      return { top: '#1a1a3e', bottom: '#2a2a4e', ground: '#36c06a', waterTop: '#1a9a9a', waterBottom: '#0a7a7a' };
    } else if (timeOfDay < 0.35) {
      const t = (timeOfDay - 0.2) / 0.15;
      return {
        top: `rgb(${Math.floor(102 + t * 102)},${Math.floor(128 + t * 77)},204)`,
        bottom: `rgb(${Math.floor(128 + t * 77)},${Math.floor(102 + t * 128)},${Math.floor(153 + t * 77)})`,
        ground: '#36c06a', waterTop: '#1a9a9a', waterBottom: '#0a7a7a'
      };
    } else if (timeOfDay < 0.65) {
      return { top: '#87ceeb', bottom: '#a0d3ff', ground: '#36c06a', waterTop: '#1a9a9a', waterBottom: '#0a7a7a' };
    } else if (timeOfDay < 0.8) {
      const t = (timeOfDay - 0.65) / 0.15;
      return {
        top: `rgb(${Math.floor(204 - t * 102)},${Math.floor(102 - t * 51)},${Math.floor(153 - t * 102)})`,
        bottom: `rgb(255,${Math.floor(128 - t * 51)},${Math.floor(77 - t * 51)})`,
        ground: '#36c06a', waterTop: '#1a9a9a', waterBottom: '#0a7a7a'
      };
    }
  };
  
  LakeScene.drawDock = function(ctx, timeOfDay) {
    const grassY = 460;
    const waterY = grassY + 10;
    const dockStart = Math.floor(800 * 0.5 - 75);
    const dockW = 150;
    
    ctx.fillStyle = '#8b5a2b';
    ctx.fillRect(dockStart, waterY - 25, dockW, 18);
    ctx.fillStyle = 'rgba(0,0,0,0.15)';
    ctx.fillRect(dockStart, waterY - 7, dockW, 6);
  };
  
  LakeScene.drawTrees = function(ctx, timeOfDay) {
    const treeColor = timeOfDay < 0.2 || timeOfDay >= 0.8 ? '#1a3a1a' : '#2a5a2a';
    ctx.fillStyle = treeColor;
    
    // Lake has minimal trees - just a few on the sides
    ctx.fillRect(10, 360, 35, 100);
    ctx.fillRect(755, 365, 35, 95);
  };
  
  LakeScene.drawBushes = function(ctx, timeOfDay) {
    const bushColor = timeOfDay < 0.2 || timeOfDay >= 0.8 ? '#2a4a2a' : '#3a6a3a';
    ctx.fillStyle = bushColor;
    
    // Few bushes scattered on the shore
    ctx.fillRect(60, 445, 18, 15);
    ctx.fillRect(740, 448, 16, 12);
  };
  
  LakeScene._updateGameSystems = function(dt) {
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
  
  if (typeof window !== 'undefined') window.LakeScene = window.LakeScene || LakeScene;
  if (typeof module !== 'undefined') module.exports = LakeScene;
})();
