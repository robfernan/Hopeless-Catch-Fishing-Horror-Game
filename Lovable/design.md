# Design: Hopeless Catch - Metroidvania Horror Fishing

## Overview

Hopeless Catch is a metroidvania-style horror fishing game where exploration and fishing are intertwined. The player navigates interconnected rooms across three maps, discovering fishing spots, unlocking abilities through catches, and experiencing escalating horror as they venture deeper. The mystery of what lurks beneath the water drives both gameplay and narrative.

**Core Design Philosophy:**
- **Mystery over visibility** - Fish are never visible underwater; you only know what you caught after reeling it in
- **Progression through fishing** - Catching fish unlocks new areas and abilities, not combat
- **Escalating horror** - Deeper areas have more anomalies and disturbing catches
- **Atmospheric dread** - The horror is subtle, environmental, and psychological

**Tech Stack:** React + TypeScript + Tailwind + Canvas/SVG rendering
**Art Style:** Pixel art using Craftpix fishing asset pack
**Platforms:** Web (responsive), Desktop (NW.js wrapper)

## Architecture

### High-Level System Design

```
┌─────────────────────────────────────────────────────────────┐
│                    React Application                         │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────────┐  ┌──────────────────┐                 │
│  │  Game State      │  │  UI Components   │                 │
│  │  (Context/Zustand)│  │  (Tailwind)      │                 │
│  └──────────────────┘  └──────────────────┘                 │
│         │                       │                            │
│  ┌──────▼──────┐ ┌──────▼──────┐ ┌──────────────┐          │
│  │ Room System │ │ Renderer    │ │ Input Handler │          │
│  │ (Maps/Areas)│ │ (Canvas)    │ │ (KB/Touch)    │          │
│  └──────┬──────┘ └──────┬──────┘ └──────┬───────┘          │
│         │               │               │                    │
│  ┌──────▼───────────────▼───────────────▼──────┐           │
│  │  Game Engine                                 │           │
│  │  - Fishing State Machine                     │           │
│  │  - Player Physics (walk, jump, swim, climb)  │           │
│  │  - Progression System                        │           │
│  │  - Anomaly System                            │           │
│  └──────────────────────┬──────────────────────┘           │
│                         │                                    │
│  ┌──────────────────────▼──────────────────────┐           │
│  │  Persistent Storage (localStorage)          │           │
│  │  - Journal, Progression, Position, Settings │           │
│  └─────────────────────────────────────────────┘           │
└─────────────────────────────────────────────────────────────┘
```

## Map Design: The Horror Fishing World

### Lake Map (Tutorial/Beginner) - "Peaceful Waters"

The Lake is where players learn the basics. It feels safe... at first.

```
                    [Cabin]
                       │
    [Shallow Dock] ←──┼──→ [Deep Pool]
         │             │         │
         ↓             ↓         ↓
    [Lily Pads]   [Old Pier]  [Sunken Boat]
                       │
                       ↓
              [Underground Spring] (LOCKED - requires 5 catches)
```

**Rooms:**
1. **Shallow Dock** (Starting Room)
   - Safe, bright, tutorial area
   - Fish: Sunfish (common), Bass (uncommon)
   - Fishing spots: 2 (dock edge, shore)
   - Anomalies: None

2. **Cabin** (Rest/Save)
   - Rest to change time of day
   - Save game manually
   - No fishing

3. **Deep Pool**
   - Slightly darker water
   - Fish: Bass (common), Trout (uncommon), Catfish (rare)
   - Fishing spots: 3
   - Anomalies: Rare at night

4. **Lily Pads**
   - Requires swimming ability
   - Fish: Sunfish, Golden Carp (legendary)
   - Fishing spots: 2
   - Anomalies: None

5. **Old Pier**
   - Decaying structure, creepy atmosphere
   - Fish: Catfish (common), Trout (uncommon)
   - Fishing spots: 2
   - Anomalies: Occasional at night

6. **Sunken Boat**
   - Boat available for deeper casting
   - Fish: Trout, Catfish, Golden Carp
   - Fishing spots: 3 (2 from shore, 1 from boat)
   - Anomalies: Moderate at night

