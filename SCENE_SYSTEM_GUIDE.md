# Scene System - Developer Guide

## Quick Start: Adding a New Location

### Step 1: Copy the Template
```bash
cp HTML_CSS_JS/src/scenes/sceneTemplate.js HTML_CSS_JS/src/scenes/myLocationScene.js
```

### Step 2: Customize Your Scene
Replace these in your new file:

```javascript
// Change the scene name
const MyLocationScene = Object.create(window.BaseScene || {});
MyLocationScene.name = 'MyLocationScene';
MyLocationScene.locationId = 'my_location';

// Customize colors in getSkyColors()
MyLocationScene.getSkyColors = function(timeOfDay) {
  // Return { top, bottom, ground, waterTop, waterBottom }
};

// Customize structures in drawStructures()
MyLocationScene.drawStructures = function(ctx, timeOfDay) {
  // Draw your unique location elements
};
```

### Step 3: Register in index.html
Add to the script tags section:
```html
<script src="src/scenes/myLocationScene.js"></script>
```

Add to the init function:
```javascript
if (window.MyLocationScene) window.SceneManager.registerScene('my_location', window.MyLocationScene);
```

### Step 4: Switch to Your Scene
```javascript
window.SceneManager.switchScene('my_location');
```

---

## Scene Architecture

### BaseScene Interface
Every scene must implement these methods:

```javascript
{
  name: 'SceneName',              // Unique identifier
  locationId: 'location_id',      // For progression tracking
  
  init: async function() {},      // Initialize resources
  onEnter: function() {},         // Called when scene becomes active
  onExit: function() {},          // Called when scene is switched away
  update: function(dt) {},        // Update logic (called every frame)
  draw: function(ctx) {}          // Render logic (called every frame)
}
```

### Lifecycle Flow
```
switchScene('lake')
    ↓
[Previous Scene] onExit()
    ↓
[New Scene] init()
    ↓
[New Scene] onEnter()
    ↓
Loop: update(dt) → draw(ctx)
    ↓
switchScene('forest')
    ↓
[Lake Scene] onExit()
    ↓
[Forest Scene] init()
    ↓
[Forest Scene] onEnter()
```

---

## Customizing Visuals

### Color System
Each scene defines colors for different times of day:

```javascript
getSkyColors(timeOfDay) {
  // timeOfDay ranges from 0 to 1
  // 0.0 = midnight
  // 0.25 = dawn
  // 0.5 = noon
  // 0.75 = dusk
  // 1.0 = midnight again
  
  return {
    top: '#87ceeb',           // Sky top color
    bottom: '#a0d3ff',        // Sky bottom color
    ground: '#36c06a',        // Ground/grass color
    waterTop: '#2fa0a0',      // Water surface color
    waterBottom: '#258787'    // Water depth color
  };
}
```

### Drawing Custom Elements
Override `drawStructures()` to add unique elements:

```javascript
drawStructures(ctx, timeOfDay) {
  // Example: Draw a bridge
  ctx.fillStyle = '#8b5a2b';
  ctx.fillRect(300, 450, 200, 20);
  
  // Example: Draw trees
  ctx.fillStyle = '#2a4a2a';
  ctx.fillRect(50, 300, 40, 160);
}
```

### Time-Based Rendering
Use `timeOfDay` to change appearance:

```javascript
const color = timeOfDay < 0.2 || timeOfDay >= 0.8 
  ? '#1a1a3e'  // Night color
  : '#87ceeb'; // Day color
```

---

## Game Systems Integration

All scenes automatically update these systems:

- **Player**: Movement, collision
- **World**: Bounds, helpers
- **DayNightCycle**: Time progression
- **Weather**: Rain, wind effects
- **UIManager**: HUD, overlays
- **Cabin**: Rest/save system
- **Anomalies**: Strange events
- **ScreenShake**: Camera effects
- **SkyRenderer**: Sun, moon, stars
- **CastingSystem**: Fishing rod visuals
- **FishingController**: Fishing mechanics

Access them via `window.SystemName`:

```javascript
// In your scene's update or draw method
if (window.DayNightCycle) {
  const time = window.DayNightCycle.getTime();
}

if (window.Player) {
  const playerX = window.Player.x;
  const playerY = window.Player.y;
}
```

---

## Location-Specific Fish

To have different fish per location, modify `FishingController`:

```javascript
// In your scene's init()
if (window.FishingController) {
  // Set location-specific fish pool
  window.FishingController.setLocationFish('my_location', [
    'Sunfish',
    'Bass',
    'Trout'
    // ... your location's fish
  ]);
}
```

---

## Progression Integration

Track location visits and unlocks:

```javascript
// In your scene's onEnter()
if (window.GameState) {
  // Record that player visited this location
  window.GameState.progression.currentLocation = 'my_location';
  
  // Check if location should be unlocked
  if (window.GameState.progression.uniqueFishCaught.length >= 5) {
    window.GameState.unlockLocation('next_location');
  }
}
```

---

## Example: Creating a Beach Location

