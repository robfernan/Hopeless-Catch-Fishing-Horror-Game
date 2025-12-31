# Design Document

## Overview

This design document describes the architecture and implementation approach for porting UI components, data structures, and game logic from the Lovable (React/TypeScript) version to the HTML_CSS_JS (vanilla Canvas) version of Hopeless Catch. The goal is feature parity with identical fish data, bait system, room definitions, and UI overlays.

The HTML_CSS_JS version uses a Canvas-based rendering approach with a scene manager architecture. This design leverages the existing infrastructure while adding the missing data structures and UI components from the Lovable version.

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    HTML_CSS_JS Architecture                      │
├─────────────────────────────────────────────────────────────────┤
│  Entry Point: index.html + main.js                              │
│  ├── SceneManager (screen routing)                              │
│  ├── GameState (central state management)                       │
│  └── UIManager (overlay rendering)                              │
├─────────────────────────────────────────────────────────────────┤
│  Data Layer                                                      │
│  ├── fishData.js (9 fish species with full properties)          │
│  ├── baitData.js (4 bait types)                                 │
│  └── roomData.js (room definitions with fish mappings)          │
├─────────────────────────────────────────────────────────────────┤
│  UI Components (Canvas-rendered overlays)                        │
│  ├── MainMenu (title screen)                                    │
│  ├── TackleBox (bait selection modal)                           │
│  ├── JournalPanel (catch log modal)                             │
│  ├── FishingUI (tension meter, phase labels)                    │
│  ├── CatchDisplay (fish caught popup)                           │
│  └── GameHUD (location, time, bait, catches)                    │
├─────────────────────────────────────────────────────────────────┤
│  Scenes                                                          │
│  ├── menuScene.js (main menu)                                   │
│  ├── gameScene.js (gameplay)                                    │
│  ├── lakeScene.js, forestScene.js, mountainScene.js             │
│  └── settingsScene.js, aboutScene.js                            │
└─────────────────────────────────────────────────────────────────┘
```

## Components and Interfaces

### Fish Data Module (fishData.js)

The fish data module must be enhanced to match the Lovable version's structure:

```javascript
// Fish object structure
{
  id: string,           // Unique identifier (e.g., 'sunfish')
  name: string,         // Display name
  image: string,        // Asset path
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary',
  isNightOnly: boolean,
  isHorror: boolean,
  description: string,
  horrorDescription: string | null,
  tensionPattern: 'steady' | 'erratic' | 'aggressive' | 'passive',
  difficulty: number,   // 1-10
  attractedByBait: string[],
  baitMultiplier: { worms: number, corn: number, minnows: number, cheese: number }
}

// Required functions
getDayFish(): Fish[]
getNightFish(): Fish[]
getAvailableFish(timeOfDay, peacefulMode): Fish[]
getRoomFish(roomId, timeOfDay, peacefulMode): Fish[]
```

### Bait Data Module (baitData.js)

```javascript
// Bait object structure
{
  type: 'worms' | 'minnows' | 'cheese' | 'corn',
  name: string,
  image: string,
  description: string
}

// Required functions
getBaitByType(type): BaitInfo
getAllBaits(): BaitInfo[]
```

### Room Data Module (roomData.js)

```javascript
// Room object structure
{
  id: string,
  name: string,
  map: 'lake' | 'forest' | 'mountain',
  width: number,
  height: number,
  platforms: Platform[],
  waterAreas: WaterArea[],
  fishingSpots: FishingSpot[],
  transitions: Transition[],
  playerSpawn: { x: number, y: number },
  ambientLight: number,
  fogDensity: number,
  anomalyFrequency: 'rare' | 'common' | 'frequent',
  isLocked: boolean
}

// Room-to-fish mapping
const ROOM_FISH_MAP = {
  lake_shallow_dock: ['sunfish', 'bass'],
  lake_deep_pool: ['bass', 'trout', 'catfish'],
  lake_lily_pads: ['sunfish', 'golden_carp'],
  // ... etc
}
```

### UI Manager Enhancement (uimanager.js)

The UIManager needs methods for rendering each overlay:

```javascript
class UIManager {
  // Overlay state
  activeOverlay: null | 'tacklebox' | 'journal' | 'catch' | 'pause'
  
