// BiteDetection.js - port of fishing/bitedetection.lua
(function(){
  const BiteDetection = {
    biteTimer: 0,
    biteDelay: 0,
    hasBite: false,
    biteStartTime: 0,
    biteWindow: 5.0,
    fishOnHook: false,
    now(){ return Date.now() / 1000 },
    init(){ this.biteTimer = 0; this.biteDelay = 0; this.hasBite = false; this.biteStartTime = 0; this.biteWindow = 3.0; this.fishOnHook = false },
    reset(){ this.biteTimer = 0; this.biteDelay = 0; this.hasBite = false; this.biteStartTime = 0; this.biteWindow = 3.0; this.fishOnHook = false },
    startBiteTimer(){ // random int between 2 and 8
      this.biteDelay = 2 + Math.floor(Math.random() * 7) // 2..8
      this.biteTimer = 0
      this.hasBite = false
      this.fishOnHook = false
      // console.log('Waiting for a bite... will happen in', this.biteDelay, 'seconds')
    },
    update(dt, weatherData){
      if(!this.hasBite && !this.fishOnHook){
        this.biteTimer += dt
        let weatherMultiplier = 1.0
        if(weatherData){
          if(weatherData.isRaining) weatherMultiplier = 0.7
          else if(weatherData.windSpeed && weatherData.windSpeed > 15) weatherMultiplier = 1.3
        }
        const adjustedDelay = this.biteDelay * weatherMultiplier
        if(this.biteTimer >= adjustedDelay){
          this.hasBite = true
          this.biteStartTime = this.now()
          // console.log('BITE!')
        }
      } else if(this.hasBite && !this.fishOnHook){
        const currentTime = this.now()
        const elapsed = currentTime - this.biteStartTime
        if(elapsed > this.biteWindow){
          this.hasBite = false
          return 'bite_missed'
        }
      }
      return 'waiting'
    },
    handleBiteAttempt(){
      if(this.hasBite && !this.fishOnHook){
        const reactionTime = this.now() - this.biteStartTime
        if(reactionTime <= this.biteWindow){ this.fishOnHook = true; this.hasBite = false; return ['fish_hooked', reactionTime] }
        else { this.hasBite = false; return ['bite_missed', reactionTime] }
      }
      return ['no_bite', 0]
    },
    isBiting(){ return this.hasBite && !this.fishOnHook },
    isFishOnHook(){ return this.fishOnHook },
    getBiteTimeRemaining(){ if(this.hasBite) return Math.max(0, this.biteWindow - (this.now() - this.biteStartTime)); return 0 },
    getBiteTimer(){ return this.biteTimer },
    getBiteDelay(){ return this.biteDelay },
    forceBite(){ this.hasBite = true; this.biteStartTime = this.now(); this.fishOnHook = false }
  }

  if(typeof window !== 'undefined') window.BiteDetection = window.BiteDetection || BiteDetection
  if(typeof module !== 'undefined') module.exports = BiteDetection
})();
