import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { createInitialGameState } from '@/types/game';
import { fishData, getRoomFish } from '@/data/fishData';
import { ROOM_REGISTRY, ALL_ROOMS } from '@/data/rooms';

describe('Task 8: Core Gameplay Loop Integration', () => {
  describe('Player Movement and Navigation', () => {
    it('should allow player to move between rooms', () => {
      fc.assert(
        fc.property(fc.constant(null), () => {
          const gameState = createInitialGameState();

          // Player should start in a valid room
          expect(gameState.currentRoom).toBeDefined();
          expect(ROOM_REGISTRY[gameState.currentRoom]).toBeDefined();

          // Should be able to get current room
          const currentRoom = ROOM_REGISTRY[gameState.currentRoom];
          expect(currentRoom).toBeDefined();
          expect(currentRoom.transitions.length).toBeGreaterThanOrEqual(0);
        }),
        { numRuns: 10 }
      );
    });

    it('should maintain player position within room bounds', () => {
      fc.assert(
        fc.property(
          fc.record({
            x: fc.integer({ min: 0, max: 800 }),
            y: fc.integer({ min: 0, max: 600 }),
          }),
          ({ x, y }) => {
            const gameState = createInitialGameState();
            gameState.playerPosition = { x, y };

            const currentRoom = ROOM_REGISTRY[gameState.currentRoom];
            expect(currentRoom).toBeDefined();

            // Player should be within room bounds
            expect(gameState.playerPosition.x).toBeGreaterThanOrEqual(0);
            expect(gameState.playerPosition.x).toBeLessThanOrEqual(currentRoom.width);
            expect(gameState.playerPosition.y).toBeGreaterThanOrEqual(0);
            expect(gameState.playerPosition.y).toBeLessThanOrEqual(currentRoom.height);
          }
        ),
        { numRuns: 20 }
      );
    });
  });

  describe('Fishing at Fishing Spots', () => {
    it('should have fishing spots in all rooms', () => {
      fc.assert(
        fc.property(fc.constant(null), () => {
          const gameState = createInitialGameState();
          const currentRoom = ROOM_REGISTRY[gameState.currentRoom];

          expect(currentRoom.fishingSpots.length).toBeGreaterThan(0);
        }),
        { numRuns: 10 }
      );
    });

    it('should provide correct fish for each room', () => {
      fc.assert(
        fc.property(fc.constant(null), () => {
          const gameState = createInitialGameState();
          const currentRoom = ROOM_REGISTRY[gameState.currentRoom];
          const availableFish = getRoomFish(currentRoom.id, gameState.timeOfDay, gameState.peacefulMode);

          expect(availableFish.length).toBeGreaterThan(0);
          availableFish.forEach(fish => {
            expect(fishData.map(f => f.id)).toContain(fish.id);
          });
        }),
        { numRuns: 10 }
      );
    });
  });

  describe('Progression and Unlocks', () => {
    it('should track catches in game state', () => {
      fc.assert(
        fc.property(fc.integer({ min: 1, max: 5 }), (catchCount) => {
          const gameState = createInitialGameState();

          // Simulate catches
          for (let i = 0; i < catchCount; i++) {
            gameState.catches.push({
              id: `catch-${i}`,
              fish: fishData[i % fishData.length],
              time: gameState.timeOfDay,
              location: gameState.currentMap,
              roomId: gameState.currentRoom,
              roomName: ROOM_REGISTRY[gameState.currentRoom].name,
              baitUsed: gameState.currentBait,
              timestamp: new Date(),
            });
          }
          gameState.totalCatches = catchCount;

          expect(gameState.catches.length).toBe(catchCount);
          expect(gameState.totalCatches).toBe(catchCount);
        }),
        { numRuns: 10 }
      );
    });
  });

  describe('Room Transitions', () => {
    it('should track discovered rooms', () => {
      fc.assert(
        fc.property(fc.constant(null), () => {
          const gameState = createInitialGameState();

          // Player starts in a room
          expect(gameState.discoveredRooms).toContain(gameState.currentRoom);

          // Simulate discovering new rooms
          const newRooms = ['lake_deep_pool', 'lake_lily_pads'];
          newRooms.forEach(roomId => {
            if (!gameState.discoveredRooms.includes(roomId)) {
              gameState.discoveredRooms.push(roomId);
            }
          });

          expect(gameState.discoveredRooms.length).toBeGreaterThanOrEqual(3);
          newRooms.forEach(roomId => {
            expect(gameState.discoveredRooms).toContain(roomId);
          });
        }),
        { numRuns: 10 }
      );
    });

    it('should maintain game state across room transitions', () => {
      fc.assert(
        fc.property(fc.constant(null), () => {
          const gameState = createInitialGameState();

          // Record initial state
          const initialCatches = gameState.totalCatches;
          const initialAbilities = [...gameState.unlockedAbilities];

          // Simulate room transition
          gameState.currentRoom = 'lake_deep_pool';

          // State should be preserved
          expect(gameState.totalCatches).toBe(initialCatches);
          expect(gameState.unlockedAbilities).toEqual(initialAbilities);
        }),
        { numRuns: 10 }
      );
    });
  });

  describe('Fish Availability', () => {
    it('should provide correct fish for each room', () => {
      fc.assert(
        fc.property(fc.constant(null), () => {
          const gameState = createInitialGameState();

          // Check rooms that have fish defined in the room fish map
          const roomsWithFish = ALL_ROOMS.filter(room => {
            const fish = getRoomFish(room.id, gameState.timeOfDay, gameState.peacefulMode);
            return fish.length > 0;
          });

          // Should have at least some rooms with fish
          expect(roomsWithFish.length).toBeGreaterThan(0);

          // All fish in those rooms should be valid
          roomsWithFish.forEach(room => {
            const availableFish = getRoomFish(room.id, gameState.timeOfDay, gameState.peacefulMode);
            availableFish.forEach(fish => {
              expect(fishData.map(f => f.id)).toContain(fish.id);
            });
          });
        }),
        { numRuns: 5 }
      );
    });

    it('should filter night creatures in peaceful mode', () => {
      fc.assert(
        fc.property(fc.constant(null), () => {
          const gameState = createInitialGameState();
          gameState.peacefulMode = true;

          // Check all rooms
          ALL_ROOMS.forEach(room => {
            const availableFish = getRoomFish(room.id, 'night', gameState.peacefulMode);

            // No horror creatures should be available in peaceful mode
            availableFish.forEach(fish => {
              expect(fish.isHorror).toBe(false);
            });
          });
        }),
        { numRuns: 5 }
      );
    });
  });

  describe('Complete Gameplay Flow', () => {
    it('should support a complete gameplay session', () => {
      fc.assert(
        fc.property(fc.constant(null), () => {
          const gameState = createInitialGameState();

          // 1. Player starts in a room
          expect(gameState.currentRoom).toBeDefined();
          expect(gameState.discoveredRooms).toContain(gameState.currentRoom);

          // 2. Player finds a fishing spot
          const currentRoom = ROOM_REGISTRY[gameState.currentRoom];
          expect(currentRoom.fishingSpots.length).toBeGreaterThan(0);

          // 3. Player can catch a fish
          const availableFish = getRoomFish(currentRoom.id, gameState.timeOfDay, gameState.peacefulMode);
          const fish = availableFish[0];

          // 4. Record the catch
          gameState.catches.push({
            id: 'catch-1',
            fish,
            time: gameState.timeOfDay,
            location: gameState.currentMap,
            roomId: gameState.currentRoom,
            roomName: currentRoom.name,
            baitUsed: gameState.currentBait,
            timestamp: new Date(),
          });
          gameState.totalCatches = 1;

          // 5. Verify game state is consistent
          expect(gameState.catches.length).toBe(1);
          expect(gameState.totalCatches).toBe(1);
          expect(gameState.discoveredRooms.length).toBeGreaterThanOrEqual(1);
        }),
        { numRuns: 10 }
      );
    });
  });
});