7. **Underground Spring** (LOCKED)
   - Unlock: Catch 5 fish total
   - Dark, eerie, dripping sounds
   - Fish: Catfish (common), Pale Crawler (night only)
   - Fishing spots: 2
   - Anomalies: Frequent at night

### Forest Map (Intermediate) - "The Murky Depths"

The Forest is where things get unsettling. The water is murky, visibility is low, and something feels wrong.

**Unlock Requirement:** Catch 10 fish in Lake OR catch 1 rare fish

```
    [Forest Entrance] ←──→ [Misty Shore]
           │                    │
           ↓                    ↓
    [Murky Pond]          [Fog Bank]
           │                    │
           ↓                    ↓
    [Submerged Ruins] ←──→ [The Hollow]
           │
           ↓
    [Drowned Chapel] (LOCKED - requires Night Vision)
```

**Rooms:**
1. **Forest Entrance**
   - Transition from Lake
   - Fish: Bass, Trout
   - Anomalies: Occasional

2. **Misty Shore**
   - Fog effects, reduced visibility
   - Fish: Catfish, Bleeding Carp (night)
   - Anomalies: Moderate

3. **Murky Pond**
   - Dark water, can't see bottom
   - Fish: Catfish, Golden Carp, Pale Crawler (night)
   - Boat available
   - Anomalies: Frequent at night

4. **Fog Bank**
   - Heavy fog, disorienting
   - Fish: Trout, Whispering Eel (night)
   - Anomalies: Constant subtle effects

5. **Submerged Ruins**
   - Ancient structures underwater
   - Fish: Golden Carp, Bleeding Carp (night), Whispering Eel (night)
   - Anomalies: Frequent

6. **The Hollow**
   - Dead trees, stagnant water
   - Fish: Pale Crawler (night), Whispering Eel (night)
   - Anomalies: Very frequent at night

7. **Drowned Chapel** (LOCKED)
   - Unlock: Night Vision ability
   - Submerged church, deeply unsettling
   - Fish: Fishman (night only, legendary horror)
   - Anomalies: Constant, intense

### Mountain Map (Advanced) - "The Abyss"

The Mountain is where the horror peaks. Cold, isolated, and something ancient lives in these waters.

**Unlock Requirement:** Catch 20 fish total OR catch 1 night creature

```
    [Mountain Pass] ←──→ [Frozen Lake]
           │                   │
           ↓                   ↓
    [Waterfall Cave]    [Ice Cavern]
           │                   │
           ↓                   ↓
    [Underground River] ←──→ [The Depths]
           │
           ↓
    [The Abyss] (LOCKED - requires all abilities)
```

**Rooms:**
1. **Mountain Pass**
   - Rocky terrain, rushing water
   - Fish: Trout (common), Bass
   - Anomalies: Rare

2. **Frozen Lake**
   - Ice fishing mechanic
   - Fish: Trout, Catfish, Golden Carp
   - Anomalies: Occasional

3. **Waterfall Cave**
   - Behind waterfall, hidden area
   - Fish: Catfish, Whispering Eel (night)
   - Anomalies: Moderate

4. **Ice Cavern**
   - Requires Swim ability
   - Fish: Golden Carp, Pale Crawler (night)
   - Anomalies: Frequent

5. **Underground River**
   - Dark, flowing water
   - Fish: Bleeding Carp (night), Whispering Eel (night)
   - Anomalies: Very frequent

6. **The Depths**
   - Deepest accessible area
   - Fish: All night creatures
   - Anomalies: Constant

7. **The Abyss** (LOCKED)
   - Unlock: All abilities (Deep Cast, Precision Cast, Night Vision, Swim)
   - Final area, maximum horror
   - Fish: Fishman (guaranteed at night), ???
   - Anomalies: Overwhelming, reality-breaking

## Components and Interfaces

### Core Game State

