// scenes/gameScene.js - Main game scene wrapper
(function(){
  const GameScene = Object.create(window.BaseScene || {});
  
  GameScene.name = 'GameScene';
  
  GameScene.init = async function() {
    // Initialize game systems
    try {
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
    } catch (e) {
      console.error('Error initializing game scene:', e);
    }
  };
  
  GameScene.onEnter = function() {
    // Game is now active
    if (window.GameState) {
      window.GameState.enterPlaying();
    }
  };
  
  GameScene.onExit = function() {
    // Game is being paused/exited
  };
  
  GameScene.update = function(dt) {
    // Update all game systems
    try {
      if (window.Player && typeof window.Player.update === 'function') {
        const keys = window.currentKeys || {};
        window.Player.update(dt, keys);
      }
      if (window.World && typeof window.World.update === 'function') {
        window.World.update(dt);
      }
      if (window.DayNightCycle && typeof window.DayNightCycle.update === 'function') {
        window.DayNightCycle.update(dt);
      }
      if (window.Weather && typeof window.Weather.update === 'function') {
        window.Weather.update(dt);
      }
      if (window.UIManager && typeof window.UIManager.update === 'function') {
        window.UIManager.update(dt);
      }
      if (window.Cabin && typeof window.Cabin.update === 'function') {
        window.Cabin.update(dt);
      }
      if (window.Anomalies && typeof window.Anomalies.update === 'function') {
        window.Anomalies.update(dt);
      }
      if (window.ScreenShake && typeof window.ScreenShake.update === 'function') {
        window.ScreenShake.update(dt);
      }
      if (window.SkyRenderer && typeof window.SkyRenderer.update === 'function') {
        window.SkyRenderer.update(dt);
      }
      if (window.CastingSystem && typeof window.CastingSystem.update === 'function') {
        const fstate = window.FishingController ? window.FishingController.getState() : 'idle';
        window.CastingSystem.update(dt, null, fstate);
      }
      if (window.FishingController && typeof window.FishingController.update === 'function') {
        window.FishingController.update(dt);
      }
      if (window.Anomalies && typeof window.Anomalies.checkForAnomalies === 'function' && window.Player) {
        window.Anomalies.checkForAnomalies(window.Player.x, window.Player.y);
      }
    } catch (e) {
      console.error('Error updating game scene:', e);
    }
  };
  
  GameScene.draw = function(ctx) {
    // Draw all game elements
    try {
      ctx.clearRect(0, 0, 800, 600);
      
      // Apply screen shake
      const shake = (window.ScreenShake && typeof window.ScreenShake.getOffset === 'function') 
        ? window.ScreenShake.getOffset() 
        : { x: 0, y: 0 };
      ctx.save();
      ctx.translate(shake.x, shake.y);
      
      // Get time of day
      const timeOfDay = (window.DayNightCycle && typeof window.DayNightCycle.getTime === 'function') 
        ? window.DayNightCycle.getTime() 
        : 0.5;
      
      // Draw world
      if (window.WorldRenderer && typeof window.WorldRenderer.draw === 'function') {
        window.WorldRenderer.draw(ctx, timeOfDay);
      }
      
      // Draw sky (sun, moon, stars)
      const waterY = (window.World && typeof window.World.getWaterY === 'function') 
        ? window.World.getWaterY() 
        : 480;
      if (window.SkyRenderer && typeof window.SkyRenderer.draw === 'function') {
        window.SkyRenderer.draw(ctx, timeOfDay, waterY);
      }
      
      // Draw player
      if (window.Player && typeof window.Player.draw === 'function') {
        window.Player.draw(ctx);
      }
      
      // Draw world foreground
      if (window.World && typeof window.World.drawForeground === 'function') {
        window.World.drawForeground(ctx);
      }
      
      // Draw fishing rod and line
      const rodX = (window.Player && window.Player.x) ? window.Player.x + 8 : 400;
      const rodY = (window.Player && window.Player.y) ? window.Player.y - 8 : 300;
      const fstate = window.FishingController ? window.FishingController.getState() : 'idle';
      const isBite = window.FishingController ? window.FishingController.isBiting() : false;
      if (window.CastingSystem && typeof window.CastingSystem.draw === 'function') {
        window.CastingSystem.draw(ctx, rodX, rodY, fstate, isBite);
      }
      
      // Draw weather
      if (window.Weather && typeof window.Weather.draw === 'function') {
        window.Weather.draw();
      }
      
      // Draw anomalies
      if (window.Anomalies && typeof window.Anomalies.draw === 'function') {
        window.Anomalies.draw(ctx);
      }
      
      // Draw cabin overlay
      if (window.Cabin && typeof window.Cabin.draw === 'function') {
        window.Cabin.draw();
      }
      
      ctx.restore();
      
      // Draw UI (after screen shake)
      if (window.UIManager && typeof window.UIManager.draw === 'function') {
        window.UIManager.draw(ctx);
      }
    } catch (e) {
      console.error('Error drawing game scene:', e);
    }
  };
  
  if (typeof window !== 'undefined') window.GameScene = window.GameScene || GameScene;
  if (typeof module !== 'undefined') module.exports = GameScene;
})();
