import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { fishData, getAvailableFish, getRoomFish, getDayFish, getNightFish } from '@/data/fishData';
import { BaitType } from '@/types/game';

describe('Property 2: Fish Availability by Time and Mode', () => {
  it('should return only day fish during day time', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        const dayFish = getAvailableFish('day', false);
        const nightFish = getNightFish();

        // No night creatures should be in day fish
        const nightIds = nightFish.map(f => f.id);
        dayFish.forEach(fish => {
          expect(nightIds).not.toContain(fish.id);
        });

        // All day fish should be included
        const dayIds = getDayFish().map(f => f.id);
        dayFish.forEach(fish => {
          expect(dayIds).toContain(fish.id);
        });
      }),
      { numRuns: 10 }
    );
  });

  it('should return day and night fish during night time', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        const nightAvailable = getAvailableFish('night', false);
        const dayFish = getDayFish();
        const nightFish = getNightFish();

        // Should include all day fish
        dayFish.forEach(fish => {
          expect(nightAvailable.map(f => f.id)).toContain(fish.id);
        });

        // Should include all night creatures
        nightFish.forEach(fish => {
          expect(nightAvailable.map(f => f.id)).toContain(fish.id);
        });
      }),
      { numRuns: 10 }
    );
  });

  it('should return only day fish in peaceful mode regardless of time', () => {
    fc.assert(
      fc.property(
        fc.constantFrom<'day' | 'night'>('day', 'night'),
        (timeOfDay) => {
          const peacefulFish = getAvailableFish(timeOfDay, true);
          const dayFish = getDayFish();

          // Should only have day fish
          expect(peacefulFish.length).toBe(dayFish.length);
          peacefulFish.forEach(fish => {
            expect(fish.isNightOnly).toBe(false);
          });
        }
      ),
      { numRuns: 10 }
    );
  });

  it('should never include horror creatures in peaceful mode', () => {
    fc.assert(
      fc.property(
        fc.constantFrom<'day' | 'night'>('day', 'night'),
        (timeOfDay) => {
          const peacefulFish = getAvailableFish(timeOfDay, true);

          peacefulFish.forEach(fish => {
            expect(fish.isHorror).toBe(false);
          });
        }
      ),
      { numRuns: 10 }
    );
  });

  it('should have consistent fish data structure', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        fishData.forEach(fish => {
          // All required fields should exist
          expect(fish.id).toBeDefined();
          expect(fish.name).toBeDefined();
          expect(fish.image).toBeDefined();
          expect(fish.rarity).toBeDefined();
          expect(fish.isNightOnly).toBeDefined();
          expect(fish.isHorror).toBeDefined();
          expect(fish.description).toBeDefined();
          expect(fish.tensionPattern).toBeDefined();
          expect(fish.difficulty).toBeDefined();
          expect(fish.attractedByBait).toBeDefined();
          expect(fish.baitMultiplier).toBeDefined();

          // Validate ranges
          expect(fish.difficulty).toBeGreaterThanOrEqual(1);
          expect(fish.difficulty).toBeLessThanOrEqual(10);

          // Validate bait multipliers
          const baits: BaitType[] = ['worms', 'cheese', 'corn', 'minnows'];
          baits.forEach(bait => {
            expect(fish.baitMultiplier[bait]).toBeDefined();
            expect(fish.baitMultiplier[bait]).toBeGreaterThan(0);
          });

          // Horror creatures should be night only
          if (fish.isHorror) {
            expect(fish.isNightOnly).toBe(true);
          }
        });
      }),
      { numRuns: 5 }
    );
  });
});

describe('Property 7: Bait Effectiveness on Fish Species', () => {
  it('should have valid bait multipliers for all fish', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        const baits: BaitType[] = ['worms', 'cheese', 'corn', 'minnows'];

        fishData.forEach(fish => {
          baits.forEach(bait => {
            const multiplier = fish.baitMultiplier[bait];
            expect(multiplier).toBeGreaterThan(0);
            expect(multiplier).toBeLessThanOrEqual(2.5);
          });
        });
      }),
      { numRuns: 5 }
    );
  });

  it('should have at least one effective bait per fish', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        fishData.forEach(fish => {
          const multipliers = Object.values(fish.baitMultiplier);
          const maxMultiplier = Math.max(...multipliers);

          // At least one bait should be reasonably effective (>= 1.0)
          expect(maxMultiplier).toBeGreaterThanOrEqual(1.0);
        });
      }),
      { numRuns: 5 }
    );
  });

  it('should have attracted bait list matching multipliers', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        fishData.forEach(fish => {
          // Attracted baits should have higher multipliers
          fish.attractedByBait.forEach(bait => {
            const multiplier = fish.baitMultiplier[bait];
            expect(multiplier).toBeGreaterThanOrEqual(1.0);
          });
        });
      }),
      { numRuns: 5 }
    );
  });

  it('should have room-specific fish availability', () => {
    fc.assert(
      fc.property(
        fc.constantFrom<'day' | 'night'>('day', 'night'),
        (timeOfDay) => {
          const rooms = [
            'lake_shallow_dock',
            'lake_deep_pool',
            'forest_murky_pond',
            'mountain_frozen_lake',
          ];

          rooms.forEach(roomId => {
            const roomFish = getRoomFish(roomId, timeOfDay, false);

            // Each room should have at least one fish available
            expect(roomFish.length).toBeGreaterThan(0);

            // All fish should be valid
            roomFish.forEach(fish => {
              expect(fishData.map(f => f.id)).toContain(fish.id);
            });
          });
        }
      ),
      { numRuns: 10 }
    );
  });

  it('should filter night creatures in peaceful mode for all rooms', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        const rooms = [
          'lake_shallow_dock',
          'forest_murky_pond',
          'mountain_frozen_lake',
        ];

        rooms.forEach(roomId => {
          const peacefulFish = getRoomFish(roomId, 'night', true);

          peacefulFish.forEach(fish => {
            expect(fish.isHorror).toBe(false);
            expect(fish.isNightOnly).toBe(false);
          });
        });
      }),
      { numRuns: 5 }
    );
  });
});
