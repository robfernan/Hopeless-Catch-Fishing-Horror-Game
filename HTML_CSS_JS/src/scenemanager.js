// scenemanager.js - Central scene management system
(function(){
  const SceneManager = {
    currentScene: null,
    scenes: {},
    isTransitioning: false,
    
    init() {
      this.scenes = {};
      this.currentScene = null;
      this.isTransitioning = false;
    },
    
    /**
     * Register a scene
     * @param {string} name - Scene identifier
     * @param {Object} scene - Scene object with init/update/draw methods
     * @returns {boolean} Success
     */
    registerScene(name, scene) {
      if (!scene || typeof scene.init !== 'function') {
        console.error(`Scene ${name} must have init() method`);
        return false;
      }
      this.scenes[name] = scene;
      console.log(`[SceneManager] Registered scene: ${name}`);
      return true;
    },
    
    /**
     * Switch to a different scene with lifecycle management
     * @param {string} name - Scene name to switch to
     * @returns {Promise<boolean>} Success
     */
    async switchScene(name) {
      if (this.isTransitioning) {
        console.warn('[SceneManager] Already transitioning, ignoring switch request');
        return false;
      }
      
      if (!this.scenes[name]) {
        console.error(`[SceneManager] Scene ${name} not registered`);
        return false;
      }
      
      this.isTransitioning = true;
      
      try {
        // Exit current scene
        if (this.currentScene && typeof this.currentScene.onExit === 'function') {
          try {
            this.currentScene.onExit();
          } catch (e) {
            console.error('[SceneManager] Error exiting scene:', e);
          }
        }
        
        // Switch to new scene
        this.currentScene = this.scenes[name];
        console.log(`[SceneManager] Switched to scene: ${name}`);
        
        // Initialize new scene
        if (typeof this.currentScene.init === 'function') {
          await this.currentScene.init();
        }
        
        // Enter new scene
        if (typeof this.currentScene.onEnter === 'function') {
          this.currentScene.onEnter();
        }
        
        return true;
      } catch (e) {
        console.error('[SceneManager] Error switching scene:', e);
        return false;
      } finally {
        this.isTransitioning = false;
      }
    },
    
    /**
     * Get the currently active scene
     * @returns {Object} Current scene
     */
    getCurrentScene() {
      return this.currentScene;
    },
    
    /**
     * Get a registered scene by name
     * @param {string} name - Scene name
     * @returns {Object} Scene object or null
     */
    getScene(name) {
      return this.scenes[name] || null;
    },
    
    /**
     * Check if a scene is registered
     * @param {string} name - Scene name
     * @returns {boolean} Is registered
     */
    hasScene(name) {
      return name in this.scenes;
    },
    
    /**
     * Update the current scene
     * @param {number} dt - Delta time
     */
    update(dt) {
      if (this.currentScene && typeof this.currentScene.update === 'function') {
        try {
          this.currentScene.update(dt);
        } catch (e) {
          console.error('[SceneManager] Error updating scene:', e);
        }
      }
    },
    
    /**
     * Draw the current scene
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     */
    draw(ctx) {
      if (this.currentScene && typeof this.currentScene.draw === 'function') {
        try {
          this.currentScene.draw(ctx);
        } catch (e) {
          console.error('[SceneManager] Error drawing scene:', e);
        }
      }
    }
  };
  
  if (typeof window !== 'undefined') window.SceneManager = window.SceneManager || SceneManager;
  if (typeof module !== 'undefined') module.exports = SceneManager;
})();
