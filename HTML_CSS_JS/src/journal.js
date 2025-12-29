// Journal.js - Track catches and statistics
(function(){
  const Journal = {
    isOpen: false,
    catches: [],
    stats: {
      totalCatches: 0,
      totalCasts: 0,
      baitUsed: {},
      fishCaught: {},
      bitesMissed: 0,
      linesBroken: 0,
      fishEscaped: 0,
      totalPlayTime: 0,
      currentDay: 1
    },
    
    init() {
      this.isOpen = false;
      // Initialize with defaults first
      this.catches = [];
      this.stats = {
        totalCatches: 0,
        totalCasts: 0,
        baitUsed: {},
        fishCaught: {},
        bitesMissed: 0,
        linesBroken: 0,
        fishEscaped: 0,
        totalPlayTime: 0,
        currentDay: 1
      };
      // Then load from storage (this will override defaults if data exists)
      this.loadFromStorage();
      console.log('📔 Journal initialized with ' + this.catches.length + ' catches');
    },
    
    toggle() {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        this.showJournal();
      } else {
        this.hideJournal();
      }
    },
    
    open() {
      this.isOpen = true;
      this.showJournal();
    },
    
    close() {
      this.isOpen = false;
      this.hideJournal();
    },
    
    showJournal() {
      const panel = document.getElementById('journal-panel');
      if (panel) {
        this.draw(); // Populate the content
        panel.classList.remove('hidden');
        panel.classList.add('visible');
        panel.setAttribute('aria-hidden', 'false');
        window.menuActive = true;
      }
    },
    
    hideJournal() {
      const panel = document.getElementById('journal-panel');
      if (panel) {
        panel.classList.remove('visible');
        panel.classList.add('hidden');
        panel.setAttribute('aria-hidden', 'true');
        window.menuActive = false;
      }
    },
    
    recordCatch(fishName, fishData) {
      const catch_entry = {
        name: fishName || 'Unknown',
        day: (window.DayNightCycle && window.DayNightCycle.getCurrentDay) ? window.DayNightCycle.getCurrentDay() : 1,
        time: (window.DayNightCycle && window.DayNightCycle.getTime) ? window.DayNightCycle.getTime() : 0,
        timestamp: Date.now(),
        data: fishData || {}
      };
      
      this.catches.push(catch_entry);
      this.stats.totalCatches++;
      
      if (!this.stats.fishCaught[fishName]) {
        this.stats.fishCaught[fishName] = 0;
      }
      this.stats.fishCaught[fishName]++;
      
      this.saveToStorage();
      console.log('📔 Recorded catch: ' + fishName);
    },
    
    recordCast() {
      this.stats.totalCasts++;
      this.saveToStorage();
    },
    
    recordBaitUsed(baitName) {
      if (!this.stats.baitUsed[baitName]) {
        this.stats.baitUsed[baitName] = 0;
      }
      this.stats.baitUsed[baitName]++;
      this.saveToStorage();
    },
    
    recordBiteMissed() {
      this.stats.bitesMissed++;
      this.saveToStorage();
    },
    
    recordLineBreak() {
      this.stats.linesBroken++;
      this.saveToStorage();
    },
    
    recordFishEscaped() {
      this.stats.fishEscaped++;
      this.saveToStorage();
    },
    
    getCatches() {
      return this.catches;
    },
    
    getStats() {
      return this.stats;
    },
    
    getCatchCount(fishName) {
      return this.stats.fishCaught[fishName] || 0;
    },
    
    getTotalCatches() {
      return this.stats.totalCatches;
    },
    
    saveToStorage() {
      try {
        const data = {
          catches: this.catches,
          stats: this.stats
        };
        localStorage.setItem('hopelesscatch_journal', JSON.stringify(data));
      } catch (e) {
        console.error('Failed to save journal', e);
      }
    },
    
    loadFromStorage() {
      try {
        const data = localStorage.getItem('hopelesscatch_journal');
        if (data) {
          const parsed = JSON.parse(data);
          this.catches = parsed.catches || [];
          this.stats = Object.assign(this.stats, parsed.stats || {});
        }
      } catch (e) {
        console.error('Failed to load journal', e);
      }
    },
    
    clearAll() {
      this.catches = [];
      this.stats = {
        totalCatches: 0,
        totalCasts: 0,
        baitUsed: {},
        fishCaught: {},
        bitesMissed: 0,
        linesBroken: 0,
        fishEscaped: 0,
        totalPlayTime: 0,
        currentDay: 1
      };
      localStorage.removeItem('hopelesscatch_journal');
      console.log('📔 Journal cleared');
    },
    
    clearStats() {
      // Clear only stats, keep catch history
      this.stats = {
        totalCatches: 0,
        totalCasts: 0,
        baitUsed: {},
        fishCaught: {},
        bitesMissed: 0,
        linesBroken: 0,
        fishEscaped: 0,
        totalPlayTime: 0,
        currentDay: 1
      };
      this.saveToStorage();
      console.log('📔 Journal stats cleared');
    },
    
    // Debug function to check if data is being saved
    debugSaveStatus() {
      const data = localStorage.getItem('hopelesscatch_journal');
      if (data) {
        const parsed = JSON.parse(data);
        console.log('✅ Journal data found in localStorage');
        console.log('   Catches:', parsed.catches ? parsed.catches.length : 0);
        console.log('   Total Catches:', parsed.stats ? parsed.stats.totalCatches : 0);
        return true;
      } else {
        console.warn('❌ No journal data in localStorage');
        return false;
      }
    },
    
    draw() {
      if (!this.isOpen) return;
      
      const panel = document.getElementById('journal-panel');
      const content = document.getElementById('journal-content');
      
      if (!panel || !content) return;
      
      // Build HTML content for the journal
      let html = '';
      
      // Add stats in a nice box
      html += '<div style="margin-bottom: 20px; border: 1px solid #8b7355; border-radius: 6px; padding: 12px; background: rgba(0,0,0,0.2);">';
      html += '<h3 style="color: #d4a574; margin: 0 0 10px 0; font-size: 14px;">📊 Statistics</h3>';
      html += '<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 12px;">';
      html += '<p style="margin: 0;"><strong>Catches:</strong> ' + this.stats.totalCatches + '</p>';
      html += '<p style="margin: 0;"><strong>Casts:</strong> ' + this.stats.totalCasts + '</p>';
      html += '<p style="margin: 0;"><strong>Missed:</strong> ' + this.stats.bitesMissed + '</p>';
      html += '<p style="margin: 0;"><strong>Broken:</strong> ' + this.stats.linesBroken + '</p>';
      html += '<p style="margin: 0;"><strong>Escaped:</strong> ' + this.stats.fishEscaped + '</p>';
      html += '<p style="margin: 0;"><strong>Success Rate:</strong> ' + (this.stats.totalCasts > 0 ? Math.round((this.stats.totalCatches / this.stats.totalCasts) * 100) : 0) + '%</p>';
      html += '</div>';
      html += '</div>';
      
      // Group catches by day
      const catchesByDay = {};
      for (const catch_entry of this.catches) {
        const day = catch_entry.day || 1;
        if (!catchesByDay[day]) {
          catchesByDay[day] = [];
        }
        catchesByDay[day].push(catch_entry);
      }
      
      if (Object.keys(catchesByDay).length > 0) {
        html += '<div style="margin-top: 15px;">';
        html += '<h3 style="color: #d4a574; margin: 0 0 12px 0; font-size: 14px;">🎣 Catch History</h3>';
        
        // Show days in reverse order (most recent first)
        const days = Object.keys(catchesByDay).map(Number).sort((a, b) => b - a);
        for (const day of days) {
          html += '<div style="margin-bottom: 12px; border-left: 3px solid #d4a574; padding-left: 10px;">';
          html += '<h4 style="color: #d4a574; margin: 0 0 8px 0; font-size: 12px;">📅 Day ' + day + ' (' + catchesByDay[day].length + ' catch' + (catchesByDay[day].length !== 1 ? 'es' : '') + ')</h4>';
          for (const catch_entry of catchesByDay[day]) {
            const timeStr = catch_entry.time ? ' at ' + Math.floor(catch_entry.time * 24) + ':' + String(Math.floor((catch_entry.time * 24 % 1) * 60)).padStart(2, '0') : '';
            html += '<p style="margin: 4px 0; padding: 4px 8px; background: rgba(255,255,255,0.05); border-radius: 3px; font-size: 11px;">🐟 ' + catch_entry.name + timeStr + '</p>';
          }
          html += '</div>';
        }
        html += '</div>';
      } else {
        html += '<p style="color: #999; font-style: italic; text-align: center; padding: 20px;">No catches yet. Go fishing!</p>';
      }
      
      content.innerHTML = html;
    }
  };
  
  if (typeof window !== 'undefined') window.Journal = window.Journal || Journal;
  if (typeof module !== 'undefined') module.exports = Journal;
})();
