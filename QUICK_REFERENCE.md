# Scene System - Quick Reference

## Add a New Location in 5 Steps

```bash
# 1. Copy template
cp HTML_CSS_JS/src/scenes/sceneTemplate.js HTML_CSS_JS/src/scenes/beachScene.js

# 2. Edit beachScene.js
# - Change TemplateScene → BeachScene
# - Change locationId: 'template_location' → 'beach'
# - Customize getSkyColors() - return colors for your location
# - Customize drawStructures() - draw your unique elements

# 3. Add to index.html (in script tags)
<script src="src/scenes/beachScene.js"></script>

# 4. Register in index.html (in init function)
if (window.BeachScene) window.SceneManager.registerScene('beach', window.BeachScene);

# 5. Switch to it
window.SceneManager.switchScene('beach');
```

---

## Scene Template Structure

```javascript
const MyScene = Object.create(window.BaseScene || {});

MyScene.name = 'MyScene';
MyScene.locationId = 'my_location';

// Called once when scene loads
MyScene.init = async function() { };

// Called when scene becomes active
MyScene.onEnter = function() { };

// Called when switching away
MyScene.onExit = function() { };

// Called every frame for logic
MyScene.update = function(dt) {
  this._updateGameSystems(dt);
};

// Called every frame for rendering
MyScene.draw = function(ctx) {
  // Standard draw pattern (see template)
};

// Customize this for your location
MyScene.drawBackground = function(ctx, timeOfDay) {
  const colors = this.getSkyColors(timeOfDay);
  // Draw sky, ground, water
  this.drawStructures(ctx, timeOfDay);
};

// Define colors for different times of day
MyScene.getSkyColors = function(timeOfDay) {
  return {
    top: '#87ceeb',           // Sky top
    bottom: '#a0d3ff',        // Sky bottom
    ground: '#36c06a',        // Ground
    waterTop: '#2fa0a0',      // Water surface
    waterBottom: '#258787'    // Water depth
  };
};

// Draw unique location elements
MyScene.drawStructures = function(ctx, timeOfDay) {
  ctx.fillStyle = '#8b5a2b';
  ctx.fillRect(300, 450, 200, 20); // Example: bridge
};

// Don't modify - handles all system updates
MyScene._updateGameSystems = function(dt) { };
```

---

## Time of Day Reference

```javascript
timeOfDay ranges from 0 to 1:

0.0  ├─ Midnight (night)
0.2  ├─ Dawn starts
0.35 ├─ Day starts
0.5  ├─ Noon (brightest)
0.65 ├─ Dusk starts
0.8  ├─ Night starts
1.0  └─ Midnight again (night)
```

Use for conditional rendering:
```javascript
const isNight = timeOfDay < 0.2 || timeOfDay >= 0.8;
const isDawn = timeOfDay >= 0.2 && timeOfDay < 0.35;
const isDay = timeOfDay >= 0.35 && timeOfDay < 0.65;
const isDusk = timeOfDay >= 0.65 && timeOfDay < 0.8;
```

---

## Smooth Color Transitions

```javascript
// Interpolate between two colors
const t = (timeOfDay - 0.2) / 0.15; // Normalize to 0-1
const r = Math.floor(102 + t * 102);
const g = Math.floor(128 + t * 77);
const b = 204;
ctx.fillStyle = `rgb(${r},${g},${b})`;
```

---

## Common Drawing Patterns

### Gradient
```javascript
const grad = ctx.createLinearGradient(0, 0, 0, 600);
grad.addColorStop(0, '#87ceeb');
grad.addColorStop(1, '#a0d3ff');
ctx.fillStyle = grad;
ctx.fillRect(0, 0, 800, 600);
```

### Rectangle
```javascript
ctx.fillStyle = '#8b5a2b';
ctx.fillRect(x, y, width, height);
```

### Circle
```javascript
ctx.fillStyle = '#ff0000';
ctx.beginPath();
ctx.arc(x, y, radius, 0, Math.PI * 2);
ctx.fill();
```

### Triangle
```javascript
ctx.fillStyle = '#ff0000';
ctx.beginPath();
ctx.moveTo(x1, y1);
ctx.lineTo(x2, y2);
ctx.lineTo(x3, y3);
ctx.closePath();
ctx.fill();
```

