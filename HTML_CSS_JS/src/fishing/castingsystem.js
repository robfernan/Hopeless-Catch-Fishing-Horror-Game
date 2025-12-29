// CastingSystem.js — ported from Lua castingsystem.lua (simplified)
(function(){
  const CastingSystem = {
    castDistance: 0,
    maxCastDistance: 120,
    castPower: 0,
    castingUp: true,
    bobberX: 0,
    bobberY: 0,
    particles: [],
    init(){ this.castDistance = 0; this.castPower = 0; this.castingUp = true; this.bobberX = 0; this.bobberY = 0; this.particles = [] },
    reset(){ this.castDistance = 0; this.castPower = 0; this.castingUp = true; this.bobberX = 0; this.bobberY = 0; this.particles = [] },
    update(dt, weatherData, fishingState){
      // particles update
      for(let i=this.particles.length-1;i>=0;i--){
        const p = this.particles[i]
        p.life -= dt
        p.x += p.vx * dt
        p.y += p.vy * dt
        p.vy += 200 * dt
        p.alpha -= dt * 2
        if(p.life <= 0 || p.alpha <= 0) this.particles.splice(i,1)
      }

      if(fishingState === 'casting') this.updateCastingPower(dt)
    },
    updateCastingPower(dt){
      if(this.castingUp){
        this.castPower += dt * 1.5
        if(this.castPower >= 1){ this.castPower = 1; this.castingUp = false }
      } else {
        this.castPower -= dt * 1.5
        if(this.castPower <= 0){ this.castPower = 0; this.castingUp = true }
      }
    },
    startCasting(){ this.castPower = 0; this.castingUp = true; /* HUD message from controller */ },
    cast(rodX, rodY, currentBait){
      if(!currentBait) { return false }
      this.castDistance = this.castPower * this.maxCastDistance
      // weather effects stub: use window.Weather if present
      let castingAccuracy = 1
      if(window.Weather && window.Weather.getWeatherData){ const wd = window.Weather.getWeatherData(); castingAccuracy = wd.castingAccuracy || 1 }
      this.castDistance = this.castDistance * castingAccuracy

      const angle = -Math.PI/4  // 45 degrees down and to the right
      const windEffect = (window.Weather && window.Weather.getWindEffect) ? window.Weather.getWindEffect() : { strength:0, direction:0 }
      const windOffset = windEffect.strength * 30 * Math.cos(windEffect.direction || 0)

      // Cast the line out into the water
      this.bobberX = rodX + Math.cos(angle) * this.castDistance * 0.6 + windOffset
      // Position bobber in the water using World's water Y coordinate
      const waterY = (window.World && window.World.getWaterY) ? window.World.getWaterY() : 480
      this.bobberY = waterY + Math.sin(angle) * this.castDistance * 0.4

      // Clamp bobber position to stay within bounds (canvas is 800x600)
      this.bobberX = Math.max(50, Math.min(750, this.bobberX))
      this.bobberY = Math.max(waterY, Math.min(590, this.bobberY))

      this.createSplashEffect(this.bobberX, this.bobberY)
      return true
    },
    createSplashEffect(x,y){
      for(let i=0;i<8;i++){ this.particles.push({ x: x + (Math.random()*20-10), y: y + (Math.random()*10-5), vx: (Math.random()-0.5)*100, vy: - (Math.random()*50+30), life: Math.random()*1.5+0.5, alpha:1.0, size: Math.floor(Math.random()*4)+2 }) }
    },
    drawCastingPowerMeter(ctx, playerX, playerY, fishingState){
      // Only show power meter during casting
      if(fishingState !== 'casting') return
      
      const meterWidth = 80
      const meterHeight = 8
      const meterX = playerX - meterWidth / 2
      const meterY = playerY - 40
      
      // Background
      ctx.fillStyle = 'rgba(0,0,0,0.5)'
      ctx.fillRect(meterX - 2, meterY - 2, meterWidth + 4, meterHeight + 4)
      
      // Border
      ctx.strokeStyle = 'rgba(255,255,255,0.7)'
      ctx.lineWidth = 1
      ctx.strokeRect(meterX - 2, meterY - 2, meterWidth + 4, meterHeight + 4)
      
      // Fill based on power
      const fillWidth = this.castPower * meterWidth
      const hue = this.castPower * 120 // Green (0) to Red (120)
      ctx.fillStyle = `hsl(${120 - hue}, 100%, 50%)`
      ctx.fillRect(meterX, meterY, fillWidth, meterHeight)
      
      // Power percentage text
      ctx.fillStyle = 'rgba(255,255,255,0.9)'
      ctx.font = 'bold 10px Arial'
      ctx.textAlign = 'center'
      ctx.fillText(Math.round(this.castPower * 100) + '%', playerX, meterY - 8)
    },
    drawRod(ctx, rodX, rodY, fishingState, isBiting){
      // Draw the fishing rod held by the player
      // Rod tip position is already calculated in draw() method
      ctx.save();
      
      // Rod angle depends on fishing state and fish tension
      let rodAngle = -Math.PI / 3; // Default resting angle
      let rodLength = 50;
      let rodTension = 0; // How much the rod bends
      
      if(fishingState === 'casting'){
        // Rod angles up during casting
        rodAngle = -Math.PI / 2 + (this.castPower * Math.PI / 4);
        rodLength = 55;
      } else if(fishingState === 'reeling' || fishingState === 'struggling'){
        // Rod angles down when reeling with tension
        rodAngle = -Math.PI / 6;
        rodLength = 48;
        // Add tension effect - rod bends more under load
        const time = (performance.now()||0)/1000;
        rodTension = Math.sin(time * 6) * 0.15; // Oscillating tension
      } else if(fishingState === 'biting'){
        // Rod bends significantly when fish is biting
        const time = (performance.now()||0)/1000;
        rodAngle = -Math.PI / 3 + Math.sin(time * 8) * 0.2;
        rodTension = Math.sin(time * 10) * 0.2; // More aggressive tension
      }
      
      // Calculate rod tip position with tension curve
      const baseTipX = rodX + Math.cos(rodAngle) * rodLength;
      const baseTipY = rodY + Math.sin(rodAngle) * rodLength;
      
      // Apply tension curve to make rod bend realistically
      const rodTipX = baseTipX + Math.sin(rodAngle + Math.PI/2) * rodTension * 20;
      const rodTipY = baseTipY + Math.cos(rodAngle + Math.PI/2) * rodTension * 20;
      
      // Draw rod handle (at player position)
      ctx.fillStyle = '#8B4513'; // Brown
      ctx.beginPath();
      ctx.arc(rodX, rodY, 3, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw rod shaft with curve for tension
      ctx.strokeStyle = '#D2691E'; // Lighter brown
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      
      // Draw curved rod if there's tension
      if(Math.abs(rodTension) > 0.01){
        ctx.beginPath();
        ctx.moveTo(rodX, rodY);
        const midX = (rodX + rodTipX) / 2 + Math.sin(rodAngle) * rodTension * 15;
        const midY = (rodY + rodTipY) / 2 + Math.cos(rodAngle) * rodTension * 15;
        ctx.quadraticCurveTo(midX, midY, rodTipX, rodTipY);
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.moveTo(rodX, rodY);
        ctx.lineTo(rodTipX, rodTipY);
        ctx.stroke();
      }
      
      // Draw rod guides (small circles along the rod)
      ctx.strokeStyle = '#C0C0C0'; // Silver
      ctx.lineWidth = 1;
      for(let i = 1; i < 4; i++){
        const t = i / 4;
        const guideX = rodX + (rodTipX - rodX) * t;
        const guideY = rodY + (rodTipY - rodY) * t;
        ctx.beginPath();
        ctx.arc(guideX, guideY, 2, 0, Math.PI * 2);
        ctx.stroke();
      }
      
      // Draw reel (at handle)
      ctx.fillStyle = '#696969'; // Dark gray
      ctx.beginPath();
      ctx.arc(rodX - 8, rodY + 2, 4, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw reel handle (rotating when reeling)
      if(fishingState === 'reeling' || fishingState === 'struggling'){
        const time = (performance.now()||0)/1000;
        const reelRotation = time * 8; // Fast rotation when reeling
        const handleX = rodX - 8 + Math.cos(reelRotation) * 3;
        const handleY = rodY + 2 + Math.sin(reelRotation) * 3;
        ctx.fillStyle = '#FFD700'; // Gold
        ctx.beginPath();
        ctx.arc(handleX, handleY, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
      
      ctx.restore();
    },

    draw(ctx, rodX, rodY, fishingState, isBiting){
      // draw particles
      if(!ctx) return
      for(const p of this.particles){ ctx.save(); ctx.globalAlpha = Math.max(0, p.alpha); ctx.fillStyle = 'rgba(153,204,255,0.9)'; ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI*2); ctx.fill(); ctx.restore() }

      // Calculate rod tip position first (before drawing)
      let rodAngle = -Math.PI / 3;
      let rodLength = 50;
      let rodTension = 0;
      
      if(fishingState === 'casting'){
        rodAngle = -Math.PI / 2 + (this.castPower * Math.PI / 4);
        rodLength = 55;
      } else if(fishingState === 'reeling' || fishingState === 'struggling'){
        rodAngle = -Math.PI / 6;
        rodLength = 48;
        const time = (performance.now()||0)/1000;
        rodTension = Math.sin(time * 6) * 0.15;
      } else if(fishingState === 'biting'){
        const time = (performance.now()||0)/1000;
        rodAngle = -Math.PI / 3 + Math.sin(time * 8) * 0.2;
        rodTension = Math.sin(time * 10) * 0.2;
      }
      
      const baseTipX = rodX + Math.cos(rodAngle) * rodLength;
      const baseTipY = rodY + Math.sin(rodAngle) * rodLength;
      const rodTipX = baseTipX + Math.sin(rodAngle + Math.PI/2) * rodTension * 20;
      const rodTipY = baseTipY + Math.cos(rodAngle + Math.PI/2) * rodTension * 20;
      
      // Store for later use
      this.rodTipX = rodTipX;
      this.rodTipY = rodTipY;

      // Draw the fishing rod first (behind the line)
      this.drawRod(ctx, rodX, rodY, fishingState, isBiting);

      // Draw casting power meter
      this.drawCastingPowerMeter(ctx, rodX, rodY, fishingState);

      // Always draw line and bobber if we have a bobber position (not just when casting)
      if(this.bobberX === 0 && this.bobberY === 0 && fishingState === 'idle') return

      if(fishingState === 'casting'){
        ctx.save(); ctx.strokeStyle = 'rgba(204,204,153,0.8)'; ctx.lineWidth = 1.5; const power = this.castPower * this.maxCastDistance * 0.5; const angle = -Math.PI/4; const segments = 15; let prevX = rodTipX, prevY = rodTipY
        for(let i=1;i<=segments;i++){ const t = i/segments; const x = rodTipX + Math.cos(angle) * power * t; const y = rodTipY + Math.sin(angle) * power * t + (t*t*50); if(i>1) ctx.beginPath(), ctx.moveTo(prevX,prevY), ctx.lineTo(x,y), ctx.stroke(); prevX = x; prevY = y }
        // power indicator
        ctx.fillStyle = 'rgba(255,128,0,0.7)'; ctx.beginPath(); ctx.arc(prevX, prevY, 3, 0, Math.PI*2); ctx.fill(); ctx.restore();
        return
      }

      if((fishingState === 'bobbing' || fishingState === 'biting' || fishingState === 'reeling' || fishingState === 'struggling') && this.bobberX !== 0){
        const time = (performance.now()||0)/1000
        let bobberDrawY = this.bobberY; let bobberSize = 8
        if(fishingState === 'reeling' || fishingState === 'struggling'){ bobberDrawY += 15; bobberSize = 6 }
        else if(isBiting){ 
          // Fish pulls the bobber down into the water
          const biteIntensity = Math.sin(time*10)*4; 
          const dipAmount = 25; // How far the fish pulls the bobber down
          bobberDrawY += dipAmount + biteIntensity; 
          bobberSize = 7 
        }
        else { const bob = Math.sin(time*2)*1.5; bobberDrawY += bob }

        // Use rod tip for line start, fallback to rodX/rodY if not set
        const lineStartX = this.rodTipX || rodX;
        const lineStartY = this.rodTipY || rodY;

        // draw line
        ctx.save(); if(fishingState === 'reeling' || fishingState === 'struggling'){ ctx.strokeStyle = 'rgba(230,180,128,0.9)'; ctx.lineWidth = 2.5; const tension = Math.sin(time*8)*2; const midX = (lineStartX + this.bobberX)/2 + tension; const midY = (lineStartY + bobberDrawY)/2 + 5; ctx.beginPath(); ctx.moveTo(lineStartX,lineStartY); ctx.lineTo(midX,midY); ctx.stroke(); ctx.beginPath(); ctx.moveTo(midX,midY); ctx.lineTo(this.bobberX,bobberDrawY); ctx.stroke() }
        else if(isBiting){ ctx.strokeStyle = 'rgba(255,204,153,0.9)'; ctx.lineWidth = 2.5; const midX = (lineStartX + this.bobberX)/2; const midY = (lineStartY + bobberDrawY)/2 + 10; ctx.beginPath(); ctx.moveTo(lineStartX,lineStartY); ctx.lineTo(midX,midY); ctx.stroke(); ctx.beginPath(); ctx.moveTo(midX,midY); ctx.lineTo(this.bobberX,bobberDrawY); ctx.stroke() }
        else { ctx.strokeStyle = 'rgba(204,204,153,0.8)'; ctx.lineWidth = 2.5; const midX = (lineStartX + this.bobberX)/2; const midY = (lineStartY + bobberDrawY)/2 + 15; ctx.beginPath(); ctx.moveTo(lineStartX,lineStartY); ctx.lineTo(midX,midY); ctx.stroke(); ctx.beginPath(); ctx.moveTo(midX,midY); ctx.lineTo(this.bobberX,bobberDrawY); ctx.stroke() }

        // draw bobber shadow
        ctx.fillStyle = 'rgba(0,0,0,0.2)'; ctx.beginPath(); ctx.ellipse(this.bobberX, bobberDrawY + bobberSize + 2, bobberSize * 1.2, bobberSize * 0.4, 0, 0, Math.PI*2); ctx.fill();

        // draw bobber
        if(isBiting){ const flash = Math.sin(time*8)*0.5+0.5; ctx.fillStyle = `rgba(255,${Math.floor(50*flash)},${Math.floor(50*flash)},1)`; ctx.beginPath(); ctx.arc(this.bobberX,bobberDrawY,bobberSize+1,0,Math.PI*2); ctx.fill(); ctx.strokeStyle='rgba(255,255,255,0.8)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(this.bobberX,bobberDrawY,bobberSize+3+Math.sin(time*12)*2,0,Math.PI*2); ctx.stroke() }
        else { ctx.fillStyle='rgb(255,51,51)'; ctx.beginPath(); ctx.arc(this.bobberX,bobberDrawY,bobberSize,0,Math.PI*2); ctx.fill(); ctx.fillStyle='white'; ctx.beginPath(); ctx.arc(this.bobberX,bobberDrawY+2,bobberSize*0.6,0,Math.PI*2); ctx.fill() }

        // ripples
        if(isBiting){ ctx.strokeStyle='rgba(102,179,255,0.5)'; ctx.lineWidth=2; for(let i=1;i<=3;i++){ const ripple = 10 + i*8 + Math.sin(time*6+i)*4; ctx.beginPath(); ctx.arc(this.bobberX,this.bobberY+5,ripple,0,Math.PI*2); ctx.stroke() } }
        else { ctx.strokeStyle='rgba(102,179,255,0.3)'; ctx.lineWidth=2; const ripple = Math.sin(time*4)*0.5; ctx.beginPath(); ctx.arc(this.bobberX,this.bobberY+2,8+ripple*2,0,Math.PI*2); ctx.stroke(); ctx.beginPath(); ctx.arc(this.bobberX,this.bobberY+2,12+ripple*3,0,Math.PI*2); ctx.stroke() }
        ctx.restore()
      }
    },
    getCastPower(){ return this.castPower },
    getBobberPosition(){ return [this.bobberX, this.bobberY] }
  }

  if(typeof window !== 'undefined') window.CastingSystem = window.CastingSystem || CastingSystem
  if(typeof module !== 'undefined') module.exports = CastingSystem
})();
