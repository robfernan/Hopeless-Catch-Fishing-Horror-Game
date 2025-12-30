# Hopeless Catch - Implementation Checklist

## Current Status: 72% Complete → Focus on Scene Manager & Locations

You have a solid foundation. Now we're building the scene manager for 3 unique locations.

---

## 🔴 CRITICAL FIXES (2-3 hours) - DO FIRST

### 1. Fix Peaceful Mode ✅
### 2. Fix Bait System ✅
### 3. Increase Anomaly Frequency ✅
### 4. Fix Audio References ✅
(Skip audio until game is done)

---

## 🟡 HIGH PRIORITY: SCENE MANAGER & LOCATIONS (8-12 hours)

### 5. Create Scene Manager System ✅
**Status**: DONE
**What's needed**:
- [x] Scene base class with init/update/draw methods
- [x] Scene state management (menu, game, location)
- [x] Location switching with smooth transitions
- [x] Scene-specific rendering and logic

**Files created**: 
- `src/scenemanager.js` - Main scene controller
- `src/scenes/baseScene.js` - Abstract base class
- `src/scenes/menuScene.js` - Menu wrapper
- `src/scenes/gameScene.js` - Game wrapper
- `src/scenes/lakeScene.js` - Lake location
- `src/scenes/forestScene.js` - Forest location
- `src/scenes/mountainScene.js` - Mountain location

### 6. Implement 3 Unique Locations ✅
Each location needs:
- [x] Unique terrain/background rendering
- [x] Different fish pools (via existing FishingController)
- [x] Different visual atmosphere
- [x] Location-specific structures/elements

**Locations**:

#### Location 1: Starting Lake (Peaceful) ✅
- Calm water, dock, cabin
- 5 day fish (Sunfish, Bass, Trout, Catfish, Golden Carp)
- 4 night creatures (Pale Crawler, Bleeding Carp, Whispering Eel, Fishman)
- Peaceful atmosphere, mountains in background
- **Files**: `src/scenes/lakeScene.js` ✅

#### Location 2: Deep Forest Pond (Mysterious) ✅
- Dense forest, murky water, old wooden bridge
- Different fish pool (forest-specific species)
- Eerie atmosphere, fog effects
- Gnarled trees, mysterious structures
- **Files**: `src/scenes/forestScene.js` ✅

#### Location 3: Mountain Stream (Challenging) ✅
- Rocky terrain, flowing water, cliffs
- Rare fish species
- Harsh atmosphere, wind effects
- Waterfalls, boulders, narrow paths
- **Files**: `src/scenes/mountainScene.js` ✅

### 7. Implement Location Switching
**Status**: In Progress
**What's needed**:
- [x] Scene switching infrastructure (SceneManager)
- [ ] Location selection UI
- [ ] Travel between locations
- [ ] Unlock progression (Forest at 5 unique fish, Mountain at 3 lore entries)
- [ ] Save current location

**Files to modify**: `gamestate.js`, `uimanager.js`

---

## 🟢 MEDIUM PRIORITY (After Scene Manager)

### 8. Enhance Fishing Difficulty Scaling
- Difficulty affects bite frequency
- Difficulty affects reel speed requirements
- Visual feedback for difficulty

### 9. Implement Legendary Fish Events
- Special event when legendary fish bites
- Screen effects/anomalies
- Unlocks endgame content

### 10. Implement Lore Discovery System
- Lore entries unlock as you catch fish
- Lore display in journal
- Lore-based location unlocks

### 11. Implement Gear Upgrade System
- Upgrade shop UI
- Currency system (earnings from catches)
- Rod/reel/tackle upgrades with mechanical effects

---

## 📋 SCENE MANAGER ARCHITECTURE