```typescript
interface GameState {
  // Player
  playerPosition: { x: number; y: number };
  playerVelocity: { x: number; y: number };
  playerState: 'idle' | 'walking' | 'jumping' | 'swimming' | 'climbing' | 'fishing' | 'rowing';
  facingDirection: 'left' | 'right';
  isInBoat: boolean;
  
  // Location
  currentMap: 'lake' | 'forest' | 'mountain';
  currentRoom: string;
  currentFishingSpot: FishingSpot | null;
  
  // Time
  currentHour: number; // 0-23
  isNight: boolean; // true if 20:00-06:00
  
  // Fishing
  fishingPhase: FishingPhase;
  tension: number;
  currentBait: BaitType;
  hookedFish: Fish | null;
  
  // Progression
  unlockedRooms: string[];
  unlockedAbilities: Ability[];
  unlockedBaits: BaitType[];
  totalCatches: number;
  
  // Journal
  catches: CatchEntry[];
  discoveredFish: string[];
  
  // Settings
  peacefulMode: boolean;
  settings: GameSettings;
}
```

### Room System

```typescript
interface Room {
  id: string;
  name: string;
  map: 'lake' | 'forest' | 'mountain';
  
  // Layout
  width: number;
  height: number;
  platforms: Platform[];
  waterAreas: WaterArea[];
  climbables: Climbable[];
  
  // Fishing
  fishingSpots: FishingSpot[];
  availableFish: FishAvailability[];
  hasBoat: boolean;
  boatPosition?: { x: number; y: number };
  
  // Transitions
  transitions: RoomTransition[];
  
  // Atmosphere
  ambientLight: number; // 0-1
  fogDensity: number; // 0-1
  anomalyFrequency: 'none' | 'rare' | 'occasional' | 'moderate' | 'frequent' | 'constant';
  
  // Unlock
  isLocked: boolean;
  unlockRequirement?: UnlockRequirement;
  
  // Visuals
  backgroundLayers: BackgroundLayer[];
  decorations: Decoration[];
}

interface FishingSpot {
  id: string;
  position: { x: number; y: number };
  waterDepth: 'shallow' | 'medium' | 'deep';
  requiresBoat: boolean;
  requiresAbility?: Ability;
}

interface RoomTransition {
  id: string;
  position: { x: number; y: number };
  targetRoom: string;
  targetPosition: { x: number; y: number };
  direction: 'left' | 'right' | 'up' | 'down';
}

interface UnlockRequirement {
  type: 'catches' | 'fish' | 'ability' | 'all_abilities';
  count?: number;
  fishId?: string;
  abilityId?: Ability;
}
```

### Fish Species Data

```typescript
interface Fish {
  id: string;
  name: string;
  image: string; // Path to sprite
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary';
  isNightOnly: boolean;
  isHorror: boolean;
  description: string;
  horrorDescription?: string; // Shown for horror fish
  
  // Fishing mechanics
  tensionPattern: 'steady' | 'erratic' | 'aggressive' | 'passive';
  difficulty: number; // 1-10
  
  // Bait attraction
  attractedByBait: BaitType[];
  baitMultiplier: Record<BaitType, number>; // Probability multiplier
}

// Day Fish (5 species)
const DAY_FISH: Fish[] = [
  {
    id: 'sunfish',
    name: 'Sunfish',
    image: '/assets/fish/sunfish.png',
    rarity: 'common',
    isNightOnly: false,
    isHorror: false,
    description: 'A cheerful golden fish that loves the sun.',
    tensionPattern: 'steady',
    difficulty: 2,
    attractedByBait: ['worms', 'corn'],
    baitMultiplier: { worms: 1.5, corn: 1.2, minnows: 0.5, cheese: 0.3 }
  },
  // ... Bass, Trout, Catfish, Golden Carp
];

// Night Creatures (4 species)
const NIGHT_CREATURES: Fish[] = [
  {
    id: 'pale_crawler',
    name: 'Pale Crawler',
    image: '/assets/fish/pale_crawler.png',
    rarity: 'uncommon',
    isNightOnly: true,
    isHorror: true,
    description: 'You shouldn\'t have caught this.',
    horrorDescription: 'Its pale flesh seems to glow. It has too many eyes.',
    tensionPattern: 'erratic',
    difficulty: 6,
    attractedByBait: ['worms', 'minnows'],
    baitMultiplier: { worms: 1.5, corn: 0.2, minnows: 1.3, cheese: 0.5 }
  },
  // ... Bleeding Carp, Whispering Eel, Fishman
];
```

