// FishData.js - port of fishing/fishdata.lua
(function(){
  const FishData = {
    dayFish: [
      { name: 'Sunfish', description: 'A small, peaceful fish that glints in the sunlight. Brings joy to any angler.', rarity: 0.8, difficulty: 1, asset: 'fish_sunfish', lore: 'Common and friendly, these fish are a delight to catch.' },
      { name: 'Bass', description: 'A common freshwater fish, nothing unusual about it. A reliable catch.', rarity: 0.6, difficulty: 2, asset: 'fish_bass', lore: 'Bass are known for their strength and fighting spirit.' },
      { name: 'Trout', description: 'A beautiful fish with spotted sides. Elegant and graceful.', rarity: 0.4, difficulty: 2, asset: 'fish_trout', lore: 'Trout are prized for their beauty and delicate nature.' },
      { name: 'Catfish', description: 'A bottom feeder with whiskers. Strange but fascinating.', rarity: 0.5, difficulty: 3, asset: 'fish_catfish', lore: 'Catfish are mysterious creatures of the deep.' },
      { name: 'Golden Carp', description: 'A rare, beautiful golden fish that brings good fortune. Shimmers with an otherworldly glow.', rarity: 0.1, difficulty: 4, asset: 'fish_golden_carp', lore: 'Legend says the Golden Carp grants wishes to those pure of heart.' }
    ],
    nightFish: [
      { name: 'Pale Crawler', description: 'A mysterious pale fish that only comes out at night. What could cause such appearance?', rarity: 0.5, difficulty: 3, asset: 'fish_pale_crawler', lore: 'The Pale Crawler appears only in darkness. Its origins are unknown.' },
      { name: 'Bleeding Carp', description: 'An unusual carp with strange red markings. What happened to this fish?', rarity: 0.3, difficulty: 4, asset: 'fish_bleeding_carp', lore: 'The Bleeding Carp bears mysterious wounds. What attacked it?' },
      { name: 'Whispering Eel', description: 'A long, slender eel that seems to move with purpose. Almost intelligent.', rarity: 0.2, difficulty: 5, asset: 'fish_whispering_eel', lore: 'The Whispering Eel moves with deliberate intent. Is it truly just a fish?' },
      { name: 'Fishman', description: 'Something that shouldn\'t exist... but does. The ultimate mystery of the lake.', rarity: 0.05, difficulty: 6, asset: 'fish_fishman', lore: 'The Fishman is a legend. Some say it\'s a curse. Others say it\'s a guardian.' }
    ],
    getFishPool(isNight, isPeacefulMode){ 
      // In peaceful mode, only return day fish (no night creatures)
      if (isPeacefulMode) return this.dayFish;
      return isNight ? this.nightFish : this.dayFish;
    },
    getAllFish(){ return this.dayFish.concat(this.nightFish) },
    selectFish(dayNightCycle, currentBait){
      const isNight = dayNightCycle && typeof dayNightCycle.isNight === 'function' ? dayNightCycle.isNight() : false
      const isPeacefulMode = window.GameSettings && window.GameSettings.peacefulMode ? true : false
      const fishPool = this.getFishPool(isNight, isPeacefulMode)
      // compute total weight
      let totalWeight = 0
      for(const f of fishPool) totalWeight += f.rarity
      let roll = Math.random() * totalWeight
      let current = 0
      for(const f of fishPool){ 
        current += f.rarity
        if(roll <= current){ 
          return { 
            name: f.name, 
            type: f.asset, 
            description: f.description, 
            difficulty: f.difficulty, 
            rarity: f.rarity < 0.3 ? 'rare' : (f.rarity < 0.6 ? 'uncommon' : 'common'),
            lore: f.lore
          } 
        } 
      }
      // fallback
      const f = fishPool[0]
      return { 
        name: f.name, 
        type: f.asset, 
        description: f.description, 
        difficulty: f.difficulty, 
        rarity: f.rarity < 0.3 ? 'rare' : (f.rarity < 0.6 ? 'uncommon' : 'common'),
        lore: f.lore
      }
    }
  }

  if(typeof window !== 'undefined') window.FishData = window.FishData || FishData
  if(typeof module !== 'undefined') module.exports = FishData
})();
