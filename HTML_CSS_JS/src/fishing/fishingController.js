// Minimal FishingController for the web port
(function(){
  const FishingController = {
    state: 'idle', // idle, ready, casting, bobbing, biting, struggling, reeling
    biteTimer: 0,
    biteDelay: 0,
    isBitingFlag: false,
    castPower: 0.5,
    reelProgress: 0,
    maxReel: 1,
    currentBait: null,
    currentCatch: null,
    totalCatches: 0,
    catchRecorded: false,
    
    // Enhanced fishing mechanics
    difficulty: 0.5, // 0-1, affects bite frequency and reel difficulty
    fishStrength: 0.5, // How hard the fish fights
    lineStrength: 1.0, // Degrades as you reel
    reelSpeed: 0, // Current reel speed (player input)
    tension: 0, // Line tension (0-1)
    
    rng(min,max){ return min + Math.random()*(max-min) },
    init(){ 
      this.state = 'idle'; 
      this.currentBait = window.SelectedBait || 'worms'; 
      window.SelectedBait = window.SelectedBait || 'worms'; 
      this.biteTimer = 0; 
      this.isBitingFlag = false; 
      this.reelProgress = 0; 
      this.totalCatches = 0; 
      this.catchRecorded = false;
      this.lineStrength = 1.0;
      this.tension = 0;
    },
    reset(){ 
      this.state = 'idle'; 
      this.currentBait = window.SelectedBait || 'worms'; 
      window.SelectedBait = window.SelectedBait || 'worms'; 
      this.biteTimer = 0; 
      this.isBitingFlag = false; 
      this.reelProgress = 0; 
      this.currentCatch = null; 
      this.totalCatches = 0; 
      this.catchRecorded = false;
      this.lineStrength = 1.0;
      this.tension = 0;
    },
    
    // Select a fish based on current room and time of day
    selectFishForCurrentLocation() {
      if (!window.FishData || !window.RoomData) return null;
      
      const currentRoom = window.GameState ? window.GameState.currentRoom : 'lake_shallow_dock';
      const timeOfDay = window.DayNightCycle ? (window.DayNightCycle.isNight ? 'night' : 'day') : 'day';
      const peacefulMode = window.GameSettings ? window.GameSettings.peacefulMode : false;
      
      // Get available fish for this room
      const availableFish = window.RoomData.getRoomFish(currentRoom, timeOfDay, peacefulMode);
      
      if (availableFish.length === 0) {
        // Fallback to day fish if no room-specific fish
        return window.FishData.getDayFish()[0];
      }
      
      // Select a random fish from available options, weighted by bait multiplier
      const currentBait = this.currentBait || 'worms';
      let totalWeight = 0;
      const weights = availableFish.map(f => {
        const multiplier = f.baitMultiplier[currentBait] || 1.0;
        totalWeight += multiplier;
        return { fish: f, weight: multiplier };
      });
      
      let roll = Math.random() * totalWeight;
      let current = 0;
      for (const { fish, weight } of weights) {
        current += weight;
        if (roll <= current) {
          return fish;
        }
      }
      
      return availableFish[0];
    },
    update(dt){
      // don't progress while menus open
      if(window.menuActive) return

      // Update line tension (fish pulling)
      if(this.state === 'reeling' || this.state === 'struggling'){
        this.tension = Math.max(0, this.tension - dt * 0.5); // Tension decreases over time
        if(this.currentCatch){
          this.fishStrength = this.currentCatch.difficulty || 0.5;
          this.tension = Math.min(1, this.tension + dt * this.fishStrength * 0.3);
        }
      }

      if(this.state === 'bobbing'){
        // Use BiteDetection if available for weather/bait influences
        if(window.BiteDetection && window.BiteDetection.update){
          const weatherData = (window.Weather && window.Weather.getWeatherData) ? window.Weather.getWeatherData() : null
          const res = window.BiteDetection.update(dt, weatherData)
          if(res === 'bite_missed'){
            this._setHUD('The bite was missed...')
            try{ if(window.StatisticsSystem && window.StatisticsSystem.recordBiteMissed) window.StatisticsSystem.recordBiteMissed() }catch(e){}
            this.state = 'idle'
          } else if(window.BiteDetection.isBiting && window.BiteDetection.isBiting()){
            this.state = 'biting'
            this.isBitingFlag = true
            this._setHUD('BITE! Press SPACE to hook!')
          }
        } else {
          this.biteTimer = Math.max(0, this.biteTimer - dt)
          if(this.biteTimer <= 0){
            // bite occurs
            this.state = 'biting'
            this.isBitingFlag = true
            this._setHUD('BITE! Press SPACE to hook!')
          }
        }
      }else if(this.state === 'reeling'){
        // Enhanced reeling with tension mechanics
        try{
          const RS = window.ReelingSystem
          const playerIsReeling = false
          const res = RS.updateReeling(dt, this.currentCatch, playerIsReeling)
          if(res === 'line_break'){
            this._setHUD('The line snapped! The fish escaped...')
            try{ if(window.StatisticsSystem && window.StatisticsSystem.recordLineBreak) window.StatisticsSystem.recordLineBreak() }catch(e){}
            try{ if(window.StatisticsSystem && window.StatisticsSystem.recordFishEscaped) window.StatisticsSystem.recordFishEscaped() }catch(e){}
            this._endFishing()
          } else if(res === 'catch_success'){
            this._setHUD('You caught the fish!')
            if(window.ScreenShake && window.ScreenShake.mediumShake) window.ScreenShake.mediumShake()
            if(window.CastingSystem && window.CastingSystem.createSplashEffect){
              const bobberPos = window.CastingSystem.getBobberPosition()
              window.CastingSystem.createSplashEffect(bobberPos[0], bobberPos[1])
            }
            if(!this.catchRecorded){
              this.catchRecorded = true
              try{ if(window.StatisticsSystem && window.StatisticsSystem.recordCatch) window.StatisticsSystem.recordCatch(this.currentCatch && (this.currentCatch.name || this.currentCatch.asset) || 'unknown', null) }catch(e){}
            }
            try{ if(typeof window.showCatchWindow === 'function'){ window.showCatchWindow(this.currentCatch) } }catch(e){}
            this._endFishing()
          } else {
            const prog = Math.min(100, Math.round((RS.getReelProgress ? RS.getReelProgress() : this.reelProgress) ))
            const tensionBar = '█'.repeat(Math.round(this.tension * 10)) + '░'.repeat(10 - Math.round(this.tension * 10))
            this._setHUD(`Reeling... ${prog}% [${tensionBar}]`)
          }
        }catch(e){
          // fallback simple mechanic
          this.reelProgress -= dt * 0.02
          if(this.reelProgress <= 0){ this.reelProgress = 0 }
          if(this.reelProgress >= this.maxReel){ 
            this._setHUD('You caught the fish!')
            if(window.ScreenShake && window.ScreenShake.mediumShake) window.ScreenShake.mediumShake()
            if(window.CastingSystem && window.CastingSystem.createSplashEffect){
              const bobberPos = window.CastingSystem.getBobberPosition()
              window.CastingSystem.createSplashEffect(bobberPos[0], bobberPos[1])
            }
            if(!this.catchRecorded){
              this.catchRecorded = true
              try{ if(window.StatisticsSystem && window.StatisticsSystem.recordCatch) window.StatisticsSystem.recordCatch(this.currentCatch && (this.currentCatch.name || this.currentCatch.asset) || 'unknown', null) }catch(e){}
            }
            this._endFishing() 
          }
        }
      }
      else if(this.state === 'struggling'){
        // handle brief fish struggle phase using ReelingSystem
        try{
          const RS = window.ReelingSystem
          // player isn't automatically reeling during struggle unless they press SPACE
          const res = RS.updateStruggling(dt, false)
          if(res === 'line_break'){
            this._setHUD('The line snapped during the struggle! The fish escaped...')
            try{ if(window.StatisticsSystem && window.StatisticsSystem.recordLineBreak) window.StatisticsSystem.recordLineBreak() }catch(e){}
            try{ if(window.StatisticsSystem && window.StatisticsSystem.recordFishEscaped) window.StatisticsSystem.recordFishEscaped() }catch(e){}
            this._endFishing()
          } else if(res === 'start_reeling'){
            // transition to reeling phase
            this.state = 'reeling'
            this._setHUD('Start reeling! Press SPACE repeatedly to reel.')
          } else {
            // still struggling: update HUD with intensity
            const intensity = Math.max(0, Math.round((RS.getStrugglingIntensity ? RS.getStrugglingIntensity() : 0)))
            this._setHUD('Fish hooked! Brief struggle... (' + intensity + ')')
          }
        }catch(e){
          // fallback: after a short timeout move to reeling
          this._setHUD('Fish hooked! Brief struggle...')
          setTimeout(()=>{ if(this.state === 'struggling') this.state = 'reeling'; this._setHUD('Start reeling! Press SPACE repeatedly to reel.') }, 1500)
        }
      }
    },
    startBobbing(){
      // Use BiteDetection system if present so bait/weather matter
      const bait = window.SelectedBait || this.currentBait
      if(window.BiteDetection && window.BiteDetection.startBiteTimer){
        // let BiteDetection decide a random delay and use weather in its update
        window.BiteDetection.startBiteTimer()
        // if bait modifies delay, we can nudge it by forcing a shorter timer
        if(bait === 'minnows') window.BiteDetection.biteDelay *= 0.6
        if(bait === 'worms') window.BiteDetection.biteDelay *= 1.0
        if(bait === 'cheese') window.BiteDetection.biteDelay *= 1.2
        if(bait === 'corn') window.BiteDetection.biteDelay *= 1.1
      } else {
        // fallback
        const bait = window.SelectedBait || this.currentBait
        let delay = this.rng(3,8)
        if(bait === 'minnows') delay *= 0.6
        if(bait === 'worms') delay *= 1.0
        if(bait === 'cheese') delay *= 1.2
        if(bait === 'corn') delay *= 1.1
        this.biteDelay = delay
        this.biteTimer = delay
      }
    },
    toggleCasting(){
      if(this.state === 'idle'){
        this.state = 'ready'
        this._setHUD('READY: Press SPACE again to cast')
        return true
      }
      return false
    },
    // We'll expose explicit methods used by UI:
    enterReady(){ this.state = 'ready'; this._setHUD('READY: Press SPACE again to cast') },
    cast(){ 
      if(this.state === 'ready'){
        this.state = 'casting';
        this._setHUD('Casting... Hold to build power')
        // start casting power in CastingSystem if available
        if(window.CastingSystem && window.CastingSystem.startCasting) window.CastingSystem.startCasting()
        // Play cast sound
        if(window.SoundEffects && window.SoundEffects.playFishingSound) window.SoundEffects.playFishingSound('cast')
      }
    },
    // finalize the cast (called when player confirms power)
    finalizeCast(){
      if(this.state === 'casting'){
        const rodX = (window.Player && window.Player.x) ? window.Player.x : 400
        const rodY = (window.Player && window.Player.y) ? window.Player.y : 300
        const bait = window.SelectedBait || this.currentBait
        if(window.CastingSystem && window.CastingSystem.cast){
          const ok = window.CastingSystem.cast(rodX, rodY, bait)
          if(ok){
            // record cast and bait usage in statistics if available
            try{ if(window.StatisticsSystem && window.StatisticsSystem.recordCast) window.StatisticsSystem.recordCast() }catch(e){}
            try{ if(window.StatisticsSystem && window.StatisticsSystem.recordBaitUsed) window.StatisticsSystem.recordBaitUsed(bait) }catch(e){}
            this.state = 'bobbing'
            this.startBobbing()
            this._setHUD('Waiting for a bite...')
            return true
          } else {
            this._setHUD('Select bait first (B)')
            this.state = 'idle'
            return false
          }
        }
        // fallback: immediate bobbing
        this.state = 'bobbing'
        this.startBobbing()
        return true
      }
      return false
    },
    attemptHookSet(){
      if(this.state === 'biting'){
        // chance to hook depends on random and bait
        const bait = window.SelectedBait || this.currentBait
        let chance = 0.7
        if(bait === 'cheese') chance = 0.6
        if(bait === 'minnows') chance = 0.9
        if(bait === 'corn') chance = 0.5
        if(bait === 'worms') chance = 0.75
        const roll = Math.random()
        if(roll < chance){
          // hooked: select an actual fish from FishData if available
          let selected = null
          try{
            const baitObj = (window.BaitSystem && window.BaitSystem.getCurrentBait) ? window.BaitSystem.getCurrentBait() : (window.SelectedBait || null)
            if(window.FishData && window.FishData.selectFish){
              selected = window.FishData.selectFish(window.DayNightCycle || null, baitObj)
            }
          }catch(e){ selected = null }
          this.currentCatch = selected || { difficulty: 1 }
          // Play hook sound
          if(window.SoundEffects && window.SoundEffects.playFishingSound) window.SoundEffects.playFishingSound('hook')
          // start struggling via ReelingSystem if available
          if(window.ReelingSystem && window.ReelingSystem.startStruggling){
            window.ReelingSystem.startStruggling(this.currentCatch)
            this.state = 'struggling'
            this._setHUD('Fish hooked! Brief struggle...')
          } else {
            this.state = 'reeling'
            this.reelProgress = 0.2
            this.maxReel = 1
            this._setHUD('HOOKED! Reel the fish (Press SPACE rapidly)')
          }
          this.isBitingFlag = false
          return true
        }else{
          this._setHUD('The fish got away...')
          try{ if(window.StatisticsSystem && window.StatisticsSystem.recordBiteMissed) window.StatisticsSystem.recordBiteMissed() }catch(e){}
          this._endFishing()
          return false
        }
      }
      return false
    },
    manualReel(){
      if(this.state === 'reeling'){
        // delegate to ReelingSystem when available
        if(window.ReelingSystem && window.ReelingSystem.manualReel){
          window.ReelingSystem.manualReel()
          const prog = Math.min(100, Math.round(window.ReelingSystem.getReelProgress ? window.ReelingSystem.getReelProgress() : this.reelProgress))
          this._setHUD('Reeling... ' + prog + '%')
        } else {
          this.reelProgress += 0.12
          this.reelProgress = Math.min(this.reelProgress, this.maxReel)
          this._setHUD('Reeling... ' + Math.round(this.reelProgress*100) + '%')
        }
      }
    },
    // Reeling getters
    getLineStress(){ return (window.ReelingSystem && window.ReelingSystem.getLineStress) ? window.ReelingSystem.getLineStress() : 0 },
    getMaxLineStress(){ return (window.ReelingSystem && window.ReelingSystem.getMaxLineStress) ? window.ReelingSystem.getMaxLineStress() : 100 },
    getReelProgress(){ return (window.ReelingSystem && window.ReelingSystem.getReelProgress) ? window.ReelingSystem.getReelProgress() : this.reelProgress },
    getMaxReelProgress(){ return (window.ReelingSystem && window.ReelingSystem.getMaxReelProgress) ? window.ReelingSystem.getMaxReelProgress() : 100 },
    isFishPulling(){ return (window.ReelingSystem && window.ReelingSystem.isFishPulling) ? window.ReelingSystem.isFishPulling() : false },
    getStrugglingIntensity(){ return (window.ReelingSystem && window.ReelingSystem.getStrugglingIntensity) ? window.ReelingSystem.getStrugglingIntensity() : 0 },
    getCurrentCatch(){ return this.currentCatch },
    getTotalCatches(){ return this.totalCatches },
    isBiting(){ return this.isBitingFlag },
    getState(){ return this.state },
    getCurrentBait(){ return window.SelectedBait || this.currentBait },
    forceBite(){ if(this.state === 'bobbing'){ this.biteTimer = 0 } },
    _setHUD(msg){
      try{ const el = document.getElementById('fishing-hud'); if(el) el.textContent = msg }catch(e){}
    },
    _endFishing(){
      setTimeout(()=>{ this.state = 'idle'; this._setHUD(''); this.isBitingFlag = false; this.reelProgress = 0 }, 900)
    }
  }

  // expose
  if(typeof window !== 'undefined') window.FishingController = window.FishingController || FishingController
  if(typeof module !== 'undefined') module.exports = FishingController
})();
