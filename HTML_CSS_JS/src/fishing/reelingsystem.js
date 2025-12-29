// ReelingSystem.js — ported from reelingsystem.lua (simplified)
(function(){
  const ReelingSystem = {
    lineStress: 0,
    maxLineStress: 100,
    reelProgress: 0,
    fishPulling: false,
    fishPullTimer: 0,
    fishPullDuration: 2.0,
    strugglingIntensity: 0,
    fishResistance: 0,
    init(){ this.lineStress = 0; this.reelProgress = 0; this.fishPulling = false; this.fishPullTimer = 0; this.fishPullDuration = 2.0; this.strugglingIntensity = 0; this.fishResistance = 0 },
    reset(){ this.lineStress = 0; this.reelProgress = 0; this.fishPulling = false; this.fishPullTimer = 0; this.fishPullDuration = 2.0; this.strugglingIntensity = 0; this.fishResistance = 0 },
    startStruggling(currentCatch){
      if(currentCatch){
        // shorter struggle: intensity scaled by difficulty
        this.strugglingIntensity = (currentCatch.difficulty || 1) * (3 + Math.floor(Math.random()*6)) // 3-8 seconds
        this.fishResistance = this.strugglingIntensity
        this.lineStress = 0
        this.reelProgress = 0
        this.fishPulling = false
        this.fishPullTimer = 0
        return true
      }
      return false
    },
    updateStruggling(dt, playerIsReeling){
      // If player reels during struggling, fish fights harder
      const oldIntensity = this.strugglingIntensity
      if(playerIsReeling){
        this.strugglingIntensity += dt * 5
        this.lineStress += dt * 10
      } else {
        this.strugglingIntensity = Math.max(0, this.strugglingIntensity - dt * 1.5)
        this.lineStress = Math.max(0, this.lineStress - dt * 5)
      }

      if(this.lineStress >= this.maxLineStress){
        if(playerIsReeling){
          return 'line_break'
        } else {
          this.lineStress = this.maxLineStress * 0.9
        }
      }

      if(this.strugglingIntensity <= 0){
        // prepare for reeling phase
        this.lineStress = Math.min(20, this.lineStress)
        return 'start_reeling'
      }

      return 'continue_struggling'
    },
    updateReeling(dt, currentCatch, playerIsReeling){
      if(!currentCatch) return 'line_break'
      this.fishPullTimer += dt
      const pullInterval = 3 + (currentCatch.difficulty || 1)
      if(this.fishPullTimer > pullInterval){ this.fishPulling = true; this.fishPullTimer = 0 }

      if(this.fishPulling){
        this.fishPullDuration -= dt
        if(this.fishPullDuration <= 0){ this.fishPulling = false; this.fishPullDuration = 1 + (currentCatch.difficulty || 1) * 0.5 }
      }

      if(playerIsReeling){
        if(this.fishPulling){
          this.lineStress += 40 * dt
        } else if(this.lineStress < this.maxLineStress * 0.8){
          const reelingSpeed = 15 - (currentCatch.difficulty || 1) * 2
          this.reelProgress += reelingSpeed * dt
          this.lineStress += 6 * dt
        }
      } else {
        const fishStrength = 8 + (currentCatch.difficulty || 1) * 1.5
        if(this.fishPulling){ this.reelProgress = Math.max(0, this.reelProgress - fishStrength * 1.5 * dt) }
        else { this.reelProgress = Math.max(0, this.reelProgress - fishStrength * 0.7 * dt) }
      }

      if(!playerIsReeling || !this.fishPulling) this.lineStress = Math.max(0, this.lineStress - 20 * dt)

      if(this.lineStress >= this.maxLineStress) return 'line_break'
      if(this.reelProgress >= 100) return 'catch_success'
      return 'continue_reeling'
    },
    pullLine(){ this.lineStress = Math.max(0, this.lineStress - 15); this.strugglingIntensity = Math.max(0, this.strugglingIntensity - 10) },
    manualReel(){ if(this.lineStress < this.maxLineStress * 0.8){ this.reelProgress += 5; this.lineStress += 3 } },
    // getters
    getLineStress(){ return this.lineStress },
    getMaxLineStress(){ return this.maxLineStress },
    getReelProgress(){ return this.reelProgress },
    getMaxReelProgress(){ return 100 },
    isFishPulling(){ return this.fishPulling },
    getStrugglingIntensity(){ return this.strugglingIntensity }
  }

  if(typeof window !== 'undefined') window.ReelingSystem = window.ReelingSystem || ReelingSystem
  if(typeof module !== 'undefined') module.exports = ReelingSystem
})();
