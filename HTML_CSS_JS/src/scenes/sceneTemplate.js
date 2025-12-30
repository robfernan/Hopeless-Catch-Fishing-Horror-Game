// scenes/sceneTemplate.js - Template for creating new scenes
// Copy this file and modify to create new location scenes quickly

(function(){
  /**
   * SCENE TEMPLATE - Copy and modify this to create new scenes
   * 
   * Steps to create a new scene:
   * 1. Copy this file to src/scenes/yourSceneName.js
   * 2. Replace 'TemplateScene' with your scene name
   * 3. Update the locationId and name
   * 4. Customize drawBackground() for unique visuals
   * 5. Add to index.html script tags
   * 6. Register in SceneManager in index.html init
   */
  
  const TemplateScene = Object.create(window.BaseScene || {});
  
  // Scene metadata
  TemplateScene.name = 'TemplateScene';
  TemplateScene.locationId = 'template_location';
  
  // ===== LIFECYCLE METHODS =====
  
  TemplateScene.init = async function() {
    // Initialize scene-specific systems
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
      console.error('Error initializing template scene:', e);
    }
  };
  
  TemplateScene.onEnter = function() {
    // Called when scene becomes active
    if (window.GameState) {
      window.GameState.enterPlaying();
    }
  };
  
  TemplateScene.onExit = function() {
    // Called when scene is being switched away from
    // Clean up scene-specific resources here if needed
  };
  
  // ===== UPDATE & DRAW =====
  
  TemplateScene.update = function(dt) {
    // Update all game systems
    this._updateGameSystems(dt);
  };
  
  TemplateScene.draw = function(ctx) {
    // Draw scene
    try {
      ctx.clearRect(0, 0, 800, 600);
      
      // Apply screen shake
      const shake = (window.ScreenShake && typeof window.ScreenShake.getOffset === 'function') 
        ? window.ScreenShake.getOffset() 
        : { x: 0, y: 0 };
      ctx.save();
      ctx.translate(shake.x, shake.y);
      
      // Get time of day for dynamic rendering
      const timeOfDay = (window.DayNightCycle && typeof window.DayNightCycle.getTime === 'function') 
        ? window.DayNightCycle.getTime() 
        : 0.5;
      
      // Draw background (customize this for each location)
      this.drawBackground(ctx, timeOfDay);
      
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
      console.error('Error drawing template scene:', e);
    }
  };
  
  // ===== CUSTOM RENDERING =====
  
  /**
   * Draw the background for this location
   * CUSTOMIZE THIS METHOD for each location
   * 
   * @param {CanvasRenderingContext2D} ctx - Canvas context
   * @param {number} timeOfDay - Time of day (0-1, where 0.5 is noon)
   */
  TemplateScene.drawBackground = function(ctx, timeOfDay) {
    const width = 800;
    const height = 600;
    const grassY = 460;
    
    // Define sky colors for this location
    const skyColors = this.getSkyColors(timeOfDay);
    
    // Draw sky gradient
    const g = ctx.createLinearGradient(0, 0, 0, grassY);
    g.addColorStop(0, skyColors.top);
    g.addColorStop(1, skyColors.bottom);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, width, grassY);
    
    // Draw ground
    ctx.fillStyle = skyColors.ground;
    ctx.fillRect(0, grassY, width, height - grassY);
    
    // Draw water
    const waterY = grassY + 10;
    const waterGrad = ctx.createLinearGradient(0, waterY, 0, waterY + 120);
    waterGrad.addColorStop(0, skyColors.waterTop);
    waterGrad.addColorStop(1, skyColors.waterBottom);
    ctx.fillStyle = waterGrad;
    const waterX = Math.floor(width * 0.4);
    const waterW = Math.floor(width * 0.5);
    ctx.fillRect(waterX, waterY, waterW, 90);
    
    // Draw location-specific structures
    this.drawStructures(ctx, timeOfDay);
  };
  
  /**
   * Get sky colors based on time of day
   * Override this to customize colors for your location
   * 
   * @param {number} timeOfDay - Time of day (0-1)
   * @returns {Object} Color object with top, bottom, ground, waterTop, waterBottom
   */
  TemplateScene.getSkyColors = function(timeOfDay) {
    // Default colors (similar to lake)
    if (timeOfDay < 0.2 || timeOfDay >= 0.8) {
      // Night
      return {
        top: '#1a1a3e',
        bottom: '#2a2a4e',
        ground: '#2a4a2a',
        waterTop: '#1a5a5a',
        waterBottom: '#0d3a3a'
      };
    } else if (timeOfDay < 0.35) {
      // Dawn
      const t = (timeOfDay - 0.2) / 0.15;
      return {
        top: `rgb(${Math.floor(102 + t * 102)},${Math.floor(128 + t * 77)},204)`,
        bottom: `rgb(${Math.floor(128 + t * 77)},${Math.floor(102 + t * 128)},${Math.floor(153 + t * 77)})`,
        ground: '#36c06a',
        waterTop: '#2fa0a0',
        waterBottom: '#258787'
      };
    } else if (timeOfDay < 0.65) {
      // Day
      return {
        top: '#87ceeb',
        bottom: '#a0d3ff',
        ground: '#36c06a',
        waterTop: '#2fa0a0',
        waterBottom: '#258787'
      };
    } else if (timeOfDay < 0.8) {
      // Dusk
      const t = (timeOfDay - 0.65) / 0.15;
      return {
        top: `rgb(${Math.floor(204 - t * 102)},${Math.floor(102 - t * 51)},${Math.floor(153 - t * 102)})`,
        bottom: `rgb(255,${Math.floor(128 - t * 51)},${Math.floor(77 - t * 51)})`,
        ground: '#36c06a',
        waterTop: '#2fa0a0',
        waterBottom: '#258787'
      };
    }
  };
  
  /**
   * Draw location-specific structures (dock, bridge, rocks, etc.)
   * Override this to add unique elements to your location
   * 
   * @param {CanvasRenderingContext2D} ctx - Canvas context
   * @param {number} timeOfDay - Time of day (0-1)
   */
  TemplateScene.drawStructures = function(ctx, timeOfDay) {
    // Draw a simple dock by default
    const grassY = 460;
    const waterY = grassY + 10;
    const dockStart = Math.floor(800 * 0.5 - 75);
    const dockW = 150;
    
    ctx.fillStyle = '#8b5a2b';
    ctx.fillRect(dockStart, waterY - 25, dockW, 18);
    
    // Dock shadow
    ctx.fillStyle = 'rgba(0,0,0,0.15)';
    ctx.fillRect(dockStart, waterY - 7, dockW, 6);
  };
  
  // ===== INTERNAL HELPERS =====
  
  /**
   * Update all game systems
   * This is called every frame
   * 
   * @param {number} dt - Delta time
   */
  TemplateScene._updateGameSystems = function(dt) {
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
      console.error('Error updating game systems:', e);
    }
  };
  
  if (typeof window !== 'undefined') window.TemplateScene = window.TemplateScene || TemplateScene;
  if (typeof module !== 'undefined') module.exports = TemplateScene;
})();
