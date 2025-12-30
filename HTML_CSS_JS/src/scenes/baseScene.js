// scenes/baseScene.js - Abstract base class for all scenes
(function(){
  const BaseScene = {
    name: 'BaseScene',
    
    // Lifecycle methods - override in subclasses
    async init() {
      // Initialize scene resources
    },
    
    onEnter() {
      // Called when scene becomes active
    },
    
    onExit() {
      // Called when scene is being switched away from
    },
    
    update(dt) {
      // Update scene logic
    },
    
    draw(ctx) {
      // Render scene
    },
    
    // Utility methods
    getName() {
      return this.name;
    }
  };
  
  if (typeof window !== 'undefined') window.BaseScene = window.BaseScene || BaseScene;
  if (typeof module !== 'undefined') module.exports = BaseScene;
})();
