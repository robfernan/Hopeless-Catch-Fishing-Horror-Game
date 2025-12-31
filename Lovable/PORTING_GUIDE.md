# Hopeless Catch - Porting Guide

## Current Project Files Overview

### Main Entry Points
- `src/components/HopelessCatch.tsx` - Main game component, screen routing
- `src/App.tsx` - App wrapper

### Menu Screens (src/components/menus/)
| File | Purpose |
|------|---------|
| `MainMenu.tsx` | Title screen, start game, settings access |
| `MapSelection.tsx` | Lake/Forest/Mountain map selector |
| `SettingsMenu.tsx` | Volume, graphics, peaceful mode toggles |
| `PauseMenu.tsx` | In-game pause overlay |
| `AboutMenu.tsx` | Credits/info screen |

### Game UI (src/components/game/)
| File | Purpose |
|------|---------|
| `GameWorld.tsx` | Main game rendering, background, environment |
| `Player.tsx` | Player sprite, animations, movement |
| `SpriteAnimator.tsx` | Sprite sheet animation system |
| `FishingUI.tsx` | Tension meter, fishing phases, cast button |
| `TackleBox.tsx` | Bait selection UI |
| `JournalPanel.tsx` | Catch log, fish collection |
| `CatchDisplay.tsx` | Fish caught popup |
| `GameHUD.tsx` | In-game HUD overlay |

### Game Data (src/data/)
| File | Purpose |
|------|---------|
| `fishData.ts` | 9 fish species, stats, bait multipliers |
| `baitData.ts` | 4 bait types |
| `playerAnimations.ts` | Sprite animation definitions |
| `rooms/lake.ts` | Lake map rooms (3 rooms) |
| `rooms/mountain.ts` | Mountain map rooms (7 rooms) |
| `rooms/index.ts` | Room registry |

### Types (src/types/)
| File | Purpose |
|------|---------|
| `game.ts` | GameState, Fish, CatchRecord, etc. |
| `room.ts` | Room, Platform, FishingSpot, Transition |
| `progression.ts` | Abilities, unlock requirements |

### Assets (src/assets/)
- `fish/` - 9 fish PNG sprites
- `bait/` - 4 bait PNG sprites  
- `player/` - Player sprites
- `FromCraftpixFishingPack/` - Craftpix fisherman animations

### Styles
- `src/index.css` - Global styles, Tailwind
- `src/App.css` - App-specific styles

---

## Technology Recommendation

### For a Metroidvania Side-Scroller Horror Game:

**Recommended: Phaser 3 + TypeScript**

#### Why NOT plain HTML/CSS/JS:
- DOM manipulation is slow for real-time games
- No built-in game loop
- CSS animations aren't precise enough for physics
- Hard to do pixel-perfect collision detection
- Performance issues with many moving sprites

#### Why HTML5 Canvas:
✅ Native 2D rendering, perfect for pixel art
✅ 60fps game loops
✅ Sprite sheet support
✅ Easy collision detection
✅ Works great with NW.js and Capacitor
✅ No heavy dependencies

---

## WebGL vs WebAssembly vs Canvas - Which for Porting?

**Short answer: They don't affect portability - they're about performance.**

| Tech | What It Is | NW.js/Capacitor | Best For |
|------|-----------|-----------------|----------|
| **Canvas 2D** | Browser's built-in 2D | ✅ Seamless | 2D pixel art (your game) |
| **WebGL** | GPU-accelerated graphics | ✅ Same | 3D, heavy particles, shaders |
| **WebAssembly** | Compiled binary (C/Rust) | ✅ Same | CPU-heavy physics, AI |

**Why they don't matter for porting:**
- NW.js and Capacitor wrap **Chromium browser**
- They run ANY web tech identically
- WebGL/WASM = performance tools, not portability tools

**When you WOULD need them:**

```
WebGL needed for:
├── 1000+ sprites on screen
├── Real-time lighting/shadows  
├── 3D environments
└── Complex shaders (water, distortion)

WebAssembly needed for:
├── Physics with 100+ objects
├── Procedural world generation
├── AI pathfinding for many enemies
└── Porting C++/Rust game engines
```

**For Hopeless Catch:**
- ~20-50 sprites max ✅ Canvas handles this
- Simple platformer physics ✅ JavaScript is fine
- 2D pixel art ✅ No GPU needed
- Horror effects ✅ Screen shake, filters = easy

**Verdict: Canvas 2D is perfect. Phaser 3 uses WebGL automatically when beneficial.**

---

## Why Phaser 3 (Recommended Framework)

### What is Phaser?
Phaser is the most popular HTML5 game framework. It handles all the hard engine stuff so you can focus on making your game.

### Benefits for Hopeless Catch:

