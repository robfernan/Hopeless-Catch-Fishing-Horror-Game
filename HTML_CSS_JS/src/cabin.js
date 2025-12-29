// Cabin.js - Rest mechanic to advance time
(function(){
  const Cabin = {
    inCabin: false,
    cabinFade: 0,
    cabinSleepTimer: 0,
    cabinUsedTonight: false,
    
    init() {
      this.inCabin = false;
      this.cabinFade = 0;
      this.cabinSleepTimer = 0;
      this.cabinUsedTonight = false;
    },
    
    update(dt) {
      if (this.inCabin) {
        // Fade in
        if (this.cabinFade < 1) {
          this.cabinFade = Math.min(1, this.cabinFade + dt * 1.5);
        }
        
        // Sleep timer
        this.cabinSleepTimer += dt;
        if (this.cabinSleepTimer > 3) {
          // Advance to next day
          if (window.DayNightCycle) {
            window.DayNightCycle.advanceToNextDay();
          }
          
          this.inCabin = false;
          this.cabinFade = 1;
          this.cabinSleepTimer = 0;
          this.cabinUsedTonight = false;
          
          console.log('🌅 You slept through the night. It\'s a new day!');
        }
      } else {
        // Fade out
        if (this.cabinFade > 0) {
          this.cabinFade = Math.max(0, this.cabinFade - dt * 1.5);
        }
      }
    },
    
    enterCabin() {
      if (!this.inCabin) {
        this.inCabin = true;
        this.cabinFade = 0;
        this.cabinSleepTimer = 0;
        console.log('🏚️ Entering cabin to rest...');
      }
    },
    
    exitCabin() {
      this.inCabin = false;
      this.cabinFade = 1;
      this.cabinSleepTimer = 0;
    },
    
    isInCabin() {
      return this.inCabin;
    },
    
    draw() {
      const canvas = document.getElementById('game-canvas');
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      if (this.cabinFade > 0) {
        ctx.save();
        ctx.fillStyle = 'rgba(0, 0, 0, ' + this.cabinFade + ')';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        if (this.inCabin) {
          ctx.fillStyle = 'rgba(255, 255, 255, ' + this.cabinFade + ')';
          ctx.font = 'bold 20px Arial';
          ctx.textAlign = 'center';
          ctx.fillText('🏚️ Resting in the cabin...', canvas.width / 2, canvas.height / 2 - 20);
          ctx.font = '16px Arial';
          ctx.fillText('💤 Time passes peacefully...', canvas.width / 2, canvas.height / 2 + 20);
        } else {
          ctx.fillStyle = 'rgba(255, 255, 255, ' + this.cabinFade + ')';
          ctx.font = 'bold 20px Arial';
          ctx.textAlign = 'center';
          ctx.fillText('🌅 You wake refreshed!', canvas.width / 2, canvas.height / 2 - 20);
          
          if (window.DayNightCycle) {
            ctx.font = '16px Arial';
            ctx.fillText('Day ' + window.DayNightCycle.getCurrentDay() + ' begins...', canvas.width / 2, canvas.height / 2 + 20);
          }
        }
        
        ctx.restore();
      }
    }
  };
  
  if (typeof window !== 'undefined') window.Cabin = window.Cabin || Cabin;
  if (typeof module !== 'undefined') module.exports = Cabin;
})();
