// gamestate.js - Game state and progression system
(function(){
  const GameState = {
    state: 'menu', // 'menu' | 'playing' | 'paused'
    listeners: [],
    
    // Progression system
    progression: {
      totalCatches: 0,
      uniqueFishCaught: [],
      companionLevel: 1,
      companionBond: 0,
      gearLevel: 1, // Rod quality
      unlockedLocations: ['lake'], // Start with lake
      discoveredLore: [],
      playtime: 0,
      legendarysCaught: 0
    },
    
    init(){ 
      this.state = 'menu'; 
      this._broadcast(); 
      if(typeof window !== 'undefined') window.menuActive = true;
      this._loadProgression();
    },
    
    getState(){ return this.state },
    setState(s){ if(this.state === s) return; this.state = s; this._onStateChange(); },
    enterMenu(){ this.setState('menu') },
    enterPlaying(){ this.setState('playing') },
    enterPaused(){ this.setState('paused') },
    togglePause(){ if(this.state === 'paused') this.enterPlaying(); else this.enterPaused() },
    isPaused(){ return this.state === 'paused' },
    
    // Progression methods
    recordCatch(fishName, isLegendary){
      this.progression.totalCatches++;
      if(!this.progression.uniqueFishCaught.includes(fishName)){
        this.progression.uniqueFishCaught.push(fishName);
      }
      if(isLegendary){
        this.progression.legendarysCaught++;
        this.progression.companionBond += 50; // Big bond boost for legendary
      } else {
        this.progression.companionBond += 10;
      }
      this._checkUnlocks();
      this._saveProgression();
    },
    
    addLore(loreEntry){
      if(!this.progression.discoveredLore.includes(loreEntry)){
        this.progression.discoveredLore.push(loreEntry);
      }
      this._saveProgression();
    },
    
    upgradGear(){
      this.progression.gearLevel++;
      this._saveProgression();
    },
    
    unlockLocation(location){
      if(!this.progression.unlockedLocations.includes(location)){
        this.progression.unlockedLocations.push(location);
      }
      this._saveProgression();
    },
    
    _checkUnlocks(){
      // Unlock Deep Forest Pond after 5 unique fish
      if(this.progression.uniqueFishCaught.length >= 5){
        this.unlockLocation('forest_pond');
      }
      // Unlock Mountain Stream after discovering lore
      if(this.progression.discoveredLore.length >= 3){
        this.unlockLocation('mountain_stream');
      }
      // Unlock Mysterious Depths after legendary catch
      if(this.progression.legendarysCaught >= 1){
        this.unlockLocation('mysterious_depths');
      }
    },
    
    getProgress(){
      return {
        catches: this.progression.totalCatches,
        uniqueFish: this.progression.uniqueFishCaught.length,
        companionLevel: this.progression.companionLevel,
        companionBond: this.progression.companionBond,
        gearLevel: this.progression.gearLevel,
        legendaries: this.progression.legendarysCaught,
        locations: this.progression.unlockedLocations.length
      };
    },
    
    _saveProgression(){
      try{
        localStorage.setItem('hopeless_catch_progress', JSON.stringify(this.progression));
      }catch(e){}
    },
    
    _loadProgression(){
      try{
        const saved = localStorage.getItem('hopeless_catch_progress');
        if(saved){
          this.progression = JSON.parse(saved);
        }
      }catch(e){}
    },
    
    onChange(cb){ if(typeof cb === 'function') this.listeners.push(cb) },
    _onStateChange(){ this._broadcast(); if(typeof window !== 'undefined'){ window.menuActive = (this.state !== 'playing') } },
    _broadcast(){ for(const cb of this.listeners){ try{ cb(this.state) }catch(e){} } }
  }

  if(typeof window !== 'undefined') window.GameState = window.GameState || GameState
  if(typeof module !== 'undefined') module.exports = GameState
})();
