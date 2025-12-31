// Progression system types for abilities and unlocks

export type AbilityId = 'deep_cast' | 'precision_cast' | 'night_vision' | 'swim';

export interface AbilityUnlockRequirement {
  type: 'catches' | 'fish' | 'night_creature';
  count?: number;
  fishId?: string;
}

export interface AbilityDefinition {
  id: AbilityId;
  name: string;
  description: string;
  unlockRequirement: AbilityUnlockRequirement;
  effect: string;
  icon?: string;
}

// All abilities in the game
export const ABILITIES: AbilityDefinition[] = [
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

// Helper to get ability by id
export function getAbility(id: AbilityId): AbilityDefinition | undefined {
  return ABILITIES.find(a => a.id === id);
}

// Check if unlock requirement is met
export function isAbilityUnlockMet(
  ability: AbilityDefinition,
  totalCatches: number,
  caughtFish: string[],
  nightCreaturesCaught: number
): boolean {
  const req = ability.unlockRequirement;
  
  switch (req.type) {
    case 'catches':
      return totalCatches >= (req.count || 0);
    case 'fish':
      return req.fishId ? caughtFish.includes(req.fishId) : false;
    case 'night_creature':
      return nightCreaturesCaught >= (req.count || 0);
    default:
      return false;
  }
}
