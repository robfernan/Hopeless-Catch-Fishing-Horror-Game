# Scene Manager Implementation - Complete

## Overview
Implemented a complete scene management system for Hopeless Catch with 3 unique locations. The system provides clean scene transitions, location-specific rendering, and a foundation for future expansion.

## Architecture

### Core Files Created

#### 1. Scene Manager (`src/scenemanager.js`)
- Central controller for all scenes
- Handles scene registration and switching
- Manages lifecycle (init, onEnter, onExit)
- Delegates update and draw calls to active scene

**Key Methods**:
- `registerScene(name, scene)` - Register a scene
- `switchScene(name)` - Switch to a scene with lifecycle management
- `update(dt)` - Update active scene
- `draw(ctx)` - Draw active scene

#### 2. Base Scene (`src/scenes/baseScene.js`)
- Abstract base class for all scenes
- Defines lifecycle interface
- Provides utility methods

**Lifecycle Methods**:
- `init()` - Initialize scene resources
- `onEnter()` - Called when scene becomes active
- `onExit()` - Called when scene is being switched away
- `update(dt)` - Update scene logic
- `draw(ctx)` - Render scene

### Location Scenes

#### 3. Lake Scene (`src/scenes/lakeScene.js`)
**Starting location - Peaceful**
- Calm water with gentle ripples
- Wooden dock extending into water
- Cabin with chimney smoke
- Mountains in background
- Day/night color transitions
- All 9 fish species available

**Visual Features**:
- Peaceful day colors (bright sky, calm water)
- Eerie night colors (dark sky, murky water)
- Smooth transitions at dawn/dusk

#### 4. Forest Scene (`src/scenes/forestScene.js`)
**Unlocked at 5 unique fish - Mysterious**
- Dense forest with gnarled trees
- Murky, darker water
- Old wooden bridge (instead of dock)
- Fog/mist atmosphere
- Eerie color palette

**Visual Features**:
- Darker sky colors (overcast feel)
- Murky water gradient
- Tree silhouettes for atmosphere
- Bridge railings for structure
- Gnarled tree rendering

#### 5. Mountain Scene (`src/scenes/mountainScene.js`)
**Unlocked at 3 lore entries - Challenging**
- Rocky terrain with cliffs
- Flowing water with current effects
- Narrow paths and boulders
- Waterfalls in background
- Harsh wind effects

**Visual Features**:
- Bright, clear day colors
- Rocky gray/brown terrain
- Water current lines
- Boulder outcrops
- Cliff faces in background

#### 6. Menu Scene (`src/scenes/menuScene.js`)
**Main menu wrapper**
- Handles menu overlay visibility
- No canvas rendering (HTML-based)
- Lifecycle management for menu state

#### 7. Game Scene (`src/scenes/gameScene.js`)
**Generic game wrapper**
- Consolidates all game system updates
- Provides fallback rendering
- Can be used as base for future scenes

## Integration

### Updated Files

#### `index.html`
- Added scene manager script tags
- Added all scene script tags
- Updated main loop to use SceneManager
- Modified start button to switch to lake scene
- Modified pause menu to return to menu scene
- Stores current keys in `window.currentKeys` for scene access

**Key Changes**:
```javascript
// Initialize scene manager
await window.SceneManager.switchScene('menu');

// Main loop delegates to scene manager
function update(dt) {
  if (window.SceneManager) {
    window.SceneManager.update(dt);
  }
}

function draw() {
  if (window.SceneManager) {
    window.SceneManager.draw(ctx);
  }
}
```

### Scene Switching Flow

1. **Menu → Lake**: Start button triggers `switchScene('lake')`
2. **Lake → Forest**: (Future) Location UI will trigger `switchScene('forest')`
3. **Forest → Mountain**: (Future) Location UI will trigger `switchScene('mountain')`
4. **Any → Menu**: Pause menu button triggers `switchScene('menu')`

## How It Works

### Scene Lifecycle

```
switchScene('lake')
  ↓
onExit() [previous scene]
  ↓
init() [new scene]
  ↓
onEnter() [new scene]
  ↓
update() / draw() [active loop]
```

### Update Loop

Each frame:
1. SceneManager.update(dt) calls active scene's update()
2. Active scene updates all game systems
3. SceneManager.draw(ctx) calls active scene's draw()
4. Active scene renders all game elements

## Location-Specific Rendering

Each location has unique visual characteristics:

### Lake (Peaceful)
- Sky: Bright blue (day) → Dark blue (night)
- Water: Calm, light blue
- Structures: Dock, cabin
- Atmosphere: Welcoming

### Forest (Mysterious)
- Sky: Overcast gray (day) → Very dark (night)
- Water: Murky, dark blue-green
- Structures: Old bridge, gnarled trees
- Atmosphere: Eerie, mysterious

### Mountain (Challenging)
- Sky: Bright, clear (day) → Dark with stars (night)
- Water: Flowing, with current lines
- Structures: Cliffs, boulders, waterfalls
- Atmosphere: Harsh, challenging

## Future Enhancements

### Location Switching UI
- Add location selection menu
- Show unlock requirements
- Display location descriptions
- Travel animations

### Location-Specific Fish
- Different fish pools per location
- Location-specific rare species
- Difficulty scaling per location

### Environmental Effects
- Fog/mist in forest
- Wind effects on mountain
- Water ripples on lake
- Particle effects

### Persistent Location State
- Save current location
- Remember player position per location
- Track location-specific progress

## Testing

The scene manager is now integrated and ready to test:

1. **Menu Scene**: Start game → Menu displays
2. **Lake Scene**: Click Start → Lake renders with all systems
3. **Scene Switching**: Pause → Menu displays → Click Start → Back to Lake
4. **Rendering**: Each location has unique visuals

## Next Steps

1. **Location Switching UI**: Add UI to switch between unlocked locations
2. **Location-Specific Fish**: Implement different fish pools per location
3. **Unlock Progression**: Integrate with GameState progression system
4. **Environmental Effects**: Add fog, wind, particles per location
5. **Persistent State**: Save/load current location

## Files Summary

**Created**:
- `src/scenemanager.js` (70 lines)
- `src/scenes/baseScene.js` (30 lines)
- `src/scenes/menuScene.js` (45 lines)
- `src/scenes/gameScene.js` (130 lines)
- `src/scenes/lakeScene.js` (130 lines)
- `src/scenes/forestScene.js` (200 lines)
- `src/scenes/mountainScene.js` (240 lines)

**Modified**:
- `index.html` - Scene manager integration, script tags, button handlers

**Total New Code**: ~845 lines of well-structured, modular scene management code