### Ability System

```typescript
type Ability = 'deep_cast' | 'precision_cast' | 'night_vision' | 'swim';

interface AbilityDefinition {
  id: Ability;
  name: string;
  description: string;
  unlockRequirement: {
    type: 'catches' | 'fish' | 'night_creature';
    count?: number;
    fishId?: string;
  };
  effect: string;
}

const ABILITIES: AbilityDefinition[] = [
  {
    id: 'deep_cast',
    name: 'Deep Cast',
    description: 'Cast your line into deeper waters.',
    unlockRequirement: { type: 'catches', count: 10 },
    effect: 'Access deep water fishing spots'
  },
  {
    id: 'precision_cast',
    name: 'Precision Cast',
    description: 'Target specific fish species.',
    unlockRequirement: { type: 'fish', fishId: 'golden_carp' },
    effect: 'Increase chance of catching targeted species'
  },
  {
    id: 'night_vision',
    name: 'Night Vision',
    description: 'See clearly in darkness and through anomalies.',
    unlockRequirement: { type: 'night_creature', count: 3 },
    effect: 'Reduced anomaly effects, access to dark areas'
  },
  {
    id: 'swim',
    name: 'Swim',
    description: 'Dive into the water to reach hidden spots.',
    unlockRequirement: { type: 'catches', count: 25 },
    effect: 'Access underwater areas and fishing spots'
  }
];
```

### Anomaly System

```typescript
interface Anomaly {
  id: string;
  type: 'visual' | 'audio' | 'physics' | 'reality';
  intensity: number; // 0-1
  duration: number; // milliseconds
}

interface AnomalyEffect {
  // Visual
  screenFlicker?: boolean;
  colorShift?: { hue: number; saturation: number };
  distortion?: { type: 'wave' | 'static' | 'tear'; intensity: number };
  shadowFigure?: { position: { x: number; y: number }; duration: number };
  
  // Audio
  whispers?: boolean;
  breathing?: boolean;
  splash?: boolean;
  wrongSound?: string; // Play unexpected sound
  
  // Physics
  bobberTwitch?: boolean;
  lineWobble?: boolean;
  gravityShift?: number;
  
  // Reality (severe)
  roomGlitch?: boolean; // Brief flash of wrong room
  fishGlitch?: boolean; // Caught fish briefly shows as something else
  textCorruption?: boolean; // UI text briefly corrupts
}

// Anomaly frequency by room type
const ANOMALY_CHANCE: Record<string, number> = {
  'none': 0,
  'rare': 0.05,        // 5% per minute
  'occasional': 0.15,  // 15% per minute
  'moderate': 0.30,    // 30% per minute
  'frequent': 0.50,    // 50% per minute
  'constant': 0.80     // 80% per minute
};
```

### Player Physics

```typescript
interface PlayerPhysics {
  // Movement
  walkSpeed: number;
  jumpForce: number;
  gravity: number;
  swimSpeed: number;
  climbSpeed: number;
  
  // State
  isGrounded: boolean;
  isInWater: boolean;
  isOnClimbable: boolean;
  canJump: boolean;
  canSwim: boolean; // Requires swim ability
}

// Movement constants
const PHYSICS = {
  walkSpeed: 150, // pixels per second
  jumpForce: 300,
  gravity: 600,
  swimSpeed: 100,
  climbSpeed: 80,
  terminalVelocity: 400
};
```

### Fishing State Machine

```
IDLE (player can move)
  ↓ (Player at fishing spot, presses Cast)
CASTING (animation plays)
  ↓ (Line extends into water)
WAITING (bobber in water, player locked)
  ↓ (Fish attracted - random time based on bait/location)
TENSION (bobber shows activity)
  ↓ (Player presses Hook within window)
HOOKING (hook animation)
  ↓ (Success)
REELING (manage tension bar)
  ↓ (Tension stays in green zone)
CAUGHT (fish revealed, added to journal)
  ↓ (Return to IDLE)

Alternative paths:
- TENSION → ESCAPED (player misses hook window)
- REELING → ESCAPED (tension goes to red zone)
- Any state → IDLE (player cancels)
```

