// StatisticsSystem.js - Track fishing statistics
(function(){
  const StatisticsSystem = {
    stats: {
      totalCatches: 0,
      totalCasts: 0,
      baitUsed: {},
      fishCaught: {},
      bitesMissed: 0,
      linesBroken: 0,
      fishEscaped: 0
    },
    
    init() {
      this.stats = {
        totalCatches: 0,
        totalCasts: 0,
        baitUsed: {},
        fishCaught: {},
        bitesMissed: 0,
        linesBroken: 0,
        fishEscaped: 0
      };
    },
    
    recordCatch(fishName, fishData) {
      // Don't increment here - Journal.recordCatch will handle it
      // This prevents double-counting
      
      // Record in Journal if available
      if (window.Journal && typeof window.Journal.recordCatch === 'function') {
        try {
          window.Journal.recordCatch(fishName, fishData);
        } catch (e) {}
      }
    },
    
    recordCast() {
      this.stats.totalCasts++;
    },
    
    recordBaitUsed(baitName) {
      if (!this.stats.baitUsed[baitName]) {
        this.stats.baitUsed[baitName] = 0;
      }
      this.stats.baitUsed[baitName]++;
      
      // Also record in Journal if available
      if (window.Journal && typeof window.Journal.recordBaitUsed === 'function') {
        try {
          window.Journal.recordBaitUsed(baitName);
        } catch (e) {}
      }
    },
    
    recordBiteMissed() {
      this.stats.bitesMissed++;
      
      if (window.Journal && typeof window.Journal.recordBiteMissed === 'function') {
        try {
          window.Journal.recordBiteMissed();
        } catch (e) {}
      }
    },
    
    recordLineBreak() {
      this.stats.linesBroken++;
      
      if (window.Journal && typeof window.Journal.recordLineBreak === 'function') {
        try {
          window.Journal.recordLineBreak();
        } catch (e) {}
      }
    },
    
    recordFishEscaped() {
      this.stats.fishEscaped++;
      
      if (window.Journal && typeof window.Journal.recordFishEscaped === 'function') {
        try {
          window.Journal.recordFishEscaped();
        } catch (e) {}
      }
    },
    
    getStats() {
      // Return Journal stats if available (single source of truth)
      if (window.Journal && typeof window.Journal.getStats === 'function') {
        return window.Journal.getStats();
      }
      return this.stats;
    },
    
    getTotalCatches() {
      if (window.Journal && typeof window.Journal.getTotalCatches === 'function') {
        return window.Journal.getTotalCatches();
      }
      return this.stats.totalCatches;
    },
    
    getTotalCasts() {
      if (window.Journal && typeof window.Journal.getStats === 'function') {
        return window.Journal.getStats().totalCasts;
      }
      return this.stats.totalCasts;
    },
    
    getCatchCount(fishName) {
      if (window.Journal && typeof window.Journal.getCatchCount === 'function') {
        return window.Journal.getCatchCount(fishName);
      }
      return this.stats.fishCaught[fishName] || 0;
    },
    
    getBaitUsedCount(baitName) {
      return this.stats.baitUsed[baitName] || 0;
    }
  };
  
  if (typeof window !== 'undefined') window.StatisticsSystem = window.StatisticsSystem || StatisticsSystem;
  if (typeof module !== 'undefined') module.exports = StatisticsSystem;
})();
