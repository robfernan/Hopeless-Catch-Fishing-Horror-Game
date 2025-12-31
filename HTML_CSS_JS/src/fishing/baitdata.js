// BaitData.js - Bait data ported from Lovable/src/data/baitData.ts
(function(){
  // Bait data with all 4 bait types
  const baitData = [
    {
      type: 'cheese',
      name: 'Cheese',
      image: 'assets/bait/cheese.png',
      description: 'Attracts curious fish.'
    },
    {
      type: 'corn',
      name: 'Corn',
      image: 'assets/bait/corn.png',
      description: 'Sweet and effective.'
    },
    {
      type: 'minnows',
      name: 'Minnows',
      image: 'assets/bait/minnows.png',
      description: 'Live bait for bigger catches.'
    },
    {
      type: 'worms',
      name: 'Worms',
      image: 'assets/bait/worms.png',
      description: 'Classic fishing bait.'
    }
  ];

  // BaitData module with helper functions
  const BaitData = {
    // Raw bait data array
    baitData: baitData,

    // Get all baits
    getAllBaits() {
      return baitData;
    },

    // Get bait by type
    getBaitByType(type) {
      return baitData.find(b => b.type === type);
    }
  };

  // Export for browser and Node.js
  if (typeof window !== 'undefined') window.BaitData = window.BaitData || BaitData;
  if (typeof module !== 'undefined') module.exports = BaitData;
})();