```
SceneManager (main controller)
├── BaseScene (abstract base class)
│   ├── init()
│   ├── update(dt)
│   ├── draw()
│   ├── onEnter()
│   └── onExit()
├── MenuScene (main menu)
├── GameScene (game wrapper)
│   ├── LakeScene (location 1)
│   ├── ForestScene (location 2)
│   └── MountainScene (location 3)
└── PauseScene (pause overlay)
```

---

## 🎨 LOCATION DESIGN REFERENCE (From Love2D)

### Lake (Starting Location)
- Mountains in background (layered parallax)
- Calm water with gentle ripples
- Wooden dock extending into water
- Cabin with chimney smoke
- Trees along shoreline
- Peaceful day/eerie night atmosphere

### Forest Pond (New)
- Dense forest with gnarled trees
- Murky, darker water
- Old wooden bridge instead of dock
- Fog/mist effects
- Mysterious structures (abandoned items)
- Eerie atmosphere, more anomalies

### Mountain Stream (New)
- Rocky terrain with cliffs
- Flowing water with current effects
- Narrow paths, boulders
- Waterfalls in background
- Harsh wind effects
- Challenging atmosphere, rare fish

---

## 📊 EFFORT ESTIMATES

| Task | Difficulty | Time | Priority |
|------|-----------|------|----------|
| Scene Manager | Medium | 2-3 hours | 🟡 High |
| Lake Scene | Easy | 1-2 hours | 🟡 High |
| Forest Scene | Medium | 2-3 hours | 🟡 High |
| Mountain Scene | Medium | 2-3 hours | 🟡 High |
| Location Switching | Medium | 2-3 hours | 🟡 High |
| Fishing Difficulty | Medium | 2-3 hours | 🟢 Medium |
| Legendary Events | Medium | 2-3 hours | 🟢 Medium |
| Lore System | Medium | 2-3 hours | 🟢 Medium |
| Gear Upgrades | Medium | 3-4 hours | 🟢 Medium |

**Total for Scene Manager**: 12-18 hours
**Total for Full Game**: 30-40 hours

---

## 🚀 RECOMMENDED PRIORITY ORDER

### Phase 1: Scene Manager (3-4 hours)
1. Create SceneManager
2. Create BaseScene
3. Create MenuScene wrapper
4. Create GameScene wrapper

### Phase 2: Locations (8-10 hours)
5. Implement LakeScene (refactor existing world)
6. Implement ForestScene (new)
7. Implement MountainScene (new)
8. Implement location switching

### Phase 3: Polish (5-8 hours)
9. Enhance fishing difficulty
10. Legendary fish events
11. Lore discovery
12. Gear upgrades

---

## 💡 USING LOVE2D ASSETS

The Love2D version has reference code for:
- **Terrain rendering** (`terrainrenderer.lua`) - Use for location visuals
- **Structures** (`structures.lua`) - Dock, cabin, house designs
- **Vegetation** (`vegetation.lua`) - Trees, bushes, plants
- **Sky renderer** (`skyrenderer.lua`) - Sun, moon, stars
- **World controller** (`worldcontroller.lua`) - World bounds and helpers

**Strategy**: Port the rendering logic from Love2D Lua to JavaScript canvas drawing.

---

## ✅ WHAT'S ALREADY DONE

- Fishing mechanics (casting, biting, reeling)
- Day/night cycle
- Weather system
- 9 fish species
- Journal and statistics
- Pause/menu system
- Save system

---

## ❌ WHAT'S MISSING

- Scene manager
- Multiple locations
- Location switching
- Unique location visuals
- Lore integration
- Gear upgrades
- Legendary fish events

---

## 📝 NEXT STEP

Start with Scene Manager. This is the foundation for everything else.

1. Create `src/scenemanager.js`
2. Create `src/scenes/baseScene.js`
3. Refactor existing code into LakeScene
4. Test scene transitions

Then build the other locations on top of this foundation.

---

**Key Insight**: The scene manager is the key to making location switching clean and maintainable. Once it's done, adding new locations is straightforward.

