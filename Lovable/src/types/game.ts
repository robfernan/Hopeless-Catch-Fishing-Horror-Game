import { AbilityId } from './progression';
import { MapId } from './room';

export type GameScreen = 'menu' | 'game' | 'settings' | 'about' | 'journal' | 'map';
export type Location = MapId;
export type TimeOfDay = 'day' | 'night';
export type FishingPhase = 'idle' | 'casting' | 'waiting' | 'tension' | 'hooking' | 'reeling' | 'caught' | 'escaped';
export type BaitType = 'cheese' | 'corn' | 'minnows' | 'worms';
export type PlayerState = 'idle' | 'walking' | 'jumping' | 'falling' | 'swimming' | 'climbing' | 'fishing' | 'rowing';
export type FacingDirection = 'left' | 'right';
export type TensionPattern = 'steady' | 'erratic' | 'aggressive' | 'passive';

export interface Fish {
  id: string;
  name: string;
  image: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary';
  isNightOnly: boolean;
  isHorror: boolean;
  description: string;
  horrorDescription?: string;
  tensionPattern: TensionPattern;
  difficulty: number; // 1-10
  attractedByBait: BaitType[];
  baitMultiplier: Record<BaitType, number>;
}

export interface CatchRecord {
  id: string;
  fish: Fish;
  time: TimeOfDay;
  location: Location;
  roomId: string;
  roomName: string;
  baitUsed: BaitType;
  timestamp: Date;
}

export interface Vector2 {
  x: number;
  y: number;
}

export interface GameState {
  // Screen
  screen: GameScreen;
  isPaused: boolean;
  
  // Player position and physics
  playerPosition: Vector2;
  playerVelocity: Vector2;
  playerState: PlayerState;
  facingDirection: FacingDirection;
  isGrounded: boolean;
  isInWater: boolean;
  isOnClimbable: boolean;
  isInBoat: boolean;
  
  // Location
  currentMap: MapId;
  currentRoom: string;
  currentFishingSpot: string | null;
  
  // Time
  currentHour: number; // 0-23
  timeOfDay: TimeOfDay;
  
  // Fishing
  fishingPhase: FishingPhase;
  tension: number;
  currentBait: BaitType;
  hookedFish: Fish | null;
  
  // Progression
  unlockedRooms: string[];
  unlockedAbilities: AbilityId[];
  unlockedBaits: BaitType[];
  discoveredRooms: string[];
  totalCatches: number;
  nightCreaturesCaught: number;
  
  // Journal
  catches: CatchRecord[];
  discoveredFish: string[];
  
  // Settings
  peacefulMode: boolean;
  settings: GameSettings;
}

export interface GameSettings {
  musicVolume: number;
  sfxVolume: number;
  graphicsQuality: 'low' | 'medium' | 'high';
  peacefulMode: boolean;
}

// Initial state factory
export function createInitialGameState(): GameState {
  return {
    screen: 'menu',
    isPaused: false,
    
    playerPosition: { x: 100, y: 200 },
    playerVelocity: { x: 0, y: 0 },
    playerState: 'idle',
    facingDirection: 'right',
    isGrounded: true,
    isInWater: false,
    isOnClimbable: false,
    isInBoat: false,
    
    currentMap: 'lake',
    currentRoom: 'lake_shallow_dock',
    currentFishingSpot: null,
    
    currentHour: 10,
    timeOfDay: 'day',
    
    fishingPhase: 'idle',
    tension: 0,
    currentBait: 'worms',
    hookedFish: null,
    
    unlockedRooms: ['lake_shallow_dock', 'lake_cabin', 'lake_deep_pool', 'lake_lily_pads', 'lake_old_pier', 'lake_sunken_boat'],
    unlockedAbilities: [],
    unlockedBaits: ['worms'],
    discoveredRooms: ['lake_shallow_dock'],
    totalCatches: 0,
    nightCreaturesCaught: 0,
    
    catches: [],
    discoveredFish: [],
    
    peacefulMode: false,
    settings: {
      musicVolume: 70,
      sfxVolume: 80,
      graphicsQuality: 'high',
      peacefulMode: false,
    },
  };
}
