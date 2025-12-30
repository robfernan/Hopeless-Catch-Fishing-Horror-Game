# Scene System Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     Main Game Loop                          │
│  (index.html - requestAnimationFrame)                       │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ├─ update(dt)
                     │   └─ SceneManager.update(dt)
                     │       └─ CurrentScene.update(dt)
                     │           └─ _updateGameSystems(dt)
                     │               ├─ Player.update()
                     │               ├─ DayNightCycle.update()
                     │               ├─ Weather.update()
                     │               ├─ FishingController.update()
                     │               └─ [All other systems...]
                     │
                     └─ draw(ctx)
                         └─ SceneManager.draw(ctx)
                             └─ CurrentScene.draw(ctx)
                                 ├─ drawBackground()
                                 ├─ SkyRenderer.draw()
                                 ├─ Player.draw()
                                 ├─ CastingSystem.draw()
                                 ├─ Weather.draw()
                                 ├─ Anomalies.draw()
                                 └─ UIManager.draw()
```

## Scene Manager Architecture

```
┌──────────────────────────────────────────────────────────┐
│                    SceneManager                          │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  scenes: {                                              │
│    'menu': MenuScene,                                   │
│    'lake': LakeScene,                                   │
│    'forest': ForestScene,                               │
│    'mountain': MountainScene,                           │
│    'beach': BeachScene,  ← Add new scenes here         │
│    ...                                                  │
│  }                                                      │
│                                                          │
│  currentScene: LakeScene                                │
│                                                          │
│  Methods:                                               │
│  ├─ registerScene(name, scene)                          │
│  ├─ switchScene(name)                                   │
│  ├─ getCurrentScene()                                   │
│  ├─ getScene(name)                                      │
│  ├─ hasScene(name)                                      │
│  ├─ update(dt)                                          │
│  └─ draw(ctx)                                           │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

## Scene Hierarchy

```
BaseScene (Abstract Interface)
├─ name: string
├─ locationId: string
├─ init(): Promise
├─ onEnter(): void
├─ onExit(): void
├─ update(dt): void
└─ draw(ctx): void

    ↓ Inherits from

┌─────────────────────────────────────────────────────────┐
│                  Concrete Scenes                        │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  MenuScene                                              │
│  ├─ Handles menu overlay                               │
│  └─ No canvas rendering                                │
│                                                         │
│  GameScene                                              │
│  ├─ Generic game wrapper                               │
│  └─ Fallback rendering                                 │
│                                                         │
│  LakeScene                                              │
│  ├─ drawBackground()                                   │
│  ├─ getSkyColors()                                      │
│  ├─ drawDock()                                          │
│  └─ _updateGameSystems()                               │
│                                                         │
│  ForestScene                                            │
│  ├─ drawBackground()                                   │
│  ├─ getSkyColors()                                      │
│  ├─ drawBridge()                                        │
│  ├─ drawTrees()                                         │
│  └─ _updateGameSystems()                               │
│                                                         │
│  MountainScene                                          │
│  ├─ drawBackground()                                   │
│  ├─ getSkyColors()                                      │
│  ├─ drawWaterCurrent()                                  │
│  ├─ drawRocks()                                         │
│  ├─ drawCliffs()                                        │
│  └─ _updateGameSystems()                               │
│                                                         │
│  [Your New Scenes Here]                                │
│  ├─ drawBackground()                                   │
│  ├─ getSkyColors()                                      │
│  ├─ drawStructures()                                    │
│  └─ _updateGameSystems()                               │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## Scene Lifecycle Flow

```
┌─────────────────────────────────────────────────────────┐
│  User calls: switchScene('forest')                      │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
        ┌────────────────────────┐
        │ SceneManager.switchScene│
        └────────────┬───────────┘
                     │
        ┌────────────▼───────────┐
        │ Check if transitioning │
        │ (prevent race condition)│
        └────────────┬───────────┘
                     │
        ┌────────────▼───────────┐
        │ Call currentScene      │
        │ .onExit()              │
        └────────────┬───────────┘
                     │
        ┌────────────▼───────────┐
        │ Switch to new scene    │
        │ currentScene = forest  │
        └────────────┬───────────┘
                     │
        ┌────────────▼───────────┐
        │ Call forest.init()     │
        │ (async - wait for it)  │
        └────────────┬───────────┘
                     │
        ┌────────────▼───────────┐
        │ Call forest.onEnter()  │
        └────────────┬───────────┘
                     │
        ┌────────────▼───────────┐
        │ Main loop now calls:   │
        │ forest.update(dt)      │
        │ forest.draw(ctx)       │
        └────────────────────────┘
