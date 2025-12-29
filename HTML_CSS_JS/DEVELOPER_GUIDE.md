# Developer Guide - Hopeless Catch

Technical documentation for developers working on Hopeless Catch.

## Project Structure

```
HTML_CSS_JS/
├── index.html              Main game file (HTML + inline JS)
├── src/
│   ├── main.js            Game initialization
│   ├── gamestate.js       Game state management
│   ├── world.js           World logic
│   ├── player.js          Player movement
│   ├── world/
│   │   └── worldRenderer.js    Visual effects (sky, water, particles)
│   ├── audio/
│   │   ├── audioManager.js     Web Audio API wrapper
│   │   ├── musicManager.js     Music system
│   │   ├── soundEffects.js     Sound effects library
│   │   └── audioPlaceholder.js Procedural audio generation
│   ├── fishing/
│   │   ├── fishingController.js State machine
│   │   ├── castingsystem.js    Casting and bobber
│   │   ├── fishdata.js         Fish definitions and lore
│   │   ├── baitsystem.js       Bait management
│   │   ├── statisticssystem.js Catch tracking
│   │   ├── bitedetection.js    Bite logic
│   │   ├── reelingsystem.js    Reeling mechanics
│   │   └── fishing.js          Fishing connector
│   ├── journal.js          Statistics and encyclopedia
│   ├── cabin.js            Rest/time advancement
│   ├── daynightcycle.js    Time management
│   ├── weather.js          Weather system
│   ├── anomalies.js        Glitch effects
│   ├── screenshake.js      Screen shake effects
│   ├── uimanager.js        UI management
│   ├── skyrenderer.js      Sun/moon rendering
│   └── savesystem.js       Save/load system
├── assets/
│   ├── bait/               Bait sprites
│   ├── fish/               Fish sprites
│   ├── ui/                 UI elements
│   └── player.png          Player sprite
├── styles/
│   └── global.css          Styling
└── README.md               User documentation
```

## Key Systems

### WorldRenderer (src/world/worldRenderer.js)
Handles all visual effects:
- **Sky gradients**: Smooth transitions through day/night
- **Water animation**: Sine wave ripples
- **Particle effects**: Light rays and dust
- **Night effects**: Dark overlay and moonlight glow

### AudioManager (src/audio/audioManager.js)
Web Audio API wrapper:
- Gain node hierarchy (master → music/sfx/ambient)
- Buffer caching
- Autoplay policy compliance
- Volume control

### MusicManager (src/audio/musicManager.js)
Music system:
- Automatic day/night switching
- Smooth fade transitions (0.5s)
- Procedural themes (C major for day, A minor for night)

### FishingController (src/fishing/fishingController.js)
State machine for fishing:
```
idle → ready → casting → bobbing → biting → reeling/struggling → idle
```

States:
- **idle**: No fishing
- **ready**: Waiting for cast
- **casting**: Power meter building
- **bobbing**: Waiting for bite
- **biting**: Fish is biting
- **reeling**: Player reeling in
- **struggling**: Fish struggling

### CastingSystem (src/fishing/castingsystem.js)
Handles casting and bobber:
- Power meter (0-1)
- Bobber position calculation
- Line drawing
- Splash effects

### Journal (src/journal.js)
Statistics and encyclopedia:
- Catch tracking
- Fish encyclopedia
- Lore display
- Statistics (total catches, casts, etc.)

## Code Patterns

### Module Pattern
All systems use the module pattern:
```javascript
(function(){
  const SystemName = {
    init() { /* initialization */ },
    update(dt) { /* per-frame update */ },
    draw(ctx) { /* rendering */ }
  };
  
  if(typeof window !== 'undefined') window.SystemName = SystemName;
  if(typeof module !== 'undefined') module.exports = SystemName;
})();
```

### Global Access
Systems are accessed via `window`:
```javascript
window.FishingController.update(dt);
window.WorldRenderer.draw(ctx, timeOfDay);
window.Journal.recordCatch(fishName, fishData);
```

### Event Handling
Keyboard events in index.html:
```javascript
window.addEventListener('keydown', (e) => {
  if(e.code === 'Space') {
    // Handle SPACE key
  }
});
```

## Common Tasks

### Add a New Fish
Edit `src/fishing/fishdata.js`:
```javascript
{
  name: 'Fish Name',
  description: 'Description',
  rarity: 0.5,
  difficulty: 3,
  asset: 'fish_name',
  lore: 'Lore text'
}
```

### Add a Sound Effect
1. Add to `src/audio/soundEffects.js`:
```javascript
effects: {
  mySound: { name: 'mySound', url: 'assets/audio/sfx/my_sound.mp3', volume: 0.7 }
}
```

2. Play it:
```javascript
window.SoundEffects.playFishingSound('mySound');
```

### Modify Sky Colors
Edit `src/world/worldRenderer.js` in `drawSky()`:
```javascript
// Change these colors
skyTop = '#0a0a2e';    // Top of sky
skyBottom = '#16213e'; // Bottom of sky
```

### Change Fishing Difficulty
Edit `src/fishing/fishdata.js`:
```javascript
{ name: 'Fish', difficulty: 3 } // 1-6, higher = harder
```

### Adjust Music Volume
Edit `src/audio/audioManager.js`:
```javascript
musicVolume: 0.6  // 0-1
```

## Debugging

### Console Logging
Check browser console (F12) for:
- Initialization messages
- Error messages
- State changes
- Audio loading

### Common Issues

**No music playing**:
- Check audio context is initialized
- Verify browser allows autoplay
- Check console for errors

**Bobber not visible**:
- Check `bobberX` and `bobberY` are set
- Verify water Y position is correct
- Check drawing code in CastingSystem

**Fish not catching**:
- Check fishing state machine
- Verify bait is selected
- Check ReelingSystem logic

**Performance issues**:
- Profile with DevTools
- Check particle count
- Reduce draw calls
- Cache calculations

## Performance Tips

1. **Minimize redraws**: Only redraw changed areas
2. **Cache calculations**: Store repeated calculations
3. **Limit particles**: Keep particle count low
4. **Use requestAnimationFrame**: Already done in main loop
5. **Profile regularly**: Use DevTools Performance tab

## Testing

### Manual Testing
1. Open index.html
2. Test all controls
3. Check all states
4. Verify audio
5. Test Peaceful Mode
6. Check journal

### Browser Compatibility
- Chrome/Chromium ✅
- Firefox ✅
- Safari ✅
- Edge ✅
- Mobile browsers ✅

## Future Enhancements

### Phase 2: Night Experience
- Enhanced glitch effects
- Creature sounds
- Screen distortion
- Additional visual effects

### Phase 3: Storytelling
- Catch notes system
- Mystery unlocks
- Fish almanac
- Progressive story

### Phase 4: Polish
- Performance optimization
- Visual polish
- Audio balance
- Accessibility

## Resources

- [HTML5 Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [Game Programming Patterns](https://gameprogrammingpatterns.com/)

## Support

For questions:
1. Check code comments
2. Review similar systems
3. Test in browser console
4. Check browser DevTools

---

**Last Updated**: Today  
**Version**: 1.1.0
