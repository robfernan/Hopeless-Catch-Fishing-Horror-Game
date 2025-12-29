// BaitSystem.js - port of fishing/baitsystem.lua
(function(){
  const BaitSystem = {
    currentBait: null,
    showTacklebox: false,
    selectedBaitIndex: 0,
    tackleboxScrollOffset: 0,
    baitInventory: [
      { name: 'Worms', type: 'basic', attraction: 1.0, asset: 'bait_worms' },
      { name: 'Minnows', type: 'live', attraction: 1.5, asset: 'bait_minnows' },
      { name: 'Cheese', type: 'basic', attraction: 0.8, asset: 'bait_cheese' },
      { name: 'Corn', type: 'basic', attraction: 0.7, asset: 'bait_corn' }
    ],
    init(){ this.currentBait = this.baitInventory[0]; this.showTacklebox = false; this.selectedBaitIndex = 0; this.tackleboxScrollOffset = 0 },
    getBaitInventory(){ return this.baitInventory },
    getCurrentBait(){ return this.currentBait },
    getBaitCount(baitType){ return 999 },
    useBait(baitItem){ return true },
    selectBait(index){ if(this.baitInventory[index]){ this.currentBait = this.baitInventory[index]; this.selectedBaitIndex = index; return true } return false },
    // Select a bait by a name/key. Only allowed when the tacklebox is open so
    // UI-driven selection can't be done from gameplay code unexpectedly.
    selectBaitByName(name){
      // respect the tacklebox visibility: either the internal flag or global UI flag
      const tackleOpen = this.showTacklebox || (typeof window !== 'undefined' && !!window.tackleboxOpen)
      if(!tackleOpen) return false
      if(!name) return false
      const key = name.toString().toLowerCase()
      const idx = this.baitInventory.findIndex(b => {
        return ((b.name||'').toString().toLowerCase() === key) || ((b.asset||'').toString().toLowerCase() === key) || ((b.type||'').toString().toLowerCase() === key)
      })
      if(idx >= 0) return this.selectBait(idx)
      return false
    },
    consumeBait(){ if(this.currentBait && this.currentBait.count > 0){ this.currentBait.count--; return true } return false },
    getBaitModifiers(){ if(!this.currentBait) return { attraction: 0.5 }; return { attraction: this.currentBait.attraction } },
    toggleTacklebox(){ this.showTacklebox = !this.showTacklebox; if(this.showTacklebox){ this.selectedBaitIndex = 0; this.tackleboxScrollOffset = 0 } return this.showTacklebox },
    isTackleboxOpen(){ return this.showTacklebox },
    navigateTackleboxUp(){ if(this.selectedBaitIndex > 0) this.selectedBaitIndex-- },
    navigateTackleboxDown(){ if(this.selectedBaitIndex < this.baitInventory.length-1) this.selectedBaitIndex++ },
    selectTackleboxBait(){ return this.selectBait(this.selectedBaitIndex) }
  }

  if(typeof window !== 'undefined') window.BaitSystem = window.BaitSystem || BaitSystem
  if(typeof module !== 'undefined') module.exports = BaitSystem
})();