```

## Scene Update Flow

```
┌──────────────────────────────────────────────────────────┐
│  Main Loop: update(dt)                                   │
└────────────────────┬─────────────────────────────────────┘
                     │
        ┌────────────▼──────────────┐
        │ SceneManager.update(dt)   │
        └────────────┬───────────────┘
                     │
        ┌────────────▼──────────────┐
        │ CurrentScene.update(dt)   │
        │ (e.g., LakeScene)         │
        └────────────┬───────────────┘
                     │
        ┌────────────▼──────────────────────────────────┐
        │ _updateGameSystems(dt)                        │
        │ (Handles all system updates)                  │
        └────────────┬───────────────────────────────────┘
                     │
        ┌────────────▼──────────────────────────────────┐
        │ Updates (in order):                           │
        ├─ Player.update(dt, keys)                      │
        ├─ World.update(dt)                             │
        ├─ DayNightCycle.update(dt)                     │
        ├─ Weather.update(dt)                           │
        ├─ UIManager.update(dt)                         │
        ├─ Cabin.update(dt)                             │
        ├─ Anomalies.update(dt)                         │
        ├─ ScreenShake.update(dt)                       │
        ├─ SkyRenderer.update(dt)                       │
        ├─ CastingSystem.update(dt)                     │
        ├─ FishingController.update(dt)                 │
        └─ Anomalies.checkForAnomalies()                │
                                                        │
        All systems stay in sync across all scenes!     │
        └────────────────────────────────────────────────┘
```

## Scene Draw Flow

```
┌──────────────────────────────────────────────────────────┐
│  Main Loop: draw(ctx)                                    │
└────────────────────┬─────────────────────────────────────┘
                     │
        ┌────────────▼──────────────┐
        │ SceneManager.draw(ctx)    │
        └────────────┬───────────────┘
                     │
        ┌────────────▼──────────────┐
        │ CurrentScene.draw(ctx)    │
        │ (e.g., LakeScene)         │
        └────────────┬───────────────┘
                     │
        ┌────────────▼──────────────────────────────────┐
        │ Clear canvas                                  │
        │ ctx.clearRect(0, 0, 800, 600)                │
        └────────────┬───────────────────────────────────┘
                     │
        ┌────────────▼──────────────────────────────────┐
        │ Apply screen shake                            │
        │ ctx.save()                                    │
        │ ctx.translate(shake.x, shake.y)              │
        └────────────┬───────────────────────────────────┘
                     │
        ┌────────────▼──────────────────────────────────┐
        │ Draw background (customized per scene)        │
        │ drawBackground(ctx, timeOfDay)                │
        │ ├─ Sky gradient                               │
        │ ├─ Ground                                     │
        │ ├─ Water                                      │
        │ └─ Structures (dock, bridge, rocks, etc.)     │
        └────────────┬───────────────────────────────────┘
                     │
        ┌────────────▼──────────────────────────────────┐
        │ Draw layers (in order):                       │
        ├─ SkyRenderer (sun, moon, stars)               │
        ├─ Player                                       │
        ├─ World foreground                             │
        ├─ CastingSystem (fishing rod)                  │
        ├─ Weather (rain, wind)                         │
        ├─ Anomalies (strange events)                   │
        └─ Cabin (overlay)                              │
                                                        │
        └────────────┬───────────────────────────────────┘
                     │
        ┌────────────▼──────────────────────────────────┐
        │ Restore canvas                                │
        │ ctx.restore()                                 │
        └────────────┬───────────────────────────────────┘
                     │
        ┌────────────▼──────────────────────────────────┐
        │ Draw UI (after screen shake)                  │
        │ UIManager.draw(ctx)                           │
        └────────────────────────────────────────────────┘
```

## Color System Architecture

```
┌──────────────────────────────────────────────────────────┐
│  getSkyColors(timeOfDay)                                 │
│  Returns: { top, bottom, ground, waterTop, waterBottom } │
└────────────────────┬─────────────────────────────────────┘
                     │
        ┌────────────▼──────────────────────────────────┐
        │ Time of Day Ranges:                           │
        │                                               │
        │ 0.0 - 0.2:   Night                            │
        │ 0.2 - 0.35:  Dawn (interpolate)               │
        │ 0.35 - 0.65: Day                              │
        │ 0.65 - 0.8:  Dusk (interpolate)               │
        │ 0.8 - 1.0:   Night                            │
        └────────────┬──────────────────────────────────┘
                     │
        ┌────────────▼──────────────────────────────────┐
        │ Each time range returns colors:               │
        │                                               │
        │ Night:                                        │
        │ { top: '#1a1a3e', bottom: '#2a2a4e', ... }   │
        │                                               │
        │ Dawn (interpolated):                          │
        │ { top: rgb(...), bottom: rgb(...), ... }     │
        │                                               │
        │ Day:                                          │
        │ { top: '#87ceeb', bottom: '#a0d3ff', ... }   │
        │                                               │
        │ Dusk (interpolated):                          │
        │ { top: rgb(...), bottom: rgb(...), ... }     │
        │                                               │
        │ Night:                                        │
        │ { top: '#1a1a3e', bottom: '#2a2a4e', ... }   │
        └────────────────────────────────────────────────┘
