// Room registry - all rooms in the game
import { Room, RoomRegistry, MapId } from '@/types/room';
import { LAKE_ROOMS } from './lake';
import { MOUNTAIN_ROOMS } from './mountain';

// Combine all rooms into a single array
export const ALL_ROOMS: Room[] = [
  ...LAKE_ROOMS,
  ...MOUNTAIN_ROOMS,
];

// Create a registry for quick lookup by id
export const ROOM_REGISTRY: RoomRegistry = ALL_ROOMS.reduce((acc, room) => {
  acc[room.id] = room;
  return acc;
}, {} as RoomRegistry);

// Get room by id
export function getRoom(id: string): Room | undefined {
  return ROOM_REGISTRY[id];
}

// Get all rooms for a specific map
export function getRoomsByMap(map: MapId): Room[] {
  return ALL_ROOMS.filter(room => room.map === map);
}

// Get starting room for a map
export function getStartingRoom(map: MapId): Room | undefined {
  const mapRooms = getRoomsByMap(map);
  return mapRooms.find(room => !room.isLocked) || mapRooms[0];
}

// Get connected rooms (rooms that have transitions to/from this room)
export function getConnectedRooms(roomId: string): Room[] {
  const room = getRoom(roomId);
  if (!room) return [];
  
  const connectedIds = room.transitions.map(t => t.targetRoom);
  return connectedIds.map(id => getRoom(id)).filter((r): r is Room => r !== undefined);
}

// Check if a room is unlocked based on game state
export function isRoomUnlocked(
  room: Room,
  totalCatches: number,
  caughtFish: string[],
  unlockedAbilities: string[]
): boolean {
  if (!room.isLocked) return true;
  if (!room.unlockRequirement) return true;
  
  const req = room.unlockRequirement;
  
  switch (req.type) {
    case 'catches':
      return totalCatches >= (req.count || 0);
    case 'fish':
      return req.fishId ? caughtFish.includes(req.fishId) : false;
    case 'ability':
      return req.abilityId ? unlockedAbilities.includes(req.abilityId) : false;
    case 'all_abilities':
      return unlockedAbilities.length >= 4; // All 4 abilities
    default:
      return false;
  }
}

export { LAKE_ROOMS, MOUNTAIN_ROOMS };
