// scenes/menuScene.js - Main menu scene
(function(){
  const MenuScene = Object.create(window.BaseScene || {});
  
  MenuScene.name = 'MenuScene';
  
  MenuScene.init = async function() {
    // Menu is handled by HTML overlays, nothing to initialize
  };
  
  MenuScene.onEnter = function() {
    // Show main menu overlay
    try {
      const menu = document.getElementById('main-menu');
      if (menu) {
        menu.classList.remove('hidden');
        menu.classList.add('visible');
        menu.setAttribute('aria-hidden', 'false');
      }
    } catch (e) {
      console.error('Error showing menu:', e);
    }
  };
  
  MenuScene.onExit = function() {
    // Hide main menu overlay
    try {
      const menu = document.getElementById('main-menu');
      if (menu) {
        menu.classList.remove('visible');
        menu.classList.add('hidden');
        menu.setAttribute('aria-hidden', 'true');
      }
    } catch (e) {
      console.error('Error hiding menu:', e);
    }
  };
  
  MenuScene.update = function(dt) {
    // Menu doesn't need update logic
  };
  
  MenuScene.draw = function(ctx) {
    // Menu is rendered via HTML overlays
  };
  
  if (typeof window !== 'undefined') window.MenuScene = window.MenuScene || MenuScene;
  if (typeof module !== 'undefined') module.exports = MenuScene;
})();
