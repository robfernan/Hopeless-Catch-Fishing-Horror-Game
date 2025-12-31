// Lake map rooms - Starting area
import { Room } from '@/types/room';

export const LAKE_ROOMS: Room[] = [
  {
    id: 'lake_shallow_dock',
    name: 'Shallow Dock',
    map: 'lake',
    width: 800,
    height: 600,
    
    platforms: [
      { id: 'ground', bounds: { x: 0, y: 500, width: 800, height: 100 }, type: 'solid' },
      { id: 'dock', bounds: { x: 300, y: 450, width: 200, height: 20 }, type: 'one-way' },
    ],
    
    waterAreas: [
      { id: 'lake_water', bounds: { x: 0, y: 480, width: 800, height: 120 }, depth: 'shallow', canSwim: true },
    ],
    
    climbables: [],
    
    fishingSpots: [
      { id: 'dock_spot', position: { x: 400, y: 450 }, waterDepth: 'shallow', requiresBoat: false, availableFish: ['sunfish', 'bass'] },
    ],
    
    hasBoat: false,
    
    transitions: [
      { id: 'to_deep_pool', bounds: { x: 750, y: 400, width: 50, height: 100 }, targetRoom: 'lake_deep_pool', targetPosition: { x: 50, y: 430 }, direction: 'right', isLocked: false },
      { id: 'to_lily_pads', bounds: { x: 0, y: 400, width: 50, height: 100 }, targetRoom: 'lake_lily_pads', targetPosition: { x: 700, y: 430 }, direction: 'left', isLocked: false },
    ],
    
    playerSpawn: { x: 100, y: 430 },
    ambientLight: 1.0,
    fogDensity: 0,
    anomalyFrequency: 'rare',
    isLocked: false,
    backgroundLayers: [],
    decorations: [],
  },
  
  {
    id: 'lake_deep_pool',
    name: 'Deep Pool',
    map: 'lake',
    width: 800,
    height: 600,
    
    platforms: [
      { id: 'shore_left', bounds: { x: 0, y: 450, width: 200, height: 150 }, type: 'solid' },
      { id: 'shore_right', bounds: { x: 600, y: 450, width: 200, height: 150 }, type: 'solid' },
    ],
    
    waterAreas: [
      { id: 'deep_water', bounds: { x: 150, y: 400, width: 500, height: 200 }, depth: 'deep', canSwim: true },
    ],
    
    climbables: [],
    
    fishingSpots: [
      { id: 'deep_spot', position: { x: 400, y: 400 }, waterDepth: 'deep', requiresBoat: false, availableFish: ['bass', 'trout', 'catfish'] },
    ],
    
    hasBoat: false,
    
    transitions: [
      { id: 'to_dock', bounds: { x: 0, y: 350, width: 50, height: 100 }, targetRoom: 'lake_shallow_dock', targetPosition: { x: 700, y: 430 }, direction: 'left', isLocked: false },
    ],
    
    playerSpawn: { x: 100, y: 430 },
    ambientLight: 0.9,
    fogDensity: 0.1,
    anomalyFrequency: 'rare',
    isLocked: false,
    backgroundLayers: [],
    decorations: [],
  },
  
  {
    id: 'lake_lily_pads',
    name: 'Lily Pads',
    map: 'lake',
    width: 800,
    height: 600,
    
    platforms: [
      { id: 'shore', bounds: { x: 600, y: 450, width: 200, height: 150 }, type: 'solid' },
      { id: 'lily1', bounds: { x: 200, y: 420, width: 80, height: 20 }, type: 'one-way' },
      { id: 'lily2', bounds: { x: 350, y: 400, width: 80, height: 20 }, type: 'one-way' },
      { id: 'lily3', bounds: { x: 480, y: 430, width: 80, height: 20 }, type: 'one-way' },
    ],
    
    waterAreas: [
      { id: 'pond', bounds: { x: 0, y: 450, width: 650, height: 150 }, depth: 'medium', canSwim: true },
    ],
    
    climbables: [],
    
    fishingSpots: [
      { id: 'lily_spot', position: { x: 390, y: 400 }, waterDepth: 'medium', requiresBoat: false, availableFish: ['sunfish', 'golden_carp'] },
    ],
    
    hasBoat: false,
    
    transitions: [
      { id: 'to_dock', bounds: { x: 750, y: 350, width: 50, height: 100 }, targetRoom: 'lake_shallow_dock', targetPosition: { x: 50, y: 430 }, direction: 'right', isLocked: false },
    ],
    
    playerSpawn: { x: 700, y: 430 },
    ambientLight: 0.95,
    fogDensity: 0.05,
    anomalyFrequency: 'rare',
    isLocked: false,
    backgroundLayers: [],
    decorations: [],
  },
];

export default LAKE_ROOMS;
