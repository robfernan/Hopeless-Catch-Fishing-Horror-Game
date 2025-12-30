# Issues Found in Current Implementation

## Critical Issues

### 1. **ESC Handler Conflict - PARTIALLY FIXED**
- **Status**: Still broken
- **Problem**: The pause handler checks `!window.menuActive` but `window.menuActive` is set to `true` when the menu is shown
- **Current Code** (line ~750):
  ```javascript
  } else if(!window.menuActive && !window.tackleboxOpen){
    // If in game, pause
    togglePause()
  }
  ```
- **Issue**: When you start the game and press ESC, `window.menuActive` is still `true` from the menu initialization, so the pause handler never triggers
- **Root Cause**: `showMenu()` sets `window.menuActive = true` (line ~540), and this flag is never reset when the game starts

### 2. **Menu Active Flag Not Reset on Game Start**
- **Status**: Broken
- **Problem**: When Start button is clicked, `hideMenu()` is called which sets `window.menuActive = false`, BUT the scene switch to mountain happens asynchronously
- **Current Code** (line ~550):
  ```javascript
  startBtn.addEventListener('click', ()=>{ 
    hideMenu();  // Sets window.menuActive = false
    if (window.SceneManager) {
      window.SceneManager.switchScene('mountain').catch(...);  // Async!
    }
  })
  ```
- **Issue**: The scene switch is async, so there's a race condition. The game might start before `window.menuActive` is properly reset

### 3. **Pause Panel Not Properly Wired**
- **Status**: Broken
- **Problem**: The pause panel buttons are trying to get elements that might not exist yet
- **Current Code** (line ~760):
  ```javascript
  const pausePanel = document.getElementById('pause-panel')
  const pauseContinueBtn = document.getElementById('pause-continue')
  const pauseMenuBtn = document.getElementById('pause-menu')
  const locationLakeBtn = document.getElementById('location-lake')
  const locationForestBtn = document.getElementById('location-forest')
  const locationMountainBtn = document.getElementById('location-mountain')
  ```
- **Issue**: These elements are defined in the HTML, but the event listeners are added BEFORE the menu interaction code runs, so they might not be properly initialized

### 4. **togglePause() Called Before Pause Panel Buttons Are Wired**
- **Status**: Broken
- **Problem**: The `togglePause()` function is defined at line ~440, but the pause panel button handlers are added at line ~760
- **Issue**: If ESC is pressed before the menu interaction code runs, `togglePause()` will try to manipulate the pause panel, but the buttons won't have event listeners yet

### 5. **Scene Lifecycle Issue - Pause Menu Doesn't Hide Game**
- **Status**: Broken
- **Problem**: When you pause the game, the scene is still updating and drawing
- **Current Code** (line ~480):
  ```javascript
  if (!isPaused) {
    update(dt);
  }
  draw();  // Always draws, even when paused!
  ```
- **Issue**: The game continues to draw even when paused, which is correct, but the pause menu overlay might not be visible on top

### 6. **Location Switching Doesn't Properly Resume**
- **Status**: Broken
- **Problem**: When you click a location button, it calls `togglePause()` to resume, but the pause state might not be properly synchronized
- **Current Code** (line ~790):
  ```javascript
  locationLakeBtn.addEventListener('click', ()=>{
    if (window.SceneManager) {
      window.SceneManager.switchScene('lake').catch(...);
      togglePause(); // Resume game
    }
  })
  ```
- **Issue**: `togglePause()` toggles the pause state, but if `isPaused` is already `false`, this will pause the game instead of resuming it

## Summary of Fixes Needed

1. **Reset `window.menuActive` flag properly when game starts**
   - Ensure it's set to `false` AFTER the scene switch completes

2. **Fix the pause handler condition**
   - Change from `!window.menuActive` to check if we're actually in a game scene
   - Or properly manage the `window.menuActive` flag throughout the game lifecycle

3. **Fix location switching resume logic**
   - Instead of calling `togglePause()`, directly set `isPaused = false` and hide the pause panel

4. **Ensure pause panel buttons are wired before they're needed**
   - Move the button wiring code earlier in the initialization

5. **Add proper game state tracking**
   - Track whether we're in menu, in-game, or paused
   - Use this to determine if ESC should pause or do nothing