  // Render methods
  renderMainMenu(ctx, state)
  renderTackleBox(ctx, state, onSelect, onClose)
  renderJournalPanel(ctx, catches, onClose)
  renderFishingUI(ctx, phase, tension)
  renderCatchDisplay(ctx, fish, onDismiss)
  renderGameHUD(ctx, state)
  
  // Input handling
  handleOverlayClick(x, y, overlay)
}
```

### Main Menu Component

Canvas-rendered menu with:
- Title "HOPELESS" in golden color with shadow
- Subtitle "CATCH" in orange/brown
- Tagline text
- Vertical button layout: Play, Settings, About, Quit
- Animated water reflection background
- Floating light orb animations

### Tackle Box Component

Modal overlay with:
- Semi-transparent backdrop
- Title "TACKLE BOX"
- 2x2 grid of bait options
- Each option shows: image, name, "EQUIPPED" label if selected
- Highlighted border on selected bait
- Close button

### Journal Panel Component

Modal overlay with:
- Title "FISHING JOURNAL"
- Today's catch count
- Scrollable list of catches grouped by fish type
- Each entry: fish image, name, count, description, rarity badge
- Horror fish get red border/glow styling
- Stats footer: Total, Rare, Horror counts
- Close button

### Fishing UI Component

Bottom-center panel with:
- Phase label text (8 phases)
- Tension meter (colored bar: green/yellow/red)
- Tension percentage and advice text
- Animated bobber during wait/bite phases
- Action buttons based on phase

### Catch Display Component

Centered modal with:
- "You caught a" header
- Fish name (horror fish in red)
- Large fish image with float animation
- Rarity badge
- Description text
- Continue button

### Game HUD Component

Screen overlay with:
- Top-left: Location name, time indicator, map button
- Top-right: Catch counter
- Right side: Time toggle, peaceful mode toggle
- Bottom-left: Current bait display
- Bottom-right: Journal button
- Bottom-center: Controls hint text

## Data Models

### GameState Enhancement

```javascript
const GameState = {
  // Screen routing
  screen: 'menu' | 'game' | 'settings' | 'about',
  isPaused: boolean,
  
  // Player
  playerPosition: { x, y },
  playerState: 'idle' | 'walking' | 'fishing',
  facingDirection: 'left' | 'right',
  
  // Location
  currentMap: 'lake' | 'forest' | 'mountain',
  currentRoom: string,
  
  // Time
  timeOfDay: 'day' | 'night',
  
  // Fishing
  fishingPhase: 'idle' | 'cast' | 'wait' | 'bite' | 'hook' | 'reel' | 'catch' | 'fail',
  tension: number,
  currentBait: 'worms' | 'minnows' | 'cheese' | 'corn',
  
  // Journal
  catches: CatchRecord[],
  
  // Settings
  peacefulMode: boolean,
  settings: { musicVolume, sfxVolume, graphicsQuality }
}
```

### CatchRecord Structure

```javascript
{
  id: string,
  fish: Fish,
  time: 'day' | 'night',
  location: string,
  roomId: string,
  roomName: string,
  baitUsed: string,
  timestamp: Date
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*



### Property 1: Fish Data Completeness

*For any* fish in the fishData array, the fish object SHALL contain all required properties: id, name, image, rarity, isNightOnly, isHorror, description, tensionPattern, difficulty, attractedByBait, and baitMultiplier.

**Validates: Requirements 1.2**

### Property 2: Day/Night Fish Filtering

*For any* call to getAvailableFish(timeOfDay, peacefulMode):
- When peacefulMode is true, all returned fish SHALL have isNightOnly === false
- When timeOfDay is 'day' and peacefulMode is false, all returned fish SHALL have isNightOnly === false
- When timeOfDay is 'night' and peacefulMode is false, the returned fish SHALL include both day fish and night fish

**Validates: Requirements 1.3, 1.4, 1.5**

### Property 3: Room Fish Filtering

*For any* call to getRoomFish(roomId, timeOfDay, peacefulMode), all returned fish SHALL be:
1. Present in the room's fish mapping (ROOM_FISH_MAP[roomId])
2. Available for the given timeOfDay and peacefulMode (as per getAvailableFish)

**Validates: Requirements 1.6, 3.4**

### Property 4: Bait Data Completeness

*For any* bait in the baitData array, the bait object SHALL contain all required properties: type, name, image, and description.

**Validates: Requirements 2.2**

### Property 5: Bait Lookup Round-Trip

*For any* valid bait type in ['worms', 'minnows', 'cheese', 'corn'], calling getBaitByType(type) SHALL return a bait object where bait.type === type.

**Validates: Requirements 2.3**

### Property 6: Room Data Completeness

*For any* room in the room registry, the room object SHALL contain all required properties: id, name, map, width, height, platforms, waterAreas, fishingSpots, transitions, playerSpawn, ambientLight, fogDensity, anomalyFrequency, and isLocked.

**Validates: Requirements 3.3**

### Property 7: Journal Grouping Correctness

*For any* array of CatchRecord objects, grouping by fish.id SHALL produce groups where:
1. Each group's count equals the number of catches with that fish.id
2. The sum of all group counts equals the total number of catches

**Validates: Requirements 6.4, 6.5**

### Property 8: Tension Meter Coloring

*For any* tension value (0-100):
- tension < 40 SHALL produce 'green' color
- 40 <= tension < 70 SHALL produce 'yellow' color
- tension >= 70 SHALL produce 'red' color

**Validates: Requirements 7.4**

## Error Handling

### Data Loading Errors
- If fish data fails to load, display error message and disable fishing
- If bait data fails to load, default to 'worms' bait
- If room data fails to load, use fallback room definition

### Invalid State Handling
- If currentBait is invalid, reset to 'worms'
- If currentRoom is invalid, reset to starting room for current map
- If fishingPhase is invalid, reset to 'idle'

### UI Error Handling
- If overlay fails to render, close overlay and log error
- If fish image fails to load, display placeholder
- If catch record is malformed, skip display but log error

### Keyboard Input Handling
- Ignore keyboard input when text input is focused
- Debounce rapid key presses (100ms minimum between actions)
- Handle modifier keys (Shift, Ctrl) gracefully

## Testing Strategy

### Unit Tests
Unit tests verify specific examples and edge cases:

1. **Fish Data Tests**
   - Verify exactly 9 fish species exist
   - Verify specific fish (sunfish, fishman) have correct properties
   - Test edge case: empty room fish mapping

2. **Bait Data Tests**
   - Verify exactly 4 bait types exist
   - Test getBaitByType with invalid type returns undefined

3. **Room Data Tests**
   - Verify lake has 3 rooms, mountain has 7 rooms
   - Test room transitions are bidirectional

4. **UI Component Tests**
   - Test tension meter at boundary values (0, 39, 40, 69, 70, 100)
   - Test journal with empty catches array
   - Test catch display with horror vs non-horror fish

### Property-Based Tests
Property-based tests verify universal properties across generated inputs:

1. **Fish Filtering Properties** (100+ iterations)
   - Generate random timeOfDay and peacefulMode combinations
   - Verify getAvailableFish returns correct fish subset

2. **Room Fish Properties** (100+ iterations)
   - Generate random room IDs from valid rooms
   - Verify getRoomFish returns intersection of room fish and available fish

3. **Journal Grouping Properties** (100+ iterations)
   - Generate random arrays of CatchRecord objects
   - Verify grouping produces correct counts

4. **Tension Coloring Properties** (100+ iterations)
   - Generate random tension values 0-100
   - Verify color matches threshold rules

### Testing Framework
- Use Jest or Vitest for JavaScript testing
- Use fast-check for property-based testing
- Minimum 100 iterations per property test
- Tag format: **Feature: html-css-js-enhancement, Property N: [property text]**

### Test File Structure
```
HTML_CSS_JS/
├── src/
│   └── fishing/
│       ├── fishdata.js
│       ├── fishdata.test.js
│       ├── baitdata.js
│       └── baitdata.test.js
├── tests/
│   ├── properties/
│   │   ├── fishFiltering.property.test.js
│   │   ├── roomFish.property.test.js
│   │   └── journalGrouping.property.test.js
│   └── unit/
│       ├── fishdata.test.js
│       ├── baitdata.test.js
│       └── uimanager.test.js
```