#### 🎮 Built-in Game Systems
```
✅ Game loop (60fps, delta time handled)
✅ Scene management (menus, game, pause)
✅ Input handling (keyboard, mouse, touch, gamepad)
✅ Asset loading with progress bars
✅ Audio system with Web Audio API
```

#### 🎨 Graphics & Animation
```
✅ Sprite sheets & texture atlases
✅ Animation system (perfect for Craftpix assets)
✅ Tilemaps for room layouts
✅ Particle effects (bubbles, horror fog)
✅ Camera system (follow player, shake, zoom)
✅ WebGL renderer (auto-fallback to Canvas)
```

#### 🏃 Physics (Perfect for Metroidvania)
```
✅ Arcade Physics (simple, fast - good for platformers)
✅ Matter.js integration (if you need complex physics)
✅ Collision detection & callbacks
✅ Gravity, velocity, acceleration
✅ Platform one-way collision (jump through)
```

#### 🎯 Perfect for Your Game Because:
| Feature | Phaser Support | Your Need |
|---------|---------------|-----------|
| Sprite animations | Built-in | Player, fish sprites |
| Platformer physics | Arcade Physics | Jumping, falling, swimming |
| Scene transitions | Scene Manager | Room changes |
| Camera follow | Camera system | Follow player |
| Screen shake | Camera effects | Horror moments |
| Tilemaps | Tilemap support | Room layouts |
| Touch controls | Input plugin | Mobile/Capacitor |
| Gamepad | Input plugin | NW.js desktop |

#### 📦 Deployment Ready
```
✅ Single JS bundle output
✅ Works in NW.js (just point to index.html)
✅ Works in Capacitor (copy www folder)
✅ Works in Electron
✅ PWA support
✅ No server required (runs from file://)
```

#### 📚 Community & Resources
```
✅ 10+ years of development
✅ Massive documentation
✅ Thousands of examples
✅ Active Discord community
✅ Tons of tutorials (YouTube, blogs)
✅ TypeScript definitions included
```

#### 🔧 Horror Game Features
```
✅ Shader support (CRT filter, distortion)
✅ Blend modes (darkness, fog)
✅ Tween system (smooth animations)
✅ Timer events (anomaly triggers)
✅ Data manager (save/load game state)
```

### Phaser vs Alternatives

| Framework | Pros | Cons | Verdict |
|-----------|------|------|---------|
| **Phaser 3** | Full-featured, huge community | ~1MB size | ✅ Best choice |
| Pixi.js | Fast renderer | No physics/audio | Need more code |
| Kaboom.js | Simple, fun | Less features | Too basic |
| Three.js | 3D ready | Overkill for 2D | Wrong tool |
| Godot HTML5 | Full engine | Heavy, different workflow | Overkill |

### Quick Start with Phaser 3

```bash
# Create new project
npm create vite@latest hopeless-catch -- --template vanilla-ts
cd hopeless-catch
npm install phaser
```

```typescript
// src/main.ts
import Phaser from 'phaser';
import { MainMenu } from './scenes/MainMenu';
import { GameScene } from './scenes/GameScene';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO, // WebGL with Canvas fallback
  width: 800,
  height: 600,
  pixelArt: true, // Crisp pixel art scaling
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 800 },
      debug: false
    }
  },
  scene: [MainMenu, GameScene]
};

new Phaser.Game(config);
```

```typescript
// src/scenes/GameScene.ts
import Phaser from 'phaser';

export class GameScene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite;
  
  constructor() {
    super('GameScene');
  }
  
  preload() {
    // Load your Craftpix sprites
    this.load.spritesheet('player', 'assets/player/fisherman.png', {
      frameWidth: 48,
      frameHeight: 48
    });
  }
  
  create() {
    // Create animated player
    this.player = this.physics.add.sprite(100, 400, 'player');
    this.player.setCollideWorldBounds(true);
    
    // Create animation
    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNumbers('player', { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1
    });
    
    // Camera follows player
    this.cameras.main.startFollow(this.player);
  }
  
  update() {
    const cursors = this.input.keyboard!.createCursorKeys();
    
    if (cursors.left.isDown) {
      this.player.setVelocityX(-200);
      this.player.anims.play('walk', true);
      this.player.flipX = true;
    } else if (cursors.right.isDown) {
      this.player.setVelocityX(200);
      this.player.anims.play('walk', true);
      this.player.flipX = false;
    } else {
      this.player.setVelocityX(0);
    }
  }
}
```

### Phaser Resources
- Docs: https://phaser.io/docs
- Examples: https://phaser.io/examples
- Discord: https://discord.gg/phaser
- GitHub: https://github.com/photonstorm/phaser

---

## Recommended Tech Stack

