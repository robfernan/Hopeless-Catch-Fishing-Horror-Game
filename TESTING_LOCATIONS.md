# Testing All 3 Locations

## How to Switch Locations

### Method 1: Pause Menu (Easiest)
1. **Start the game** - Click "Start Game" from main menu
2. **Press ESC** - Opens pause menu
3. **Click location button** - Choose Lake, Forest, or Mountain
4. **Game resumes** - You're now in the new location!

### Method 2: Console (For Developers)
```javascript
// In browser console (F12)
window.SceneManager.switchScene('lake');
window.SceneManager.switchScene('forest');
window.SceneManager.switchScene('mountain');
```

## What to Test

### Lake (Starting Location)
- ✅ Peaceful atmosphere
- ✅ Calm water with dock
- ✅ Bright day colors, dark night colors
- ✅ All fishing mechanics work
- ✅ Player can move around

### Forest (Mysterious)
- ✅ Darker, moodier atmosphere
- ✅ Murky water with bridge
- ✅ Gnarled trees on sides
- ✅ Overcast day colors, very dark night
- ✅ All fishing mechanics work
- ✅ Player can move around

### Mountain (Challenging)
- ✅ Rocky terrain
- ✅ Flowing water with current lines
- ✅ Cliffs in background
- ✅ Boulders and rocks
- ✅ Bright day colors, dark night
- ✅ All fishing mechanics work
- ✅ Player can move around

## Testing Checklist

### Visual Testing
- [ ] Lake looks peaceful
- [ ] Forest looks mysterious
- [ ] Mountain looks challenging
- [ ] Day/night colors transition smoothly
- [ ] Water looks different in each location
- [ ] Structures are unique per location

### Gameplay Testing
- [ ] Can move player in all locations
- [ ] Can cast fishing line in all locations
- [ ] Can catch fish in all locations
- [ ] Day/night cycle works in all locations
- [ ] Weather effects work in all locations
- [ ] Pause menu works in all locations

### Location Switching Testing
- [ ] Can switch from Lake to Forest
- [ ] Can switch from Lake to Mountain
- [ ] Can switch from Forest to Lake
- [ ] Can switch from Forest to Mountain
- [ ] Can switch from Mountain to Lake
- [ ] Can switch from Mountain to Forest
- [ ] Switching resumes game automatically
- [ ] No console errors on switch

### Pause Menu Testing
- [ ] ESC opens pause menu
- [ ] Pause menu shows all 3 location buttons
- [ ] Location buttons are clickable
- [ ] Clicking location switches scene
- [ ] Game resumes after location switch
- [ ] Continue button works
- [ ] Main Menu button works

## Quick Test Flow

1. **Start game** → Lake scene
2. **Press ESC** → Pause menu appears
3. **Click Forest** → Switch to Forest, game resumes
4. **Press ESC** → Pause menu appears
5. **Click Mountain** → Switch to Mountain, game resumes
6. **Press ESC** → Pause menu appears
7. **Click Lake** → Switch back to Lake, game resumes
8. **Press ESC** → Pause menu appears
9. **Click Main Menu** → Return to main menu

## Expected Behavior

### Location Switch
- Pause menu closes
- Scene transitions instantly
- New location renders
- Game resumes automatically
- No console errors

### Pause Menu
- Opens with ESC
- Shows 3 location buttons
- Shows Continue button
- Shows Main Menu button
- Closes with Continue or location click

### Visuals
- Each location has unique appearance
- Colors change based on time of day
- Structures are location-specific
- Water looks different per location

## Troubleshooting

### Pause menu doesn't appear
- Check browser console for errors
- Make sure ESC key is working
- Try clicking canvas first, then ESC

### Location buttons don't work
- Check browser console for errors
- Make sure SceneManager is initialized
- Try console method: `window.SceneManager.switchScene('forest')`

### Scene doesn't change
- Check browser console for errors
- Verify scene is registered
- Try refreshing page

### Console errors
- Check browser console (F12)
- Look for "Scene switch error" messages
- Report any errors found

## Performance Notes

- Location switching should be instant
- No lag or stuttering
- Smooth transitions
- 60 FPS maintained

## Success Criteria

✅ All 3 locations are playable
✅ Can switch between any locations
✅ Pause menu works correctly
✅ No console errors
✅ Visuals are distinct per location
✅ Gameplay works in all locations

---

**Status**: Ready to test! 🎣
