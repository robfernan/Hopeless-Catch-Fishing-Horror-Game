// FishData.js - Enhanced fish data ported from Lovable/src/data/fishData.ts
(function(){
  // Fish data with full properties matching Lovable version
  const fishData = [
    // Day Fish (5 species)
    {
      id: 'sunfish',
      name: 'Sunfish',
      image: 'assets/fish/sunfish.png',
      rarity: 'common',
      isNightOnly: false,
      isHorror: false,
      description: 'A cheerful golden fish that loves the sun.',
      horrorDescription: null,
      tensionPattern: 'steady',
      difficulty: 2,
      attractedByBait: ['worms', 'corn'],
      baitMultiplier: { worms: 1.5, corn: 1.2, minnows: 0.5, cheese: 0.3 }
    },
    {
      id: 'bass',
      name: 'Bass',
      image: 'assets/fish/bass.png',
      rarity: 'common',
      isNightOnly: false,
      isHorror: false,
      description: 'A sturdy fish, popular among anglers.',
      horrorDescription: null,
      tensionPattern: 'aggressive',
      difficulty: 4,
      attractedByBait: ['minnows', 'worms'],
      baitMultiplier: { worms: 1.0, corn: 0.5, minnows: 1.8, cheese: 0.4 }
    },
    {
      id: 'trout',
      name: 'Trout',
      image: 'assets/fish/trout.png',
      rarity: 'uncommon',
      isNightOnly: false,
      isHorror: false,
      description: 'A sleek, quick fish that prefers cold water.',
      horrorDescription: null,
      tensionPattern: 'erratic',
      difficulty: 5,
      attractedByBait: ['minnows', 'worms'],
      baitMultiplier: { worms: 1.2, corn: 0.3, minnows: 1.6, cheese: 0.2 }
    },
    {
      id: 'catfish',
      name: 'Catfish',
      image: 'assets/fish/catfish.png',
      rarity: 'uncommon',
      isNightOnly: false,
      isHorror: false,
      description: 'A bottom-dweller with long whiskers. Mostly harmless.',
      horrorDescription: null,
      tensionPattern: 'passive',
      difficulty: 3,
      attractedByBait: ['cheese', 'worms'],
      baitMultiplier: { worms: 1.3, corn: 0.6, minnows: 0.8, cheese: 1.7 }
    },
    {
      id: 'golden_carp',
      name: 'Golden Carp',
      image: 'assets/fish/golden_carp.png',
      rarity: 'rare',
      isNightOnly: false,
      isHorror: false,
      description: 'A shimmering golden fish said to bring good fortune.',
      horrorDescription: null,
      tensionPattern: 'steady',
      difficulty: 7,
      attractedByBait: ['corn', 'cheese'],
      baitMultiplier: { worms: 0.8, corn: 1.5, minnows: 0.5, cheese: 1.2 }
    },
    // Night Creatures (4 species)
    {
      id: 'pale_crawler',
      name: 'Pale Crawler',
      image: 'assets/fish/pale_crawler.png',
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
    {
      id: 'bleeding_carp',
      name: 'Bleeding Carp',
      image: 'assets/fish/bleeding_carp.png',
      rarity: 'rare',
      isNightOnly: true,
      isHorror: true,
      description: 'A fish that shouldn\'t exist.',
      horrorDescription: 'It bleeds constantly, yet lives. The water around it turns red.',
      tensionPattern: 'aggressive',
      difficulty: 8,
      attractedByBait: ['cheese', 'worms'],
      baitMultiplier: { worms: 1.4, corn: 0.1, minnows: 0.9, cheese: 1.6 }
    },
    {
      id: 'whispering_eel',
      name: 'Whispering Eel',
      image: 'assets/fish/whispering_eel.png',
      rarity: 'rare',
      isNightOnly: true,
      isHorror: true,
      description: 'You hear it before you see it.',
      horrorDescription: 'It whispers in a language you almost understand. Your mind aches.',
      tensionPattern: 'erratic',
      difficulty: 9,
      attractedByBait: ['minnows', 'worms'],
      baitMultiplier: { worms: 1.2, corn: 0.3, minnows: 1.7, cheese: 0.4 }
    },
    {
      id: 'fishman',
      name: 'The Fishman',
      image: 'assets/fish/fishman.png',
      rarity: 'legendary',
      isNightOnly: true,
      isHorror: true,
      description: 'They say it was once human.',
      horrorDescription: 'The boss of the deep waters. It watches you. It has always been watching.',
      tensionPattern: 'aggressive',
      difficulty: 10,
      attractedByBait: ['minnows'],
      baitMultiplier: { worms: 0.5, corn: 0.1, minnows: 2.0, cheese: 0.3 }
    }
  ];

  // FishData module with helper functions
  const FishData = {
    // Raw fish data array
    fishData: fishData,

    // Legacy arrays for backward compatibility
    dayFish: fishData.filter(f => !f.isNightOnly),
    nightFish: fishData.filter(f => f.isNightOnly),

    // Get fish by ID
    getFishById(id) {
      return fishData.find(f => f.id === id);
    },

    // Get all fish
    getAllFish() {
      return fishData;
    },

    // Get day fish (fish where isNightOnly === false)
    getDayFish() {
      return fishData.filter(f => !f.isNightOnly);
    },

    // Get night fish (fish where isNightOnly === true)
    getNightFish() {
      return fishData.filter(f => f.isNightOnly);
    },

    // Get available fish based on time of day and peaceful mode
    getAvailableFish(timeOfDay, peacefulMode) {
      // In peaceful mode, always return only day fish
      if (peacefulMode) {
        return this.getDayFish();
      }
      
      // At night without peaceful mode, return day fish + night fish
      if (timeOfDay === 'night') {
        return fishData;
      }
      
      // During day, return only day fish
      return this.getDayFish();
    },

    // Legacy method for backward compatibility
    getFishPool(isNight, isPeacefulMode) {
      if (isPeacefulMode) return this.dayFish;
      return isNight ? this.nightFish : this.dayFish;
    },

    // Select a fish based on time, bait, and weights
    selectFish(dayNightCycle, currentBait) {
      const isNight = dayNightCycle && typeof dayNightCycle.isNight === 'function' ? dayNightCycle.isNight() : false;
      const isPeacefulMode = window.GameSettings && window.GameSettings.peacefulMode ? true : false;
      const baitType = currentBait || 'worms';
      
      // Get available fish pool
      const fishPool = isPeacefulMode 
        ? fishData.filter(f => !f.isNightOnly)
        : (isNight ? fishData : fishData.filter(f => !f.isNightOnly));
      
      // Calculate weights based on bait multipliers
      let totalWeight = 0;
      const weights = fishPool.map(f => {
        const multiplier = f.baitMultiplier[baitType] || 1.0;
        const weight = multiplier;
        totalWeight += weight;
        return { fish: f, weight };
      });
      
      // Roll for fish selection
      let roll = Math.random() * totalWeight;
      let current = 0;
      for (const { fish, weight } of weights) {
        current += weight;
        if (roll <= current) {
          return {
            id: fish.id,
            name: fish.name,
            type: fish.id,
            image: fish.image,
            description: fish.isHorror && fish.horrorDescription ? fish.horrorDescription : fish.description,
            difficulty: fish.difficulty,
            rarity: fish.rarity,
            isHorror: fish.isHorror,
            tensionPattern: fish.tensionPattern,
            attractedByBait: fish.attractedByBait,
            baitMultiplier: fish.baitMultiplier
          };
        }
      }
      
      // Fallback to first fish
      const f = fishPool[0];
      return {
        id: f.id,
        name: f.name,
        type: f.id,
        image: f.image,
        description: f.isHorror && f.horrorDescription ? f.horrorDescription : f.description,
        difficulty: f.difficulty,
        rarity: f.rarity,
        isHorror: f.isHorror,
        tensionPattern: f.tensionPattern,
        attractedByBait: f.attractedByBait,
        baitMultiplier: f.baitMultiplier
      };
    }
  };

  // Export for browser and Node.js
  if (typeof window !== 'undefined') window.FishData = window.FishData || FishData;
  if (typeof module !== 'undefined') module.exports = FishData;
})();
