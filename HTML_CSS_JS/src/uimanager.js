// UIManager.js - Complete UI rendering matching Lovable version
(function(){
  const UIManager = {
    // Overlay state
    activeOverlay: null,
    selectedBaitIndex: 0,
    animationTime: 0,
    
    // UI visibility flags
    showControls: true,
    showTime: true,
    showWeather: true,
    showFishingState: true,
    showStats: true,
    
    init() {
      this.activeOverlay = null;
      this.selectedBaitIndex = 0;
      this.animationTime = 0;
    },
    
    update(dt) {
      this.animationTime += dt;
      if (this.animationTime > 10) this.animationTime = 0;
    },
    
    // Overlay management
    openOverlay(type) {
      this.activeOverlay = type;
    },
    
    closeOverlay() {
      this.activeOverlay = null;
    },
    
    isOverlayOpen() {
      return this.activeOverlay !== null;
    },
    
    getActiveOverlay() {
      return this.activeOverlay;
    },
    
    draw(ctx) {
      if (!ctx) return;
      
      // Draw main HUD
      this.drawGameHUD(ctx);
      
      // Draw fishing UI if in game
      if (window.FishingController) {
        this.drawFishingUI(ctx);
      }
      
      // Draw ONLY ONE active overlay at a time
      if (this.activeOverlay === 'tacklebox') {
        this.renderTackleBox(ctx);
      } else if (this.activeOverlay === 'journal') {
        this.renderJournalPanel(ctx);
      } else if (this.activeOverlay === 'catch') {
        this.renderCatchDisplay(ctx);
      } else if (this.activeOverlay === 'pause') {
        this.renderPauseMenu(ctx);
      }
    },
    
    // Main Game HUD
    drawGameHUD(ctx) {
      const width = ctx.canvas.width;
      const height = ctx.canvas.height;
      const padding = 10;
      
      ctx.save();
      
      // Top-left: Location & Time
      const locationX = padding;
      const locationY = padding;
      const locationWidth = 180;
      const locationHeight = 50;
      
      this.drawPanel(ctx, locationX, locationY, locationWidth, locationHeight);
      
      ctx.fillStyle = 'rgba(255, 200, 100, 0.9)';
      ctx.font = 'bold 11px Arial';
      ctx.textAlign = 'left';
      ctx.fillText('Quiet Lake', locationX + 10, locationY + 18);
      
      ctx.fillStyle = 'rgba(200, 150, 100, 0.8)';
      ctx.font = '9px Arial';
      const timeText = window.DayNightCycle && window.DayNightCycle.isNight ? '🌙 Night' : '☀️ Day';
      const peacefulText = window.GameSettings && window.GameSettings.peacefulMode ? ' • Peaceful' : '';
      ctx.fillText(timeText + peacefulText, locationX + 10, locationY + 35);
      
      // Top-right: Catch counter
      const catchX = width - 180 - padding;
      const catchY = padding;
      const catchWidth = 180;
      const catchHeight = 50;
      
      this.drawPanel(ctx, catchX, catchY, catchWidth, catchHeight);
      
      const catches = window.GameState ? window.GameState.catches.length : 0;
      ctx.fillStyle = 'rgba(255, 200, 100, 0.9)';
      ctx.font = 'bold 18px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(catches, catchX + catchWidth / 2, catchY + 22);
      
      ctx.fillStyle = 'rgba(200, 150, 100, 0.8)';
      ctx.font = '9px Arial';
      ctx.fillText('catches', catchX + catchWidth / 2, catchY + 38);
      
      // Right side: Quick toggle buttons
      const toggleX = width - 40;
      const toggleY = height / 2 - 50;
      
      // Time toggle button
      this.drawPanel(ctx, toggleX - 30, toggleY, 30, 30);
      ctx.fillStyle = 'rgba(255, 200, 100, 0.9)';
      ctx.font = '16px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(window.DayNightCycle && window.DayNightCycle.isNight ? '☀️' : '🌙', toggleX - 15, toggleY + 20);
      
      // Peaceful mode toggle button
      this.drawPanel(ctx, toggleX - 30, toggleY + 40, 30, 30);
      ctx.fillStyle = window.GameSettings && window.GameSettings.peacefulMode ? 'rgba(100, 255, 100, 0.8)' : 'rgba(255, 100, 100, 0.8)';
      ctx.font = '16px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(window.GameSettings && window.GameSettings.peacefulMode ? '😊' : '👻', toggleX - 15, toggleY + 60);
      
      // Bottom-left: Current bait
      const baitX = padding;
      const baitY = height - 60 - padding;
      const baitWidth = 200;
      const baitHeight = 60;
      
      this.drawPanel(ctx, baitX, baitY, baitWidth, baitHeight);
      
      ctx.fillStyle = 'rgba(200, 150, 100, 0.8)';
      ctx.font = '9px Arial';
      ctx.textAlign = 'left';
      ctx.fillText('BAIT', baitX + 10, baitY + 15);
      
      ctx.fillStyle = 'rgba(255, 200, 100, 0.9)';
      ctx.font = 'bold 11px Arial';
      const currentBait = window.GameState ? window.GameState.currentBait : 'worms';
      ctx.fillText(currentBait.toUpperCase(), baitX + 10, baitY + 35);
      
      // Bottom-right: Quick buttons hint
      const hintX = width - 350;
      const hintY = height - 25;
      ctx.fillStyle = 'rgba(150, 150, 150, 0.6)';
      ctx.font = '9px Arial';
      ctx.textAlign = 'right';
      ctx.fillText('TAB: Journal • B: Tackle Box • ESC: Pause', width - padding, hintY);
      
      ctx.restore();
    },
    
    // Fishing UI
    drawFishingUI(ctx) {
      if (!window.FishingController) return;
      
      const state = window.FishingController.state;
      const tension = window.FishingController.tension || 0;
      const width = ctx.canvas.width;
      const height = ctx.canvas.height;
      
      const panelX = width / 2 - 150;
      const panelY = height / 2 - 50;
      const panelWidth = 300;
      const panelHeight = 100;
      
      ctx.save();
      
      // Draw panel
      this.drawPanel(ctx, panelX, panelY, panelWidth, panelHeight);
      
      // Phase label
      const phaseLabels = {
        'idle': 'Press SPACE to cast',
        'casting': 'Casting...',
        'bobbing': 'Waiting for a bite...',
        'biting': 'BITE! Press SPACE!',
        'struggling': 'Hooked!',
        'reeling': 'Hold SPACE to reel in!',
        'caught': 'Caught something!',
        'failed': 'It got away...'
      };
      
      const label = phaseLabels[state] || 'Fishing...';
      ctx.fillStyle = state === 'biting' ? 'rgba(255, 100, 100, 0.95)' : 'rgba(255, 200, 100, 0.95)';
      ctx.font = 'bold 14px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(label, panelX + panelWidth / 2, panelY + 25);
      
      // Tension meter
      if (state === 'reeling' || state === 'struggling') {
        ctx.fillStyle = 'rgba(200, 150, 100, 0.8)';
        ctx.font = '10px Arial';
        ctx.textAlign = 'left';
        ctx.fillText('TENSION', panelX + 15, panelY + 50);
        
        // Tension bar
        const barWidth = 200;
        const barHeight = 12;
        const barX = panelX + 15;
        const barY = panelY + 55;
        
        ctx.fillStyle = 'rgba(60, 50, 40, 0.8)';
        ctx.fillRect(barX, barY, barWidth, barHeight);
        
        // Tension color
        let tensionColor;
        if (tension < 40) {
          tensionColor = 'rgba(100, 255, 100, 0.9)';
        } else if (tension < 70) {
          tensionColor = 'rgba(255, 200, 100, 0.9)';
        } else {
          tensionColor = 'rgba(255, 100, 100, 0.9)';
        }
        
        ctx.fillStyle = tensionColor;
        ctx.fillRect(barX, barY, (barWidth * tension) / 100, barHeight);
        
        // Tension percentage
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.font = '10px Arial';
        ctx.textAlign = 'right';
        ctx.fillText(Math.floor(tension) + '%', panelX + panelWidth - 15, panelY + 65);
      }
      
      ctx.restore();
    },
    
    // Helper: Draw a panel background
    drawPanel(ctx, x, y, width, height) {
      ctx.save();
      
      // Background
      ctx.fillStyle = 'rgba(40, 30, 20, 0.9)';
      ctx.fillRect(x, y, width, height);
      
      // Border
      ctx.strokeStyle = 'rgba(200, 150, 100, 0.8)';
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, width, height);
      
      ctx.restore();
    },
    
    // Tackle Box Overlay
    renderTackleBox(ctx) {
      const centerX = ctx.canvas.width / 2;
      const centerY = ctx.canvas.height / 2;
      const boxWidth = 400;
      const boxHeight = 350;
      const boxX = centerX - boxWidth / 2;
      const boxY = centerY - boxHeight / 2;
      
      ctx.save();
      
      // Backdrop
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      
      // Main box
      ctx.fillStyle = 'rgba(40, 30, 20, 0.95)';
      ctx.fillRect(boxX, boxY, boxWidth, boxHeight);
      
      // Border
      ctx.strokeStyle = 'rgba(200, 150, 100, 0.8)';
      ctx.lineWidth = 3;
      ctx.strokeRect(boxX, boxY, boxWidth, boxHeight);
      
      // Title
      ctx.fillStyle = 'rgba(255, 200, 100, 0.95)';
      ctx.font = 'bold 24px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('TACKLE BOX', centerX, boxY + 40);
      
      // Subtitle
      ctx.fillStyle = 'rgba(200, 150, 100, 0.8)';
      ctx.font = '14px Arial';
      ctx.fillText('Select your bait', centerX, boxY + 65);
      
      // Bait grid (2x2)
      const baits = window.BaitData ? window.BaitData.getAllBaits() : [];
      const gridStartX = boxX + 50;
      const gridStartY = boxY + 100;
      const cellWidth = 150;
      const cellHeight = 120;
      
      for (let i = 0; i < Math.min(4, baits.length); i++) {
        const row = Math.floor(i / 2);
        const col = i % 2;
        const x = gridStartX + col * cellWidth;
        const y = gridStartY + row * cellHeight;
        
        const bait = baits[i];
        const isSelected = i === this.selectedBaitIndex;
        
        // Cell background
        if (isSelected) {
          ctx.fillStyle = 'rgba(200, 150, 100, 0.4)';
          ctx.strokeStyle = 'rgba(255, 200, 100, 0.9)';
        } else {
          ctx.fillStyle = 'rgba(60, 50, 40, 0.6)';
          ctx.strokeStyle = 'rgba(150, 120, 80, 0.5)';
        }
        ctx.fillRect(x, y, cellWidth, cellHeight);
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, cellWidth, cellHeight);
        
        // Bait name
        ctx.fillStyle = isSelected ? 'rgba(255, 200, 100, 0.95)' : 'rgba(200, 150, 100, 0.8)';
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(bait.name, x + cellWidth / 2, y + 30);
        
        // Equipped label
        if (isSelected) {
          ctx.fillStyle = 'rgba(100, 255, 100, 0.9)';
          ctx.font = 'bold 12px Arial';
          ctx.fillText('EQUIPPED', x + cellWidth / 2, y + 50);
        }
      }
      
      // Close button
      const closeButtonX = centerX - 40;
      const closeButtonY = boxY + boxHeight - 40;
      ctx.fillStyle = 'rgba(100, 80, 60, 0.8)';
      ctx.fillRect(closeButtonX, closeButtonY, 80, 30);
      ctx.strokeStyle = 'rgba(150, 120, 80, 0.8)';
      ctx.lineWidth = 2;
      ctx.strokeRect(closeButtonX, closeButtonY, 80, 30);
      ctx.fillStyle = 'rgba(200, 150, 100, 0.9)';
      ctx.font = 'bold 14px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Close', centerX, closeButtonY + 20);
      
      ctx.restore();
    },
    
    // Journal Panel Overlay
    renderJournalPanel(ctx) {
      const centerX = ctx.canvas.width / 2;
      const centerY = ctx.canvas.height / 2;
      const boxWidth = 450;
      const boxHeight = 400;
      const boxX = centerX - boxWidth / 2;
      const boxY = centerY - boxHeight / 2;
      
      ctx.save();
      
      // Backdrop
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      
      // Main box
      ctx.fillStyle = 'rgba(40, 30, 20, 0.95)';
      ctx.fillRect(boxX, boxY, boxWidth, boxHeight);
      
      // Border
      ctx.strokeStyle = 'rgba(200, 150, 100, 0.8)';
      ctx.lineWidth = 3;
      ctx.strokeRect(boxX, boxY, boxWidth, boxHeight);
      
      // Title
      ctx.fillStyle = 'rgba(255, 200, 100, 0.95)';
      ctx.font = 'bold 24px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('FISHING JOURNAL', centerX, boxY + 40);
      
      // Catch count
      const catches = window.GameState ? window.GameState.catches || [] : [];
      ctx.fillStyle = 'rgba(200, 150, 100, 0.8)';
      ctx.font = '14px Arial';
      ctx.fillText("Today's Catches: " + catches.length, centerX, boxY + 65);
      
      // Catches list
      const listStartY = boxY + 85;
      let yPos = listStartY;
      
      if (catches.length === 0) {
        ctx.fillStyle = 'rgba(150, 120, 100, 0.7)';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('No catches yet today', centerX, listStartY + 50);
      } else {
        ctx.font = '12px Arial';
        ctx.textAlign = 'left';
        
        for (let i = 0; i < Math.min(5, catches.length); i++) {
          const catchRecord = catches[i];
          const fish = catchRecord.fish || {};
          
          // Fish entry
          if (fish.isHorror) {
            ctx.fillStyle = 'rgba(255, 100, 100, 0.8)';
          } else {
            ctx.fillStyle = 'rgba(200, 150, 100, 0.8)';
          }
          
          const count = catches.filter(c => c.fish.id === fish.id).length;
          ctx.fillText(fish.name + ' x' + count, boxX + 20, yPos);
          yPos += 25;
        }
      }
      
      // Stats footer
      const horrorCount = catches.filter(c => c.fish && c.fish.isHorror).length;
      const rareCount = catches.filter(c => c.fish && (c.fish.rarity === 'rare' || c.fish.rarity === 'legendary')).length;
      
      ctx.fillStyle = 'rgba(150, 120, 100, 0.7)';
      ctx.font = '11px Arial';
      ctx.textAlign = 'left';
      ctx.fillText('Total: ' + catches.length + ' | Rare: ' + rareCount + ' | Horror: ' + horrorCount, boxX + 20, boxY + boxHeight - 50);
      
      // Close button
      const closeButtonX = centerX - 40;
      const closeButtonY = boxY + boxHeight - 35;
      ctx.fillStyle = 'rgba(100, 80, 60, 0.8)';
      ctx.fillRect(closeButtonX, closeButtonY, 80, 30);
      ctx.strokeStyle = 'rgba(150, 120, 80, 0.8)';
      ctx.lineWidth = 2;
      ctx.strokeRect(closeButtonX, closeButtonY, 80, 30);
      ctx.fillStyle = 'rgba(200, 150, 100, 0.9)';
      ctx.font = 'bold 14px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Close', centerX, closeButtonY + 20);
      
      ctx.restore();
    },
    
    // Catch Display Overlay
    renderCatchDisplay(ctx) {
      const centerX = ctx.canvas.width / 2;
      const centerY = ctx.canvas.height / 2;
      const boxWidth = 350;
      const boxHeight = 400;
      const boxX = centerX - boxWidth / 2;
      const boxY = centerY - boxHeight / 2;
      
      ctx.save();
      
      // Backdrop
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      
      // Main box
      const lastCatch = window.GameState ? window.GameState.lastCatch : null;
      const fish = lastCatch ? lastCatch.fish : null;
      
      if (fish && fish.isHorror) {
        ctx.fillStyle = 'rgba(60, 20, 20, 0.95)';
      } else {
        ctx.fillStyle = 'rgba(40, 30, 20, 0.95)';
      }
      ctx.fillRect(boxX, boxY, boxWidth, boxHeight);
      
      // Border
      if (fish && fish.isHorror) {
        ctx.strokeStyle = 'rgba(255, 100, 100, 0.8)';
      } else {
        ctx.strokeStyle = 'rgba(200, 150, 100, 0.8)';
      }
      ctx.lineWidth = 3;
      ctx.strokeRect(boxX, boxY, boxWidth, boxHeight);
      
      if (fish) {
        // Header
        ctx.fillStyle = 'rgba(200, 150, 100, 0.8)';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('You caught a...', centerX, boxY + 30);
        
        // Fish name
        if (fish.isHorror) {
          ctx.fillStyle = 'rgba(255, 100, 100, 0.95)';
        } else {
          ctx.fillStyle = 'rgba(255, 200, 100, 0.95)';
        }
        ctx.font = 'bold 24px Arial';
        ctx.fillText(fish.name, centerX, boxY + 70);
        
        // Rarity badge
        let rarityColor = 'rgba(200, 150, 100, 0.8)';
        if (fish.rarity === 'rare') rarityColor = 'rgba(255, 200, 100, 0.9)';
        if (fish.rarity === 'legendary') rarityColor = 'rgba(255, 150, 50, 0.9)';
        
        ctx.fillStyle = rarityColor;
        ctx.font = 'bold 12px Arial';
        ctx.fillText(fish.rarity.toUpperCase(), centerX, boxY + 100);
        
        // Description
        ctx.fillStyle = 'rgba(200, 150, 100, 0.8)';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        const description = fish.isHorror && fish.horrorDescription ? fish.horrorDescription : fish.description;
        const words = description.split(' ');
        let line = '';
        let yPos = boxY + 150;
        
        for (let i = 0; i < words.length; i++) {
          const testLine = line + (line ? ' ' : '') + words[i];
          if (testLine.length > 35) {
            ctx.fillText(line, centerX, yPos);
            line = words[i];
            yPos += 20;
          } else {
            line = testLine;
          }
        }
        if (line) ctx.fillText(line, centerX, yPos);
      }
      
      // Continue button
      const buttonX = centerX - 50;
      const buttonY = boxY + boxHeight - 50;
      ctx.fillStyle = 'rgba(100, 80, 60, 0.8)';
      ctx.fillRect(buttonX, buttonY, 100, 35);
      ctx.strokeStyle = 'rgba(150, 120, 80, 0.8)';
      ctx.lineWidth = 2;
      ctx.strokeRect(buttonX, buttonY, 100, 35);
      ctx.fillStyle = 'rgba(200, 150, 100, 0.9)';
      ctx.font = 'bold 14px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Continue', centerX, buttonY + 22);
      
      ctx.restore();
    },
    
    // Pause Menu Overlay
    renderPauseMenu(ctx) {
      const centerX = ctx.canvas.width / 2;
      const centerY = ctx.canvas.height / 2;
      const boxWidth = 300;
      const boxHeight = 250;
      const boxX = centerX - boxWidth / 2;
      const boxY = centerY - boxHeight / 2;
      
      ctx.save();
      
      // Backdrop
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      
      // Main box
      ctx.fillStyle = 'rgba(40, 30, 20, 0.95)';
      ctx.fillRect(boxX, boxY, boxWidth, boxHeight);
      
      // Border
      ctx.strokeStyle = 'rgba(200, 150, 100, 0.8)';
      ctx.lineWidth = 3;
      ctx.strokeRect(boxX, boxY, boxWidth, boxHeight);
      
      // Title
      ctx.fillStyle = 'rgba(255, 200, 100, 0.95)';
      ctx.font = 'bold 28px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('PAUSED', centerX, boxY + 50);
      
      // Resume button
      const resumeY = boxY + 100;
      ctx.fillStyle = 'rgba(100, 80, 60, 0.8)';
      ctx.fillRect(centerX - 60, resumeY, 120, 35);
      ctx.strokeStyle = 'rgba(150, 120, 80, 0.8)';
      ctx.lineWidth = 2;
      ctx.strokeRect(centerX - 60, resumeY, 120, 35);
      ctx.fillStyle = 'rgba(200, 150, 100, 0.9)';
      ctx.font = 'bold 14px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Resume (ESC)', centerX, resumeY + 22);
      
      // Menu button
      const menuY = resumeY + 50;
      ctx.fillStyle = 'rgba(100, 80, 60, 0.8)';
      ctx.fillRect(centerX - 60, menuY, 120, 35);
      ctx.strokeStyle = 'rgba(150, 120, 80, 0.8)';
      ctx.lineWidth = 2;
      ctx.strokeRect(centerX - 60, menuY, 120, 35);
      ctx.fillStyle = 'rgba(200, 150, 100, 0.9)';
      ctx.font = 'bold 14px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Main Menu', centerX, menuY + 22);
      
      ctx.restore();
    }
  };
  
  if (typeof window !== 'undefined') window.UIManager = window.UIManager || UIManager;
  if (typeof module !== 'undefined') module.exports = UIManager;
})();
