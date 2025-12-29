// fishing.js - connector that mirrors the original Lua `fishing.lua`
(function(){
  const Fishing = {
    init(){ if(window.FishingController && window.FishingController.init) window.FishingController.init() },
    update(dt){
      // pass through weather/daynight if available
      const Weather = window.Weather || null
      const DayNight = window.DayNightCycle || null
      const weatherData = Weather && Weather.getWeatherData ? Weather.getWeatherData() : null
      if(window.FishingController && window.FishingController.update) window.FishingController.update(dt, weatherData, DayNight)
    },
    draw(ctx){
      // if controller not idle, draw rod and call CastingSystem.draw
      try{
        const FC = window.FishingController
        if(!FC) return
        if(FC.getState && FC.getState() !== 'idle'){
          const player = window.Player || { x: 400, y: 300, w:16, h:32 }
          const playerX = player.x || 400
          const playerY = player.y || 300
          const playerW = player.w || 16
          const playerH = player.h || 32

          // draw rod: simple line from player's hand
          const rodStartX = playerX + playerW/3
          const rodStartY = playerY - playerH/4
          const rodEndX = playerX + 40
          const rodEndY = playerY - playerH - 30
          if(ctx){
            ctx.save(); ctx.strokeStyle = 'rgba(100,60,30,1)'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(rodStartX, rodStartY); ctx.lineTo(rodEndX, rodEndY); ctx.stroke();
            // handle
            ctx.strokeStyle = 'rgba(70,50,30,1)'; ctx.lineWidth = 6; const handleEndX = rodStartX + (rodEndX-rodStartX)*0.25; const handleEndY = rodStartY + (rodEndY-rodStartY)*0.25; ctx.beginPath(); ctx.moveTo(rodStartX,rodStartY); ctx.lineTo(handleEndX,handleEndY); ctx.stroke(); ctx.restore();
          }

          // call casting draw
          if(window.CastingSystem && window.CastingSystem.draw) window.CastingSystem.draw(ctx, rodEndX, rodEndY, FC.getState(), FC.isBiting && FC.isBiting())
        }
      }catch(e){ console.warn('Fishing.draw error', e) }
    },
  // Delegates / helpers
    getState(){ return (window.FishingController && window.FishingController.getState) ? window.FishingController.getState() : 'idle' },
    setState(s){ if(window.FishingController && window.FishingController.setState) window.FishingController.setState(s) },
    getBaitInventory(){ return (window.FishingController && window.FishingController.getBaitInventory) ? window.FishingController.getBaitInventory() : [] },
    getCurrentBait(){ return (window.FishingController && window.FishingController.getCurrentBait) ? window.FishingController.getCurrentBait() : null },
    selectBait(i){ if(window.FishingController && window.FishingController.selectBait) window.FishingController.selectBait(i) },
    toggleCasting(){ if(window.FishingController && window.FishingController.toggleCasting) return window.FishingController.toggleCasting(); return false },
    attemptHookSet(){ if(window.FishingController && window.FishingController.attemptHookSet) return window.FishingController.attemptHookSet(); return false },
    manualReel(){ if(window.FishingController && window.FishingController.manualReel) return window.FishingController.manualReel(); return false },
    forceBite(){ if(window.FishingController && window.FishingController.forceBite) return window.FishingController.forceBite() },
    getCastPower(){ return (window.CastingSystem && window.CastingSystem.getCastPower) ? window.CastingSystem.getCastPower() : 0 },
    getTotalCatches(){ return (window.FishingController && window.FishingController.getTotalCatches) ? window.FishingController.getTotalCatches() : 0 },
    getNightsCaught(){ return (window.FishingController && window.FishingController.getNightsCaught) ? window.FishingController.getNightsCaught() : 0 },
    getLineStress(){ return (window.FishingController && window.FishingController.getLineStress) ? window.FishingController.getLineStress() : 0 },
    getMaxLineStress(){ return (window.FishingController && window.FishingController.getMaxLineStress) ? window.FishingController.getMaxLineStress() : 1 },
    isFishPulling(){ return (window.FishingController && window.FishingController.isFishPulling) ? window.FishingController.isFishPulling() : false },
    getReelProgress(){ return (window.FishingController && window.FishingController.getReelProgress) ? window.FishingController.getReelProgress() : 0 },
    getMaxReelProgress(){ return (window.FishingController && window.FishingController.getMaxReelProgress) ? window.FishingController.getMaxReelProgress() : 1 },
    getStrugglingIntensity(){ return (window.FishingController && window.FishingController.getStrugglingIntensity) ? window.FishingController.getStrugglingIntensity() : 0 },
    getCurrentCatch(){ return (window.FishingController && window.FishingController.getCurrentCatch) ? window.FishingController.getCurrentCatch() : null },
    isBiting(){ return (window.FishingController && window.FishingController.isBiting) ? window.FishingController.isBiting() : false },
    getBiteTimer(){ return (window.FishingController && window.FishingController.getBiteTimer) ? window.FishingController.getBiteTimer() : 0 },
    getBiteDelay(){ return (window.FishingController && window.FishingController.getBiteDelay) ? window.FishingController.getBiteDelay() : 0 },
    keypressed(k){ if(window.FishingController && window.FishingController.keypressed) window.FishingController.keypressed(k) }
  }

  // expose to global for file:// usage
  if(typeof window !== 'undefined') window.Fishing = window.Fishing || Fishing
  if(typeof module !== 'undefined') module.exports = Fishing
})();
