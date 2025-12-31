// RoomData.js - Room definitions ported from Lovable
(function(){
  // Lake rooms
  const LAKE_ROOMS = [
    {
      id: 'lake_shallow_dock',
      name: 'Shallow Dock',
      map: 'lake',
      width: 800,
      height: 600,
      platforms: [
        { id: 'ground', bounds: { x: 0, y: 500, width: 800, height: 100 }, type: 'solid' },
        { id: 'dock', bounds: { x: 300, y: 450, width: 200, height: 20 }, type: 'one-way' }
      ],
      waterAreas: [
        { id: 'lake_water', bounds: { x: 0, y: 480, width: 800, height: 120 }, depth: 'shallow', canSwim: true }
      ],
      fishingSpots: [
        { id: 'dock_spot', position: { x: 400, y: 450 }, waterDepth: 'shallow', requiresBoat: false }
      ],
      transitions: [
        { id: 'to_deep_pool', bounds: { x: 750, y: 400, width: 50, height: 100 }, targetRoom: 'lake_deep_pool', targetPosition: { x: 50, y: 430 }, direction: 'right', isLocked: false },
        { id: 'to_lily_pads', bounds: { x: 0, y: 400, width: 50, height: 100 }, targetRoom: 'lake_lily_pads', targetPosition: { x: 700, y: 430 }, direction: 'left', isLocked: false }
      ],
      playerSpawn: { x: 100, y: 430 },
      ambientLight: 1.0,
      fogDensity: 0,
      anomalyFrequency: 'rare',
      isLocked: false
    },
    {
      id: 'lake_deep_pool',
      name: 'Deep Pool',
      map: 'lake',
      width: 800,
      height: 600,
      platforms: [
        { id: 'shore_left', bounds: { x: 0, y: 450, width: 200, height: 150 }, type: 'solid' },
        { id: 'shore_right', bounds: { x: 600, y: 450, width: 200, height: 150 }, type: 'solid' }
      ],
      waterAreas: [
        { id: 'deep_water', bounds: { x: 150, y: 400, width: 500, height: 200 }, depth: 'deep', canSwim: true }
      ],
      fishingSpots: [
        { id: 'deep_spot', position: { x: 400, y: 400 }, waterDepth: 'deep', requiresBoat: false }
      ],
      transitions: [
        { id: 'to_dock', bounds: { x: 0, y: 350, width: 50, height: 100 }, targetRoom: 'lake_shallow_dock', targetPosition: { x: 700, y: 430 }, direction: 'left', isLocked: false }
      ],
      playerSpawn: { x: 100, y: 430 },
      ambientLight: 0.9,
      fogDensity: 0.1,
      anomalyFrequency: 'rare',
      isLocked: false
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
        { id: 'lily3', bounds: { x: 480, y: 430, width: 80, height: 20 }, type: 'one-way' }
      ],
      waterAreas: [
        { id: 'pond', bounds: { x: 0, y: 450, width: 650, height: 150 }, depth: 'medium', canSwim: true }
      ],
      fishingSpots: [
        { id: 'lily_spot', position: { x: 390, y: 400 }, waterDepth: 'medium', requiresBoat: false }
      ],
      transitions: [
        { id: 'to_dock', bounds: { x: 750, y: 350, width: 50, height: 100 }, targetRoom: 'lake_shallow_dock', targetPosition: { x: 50, y: 430 }, direction: 'right', isLocked: false }
      ],
      playerSpawn: { x: 700, y: 430 },
      ambientLight: 0.95,
      fogDensity: 0.05,
      anomalyFrequency: 'rare',
      isLocked: false
    }
  ];

  // Mountain rooms
  const MOUNTAIN_ROOMS = [
    {
      id: 'mountain_pass',
      name: 'Mountain Pass',
      map: 'mountain',
      width: 800,
      height: 600,
      platforms: [
        { id: 'ground', bounds: { x: 0, y: 450, width: 800, height: 150 }, type: 'solid' },
        { id: 'rock1', bounds: { x: 200, y: 380, width: 100, height: 70 }, type: 'solid' },
        { id: 'rock2', bounds: { x: 500, y: 350, width: 120, height: 100 }, type: 'solid' }
      ],
      waterAreas: [
        { id: 'stream', bounds: { x: 300, y: 480, width: 200, height: 120 }, depth: 'shallow', canSwim: false }
      ],
      fishingSpots: [
        { id: 'stream_spot', position: { x: 400, y: 450 }, waterDepth: 'shallow', requiresBoat: false }
      ],
      transitions: [
        { id: 'to_frozen', bounds: { x: 0, y: 350, width: 50, height: 100 }, targetRoom: 'mountain_frozen_lake', targetPosition: { x: 700, y: 400 }, direction: 'left', isLocked: false },
        { id: 'to_waterfall', bounds: { x: 350, y: 550, width: 100, height: 50 }, targetRoom: 'mountain_waterfall_cave', targetPosition: { x: 400, y: 100 }, direction: 'down', isLocked: false }
      ],
      playerSpawn: { x: 700, y: 430 },
      ambientLight: 0.7,
      fogDensity: 0.2,
      anomalyFrequency: 'rare',
      isLocked: true
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
        { id: 'ice3', bounds: { x: 520, y: 440, width: 80, height: 20 }, type: 'one-way' }
      ],
      waterAreas: [
        { id: 'frozen_water', bounds: { x: 150, y: 460, width: 500, height: 140 }, depth: 'deep', canSwim: false }
      ],
      fishingSpots: [
        { id: 'ice_hole1', position: { x: 300, y: 430 }, waterDepth: 'deep', requiresBoat: false },
        { id: 'ice_hole2', position: { x: 450, y: 420 }, waterDepth: 'deep', requiresBoat: false }
      ],
      transitions: [
        { id: 'to_pass', bounds: { x: 750, y: 350, width: 50, height: 100 }, targetRoom: 'mountain_pass', targetPosition: { x: 50, y: 430 }, direction: 'right', isLocked: false },
        { id: 'to_ice_cavern', bounds: { x: 0, y: 350, width: 50, height: 100 }, targetRoom: 'mountain_ice_cavern', targetPosition: { x: 700, y: 400 }, direction: 'left', isLocked: false }
      ],
      playerSpawn: { x: 700, y: 430 },
      ambientLight: 0.8,
      fogDensity: 0.1,
      anomalyFrequency: 'occasional',
      isLocked: false
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
        { id: 'rock', bounds: { x: 350, y: 350, width: 100, height: 50 }, type: 'solid' }
      ],
      waterAreas: [
        { id: 'waterfall_pool', bounds: { x: 200, y: 450, width: 400, height: 150 }, depth: 'deep', canSwim: true }
      ],
      fishingSpots: [
        { id: 'pool_spot', position: { x: 400, y: 350 }, waterDepth: 'deep', requiresBoat: false },
        { id: 'ledge_spot', position: { x: 230, y: 400 }, waterDepth: 'medium', requiresBoat: false }
      ],
      transitions: [
        { id: 'to_pass', bounds: { x: 350, y: 0, width: 100, height: 50 }, targetRoom: 'mountain_pass', targetPosition: { x: 400, y: 500 }, direction: 'up', isLocked: false },
        { id: 'to_underground', bounds: { x: 0, y: 300, width: 50, height: 100 }, targetRoom: 'mountain_underground_river', targetPosition: { x: 700, y: 400 }, direction: 'left', isLocked: false }
      ],
      playerSpawn: { x: 100, y: 380 },
      ambientLight: 0.4,
      fogDensity: 0.3,
      anomalyFrequency: 'moderate',
      isLocked: false
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
        { id: 'deep_ledge', bounds: { x: 0, y: 450, width: 150, height: 150 }, type: 'solid' }
      ],
      waterAreas: [
        { id: 'ice_water', bounds: { x: 100, y: 400, width: 550, height: 200 }, depth: 'deep', canSwim: true }
      ],
      fishingSpots: [
        { id: 'shelf_spot', position: { x: 475, y: 350 }, waterDepth: 'deep', requiresBoat: false },
        { id: 'deep_spot', position: { x: 130, y: 450 }, waterDepth: 'deep', requiresBoat: false }
      ],
      transitions: [
        { id: 'to_frozen', bounds: { x: 750, y: 300, width: 50, height: 100 }, targetRoom: 'mountain_frozen_lake', targetPosition: { x: 50, y: 430 }, direction: 'right', isLocked: false },
        { id: 'to_depths', bounds: { x: 0, y: 350, width: 50, height: 100 }, targetRoom: 'mountain_depths', targetPosition: { x: 700, y: 400 }, direction: 'left', isLocked: false }
      ],
      playerSpawn: { x: 700, y: 380 },
      ambientLight: 0.3,
      fogDensity: 0.4,
      anomalyFrequency: 'frequent',
      isLocked: false
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
        { id: 'rock2', bounds: { x: 450, y: 400, width: 100, height: 50 }, type: 'solid' }
      ],
      waterAreas: [
        { id: 'river', bounds: { x: 150, y: 450, width: 500, height: 150 }, depth: 'deep', canSwim: true }
      ],
      fishingSpots: [
        { id: 'rock_spot', position: { x: 340, y: 380 }, waterDepth: 'deep', requiresBoat: false },
        { id: 'bank_spot', position: { x: 180, y: 450 }, waterDepth: 'medium', requiresBoat: false }
      ],
      transitions: [
        { id: 'to_waterfall', bounds: { x: 750, y: 300, width: 50, height: 100 }, targetRoom: 'mountain_waterfall_cave', targetPosition: { x: 50, y: 380 }, direction: 'right', isLocked: false },
        { id: 'to_depths', bounds: { x: 0, y: 350, width: 50, height: 100 }, targetRoom: 'mountain_depths', targetPosition: { x: 700, y: 300 }, direction: 'left', isLocked: false }
      ],
      playerSpawn: { x: 700, y: 380 },
      ambientLight: 0.2,
      fogDensity: 0.5,
      anomalyFrequency: 'frequent',
      isLocked: false
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
        { id: 'ledge_bottom', bounds: { x: 0, y: 500, width: 200, height: 100 }, type: 'solid' }
      ],
      waterAreas: [
        { id: 'deep_water', bounds: { x: 0, y: 400, width: 650, height: 200 }, depth: 'deep', canSwim: true }
      ],
      fishingSpots: [
        { id: 'ledge_spot', position: { x: 380, y: 400 }, waterDepth: 'deep', requiresBoat: false },
        { id: 'deep_spot', position: { x: 620, y: 300 }, waterDepth: 'deep', requiresBoat: false }
      ],
      transitions: [
        { id: 'to_ice', bounds: { x: 750, y: 250, width: 50, height: 100 }, targetRoom: 'mountain_ice_cavern', targetPosition: { x: 50, y: 430 }, direction: 'right', isLocked: false },
        { id: 'to_river', bounds: { x: 750, y: 350, width: 50, height: 100 }, targetRoom: 'mountain_underground_river', targetPosition: { x: 50, y: 430 }, direction: 'right', isLocked: false },
        { id: 'to_abyss', bounds: { x: 0, y: 400, width: 50, height: 100 }, targetRoom: 'mountain_abyss', targetPosition: { x: 700, y: 400 }, direction: 'left', isLocked: true }
      ],
      playerSpawn: { x: 700, y: 280 },
      ambientLight: 0.15,
      fogDensity: 0.6,
      anomalyFrequency: 'constant',
      isLocked: false
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
        { id: 'altar', bounds: { x: 50, y: 400, width: 150, height: 200 }, type: 'solid' }
      ],
      waterAreas: [
        { id: 'void_water', bounds: { x: 0, y: 450, width: 650, height: 150 }, depth: 'deep', canSwim: true }
      ],
      fishingSpots: [
        { id: 'altar_spot', position: { x: 125, y: 400 }, waterDepth: 'deep', requiresBoat: false },
        { id: 'void_spot', position: { x: 300, y: 300 }, waterDepth: 'deep', requiresBoat: false }
      ],
      transitions: [
        { id: 'to_depths', bounds: { x: 750, y: 300, width: 50, height: 100 }, targetRoom: 'mountain_depths', targetPosition: { x: 50, y: 480 }, direction: 'right', isLocked: false }
      ],
      playerSpawn: { x: 700, y: 380 },
      ambientLight: 0.05,
      fogDensity: 0.8,
      anomalyFrequency: 'constant',
      isLocked: true
    }
  ];

  // Room-to-fish mapping
  const ROOM_FISH_MAP = {
    'lake_shallow_dock': ['sunfish', 'bass'],
    'lake_deep_pool': ['bass', 'trout', 'catfish'],
    'lake_lily_pads': ['sunfish', 'golden_carp'],
    'mountain_pass': ['trout', 'bass'],
    'mountain_frozen_lake': ['trout', 'catfish', 'golden_carp'],
    'mountain_waterfall_cave': ['catfish', 'whispering_eel'],
    'mountain_ice_cavern': ['golden_carp', 'pale_crawler', 'whispering_eel'],
    'mountain_underground_river': ['bleeding_carp', 'whispering_eel', 'catfish', 'pale_crawler'],
    'mountain_depths': ['pale_crawler', 'bleeding_carp', 'whispering_eel', 'fishman'],
    'mountain_abyss': ['fishman', 'whispering_eel', 'bleeding_carp']
  };

  // RoomData module
  const RoomData = {
    // Get all rooms
    getAllRooms() {
      return [...LAKE_ROOMS, ...MOUNTAIN_ROOMS];
    },

    // Get room by ID
    getRoomById(id) {
      const allRooms = this.getAllRooms();
      return allRooms.find(r => r.id === id);
    },

    // Get lake rooms
    getLakeRooms() {
      return LAKE_ROOMS;
    },

    // Get mountain rooms
    getMountainRooms() {
      return MOUNTAIN_ROOMS;
    },

    // Get fish available in a room
    getRoomFish(roomId, timeOfDay, peacefulMode) {
      const fishIds = ROOM_FISH_MAP[roomId] || [];
      
      // Get available fish based on time and mode
      const FishData = typeof window !== 'undefined' ? window.FishData : require('./fishdata.js');
      const availableFish = FishData.getAvailableFish(timeOfDay, peacefulMode);
      const availableIds = availableFish.map(f => f.id);
      
      // Return intersection of room fish and available fish
      return availableFish.filter(f => fishIds.includes(f.id));
    }
  };

  // Export for browser and Node.js
  if (typeof window !== 'undefined') window.RoomData = window.RoomData || RoomData;
  if (typeof module !== 'undefined') module.exports = RoomData;
})();