---

## Scene Manager API

```javascript
// Register a scene
window.SceneManager.registerScene('name', sceneObject);

// Switch to a scene
await window.SceneManager.switchScene('name');

// Get current scene
const scene = window.SceneManager.getCurrentScene();

// Check if scene exists
const exists = window.SceneManager.hasScene('name');

// Get a specific scene
const scene = window.SceneManager.getScene('name');
```

---

## Access Game Systems

```javascript
// Player
window.Player.x
window.Player.y
window.Player.update(dt, keys)
window.Player.draw(ctx)

// Time of day
const time = window.DayNightCycle.getTime();

// Fishing
window.FishingController.getState()
window.FishingController.isBiting()

// Game state
window.GameState.progression
window.GameState.recordCatch(fishName, isLegendary)
window.GameState.unlockLocation(location)

// UI
window.UIManager.update(dt)
window.UIManager.draw(ctx)
```

---

## Debugging

```javascript
// Check registered scenes
console.log(window.SceneManager.scenes);

// Check current scene
console.log(window.SceneManager.getCurrentScene().name);

// Check if scene exists
console.log(window.SceneManager.hasScene('beach'));

// Monitor console for scene switches
// [SceneManager] Switched to scene: beach
```

---

## Location Unlock Progression

```javascript
// In your scene's onEnter()
if (window.GameState) {
  // Unlock forest at 5 unique fish
  if (window.GameState.progression.uniqueFishCaught.length >= 5) {
    window.GameState.unlockLocation('forest_pond');
  }
  
  // Unlock mountain at 3 lore entries
  if (window.GameState.progression.discoveredLore.length >= 3) {
    window.GameState.unlockLocation('mountain_stream');
  }
}
```

---

## File Locations

```
HTML_CSS_JS/
├── src/
│   ├── scenemanager.js          ← Main controller
│   ├── scenes/
│   │   ├── baseScene.js         ← Interface
│   │   ├── sceneTemplate.js     ← Copy this!
│   │   ├── lakeScene.js         ← Example
│   │   ├── forestScene.js       ← Example
│   │   └── mountainScene.js     ← Example
│   └── [other systems...]
└── index.html                    ← Register scenes here
```

---

## Checklist for New Location

- [ ] Copy sceneTemplate.js
- [ ] Rename to yourLocationScene.js
- [ ] Update scene name and locationId
- [ ] Customize getSkyColors()
- [ ] Customize drawStructures()
- [ ] Add script tag to index.html
- [ ] Register in init() function
- [ ] Test with `window.SceneManager.switchScene('your_location')`
- [ ] Verify no console errors
- [ ] Add to progression unlocks (optional)

---

## Common Mistakes

❌ Forgetting to add script tag to index.html
✅ Add `<script src="src/scenes/yourScene.js"></script>`

❌ Not registering scene in init()
✅ Add `window.SceneManager.registerScene('name', window.YourScene);`

❌ Modifying _updateGameSystems()
✅ Leave it alone - it handles all system updates

❌ Not calling this._updateGameSystems(dt) in update()
✅ Always call it to keep systems running

❌ Forgetting to export scene
✅ Add `if (typeof window !== 'undefined') window.YourScene = window.YourScene || YourScene;`

---

## Performance Tips

1. Cache colors in getSkyColors() - don't recalculate every frame
2. Combine shapes when possible - fewer draw calls = faster
3. Use requestAnimationFrame - already handled by main loop
4. Pre-allocate objects in init() - not in draw()
5. Check system existence - always use `if (window.System)`

---

## Need More Help?

- **Full Guide**: See `SCENE_SYSTEM_GUIDE.md`
- **Technical Details**: See `SCENE_MANAGER_IMPLEMENTATION.md`
- **Examples**: Check `lakeScene.js`, `forestScene.js`, `mountainScene.js`
- **Template**: See `sceneTemplate.js` (fully documented)
- **Interface**: See `baseScene.js`

---

## TL;DR

1. Copy `sceneTemplate.js`
2. Customize colors and structures
3. Add script tag and register
4. Done! 🎣
