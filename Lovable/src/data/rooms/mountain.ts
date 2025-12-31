// Mountain map rooms - Advanced area with maximum horror
import { Room } from '@/types/room';

export const MOUNTAIN_ROOMS: Room[] = [
  {
    id: 'mountain_pass',
    name: 'Mountain Pass',
    map: 'mountain',
    width: 800,
    height: 600,
    
    platforms: [
      { id: 'ground', bounds: { x: 0, y: 450, width: 800, height: 150 }, type: 'solid' },
      { id: 'rock1', bounds: { x: 200, y: 380, width: 100, height: 70 }, type: 'solid' },
      { id: 'rock2', bounds: { x: 500, y: 350, width: 120, height: 100 }, type: 'solid' },
    ],
    
    waterAreas: [
      { id: 'stream', bounds: { x: 300, y: 480, width: 200, height: 120 }, depth: 'shallow', canSwim: false },
    ],
    
    climbables: [],
    
    fishingSpots: [
      { id: 'stream_spot', position: { x: 400, y: 450 }, waterDepth: 'shallow', requiresBoat: false, availableFish: ['trout', 'bass'] },
    ],
    
    hasBoat: false,
    
    transitions: [
      { id: 'to_forest', bounds: { x: 750, y: 350, width: 50, height: 100 }, targetRoom: 'forest_hollow', targetPosition: { x: 50, y: 430 }, direction: 'right', isLocked: false },
      { id: 'to_frozen', bounds: { x: 0, y: 350, width: 50, height: 100 }, targetRoom: 'mountain_frozen_lake', targetPosition: { x: 700, y: 400 }, direction: 'left', isLocked: false },
      { id: 'to_waterfall', bounds: { x: 350, y: 550, width: 100, height: 50 }, targetRoom: 'mountain_waterfall_cave', targetPosition: { x: 400, y: 100 }, direction: 'down', isLocked: false },
    ],
    
    playerSpawn: { x: 700, y: 430 },
    ambientLight: 0.7,
    fogDensity: 0.2,
    anomalyFrequency: 'rare',
    isLocked: true,
    unlockRequirement: { type: 'catches', count: 20 },
    backgroundLayers: [],
    decorations: [],
  },
  
  {
    id: 'mountain_frozen_lake',
    name: 'Frozen Lake',
    map: 'mountain',
    width: 800,
    height: 600,
    
    platforms: [
      { id: 'shore_left', bounds: { x: 0, y: 450, width: 200, height: 150 }, type: 'solid' },
      { id: 'shore_right', bounds: { x: 600, y: 450, width: 200, height: 150 }, type: 'solid' },
      { id: 'ice1', bounds: { x: 250, y: 430, width: 100, height: 20 }, type: 'one-way' },
      { id: 'ice2', bounds: { x: 400, y: 420, width: 100, height: 20 }, type: 'one-way' },
      { id: 'ice3', bounds: { x: 520, y: 440, width: 80, height: 20 }, type: 'one-way' },
    ],
    
    waterAreas: [
      { id: 'frozen_water', bounds: { x: 150, y: 460, width: 500, height: 140 }, depth: 'deep', canSwim: false },
    ],
    
    climbables: [],
    
    fishingSpots: [
      { id: 'ice_hole1', position: { x: 300, y: 430 }, waterDepth: 'deep', requiresBoat: false, availableFish: ['trout', 'catfish'] },
      { id: 'ice_hole2', position: { x: 450, y: 420 }, waterDepth: 'deep', requiresBoat: false, availableFish: ['catfish', 'golden_carp'] },
    ],
    
    hasBoat: false,
    
    transitions: [
      { id: 'to_pass', bounds: { x: 750, y: 350, width: 50, height: 100 }, targetRoom: 'mountain_pass', targetPosition: { x: 50, y: 430 }, direction: 'right', isLocked: false },
      { id: 'to_ice_cavern', bounds: { x: 0, y: 350, width: 50, height: 100 }, targetRoom: 'mountain_ice_cavern', targetPosition: { x: 700, y: 400 }, direction: 'left', isLocked: false },
    ],
    
    playerSpawn: { x: 700, y: 430 },
    ambientLight: 0.8,
    fogDensity: 0.1,
    anomalyFrequency: 'occasional',
    isLocked: false,
    backgroundLayers: [],
    decorations: [],
  },
  
  {
    id: 'mountain_waterfall_cave',
    name: 'Waterfall Cave',
    map: 'mountain',
    width: 800,
    height: 600,
    
    platforms: [
      { id: 'ledge_left', bounds: { x: 0, y: 400, width: 250, height: 200 }, type: 'solid' },
      { id: 'ledge_right', bounds: { x: 550, y: 400, width: 250, height: 200 }, type: 'solid' },
      { id: 'rock', bounds: { x: 350, y: 350, width: 100, height: 50 }, type: 'solid' },
    ],
    
    waterAreas: [
      { id: 'waterfall_pool', bounds: { x: 200, y: 450, width: 400, height: 150 }, depth: 'deep', canSwim: true },
    ],
    
    climbables: [
      { id: 'rope', bounds: { x: 240, y: 350, width: 20, height: 100 }, type: 'rope' },
    ],
    
    fishingSpots: [
      { id: 'pool_spot', position: { x: 400, y: 350 }, waterDepth: 'deep', requiresBoat: false, availableFish: ['catfish', 'whispering_eel'] },
      { id: 'ledge_spot', position: { x: 230, y: 400 }, waterDepth: 'medium', requiresBoat: false, availableFish: ['trout', 'bass'] },
    ],
    
    hasBoat: false,
    
    transitions: [
      { id: 'to_pass', bounds: { x: 350, y: 0, width: 100, height: 50 }, targetRoom: 'mountain_pass', targetPosition: { x: 400, y: 500 }, direction: 'up', isLocked: false },
      { id: 'to_underground', bounds: { x: 0, y: 300, width: 50, height: 100 }, targetRoom: 'mountain_underground_river', targetPosition: { x: 700, y: 400 }, direction: 'left', isLocked: false },
    ],
    
    playerSpawn: { x: 100, y: 380 },
    ambientLight: 0.4,
    fogDensity: 0.3,
    anomalyFrequency: 'moderate',
    isLocked: false,
    backgroundLayers: [],
    decorations: [],
  },

  {
    id: 'mountain_ice_cavern',
    name: 'Ice Cavern',
    map: 'mountain',
    width: 800,
    height: 600,
    
    platforms: [
      { id: 'entrance', bounds: { x: 600, y: 400, width: 200, height: 200 }, type: 'solid' },
      { id: 'ice_shelf1', bounds: { x: 400, y: 350, width: 150, height: 20 }, type: 'one-way' },
      { id: 'ice_shelf2', bounds: { x: 200, y: 300, width: 150, height: 20 }, type: 'one-way' },
      { id: 'deep_ledge', bounds: { x: 0, y: 450, width: 150, height: 150 }, type: 'solid' },
    ],
    
    waterAreas: [
      { id: 'ice_water', bounds: { x: 100, y: 400, width: 550, height: 200 }, depth: 'deep', canSwim: true },
    ],
    
    climbables: [
      { id: 'icicle', bounds: { x: 390, y: 350, width: 20, height: 100 }, type: 'ladder' },
    ],
    
    fishingSpots: [
      { id: 'shelf_spot', position: { x: 475, y: 350 }, waterDepth: 'deep', requiresBoat: false, availableFish: ['golden_carp', 'pale_crawler'] },
      { id: 'deep_spot', position: { x: 130, y: 450 }, waterDepth: 'deep', requiresBoat: false, requiresAbility: 'swim', availableFish: ['pale_crawler', 'whispering_eel'] },
    ],
    
    hasBoat: false,
    
    transitions: [
      { id: 'to_frozen', bounds: { x: 750, y: 300, width: 50, height: 100 }, targetRoom: 'mountain_frozen_lake', targetPosition: { x: 50, y: 430 }, direction: 'right', isLocked: false },
      { id: 'to_depths', bounds: { x: 0, y: 350, width: 50, height: 100 }, targetRoom: 'mountain_depths', targetPosition: { x: 700, y: 400 }, direction: 'left', isLocked: false },
    ],
    
    playerSpawn: { x: 700, y: 380 },
    ambientLight: 0.3,
    fogDensity: 0.4,
    anomalyFrequency: 'frequent',
    isLocked: false,
    backgroundLayers: [],
    decorations: [],
  },
  
  {
    id: 'mountain_underground_river',
    name: 'Underground River',
    map: 'mountain',
    width: 800,
    height: 600,
    
    platforms: [
      { id: 'bank_right', bounds: { x: 600, y: 400, width: 200, height: 200 }, type: 'solid' },
      { id: 'bank_left', bounds: { x: 0, y: 450, width: 200, height: 150 }, type: 'solid' },
      { id: 'rock1', bounds: { x: 300, y: 380, width: 80, height: 70 }, type: 'solid' },
      { id: 'rock2', bounds: { x: 450, y: 400, width: 100, height: 50 }, type: 'solid' },
    ],
    
    waterAreas: [
      { id: 'river', bounds: { x: 150, y: 450, width: 500, height: 150 }, depth: 'deep', canSwim: true },
    ],
    
    climbables: [],
    
    fishingSpots: [
      { id: 'rock_spot', position: { x: 340, y: 380 }, waterDepth: 'deep', requiresBoat: false, availableFish: ['bleeding_carp', 'whispering_eel'] },
      { id: 'bank_spot', position: { x: 180, y: 450 }, waterDepth: 'medium', requiresBoat: false, availableFish: ['catfish', 'pale_crawler'] },
    ],
    
    hasBoat: false,
    
    transitions: [
      { id: 'to_waterfall', bounds: { x: 750, y: 300, width: 50, height: 100 }, targetRoom: 'mountain_waterfall_cave', targetPosition: { x: 50, y: 380 }, direction: 'right', isLocked: false },
      { id: 'to_depths', bounds: { x: 0, y: 350, width: 50, height: 100 }, targetRoom: 'mountain_depths', targetPosition: { x: 700, y: 300 }, direction: 'left', isLocked: false },
    ],
    
    playerSpawn: { x: 700, y: 380 },
    ambientLight: 0.2,
    fogDensity: 0.5,
    anomalyFrequency: 'frequent',
    isLocked: false,
    backgroundLayers: [],
    decorations: [],
  },

  {
    id: 'mountain_depths',
    name: 'The Depths',
    map: 'mountain',
    width: 800,
    height: 600,
    
    platforms: [
      { id: 'ledge_top', bounds: { x: 600, y: 300, width: 200, height: 300 }, type: 'solid' },
      { id: 'ledge_mid', bounds: { x: 300, y: 400, width: 150, height: 200 }, type: 'solid' },
      { id: 'ledge_bottom', bounds: { x: 0, y: 500, width: 200, height: 100 }, type: 'solid' },
    ],
    
    waterAreas: [
      { id: 'deep_water', bounds: { x: 0, y: 400, width: 650, height: 200 }, depth: 'deep', canSwim: true },
    ],
    
    climbables: [
      { id: 'chain', bounds: { x: 290, y: 300, width: 20, height: 100 }, type: 'rope' },
    ],
    
    fishingSpots: [
      { id: 'ledge_spot', position: { x: 380, y: 400 }, waterDepth: 'deep', requiresBoat: false, availableFish: ['pale_crawler', 'bleeding_carp', 'whispering_eel'] },
      { id: 'deep_spot', position: { x: 620, y: 300 }, waterDepth: 'deep', requiresBoat: false, requiresAbility: 'deep_cast', availableFish: ['whispering_eel', 'fishman'] },
    ],
    
    hasBoat: false,
    
    transitions: [
      { id: 'to_ice', bounds: { x: 750, y: 250, width: 50, height: 100 }, targetRoom: 'mountain_ice_cavern', targetPosition: { x: 50, y: 430 }, direction: 'right', isLocked: false },
      { id: 'to_river', bounds: { x: 750, y: 350, width: 50, height: 100 }, targetRoom: 'mountain_underground_river', targetPosition: { x: 50, y: 430 }, direction: 'right', isLocked: false },
      { id: 'to_abyss', bounds: { x: 0, y: 400, width: 50, height: 100 }, targetRoom: 'mountain_abyss', targetPosition: { x: 700, y: 400 }, direction: 'left', isLocked: true, unlockRequirement: { type: 'all_abilities' } },
    ],
    
    playerSpawn: { x: 700, y: 280 },
    ambientLight: 0.15,
    fogDensity: 0.6,
    anomalyFrequency: 'constant',
    isLocked: false,
    backgroundLayers: [],
    decorations: [],
  },
  
  {
    id: 'mountain_abyss',
    name: 'The Abyss',
    map: 'mountain',
    width: 800,
    height: 600,
    
    platforms: [
      { id: 'edge', bounds: { x: 600, y: 400, width: 200, height: 200 }, type: 'solid' },
      { id: 'floating1', bounds: { x: 400, y: 350, width: 100, height: 20 }, type: 'one-way' },
      { id: 'floating2', bounds: { x: 200, y: 300, width: 100, height: 20 }, type: 'one-way' },
      { id: 'altar', bounds: { x: 50, y: 400, width: 150, height: 200 }, type: 'solid' },
    ],
    
    waterAreas: [
      { id: 'void_water', bounds: { x: 0, y: 450, width: 650, height: 150 }, depth: 'deep', canSwim: true },
    ],
    
    climbables: [],
    
    fishingSpots: [
      { id: 'altar_spot', position: { x: 125, y: 400 }, waterDepth: 'deep', requiresBoat: false, availableFish: ['fishman'] },
      { id: 'void_spot', position: { x: 300, y: 300 }, waterDepth: 'deep', requiresBoat: false, requiresAbility: 'deep_cast', availableFish: ['fishman', 'whispering_eel', 'bleeding_carp'] },
    ],
    
    hasBoat: false,
    
    transitions: [
      { id: 'to_depths', bounds: { x: 750, y: 300, width: 50, height: 100 }, targetRoom: 'mountain_depths', targetPosition: { x: 50, y: 480 }, direction: 'right', isLocked: false },
    ],
    
    playerSpawn: { x: 700, y: 380 },
    ambientLight: 0.05,
    fogDensity: 0.8,
    anomalyFrequency: 'constant',
    isLocked: true,
    unlockRequirement: { type: 'all_abilities' },
    backgroundLayers: [],
    decorations: [],
  },
];

export default MOUNTAIN_ROOMS;