```
┌─────────────────────────────────────────────┐
│        Hopeless Catch Architecture          │
├─────────────────────────────────────────────┤
│  Phaser 3 (Game Framework)                  │
│  ├── WebGL renderer (auto Canvas fallback)  │
│  ├── Arcade Physics (platformer)            │
│  ├── Scene Manager (screens/rooms)          │
│  └── TypeScript support                     │
├─────────────────────────────────────────────┤
│  Build Tool: Vite                           │
│  ├── Fast dev server                        │
│  ├── TypeScript compilation                 │
│  └── Single bundle output                   │
├─────────────────────────────────────────────┤
│  Deployment Targets                         │
│  ├── Web: Direct HTML5 (any browser)        │
│  ├── Desktop: NW.js (Windows/Mac/Linux)     │
│  ├── Mobile: Capacitor (iOS/Android)        │
│  └── Steam: Electron or NW.js               │
└─────────────────────────────────────────────┘
```

---

## Porting Steps (Using Phaser 3)

### Phase 1: Project Setup
1. [ ] Create Vite + TypeScript project
2. [ ] Install Phaser 3 (`npm install phaser`)
3. [ ] Set up folder structure (scenes, assets, data)
4. [ ] Configure for pixel art (no anti-aliasing)
5. [ ] Copy assets from this project

### Phase 2: Core Scenes
1. [ ] Create MainMenu scene (port from `MainMenu.tsx`)
2. [ ] Create GameScene (port from `HopelessCatch.tsx`)
3. [ ] Create MapSelection scene (port from `MapSelection.tsx`)
4. [ ] Create PauseMenu scene overlay
5. [ ] Set up scene transitions

### Phase 3: Player & Physics
1. [ ] Load Craftpix sprite sheets
2. [ ] Create player animations (idle, walk, fish)
3. [ ] Set up Arcade Physics (gravity, collisions)
4. [ ] Implement keyboard/touch controls
5. [ ] Add platform collision (one-way platforms)

### Phase 4: Room System
1. [ ] Port room data from `rooms/*.ts`
2. [ ] Create tilemaps or draw rooms procedurally
3. [ ] Implement room transitions (camera fade)
4. [ ] Add fishing spot markers
5. [ ] Implement day/night lighting

### Phase 5: Fishing Mechanics
1. [ ] Port fishing state machine from `FishingUI.tsx`
2. [ ] Create tension meter UI
3. [ ] Implement cast/reel animations
4. [ ] Port fish data from `fishData.ts`
5. [ ] Add catch popup display

### Phase 6: UI Overlays
1. [ ] Create HUD (DOM or Phaser UI)
2. [ ] Port TackleBox (bait selection)
3. [ ] Port Journal (catch log)
4. [ ] Add settings menu
5. [ ] Implement save/load (localStorage)

### Phase 7: Horror & Polish
1. [ ] Add screen shake on horror events
2. [ ] Implement fog/darkness effects
3. [ ] Add anomaly system
4. [ ] Sound effects & music
5. [ ] CRT/distortion shader (optional)

### Phase 8: Deployment
1. [ ] Build for web (`npm run build`)
2. [ ] Package for NW.js (desktop)
3. [ ] Package for Capacitor (mobile)
4. [ ] Test on all platforms

---

## Quick Start Template

```html
<!DOCTYPE html>
<html>
<head>
  <title>Hopeless Catch</title>
  <style>
    * { margin: 0; padding: 0; }
    canvas { display: block; background: #1a1a2e; }
  </style>
</head>
<body>
  <canvas id="game"></canvas>
  <script src="game.js"></script>
</body>
</html>
```

```javascript
// game.js - Basic game loop
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

const gameState = {
  screen: 'menu',
  player: { x: 100, y: 400 },
  fishingPhase: 'idle',
  // ... port from types/game.ts
};

function update(deltaTime) {
  // Update game logic
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Draw game
}

let lastTime = 0;
function gameLoop(timestamp) {
  const deltaTime = timestamp - lastTime;
  lastTime = timestamp;
  
  update(deltaTime);
  render();
  
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
```

---

## My Recommendation

**Start with: Phaser 3 + TypeScript**

Why:
- Built-in sprite animations, physics, input handling
- Huge community, tons of tutorials
- Easy to port your existing TypeScript code
- Works perfectly with NW.js and Capacitor
- Can export to mobile easily
- You can focus on game design, not engine code

```bash
npm create vite@latest hopeless-catch-game -- --template vanilla-ts
npm install phaser
```

This gives you the best balance of:
- Development speed
- Future flexibility (3D upgrade path via Phaser 3D or Three.js)
- Cross-platform deployment
- Performance for a metroidvania

---

## Files to Port First (Priority Order)

1. `src/types/game.ts` - Core types
2. `src/data/fishData.ts` - Fish definitions
3. `src/data/rooms/*.ts` - Room layouts
4. `src/components/game/Player.tsx` - Player logic
5. `src/components/game/FishingUI.tsx` - Fishing mechanics
6. `src/components/HopelessCatch.tsx` - Screen routing logic