```javascript
// scenes/beachScene.js
(function(){
  const BeachScene = Object.create(window.BaseScene || {});
  
  BeachScene.name = 'BeachScene';
  BeachScene.locationId = 'beach';
  
  BeachScene.init = async function() {
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
  
  BeachScene.onEnter = function() {
    if (window.GameState) {
      window.GameState.enterPlaying();
    }
  };
  
  BeachScene.onExit = function() {};
  
  BeachScene.update = function(dt) {
    this._updateGameSystems(dt);
  };
  
  BeachScene.draw = function(ctx) {
    // Standard draw pattern (see template)
  };
  
  BeachScene.drawBackground = function(ctx, timeOfDay) {
    const colors = this.getSkyColors(timeOfDay);
    
    // Draw sky
    const g = ctx.createLinearGradient(0, 0, 0, 460);
    g.addColorStop(0, colors.top);
    g.addColorStop(1, colors.bottom);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 800, 460);
    
    // Draw sand
    ctx.fillStyle = '#d4a574';
    ctx.fillRect(0, 460, 800, 140);
    
    // Draw ocean
    const waterGrad = ctx.createLinearGradient(0, 470, 0, 600);
    waterGrad.addColorStop(0, colors.waterTop);
    waterGrad.addColorStop(1, colors.waterBottom);
    ctx.fillStyle = waterGrad;
    ctx.fillRect(0, 470, 800, 130);
    
    this.drawStructures(ctx, timeOfDay);
  };
  
  BeachScene.getSkyColors = function(timeOfDay) {
    if (timeOfDay < 0.2 || timeOfDay >= 0.8) {
      return { 
        top: '#1a1a3e', 
        bottom: '#2a2a4e', 
        ground: '#d4a574', 
        waterTop: '#1a5a7a', 
        waterBottom: '#0d3a5a' 
      };
    } else if (timeOfDay < 0.65) {
      return { 
        top: '#87ceeb', 
        bottom: '#a0d3ff', 
        ground: '#d4a574', 
        waterTop: '#2fa0c0', 
        waterBottom: '#1a7a9a' 
      };
    }
    // ... handle other times
  };
  
  BeachScene.drawStructures = function(ctx, timeOfDay) {
    // Draw lighthouse
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(700, 350, 40, 110);
    
    // Draw lighthouse top
    ctx.fillStyle = '#ff0000';
    ctx.beginPath();
    ctx.moveTo(700, 350);
    ctx.lineTo(740, 350);
    ctx.lineTo(720, 330);
    ctx.closePath();
    ctx.fill();
  };
  
  BeachScene._updateGameSystems = function(dt) {
    // Standard update pattern (see template)
  };
  
  if (typeof window !== 'undefined') window.BeachScene = window.BeachScene || BeachScene;
  if (typeof module !== 'undefined') module.exports = BeachScene;
})();
```

---

## Debugging

### Check if Scene is Registered
```javascript
console.log(window.SceneManager.hasScene('my_location'));
```

### Get Current Scene
```javascript
const current = window.SceneManager.getCurrentScene();
console.log(current.name);
```

### Monitor Scene Switches
The SceneManager logs all switches to console:
```
[SceneManager] Registered scene: lake
[SceneManager] Switched to scene: lake
[SceneManager] Switched to scene: forest
```

---

## Performance Tips

1. **Minimize draw calls**: Combine shapes when possible
2. **Cache colors**: Store color strings instead of recalculating
3. **Use requestAnimationFrame**: Already handled by main loop
4. **Avoid creating objects in draw()**: Pre-allocate in init()
5. **Check system existence**: Always use `if (window.System)` before calling

---

## Common Patterns

### Conditional Rendering Based on Time
```javascript
const isNight = timeOfDay < 0.2 || timeOfDay >= 0.8;
ctx.fillStyle = isNight ? '#1a1a3e' : '#87ceeb';
```

### Smooth Color Transitions
```javascript
const t = (timeOfDay - 0.2) / 0.15; // Normalize to 0-1
const r = Math.floor(102 + t * 102);
const g = Math.floor(128 + t * 77);
const b = 204;
ctx.fillStyle = `rgb(${r},${g},${b})`;
```

### Drawing Gradients
```javascript
const grad = ctx.createLinearGradient(0, 0, 0, 600);
grad.addColorStop(0, '#87ceeb');
grad.addColorStop(1, '#a0d3ff');
ctx.fillStyle = grad;
ctx.fillRect(0, 0, 800, 600);
```

---

## Checklist for New Location

- [ ] Copy sceneTemplate.js
- [ ] Rename to yourLocationScene.js
- [ ] Update scene name and locationId
- [ ] Customize getSkyColors()
- [ ] Customize drawStructures()
- [ ] Add script tag to index.html
- [ ] Register scene in init()
- [ ] Test scene switching
- [ ] Verify all systems update correctly
- [ ] Add location-specific fish (optional)
- [ ] Add progression unlocks (optional)

---

## Need Help?

1. Check existing scenes (lake, forest, mountain) for examples
2. Review sceneTemplate.js for full documentation
3. Look at BaseScene for interface definition
4. Check SceneManager for API methods
