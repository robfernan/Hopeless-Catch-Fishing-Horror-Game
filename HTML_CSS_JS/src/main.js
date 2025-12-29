// main.js - central initializer and game state management
(function(){
  const Main = {
    async init(){
      try{
        const canvas = document.getElementById('game-canvas')
        
        // Initialize game state first
        if(window.GameState && typeof window.GameState.init === 'function') window.GameState.init()
        
        // Initialize audio system first (required for all audio)
        if(window.AudioManager && typeof window.AudioManager.init === 'function') window.AudioManager.init()
        
        // load assets (file:// friendly)
        if(window.Assets && typeof window.Assets.loadAll === 'function'){
          await window.Assets.loadAll().catch(()=>{})
        }
        
        // Load audio files
        if(window.SoundEffects && typeof window.SoundEffects.loadAll === 'function'){
          await window.SoundEffects.loadAll().catch(()=>{})
        }
        if(window.MusicManager && typeof window.MusicManager.loadAll === 'function'){
          await window.MusicManager.loadAll().catch(()=>{})
        }
        
        // Load audio placeholders for any missing files
        if(window.AudioPlaceholder && window.AudioManager){
          window.AudioPlaceholder.loadPlaceholders(window.AudioManager)
        }
        
        // initialize world and player
        if(window.World && typeof window.World.init === 'function') window.World.init(canvas.width, canvas.height)
        if(window.WorldRenderer && typeof window.WorldRenderer.init === 'function') window.WorldRenderer.init()
        if(window.Player && typeof window.Player.init === 'function') window.Player.init(canvas.width/2, (window.World && window.World.getGrassY ? window.World.getGrassY() : (canvas.height/2)) - 16)

        // initialize day/night and weather systems
        if(window.DayNightCycle && typeof window.DayNightCycle.init === 'function') window.DayNightCycle.init()
        if(window.Weather && typeof window.Weather.init === 'function') window.Weather.init()
        
        // initialize cabin and journal
        if(window.Cabin && typeof window.Cabin.init === 'function') window.Cabin.init()
        if(window.Journal && typeof window.Journal.init === 'function') window.Journal.init()
        
        // initialize visual systems
        if(window.SkyRenderer && typeof window.SkyRenderer.init === 'function') window.SkyRenderer.init()
        if(window.Anomalies && typeof window.Anomalies.init === 'function') window.Anomalies.init()
        if(window.ScreenShake && typeof window.ScreenShake.init === 'function') window.ScreenShake.init()
        if(window.UIManager && typeof window.UIManager.init === 'function') window.UIManager.init()
        
        // initialize fishing subsystems (if present)
        if(window.BaitSystem && typeof window.BaitSystem.init === 'function') window.BaitSystem.init()
        if(window.FishData && typeof window.FishData.init === 'function') window.FishData.init()
        if(window.StatisticsSystem && typeof window.StatisticsSystem.init === 'function') window.StatisticsSystem.init()
        if(window.CastingSystem && typeof window.CastingSystem.init === 'function') window.CastingSystem.init()
        if(window.ReelingSystem && typeof window.ReelingSystem.init === 'function') window.ReelingSystem.init()
        if(window.BiteDetection && typeof window.BiteDetection.init === 'function') window.BiteDetection.init()
        if(window.FishingController && typeof window.FishingController.init === 'function') window.FishingController.init()

        // ensure menuActive default is set
        if(typeof window.menuActive === 'undefined') window.menuActive = false
        
        console.log('🎣 Hopeless Catch initialized!')
        return true
      }catch(e){ console.error('Main.init failed', e); return false }
    },
    
    // game state API
    state: 'menu',
    getState(){ return this.state },
    setState(s){ this.state = s },
    
    // Reset all game systems for a fresh start
    resetGame(){
      try{
        // Clear journal stats (but keep catch history for reference)
        if(window.Journal && typeof window.Journal.clearStats === 'function'){
          window.Journal.clearStats()
        }
        
        // Reset fishing systems
        if(window.FishingController && typeof window.FishingController.reset === 'function') window.FishingController.reset()
        if(window.CastingSystem && typeof window.CastingSystem.reset === 'function') window.CastingSystem.reset()
        if(window.ReelingSystem && typeof window.ReelingSystem.reset === 'function') window.ReelingSystem.reset()
        if(window.BiteDetection && typeof window.BiteDetection.reset === 'function') window.BiteDetection.reset()
        
        // Reset day/night cycle
        if(window.DayNightCycle && typeof window.DayNightCycle.init === 'function') window.DayNightCycle.init()
        
        // Reset weather
        if(window.Weather && typeof window.Weather.init === 'function') window.Weather.init()
        
        // Reset player position
        const canvas = document.getElementById('game-canvas')
        if(window.Player && typeof window.Player.init === 'function') window.Player.init(canvas.width/2, (window.World && window.World.getGrassY ? window.World.getGrassY() : (canvas.height/2)) - 16)
        
        // Reset cabin
        if(window.Cabin && typeof window.Cabin.init === 'function') window.Cabin.init()
        
        // Reset anomalies
        if(window.Anomalies && typeof window.Anomalies.init === 'function') window.Anomalies.init()
        
        // Reset screen shake
        if(window.ScreenShake && typeof window.ScreenShake.init === 'function') window.ScreenShake.init()
        
        console.log('🎣 Game reset - fresh start!')
        return true
      }catch(e){ console.error('Main.resetGame failed', e); return false }
    }
  }

  if(typeof window !== 'undefined') window.Main = window.Main || Main
  if(typeof module !== 'undefined') module.exports = Main

})();
