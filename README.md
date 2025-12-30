# Hopeless Catch - Cozy Horror Fishing

A unique blend of relaxing fishing and subtle horror. Unwind by the lake during the day, but beware what lurks in the waters after dark.

## Quick Start

1. Open `HTML_CSS_JS/index.html` in a web browser
2. Click "Start Game" to begin
3. Use WASD or Arrow Keys to move
4. Press SPACE to cast and reel
5. Press B to open tackle box
6. Press ESC to pause

## Game Concept

**By Day:** A peaceful, cozy fishing experience. Relax, catch fish, upgrade your gear, and bond with your companion.

**By Night:** The waters reveal their secrets. Strange creatures emerge, mysterious events occur, and the atmosphere shifts to something more unsettling.

## Controls

- **WASD / Arrow Keys** - Move around the lake
- **SPACE** - Cast line / Reel fish (hold for power)
- **B** - Open tackle box (select bait)
- **J** - Open journal (view catches and lore)
- **ESC** - Pause / Resume
- **C** - Visit cabin (rest and advance time)

## Fishing Mechanics

### Casting System
- Press SPACE to enter casting mode
- Watch the power meter (0-100%)
- **Perfect cast (50%)** = bonus accuracy and distance
- Release at the right moment for better results
- Weather affects casting accuracy

### Reeling System
- When you get a bite, press SPACE to hook the fish
- Hold SPACE to reel in the fish
- Watch the tension meter - too much tension breaks the line
- Different fish have different difficulty levels
- Reel steadily to land the catch

### Bait System
- Press B to open tackle box
- Select different bait types:
  - **Worms** - Attracts common day fish
  - **Minnows** - Better for larger fish
  - **Cheese** - Attracts catfish
  - **Corn** - Attracts rare species
- Each bait attracts different fish
- Better bait = more bites and rarer catches

## Fish Species

### Day Fish (Peaceful)
- **Sunfish** - Easy, common
- **Bass** - Medium difficulty
- **Trout** - Medium-hard
- **Catfish** - Hard
- **Golden Carp** - Very rare, beautiful

### Night Creatures (Mysterious)
- **Pale Crawler** - Eerie, glowing
- **Bleeding Carp** - Unsettling appearance
- **Whispering Eel** - Strange sounds
- **Fishman** - Legendary, terrifying

## Game Features

### Cozy Elements
- **Peaceful Day Fishing** - Relaxing atmosphere, beautiful pixel art
- **Companion System** - Your loyal friend reacts to events
- **Cabin Retreat** - Rest, save progress, advance time
- **Journal & Stats** - Track catches and discoveries
- **Progression** - Upgrade your gear and unlock new areas

### Horror Elements
- **Dynamic Day/Night** - Atmosphere shifts after dark
- **Weather Effects** - Rain and wind affect fishing
- **Mysterious Lore** - Discover secrets through journal entries
- **Strange Events** - Anomalies and unusual occurrences
- **Legendary Catches** - Rare, unsettling creatures
- **Environmental Storytelling** - Clues about the lake's secrets

## Game Tips

1. **Fish During the Day** - Easier catches, more relaxing
2. **Explore at Night** - Discover rare creatures and lore
3. **Perfect Your Cast** - Aim for 50% power for bonus accuracy
4. **Manage Tension** - Don't reel too fast or the line breaks
5. **Try Different Baits** - Each attracts different species
6. **Visit the Cabin** - Rest and advance time safely
7. **Read the Journal** - Piece together the lake's mysteries

## Progression System

### Gear Upgrades
- Better rods = improved casting accuracy
- Stronger reels = better tension management
- Premium tackle = attracts rarer fish

### Locations
- **Starting Lake** - Your peaceful fishing spot
- **Deep Forest Pond** - Unlocked after catching 5 species
- **Mountain Stream** - Unlocked after discovering lore
- **Mysterious Depths** - Unlocked after catching legendary fish

### Companion Bonding
- Your companion grows closer as you fish
- Unlocks special dialogue and reactions
- Warns you about dangerous situations
- Celebrates your legendary catches

## Project Structure

```
HTML_CSS_JS/
├── index.html          # Main game file
├── styles/
│   └── global.css      # All styling
└── src/
    ├── main.js         # Game initialization
    ├── gamestate.js    # Game state & progression
    ├── fishing/        # Fishing systems
    ├── world/          # World rendering
    ├── cabin.js        # Cabin interior
    ├── journal.js      # Journal & lore
    └── [other systems]
```

## Browser Support

- Chrome/Chromium
- Firefox
- Safari
- Edge

## Design Philosophy

**Hopeless Catch** is designed to be a sanctuary - a place where you can relax and unwind. But as you explore deeper, you'll discover that this peaceful lake holds secrets. The horror isn't about jump scares or stress - it's about atmosphere, mystery, and the unknown.

The game respects your time and emotions. You can always retreat to the cabin, take a break, and return when you're ready. The horror elements enhance the experience rather than detract from it.

---

**Status**: In Development
**Version**: 1.1.0
**Genre**: Cozy Horror Fishing Adventure