```

## Adding a New Location

```
┌──────────────────────────────────────────────────────────┐
│  Step 1: Copy Template                                   │
│  cp sceneTemplate.js beachScene.js                        │
└────────────────────┬─────────────────────────────────────┘
                     │
        ┌────────────▼──────────────────────────────────┐
        │  Step 2: Customize Scene                      │
        │  ├─ Change TemplateScene → BeachScene         │
        │  ├─ Change locationId → 'beach'               │
        │  ├─ Customize getSkyColors()                  │
        │  └─ Customize drawStructures()                │
        └────────────┬──────────────────────────────────┘
                     │
        ┌────────────▼──────────────────────────────────┐
        │  Step 3: Add to index.html                    │
        │  <script src="src/scenes/beachScene.js"></...>│
        └────────────┬──────────────────────────────────┘
                     │
        ┌────────────▼──────────────────────────────────┐
        │  Step 4: Register in init()                   │
        │  SceneManager.registerScene('beach', ...);    │
        └────────────┬──────────────────────────────────┘
                     │
        ┌────────────▼──────────────────────────────────┐
        │  Step 5: Switch to it                         │
        │  SceneManager.switchScene('beach');           │
        └────────────────────────────────────────────────┘
```

## System Integration

```
┌──────────────────────────────────────────────────────────┐
│  Every Scene Automatically Updates:                      │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  ┌─ Player System                                       │
│  │  ├─ Movement                                         │
│  │  ├─ Collision                                        │
│  │  └─ Drawing                                          │
│  │                                                      │
│  ├─ Fishing System                                      │
│  │  ├─ Casting                                          │
│  │  ├─ Biting                                           │
│  │  ├─ Reeling                                          │
│  │  └─ Catch handling                                   │
│  │                                                      │
│  ├─ Time System                                         │
│  │  ├─ Day/night cycle                                  │
│  │  ├─ Time progression                                 │
│  │  └─ Color transitions                                │
│  │                                                      │
│  ├─ Weather System                                      │
│  │  ├─ Rain                                             │
│  │  ├─ Wind                                             │
│  │  └─ Effects                                          │
│  │                                                      │
│  ├─ UI System                                           │
│  │  ├─ HUD                                              │
│  │  ├─ Overlays                                         │
│  │  └─ Menus                                            │
│  │                                                      │
│  ├─ Anomaly System                                      │
│  │  ├─ Strange events                                   │
│  │  ├─ Screen effects                                   │
│  │  └─ Lore triggers                                    │
│  │                                                      │
│  └─ [All other systems...]                              │
│                                                          │
│  All handled automatically by _updateGameSystems()      │
│  No manual wiring needed!                               │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

## File Organization

```
HTML_CSS_JS/
│
├── src/
│   ├── scenemanager.js ─────────────┐
│   │                                │
│   ├── scenes/                      │
│   │   ├── baseScene.js ────────────┼─ Scene System
│   │   ├── sceneTemplate.js ────────┤
│   │   ├── menuScene.js ────────────┤
│   │   ├── gameScene.js ────────────┤
│   │   ├── lakeScene.js ────────────┤
│   │   ├── forestScene.js ──────────┤
│   │   └── mountainScene.js ────────┘
│   │
│   ├── fishing/ ─────────────────── Fishing System
│   ├── world/ ───────────────────── World System
│   ├── daynightcycle.js ─────────── Time System
│   ├── weather.js ───────────────── Weather System
│   ├── anomalies.js ─────────────── Anomaly System
│   ├── uimanager.js ─────────────── UI System
│   └── [other systems...]
│
└── index.html ──────────────────── Main entry point
```

---

This architecture makes it **super easy** to:
- ✅ Add new locations (copy template)
- ✅ Customize visuals (override methods)
- ✅ Integrate systems (automatic)
- ✅ Debug issues (clear flow)
- ✅ Extend features (clear interfaces)
