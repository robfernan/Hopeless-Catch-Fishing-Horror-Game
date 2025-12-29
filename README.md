# Hopeless Catch - Fishing Horror Game

A cozy pixel art fishing game with a subtle secret. Unwind by the lake, catch 9 unique fish species, and discover what lurks in the tranquil waters after dark.

## 🎮 Play the Game

### HTML/CSS/JS Version (Web Browser)
- **Location**: `HTML_CSS_JS/`
- **How to Play**: Open `HTML_CSS_JS/index.html` in any modern web browser
- **Status**: Core gameplay complete, additional features in development

### Love2D Version (Desktop)
- **Location**: `Love2d Version/`
- **How to Play**: Download and run `HopelessCatch.love` with Love2D
- **Status**: Complete reference implementation

## 🎣 Game Features

### Day Experience
- Beautiful sky transitions (sunrise, midday, sunset)
- Animated water with ripples
- Peaceful atmosphere
- 5 day fish species
- Strategic bait selection

### Night Experience
- Darkened visuals with moonlight
- Eerie atmosphere
- 4 night creatures
- Optional anomalies
- Mysterious encounters

### Core Gameplay
- 7-phase fishing system
- Dynamic day/night cycle
- Weather effects (rain, wind)
- Fish encyclopedia and catch tracking
- Cabin rest mechanic
- Multiple bait types

## 🎮 Controls

| Key | Action |
|-----|--------|
| WASD / Arrows | Move |
| SPACE | Cast/Reel/Hook |
| B | Open Tackle Box |
| TAB | Open Journal |
| H | Rest in Cabin |
| ESC | Pause/Menu |

## 🐟 Fish Species

### Day Fish (5 species)
- **Sunfish** - Common, easy to catch
- **Bass** - Common, good for beginners
- **Trout** - Uncommon, prefers moving water
- **Catfish** - Uncommon, bottom feeder
- **Golden Carp** - Rare, valuable catch

### Night Fish (4 species)
- **Pale Crawler** - Uncommon, mysterious
- **Bleeding Carp** - Uncommon, unsettling
- **Whispering Eel** - Rare, eerie sounds
- **Fishman** - Very rare, legendary encounter

## 📁 Repository Structure

```
Hopeless-Catch-Fishing-Horror-Game/
├── README.md                     # This file
├── HTML_CSS_JS/                  # Web version (HTML5/Canvas)
│   ├── README.md                 # Web version documentation
│   ├── index.html                # Main game file
│   ├── src/                      # JavaScript source code
│   ├── assets/                   # Game assets (images)
│   └── styles/                   # CSS styles
├── Love2d Version/               # Desktop version (Love2D/Lua)
│   ├── HopelessCatch.love        # Playable game file
│   └── HopelessCatch_Source/     # Lua source code
└── docs/                         # Documentation
    ├── ANALYSIS_SUMMARY.md       # Development analysis
    ├── IMPLEMENTATION_ROADMAP.md # Development roadmap
    └── LOVE2D_VS_HTML_COMPARISON.md # Version comparison
```

## 🚀 Quick Start

### Web Version
1. Clone this repository
2. Navigate to `HTML_CSS_JS/`
3. Open `index.html` directly in your web browser (no server needed!)
4. Press SPACE to start fishing!

### Love2D Version
1. Install [Love2D](https://love2d.org/)
2. Download `Love2d Version/HopelessCatch.love`
3. Run with Love2D or drag onto Love2D executable
4. Enjoy the complete experience!

## 🛠️ Development

### Web Version Status
- ✅ **Core Fishing**: 7-phase fishing system complete
- ✅ **Game Systems**: Day/night cycle, weather, save system
- ✅ **Fish & Bait**: All 9 fish species and 4 bait types
- ✅ **Journal**: Catch tracking and statistics
- ⚠️ **UI Systems**: Basic implementation (menus in progress)
- ⚠️ **World Rendering**: Functional but simplified
- ❌ **Audio System**: Not yet implemented
- ❌ **Horror Elements**: Minimal implementation

### Love2D Version Status
- ✅ **Complete**: Full feature implementation
- ✅ **Reference**: Source code for web port development

See `docs/ANALYSIS_SUMMARY.md` for detailed development status.

## 📖 Documentation

- **[Web Version Guide](HTML_CSS_JS/README.md)** - Detailed web version documentation
- **[Developer Guide](HTML_CSS_JS/DEVELOPER_GUIDE.md)** - Technical implementation details
- **[Analysis Summary](docs/ANALYSIS_SUMMARY.md)** - Development progress analysis
- **[Implementation Roadmap](docs/IMPLEMENTATION_ROADMAP.md)** - Future development plans

## 🎨 Technical Details

### Web Version
- **Engine**: HTML5 Canvas + Web Audio API
- **Resolution**: 800x600 pixels (pixel art style)
- **FPS**: 60 (locked)
- **Storage**: Browser localStorage
- **Audio**: Procedurally generated (planned)

### Love2D Version
- **Engine**: Love2D (Lua)
- **Resolution**: 800x600 pixels
- **FPS**: 60 (locked)
- **Storage**: Love2D filesystem
- **Audio**: Love2D audio system

## 🎯 Game Modes

### Normal Mode
- Full day/night cycle
- All fish species available
- Atmospheric effects
- Mystery elements

### Peaceful Mode
- Disable night creatures
- No anomalies or horror elements
- Stress-free fishing experience
- Perfect for relaxation

## 🏆 Features Comparison

| Feature | Web Version | Love2D Version |
|---------|-------------|----------------|
| Fishing Mechanics | ✅ Complete | ✅ Complete |
| Fish Species (9) | ✅ Complete | ✅ Complete |
| Day/Night Cycle | ✅ Complete | ✅ Complete |
| Weather System | ✅ Complete | ✅ Complete |
| Journal System | ✅ Complete | ✅ Complete |
| Save System | ✅ Complete | ✅ Complete |
| Menu System | ⚠️ Basic | ✅ Complete |
| Audio System | ❌ Planned | ✅ Complete |
| World Rendering | ⚠️ Basic | ✅ Complete |
| Horror Elements | ⚠️ Minimal | ✅ Complete |

## 🤝 Contributing

This is a personal project, but feedback and suggestions are welcome! Feel free to:
- Report bugs or issues
- Suggest improvements
- Share your fishing experiences
- Contribute to documentation

## 📄 License

Free to play and modify for personal use.

## 🎣 Credits

- **Game Design & Programming**: MungDaal321 / robfernan
- **Pixel Art**: Created with Aseprite
- **Music**: Procedurally generated
- **Built with**: HTML5 Canvas, Web Audio API, Love2D

---

**Current Version**: 1.1.0  
**Status**: Playable (Web), Complete (Love2D)  

Enjoy your peaceful fishing adventure! 🎣

*"Sometimes the most peaceful waters hide the deepest secrets..."*