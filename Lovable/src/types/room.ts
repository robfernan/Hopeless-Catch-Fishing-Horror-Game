// Room system types for metroidvania structure

export type MapId = 'lake' | 'forest' | 'mountain';
export type AnomalyFrequency = 'none' | 'rare' | 'occasional' | 'moderate' | 'frequent' | 'constant';
export type WaterDepth = 'shallow' | 'medium' | 'deep';
export type TransitionDirection = 'left' | 'right' | 'up' | 'down';

export interface Position {
  x: number;
  y: number;
}

export interface Bounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Platform {
  id: string;
  bounds: Bounds;
  type: 'solid' | 'one-way'; // one-way allows jumping through from below
  texture?: string;
}

export interface WaterArea {
  id: string;
  bounds: Bounds;
  depth: WaterDepth;
  canSwim: boolean; // requires swim ability if true for deep areas
}

export interface Climbable {
  id: string;
  bounds: Bounds;
  type: 'vine' | 'rope' | 'ladder';
}

export interface FishingSpot {
  id: string;
  position: Position;
  waterDepth: WaterDepth;
  requiresBoat: boolean;
  requiresAbility?: string; // ability id required to use this spot
  availableFish: string[]; // fish ids that can be caught here
}


export interface RoomTransition {
  id: string;
  bounds: Bounds; // trigger area
  targetRoom: string; // room id to transition to
  targetPosition: Position; // where player spawns in target room
  direction: TransitionDirection;
  isLocked: boolean;
  unlockRequirement?: UnlockRequirement;
}

export interface UnlockRequirement {
  type: 'catches' | 'fish' | 'ability' | 'all_abilities';
  count?: number; // for 'catches' type
  fishId?: string; // for 'fish' type
  abilityId?: string; // for 'ability' type
}

export interface Decoration {
  id: string;
  position: Position;
  sprite: string;
  layer: 'background' | 'foreground';
}

export interface BackgroundLayer {
  sprite: string;
  parallax: number; // 0 = static, 1 = moves with camera
  position: Position;
}

export interface BoatSpawn {
  position: Position;
  sprite: string;
}

export interface Room {
  id: string;
  name: string;
  map: MapId;
  
  // Layout dimensions
  width: number;
  height: number;
  
  // Collision and interaction
  platforms: Platform[];
  waterAreas: WaterArea[];
  climbables: Climbable[];
  
  // Fishing
  fishingSpots: FishingSpot[];
  hasBoat: boolean;
  boatSpawn?: BoatSpawn;
  
  // Navigation
  transitions: RoomTransition[];
  playerSpawn: Position; // default spawn when entering map
  
  // Atmosphere
  ambientLight: number; // 0-1, affects day/night rendering
  fogDensity: number; // 0-1
  anomalyFrequency: AnomalyFrequency;
  
  // Unlock
  isLocked: boolean;
  unlockRequirement?: UnlockRequirement;
  
  // Visuals
  backgroundLayers: BackgroundLayer[];
  decorations: Decoration[];
  
  // Audio
  ambientSound?: string;
}

// Helper type for room registry
export type RoomRegistry = Record<string, Room>;
