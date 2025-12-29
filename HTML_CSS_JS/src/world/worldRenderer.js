// worldRenderer.js - Terrain, vegetation, and world rendering
(function(){
  const WorldRenderer = {
    // Terrain layers
    terrain: {
      sky: { y: 0, height: 460 },
      mountains: { y: 80, height: 150 },
      grass: { y: 460, height: 20 },
      water: { y: 480, height: 120 }
    },
    
    // Vegetation
    trees: [],
    bushes: [],
    rocks: [],
    
    init() {
      this.generateTerrain();
    },
    
    generateTerrain() {
      // Generate trees along shoreline (like Love2D version)
      // Trees are positioned at specific X coordinates along the grass/water boundary
      // Trees should have their BOTTOM at y=460 (grass level), so we position them higher
      this.trees = [
        { x: -20, y: 380, width: 40, height: 80, color: '#2d5016', type: 'pine' },
        { x: 40, y: 385, width: 35, height: 75, color: '#3a6b1f', type: 'birch' },
        { x: 100, y: 380, width: 40, height: 80, color: '#2d5016', type: 'oak' },
        { x: 160, y: 385, width: 35, height: 75, color: '#3a6b1f', type: 'dead' },
        { x: 220, y: 380, width: 40, height: 80, color: '#2d5016', type: 'pine' },
        { x: 280, y: 380, width: 40, height: 80, color: '#2d5016', type: 'oak' },
        { x: 340, y: 385, width: 35, height: 75, color: '#3a6b1f', type: 'birch' },
        { x: 400, y: 380, width: 40, height: 80, color: '#2d5016', type: 'pine' },
        { x: 460, y: 385, width: 35, height: 75, color: '#3a6b1f', type: 'dead' },
        { x: 520, y: 380, width: 40, height: 80, color: '#2d5016', type: 'oak' },
        { x: 580, y: 385, width: 35, height: 75, color: '#3a6b1f', type: 'birch' },
        { x: 640, y: 380, width: 40, height: 80, color: '#2d5016', type: 'pine' },
        { x: 700, y: 380, width: 40, height: 80, color: '#2d5016', type: 'oak' },
        { x: 760, y: 385, width: 35, height: 75, color: '#3a6b1f', type: 'birch' },
        { x: 820, y: 380, width: 40, height: 80, color: '#2d5016', type: 'pine' }
      ];
      
      // Generate bushes
      this.bushes = [
        { x: 25, y: 470, width: 16, height: 16, color: '#4a7c2c' },
        { x: 125, y: 470, width: 16, height: 16, color: '#5a8c3c' },
        { x: 175, y: 470, width: 16, height: 16, color: '#4a7c2c' },
        { x: 275, y: 470, width: 16, height: 16, color: '#5a8c3c' },
        { x: 325, y: 470, width: 16, height: 16, color: '#4a7c2c' },
        { x: 425, y: 470, width: 16, height: 16, color: '#5a8c3c' },
        { x: 475, y: 470, width: 16, height: 16, color: '#4a7c2c' },
        { x: 575, y: 470, width: 16, height: 16, color: '#5a8c3c' },
        { x: 625, y: 470, width: 16, height: 16, color: '#4a7c2c' },
        { x: 725, y: 470, width: 16, height: 16, color: '#5a8c3c' }
      ];
      
      // Generate rocks
      this.rocks = [
        { x: 45, y: 480, width: 6, height: 6, color: '#8b8680' },
        { x: 120, y: 475, width: 4, height: 4, color: '#9b9690' },
        { x: 200, y: 485, width: 8, height: 8, color: '#8b8680' },
        { x: 350, y: 478, width: 4, height: 4, color: '#9b9690' },
        { x: 480, y: 482, width: 6, height: 6, color: '#8b8680' },
        { x: 620, y: 476, width: 4, height: 4, color: '#9b9690' },
        { x: 720, y: 484, width: 6, height: 6, color: '#8b8680' }
      ];
    },
    
    drawSky(ctx, timeOfDay) {
      // Determine sky colors based on time - enhanced for peaceful horror
      let skyTop, skyBottom;
      
      if (timeOfDay < 0.15) {
        // Night: Deep blue to purple
        skyTop = '#0a0a2e';
        skyBottom = '#16213e';
      } else if (timeOfDay < 0.25) {
        // Dawn: Purple to orange
        const t = (timeOfDay - 0.15) / 0.1;
        const r1 = Math.floor(100 + t * 155);
        const g1 = Math.floor(100 + t * 128);
        const b1 = 200;
        skyTop = `rgb(${r1},${g1},${b1})`;
        skyBottom = '#ff9933';
      } else if (timeOfDay < 0.35) {
        // Morning: Orange to blue
        const t = (timeOfDay - 0.25) / 0.1;
        const r1 = Math.floor(255 - t * 168);
        const g1 = Math.floor(153 + t * 102);
        const b1 = Math.floor(51 + t * 204);
        skyTop = `rgb(${r1},${g1},${b1})`;
        skyBottom = '#87ceeb';
      } else if (timeOfDay < 0.5) {
        // Morning to midday: Blue
        const t = (timeOfDay - 0.35) / 0.15;
        const r1 = Math.floor(87 + t * 0);
        const g1 = Math.floor(206 + t * 0);
        const b1 = Math.floor(235 + t * 20);
        skyTop = `rgb(${r1},${g1},${b1})`;
        skyBottom = '#e0f6ff';
      } else if (timeOfDay < 0.65) {
        // Midday: Bright blue
        skyTop = '#4da6ff';
        skyBottom = '#b3d9ff';
      } else if (timeOfDay < 0.75) {
        // Afternoon to dusk: Blue to orange
        const t = (timeOfDay - 0.65) / 0.1;
        const r1 = Math.floor(77 + t * 178);
        const g1 = Math.floor(166 - t * 16);
        const b1 = Math.floor(255 - t * 155);
        skyTop = `rgb(${r1},${g1},${b1})`;
        skyBottom = '#ff9933';
      } else if (timeOfDay < 0.85) {
        // Dusk: Orange to purple
        const t = (timeOfDay - 0.75) / 0.1;
        const r1 = Math.floor(255 - t * 155);
        const g1 = Math.floor(153 - t * 53);
        const b1 = Math.floor(51 + t * 149);
        skyTop = `rgb(${r1},${g1},${b1})`;
        skyBottom = '#663399';
      } else {
        // Night: Deep blue
        skyTop = '#0a0a2e';
        skyBottom = '#16213e';
      }
      
      // Draw sky gradient
      const g = ctx.createLinearGradient(0, 0, 0, this.terrain.grass.y);
      g.addColorStop(0, skyTop);
      g.addColorStop(1, skyBottom);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, ctx.canvas.width, this.terrain.grass.y);
    },
    
    drawMountains(ctx) {
      // Draw distant mountains - touch the grass at y=460
      const grassY = this.terrain.grass.y;
      ctx.fillStyle = 'rgba(100, 120, 140, 0.6)';
      
      // Left mountain
      ctx.beginPath();
      ctx.moveTo(0, grassY);
      ctx.lineTo(150, 80);
      ctx.lineTo(300, grassY);
      ctx.fill();
      
      // Right mountain
      ctx.beginPath();
      ctx.moveTo(500, grassY);
      ctx.lineTo(650, 85);
      ctx.lineTo(800, grassY);
      ctx.fill();
      
      // Mountain shadows
      ctx.fillStyle = 'rgba(80, 100, 120, 0.4)';
      ctx.beginPath();
      ctx.moveTo(150, 80);
      ctx.lineTo(300, grassY);
      ctx.lineTo(200, grassY);
      ctx.fill();
      
      ctx.beginPath();
      ctx.moveTo(650, 85);
      ctx.lineTo(800, grassY);
      ctx.lineTo(700, grassY);
      ctx.fill();
    },
    
    drawTrees(ctx) {
      for (const tree of this.trees) {
        // Trunk
        ctx.fillStyle = '#5c4033';
        ctx.fillRect(tree.x + tree.width * 0.3, tree.y + tree.height * 0.6, tree.width * 0.4, tree.height * 0.4);
        
        // Foliage
        ctx.fillStyle = tree.color;
        ctx.beginPath();
        ctx.arc(tree.x + tree.width / 2, tree.y + tree.height * 0.5, tree.width * 0.6, 0, Math.PI * 2);
        ctx.fill();
        
        // Foliage highlight
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.beginPath();
        ctx.arc(tree.x + tree.width * 0.6, tree.y + tree.height * 0.3, tree.width * 0.3, 0, Math.PI * 2);
        ctx.fill();
      }
    },
    
    drawBushes(ctx) {
      for (const bush of this.bushes) {
        ctx.fillStyle = bush.color;
        ctx.beginPath();
        ctx.ellipse(bush.x + bush.width / 2, bush.y + bush.height / 2, bush.width / 2, bush.height / 2, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Bush highlight
        ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.beginPath();
        ctx.ellipse(bush.x + bush.width * 0.6, bush.y + bush.height * 0.4, bush.width * 0.25, bush.height * 0.2, 0, 0, Math.PI * 2);
        ctx.fill();
      }
    },
    
    drawRocks(ctx) {
      for (const rock of this.rocks) {
        ctx.fillStyle = rock.color;
        ctx.beginPath();
        ctx.ellipse(rock.x + rock.width / 2, rock.y + rock.height / 2, rock.width / 2, rock.height / 2, 0.3, 0, Math.PI * 2);
        ctx.fill();
        
        // Rock shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.beginPath();
        ctx.ellipse(rock.x + rock.width / 2, rock.y + rock.height * 0.7, rock.width * 0.4, rock.height * 0.2, 0, 0, Math.PI * 2);
        ctx.fill();
      }
    },
    
    drawGrass(ctx) {
      // Grass layer
      ctx.fillStyle = '#36c06a';
      ctx.fillRect(0, this.terrain.grass.y, ctx.canvas.width, this.terrain.grass.height);
      
      // Grass texture
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.lineWidth = 1;
      for (let x = 0; x < ctx.canvas.width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, this.terrain.grass.y);
        ctx.lineTo(x + 20, this.terrain.grass.y + 20);
        ctx.stroke();
      }
    },
    
    drawWater(ctx) {
      const waterY = this.terrain.water.y;
      const time = (performance.now() || 0) / 1000;
      
      // Water gradient - darker at night
      const timeOfDay = (window.DayNightCycle && window.DayNightCycle.getTime) 
        ? window.DayNightCycle.getTime() 
        : 0.5;
      
      let waterColor1, waterColor2;
      if (timeOfDay < 0.2 || timeOfDay >= 0.8) {
        // Night: Darker water
        waterColor1 = '#1a4d4d';
        waterColor2 = '#0d2626';
      } else {
        // Day: Normal water
        waterColor1 = '#2fa0a0';
        waterColor2 = '#1a6b6b';
      }
      
      const waterGrad = ctx.createLinearGradient(0, waterY, 0, waterY + this.terrain.water.height);
      waterGrad.addColorStop(0, waterColor1);
      waterGrad.addColorStop(1, waterColor2);
      ctx.fillStyle = waterGrad;
      ctx.fillRect(0, waterY, ctx.canvas.width, this.terrain.water.height);
      
      // Animated ripples
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 5; i++) {
        const rippleY = waterY + 20 + i * 25;
        const wave = Math.sin(time * 2 + i) * 2;
        
        ctx.beginPath();
        ctx.moveTo(0, rippleY + wave);
        ctx.lineTo(ctx.canvas.width, rippleY + wave);
        ctx.stroke();
      }
    },
    
    drawDock(ctx) {
      const dockY = this.terrain.water.y - 25;
      const dockW = 150;
      const dockStart = Math.floor(ctx.canvas.width * 0.5 - dockW / 2);
      
      // Dock platform
      ctx.fillStyle = '#8b5a2b';
      ctx.fillRect(dockStart, dockY, dockW, 18);
      
      // Dock shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.fillRect(dockStart, dockY + 18, dockW, 6);
      
      // Dock posts
      ctx.fillStyle = '#654321';
      ctx.fillRect(dockStart + 10, dockY + 18, 8, 30);
      ctx.fillRect(dockStart + dockW - 18, dockY + 18, 8, 30);
    },
    
    drawHouse(ctx) {
      const houseX = 120;
      const houseY = this.terrain.grass.y - 64;
      
      // House body
      ctx.fillStyle = '#7a4';
      ctx.fillRect(houseX, houseY, 80, 64);
      
      // Roof
      ctx.fillStyle = '#8b4513';
      ctx.beginPath();
      ctx.moveTo(houseX, houseY);
      ctx.lineTo(houseX + 40, houseY - 20);
      ctx.lineTo(houseX + 80, houseY);
      ctx.fill();
      
      // Door
      ctx.fillStyle = '#443';
      ctx.fillRect(houseX + 30, houseY + 30, 20, 34);
      
      // Door handle
      ctx.fillStyle = '#ffd700';
      ctx.beginPath();
      ctx.arc(houseX + 48, houseY + 47, 2, 0, Math.PI * 2);
      ctx.fill();
      
      // Window
      ctx.fillStyle = '#87ceeb';
      ctx.fillRect(houseX + 10, houseY + 15, 15, 15);
      
      // Window panes
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(houseX + 17.5, houseY + 15);
      ctx.lineTo(houseX + 17.5, houseY + 30);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(houseX + 10, houseY + 22.5);
      ctx.lineTo(houseX + 25, houseY + 22.5);
      ctx.stroke();
    },
    
    drawParticles(ctx, timeOfDay) {
      const time = (performance.now() || 0) / 1000;
      
      // Light rays during sunrise/sunset
      if ((timeOfDay > 0.25 && timeOfDay < 0.35) || (timeOfDay > 0.65 && timeOfDay < 0.75)) {
        ctx.save();
        ctx.globalAlpha = 0.15;
        ctx.strokeStyle = '#ffcc66';
        ctx.lineWidth = 2;
        
        for (let i = 0; i < 5; i++) {
          const x = (ctx.canvas.width / 5) * (i + 1);
          const y = 100 + Math.sin(time + i) * 20;
          
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x + 50, 200);
          ctx.stroke();
        }
        ctx.restore();
      }
      
      // Dust particles (subtle)
      ctx.save();
      ctx.globalAlpha = 0.08;
      ctx.fillStyle = '#ffffff';
      
      for (let i = 0; i < 20; i++) {
        const x = (time * 10 + i * 40) % ctx.canvas.width;
        const y = 200 + Math.sin(time + i) * 50;
        const size = 1 + Math.sin(time * 2 + i) * 0.5;
        
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    },
    
    drawNightEffects(ctx, timeOfDay) {
      if (timeOfDay < 0.15 || timeOfDay >= 0.85) {
        // Night mode active
        ctx.save();
        
        // Add dark overlay
        ctx.globalAlpha = 0.25;
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        
        // Add moonlight glow
        const moonX = ctx.canvas.width * 0.8;
        const moonY = 100;
        const moonGrad = ctx.createRadialGradient(moonX, moonY, 0, moonX, moonY, 120);
        moonGrad.addColorStop(0, 'rgba(220, 220, 255, 0.15)');
        moonGrad.addColorStop(0.5, 'rgba(150, 150, 200, 0.05)');
        moonGrad.addColorStop(1, 'rgba(100, 100, 150, 0)');
        
        ctx.globalAlpha = 1;
        ctx.fillStyle = moonGrad;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        
        ctx.restore();
      }
    },
    
    draw(ctx, timeOfDay) {
      // Draw all world elements in order
      this.drawSky(ctx, timeOfDay);
      this.drawMountains(ctx);
      this.drawGrass(ctx);
      this.drawTrees(ctx);
      this.drawBushes(ctx);
      this.drawRocks(ctx);
      this.drawWater(ctx);
      this.drawDock(ctx);
      this.drawHouse(ctx);
      
      // Add atmospheric effects
      this.drawParticles(ctx, timeOfDay);
      this.drawNightEffects(ctx, timeOfDay);
    }
  };
  
  if (typeof window !== 'undefined') window.WorldRenderer = window.WorldRenderer || WorldRenderer;
  if (typeof module !== 'undefined') module.exports = WorldRenderer;
})();
