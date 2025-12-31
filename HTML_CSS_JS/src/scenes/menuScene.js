// scenes/menuScene.js - Main menu scene with Lovable styling
(function(){
  const MenuScene = Object.create(window.BaseScene || {});
  
  MenuScene.name = 'MenuScene';
  MenuScene.animationTime = 0;
  MenuScene.selectedButton = 0;
  MenuScene.buttons = ['Play', 'Settings', 'About', 'Quit'];
  
  MenuScene.init = async function() {
    this.animationTime = 0;
    this.selectedButton = 0;
  };
  
  MenuScene.onEnter = function() {
    this.animationTime = 0;
    this.selectedButton = 0;
  };
  
  MenuScene.onExit = function() {
    // Clean up
  };
  
  MenuScene.update = function(dt) {
    this.animationTime += dt;
    if (this.animationTime > 10) this.animationTime = 0;
  };
  
  MenuScene.draw = function(ctx) {
    if (!ctx) return;
    
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    
    // Background gradient - matching Lovable colors
    // hsl(200 70% 65%) -> hsl(195 50% 40%) -> hsl(30 25% 15%)
    const grad = ctx.createLinearGradient(0, 0, 0, height);
    grad.addColorStop(0, '#a8d8ff');      // hsl(200 70% 65%)
    grad.addColorStop(0.5, '#2d5a7b');   // hsl(195 50% 40%)
    grad.addColorStop(1, '#3d2817');     // hsl(30 25% 15%)
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);
    
    // Water shimmer effect at bottom
    ctx.save();
    ctx.globalAlpha = 0.6;
    const waterGrad = ctx.createLinearGradient(0, height * 0.5, 0, height);
    waterGrad.addColorStop(0, 'transparent');
    waterGrad.addColorStop(1, '#2d5a7b');
    ctx.fillStyle = waterGrad;
    ctx.fillRect(0, height * 0.5, width, height * 0.5);
    ctx.restore();
    
    // Floating light orbs
    this.drawFloatingOrbs(ctx, width, height);
    
    // Title "HOPELESS"
    ctx.save();
    ctx.fillStyle = '#ffcc44';  // hsl(45 100% 70%)
    ctx.font = 'bold 72px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = 20;
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 3;
    ctx.fillText('HOPELESS', width / 2, height / 2 - 80);
    ctx.restore();
    
    // Subtitle "CATCH"
    ctx.save();
    ctx.fillStyle = '#cc8844';  // hsl(32 80% 60%)
    ctx.font = 'bold 56px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = 15;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.fillText('CATCH', width / 2, height / 2 + 10);
    ctx.restore();
    
    // Tagline
    ctx.save();
    ctx.fillStyle = '#d9d9e3';  // hsl(200 30% 85%)
    ctx.font = '13px Arial';
    ctx.textAlign = 'center';
    ctx.letterSpacing = '2px';
    ctx.fillText('A cozy fishing horror experience', width / 2, height / 2 + 60);
    ctx.restore();
    
    // Buttons
    const buttonStartY = height / 2 + 120;
    const buttonSpacing = 50;
    const buttonWidth = 200;
    const buttonHeight = 40;
    
    for (let i = 0; i < this.buttons.length; i++) {
      const buttonY = buttonStartY + i * buttonSpacing;
      const isSelected = i === this.selectedButton;
      const buttonX = width / 2 - buttonWidth / 2;
      
      ctx.save();
      
      // Button background
      if (isSelected) {
        ctx.fillStyle = 'rgba(200, 150, 100, 0.5)';
        ctx.strokeStyle = '#ffcc44';
      } else {
        ctx.fillStyle = 'rgba(60, 50, 40, 0.7)';
        ctx.strokeStyle = '#996633';
      }
      
      ctx.fillRect(buttonX, buttonY - buttonHeight / 2, buttonWidth, buttonHeight);
      ctx.lineWidth = 2;
      ctx.strokeRect(buttonX, buttonY - buttonHeight / 2, buttonWidth, buttonHeight);
      
      // Button text
      ctx.fillStyle = isSelected ? '#ffcc44' : '#cc8844';
      ctx.font = isSelected ? 'bold 16px Arial' : '14px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(this.buttons[i], width / 2, buttonY);
      
      ctx.restore();
    }
    
    // Version text
    ctx.save();
    ctx.fillStyle = 'rgba(100, 120, 150, 0.6)';
    ctx.font = '8px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('v0.1.0 - Interactive Game', width / 2, height - 10);
    ctx.restore();
  };
  
  MenuScene.drawFloatingOrbs = function(ctx, width, height) {
    ctx.save();
    
    const orbCount = 3;
    const time = this.animationTime;
    
    for (let i = 0; i < orbCount; i++) {
      const x = width * (0.2 + i * 0.3) + Math.sin(time * 0.5 + i) * 30;
      const y = height * 0.25 + Math.cos(time * 0.3 + i) * 40;
      const radius = 20 + Math.sin(time + i) * 5;
      
      // Glow
      const grad = ctx.createRadialGradient(x, y, 0, x, y, radius * 2.5);
      grad.addColorStop(0, 'rgba(255, 200, 100, 0.4)');
      grad.addColorStop(0.5, 'rgba(255, 200, 100, 0.1)');
      grad.addColorStop(1, 'rgba(255, 200, 100, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, radius * 2.5, 0, Math.PI * 2);
      ctx.fill();
      
      // Orb
      ctx.fillStyle = 'rgba(255, 200, 100, 0.8)';
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
    
    ctx.restore();
  };
  
  if (typeof window !== 'undefined') window.MenuScene = window.MenuScene || MenuScene;
  if (typeof module !== 'undefined') module.exports = MenuScene;
})();