### Sprite Animation System

```typescript
interface SpriteAnimation {
  spriteSheet: string;
  frameWidth: number;
  frameHeight: number;
  frameCount: number;
  frameDuration: number; // ms per frame
  loop: boolean;
}

// Fisherman animations from Craftpix pack
const PLAYER_ANIMATIONS: Record<string, SpriteAnimation> = {
  idle: {
    spriteSheet: '/assets/FromCraftpixFishingPack/1 Fisherman/Fisherman_idle.png',
    frameWidth: 48,
    frameHeight: 48,
    frameCount: 4,
    frameDuration: 200,
    loop: true
  },
  walk: {
    spriteSheet: '/assets/FromCraftpixFishingPack/1 Fisherman/Fisherman_walk.png',
    frameWidth: 48,
    frameHeight: 48,
    frameCount: 6,
    frameDuration: 100,
    loop: true
  },
  fish: {
    spriteSheet: '/assets/FromCraftpixFishingPack/1 Fisherman/Fisherman_fish.png',
    frameWidth: 48,
    frameHeight: 48,
    frameCount: 4,
    frameDuration: 150,
    loop: true
  },
  hook: {
    spriteSheet: '/assets/FromCraftpixFishingPack/1 Fisherman/Fisherman_hook.png',
    frameWidth: 48,
    frameHeight: 48,
    frameCount: 6,
    frameDuration: 100,
    loop: false
  },
  row: {
    spriteSheet: '/assets/FromCraftpixFishingPack/1 Fisherman/Fisherman_row.png',
    frameWidth: 48,
    frameHeight: 48,
    frameCount: 4,
    frameDuration: 200,
    loop: true
  },
  hurt: {
    spriteSheet: '/assets/FromCraftpixFishingPack/1 Fisherman/Fisherman_hurt.png',
    frameWidth: 48,
    frameHeight: 48,
    frameCount: 2,
    frameDuration: 200,
    loop: false
  }
};
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do.*

### Property 1: State Persistence Round Trip
*For any* game state including journal entries, unlocked rooms, unlocked abilities, player position, and settings, if the player saves and reloads the game, all data should be preserved exactly as it was before saving.

**Validates: Requirements 4.5, 9.7, 10.4, 11.5, 13.4**

### Property 2: Fish Availability by Time and Mode
*For any* room, time state, and Peaceful Mode setting: if it is daytime, only day fish species should be available; if it is nighttime and Peaceful Mode is disabled, night creatures should also be available; if Peaceful Mode is enabled, only day fish should be available regardless of time.

**Validates: Requirements 5.3, 5.4, 11.1**

### Property 3: Fishing State Machine Transitions
*For any* sequence of fishing actions, the game should transition through valid states only (IDLE → CASTING → WAITING → TENSION → HOOKING → REELING → CAUGHT/ESCAPED → IDLE) and not allow invalid state transitions.

**Validates: Requirements 1.4, 1.5, 1.6**

### Property 4: Player Movement Boundaries
*For any* room and player position, the player should not be able to move beyond room boundaries, should remain grounded when on platforms, and should not fall through solid surfaces.

**Validates: Requirements 2.2, 2.7**

### Property 5: Room Transition Consistency
*For any* room transition, when the player moves through a transition point, they should appear in the target room at the specified target position, and the room state should be correctly loaded.

**Validates: Requirements 2.3, 3.6**

### Property 6: Progression Unlock Logic
*For any* unlock requirement (catches, specific fish, or ability), when the player meets the requirement, the associated room or ability should become unlocked and remain unlocked.

**Validates: Requirements 4.2, 4.3, 9.2**

### Property 7: Bait Effectiveness on Fish Species
*For any* bait type and fish species, if the bait is in the fish's attracted bait list, the probability multiplier should be greater than 1.0, increasing the chance of catching that fish.

**Validates: Requirements 7.3**

### Property 8: Journal Statistics Accuracy
*For any* sequence of catches, the journal statistics (total catches, species count, rooms discovered, favorite location) should accurately reflect the actual catches and exploration recorded.

**Validates: Requirements 10.3**

### Property 9: Anomaly Triggering Conditions
*For any* game state, anomalies should only trigger when: it is nighttime AND Peaceful Mode is disabled AND the current room has non-zero anomaly frequency. Anomalies should never trigger during day or in Peaceful Mode.

**Validates: Requirements 11.2, 12.1**

### Property 10: Bobber Position Validity
*For any* cast action at a valid fishing spot, the bobber should be positioned within the water area of the current room, at a depth appropriate for the fishing spot type.

**Validates: Requirements 1.1, 1.2**

### Property 11: Discovered Rooms Tracking
*For any* room the player enters, that room should be added to the discovered rooms list and remain there permanently.

**Validates: Requirements 3.4**

### Property 12: Locked Room Access Prevention
*For any* locked room, the player should not be able to enter it until the unlock requirement is met, regardless of how they attempt to access it.

**Validates: Requirements 4.1**

## Error Handling

### Room System Errors
- **Missing Room Data:** If a room fails to load, show error and return player to last valid room
- **Invalid Transition:** If transition target doesn't exist, log error and block transition
- **Corrupted Room State:** Reset room to default state if data is corrupted

### Fishing Mechanic Errors
- **Invalid State Transition:** Ignore invalid fishing actions (e.g., hook when not in tension)
- **Missing Fish Data:** Use fallback fish if species data is missing
- **Bobber Out of Bounds:** Recalculate bobber position to stay in water

### Persistence Errors
- **Corrupted Save:** Attempt to load backup, or reset to new game with warning
- **Storage Full:** Warn player and continue without saving
- **Invalid Data:** Validate all loaded data, use defaults for invalid fields

### Physics Errors
- **Player Stuck:** Detect stuck state and teleport to nearest valid position
- **Infinite Fall:** Cap fall distance and reset to ground level
- **Collision Failure:** Use simple boundary check as fallback

## Testing Strategy

### Unit Testing Approach
- Test room transition logic
- Test fishing state machine transitions
- Test progression unlock calculations
- Test fish availability filtering
- Test bait probability calculations
- Test player physics (grounding, boundaries)
- Test persistence save/load

### Property-Based Testing Approach
- **Property 1:** Generate random game states, save, reload, verify equality
- **Property 2:** Generate random time/mode combinations, verify correct fish pools
- **Property 3:** Generate random fishing action sequences, verify valid transitions only
- **Property 4:** Generate random player positions, verify boundaries enforced
- **Property 5:** Generate random transitions, verify correct room loading
- **Property 6:** Generate random catch sequences, verify unlocks trigger correctly
- **Property 7:** Generate random bait/fish combinations, verify probability multipliers
- **Property 8:** Generate random catch sequences, verify statistics accuracy
- **Property 9:** Generate random time/mode/room combinations, verify anomaly conditions
- **Property 10:** Generate random casts, verify bobber in water
- **Property 11:** Generate random room visits, verify discovery tracking
- **Property 12:** Generate random access attempts to locked rooms, verify blocking

### Test Configuration
- Minimum 100 iterations per property test
- Use fast-check for property-based testing
- Tag each test with feature name and property number
- Unit tests for edge cases and specific examples

## Implementation Notes

### Rendering Approach
- Use HTML Canvas for game world rendering
- Use React components for UI overlay
- Implement sprite animation system for Craftpix assets
- Use requestAnimationFrame for smooth 60 FPS

### Performance Considerations
- Only render visible room (no off-screen rooms)
- Cache sprite sheets after first load
- Debounce input handling
- Use React.memo for UI components

### Horror Atmosphere Tips
- Subtle is scarier than obvious
- Audio cues before visual anomalies
- Rare events are more impactful
- Let player's imagination fill in gaps
- Horror fish descriptions should be unsettling, not gory
