# itch.io Migration Plan: Love2D → HTML/CSS/JS

## Overview
Transition the existing itch.io page from Love2D version to HTML/CSS/JS version as the primary playable game, while keeping Love2D as a reference/alternative download.

## Current State
- **itch.io URL**: https://mungdaal321.itch.io/hopeless-catch
- **Current Version**: Love2D (complete, fully featured)
- **New Version**: HTML/CSS/JS (in development, core gameplay complete)

## Migration Strategy

### Phase 1: Preparation (This Week)
**Goal**: Get HTML version feature-complete enough to be the main version

#### Current Status
- ✅ Core fishing mechanics (100%)
- ✅ Game systems (90%)
- ✅ Save/load system (100%)
- ❌ Audio system (0%)
- ❌ Menu system (basic)
- ⚠️ World rendering (simplified)
- ⚠️ UI (functional but basic)

#### What Needs to Happen First
1. **Audio System** (4-6 hours) - CRITICAL
   - Background music (day/night)
   - Sound effects (casting, reeling, catch)
   - Ambient sounds
   - **Why**: Game feels incomplete without audio

2. **Menu System** (6-8 hours) - IMPORTANT
   - Main menu
   - Pause menu
   - Settings menu
   - **Why**: Better UX and player control

3. **Visual Polish** (4-6 hours) - NICE TO HAVE
   - Better UI styling
   - Improved world rendering
   - Enhanced animations

### Phase 2: Update itch.io Page (When Ready)
**Goal**: Make HTML version the primary playable version

#### Step 1: Update Project Settings
1. Go to itch.io project settings
2. Change primary upload to HTML version
3. Keep Love2D as secondary download
4. Update description to reflect HTML as main version

#### Step 2: Update Page Content
Replace current description with:

```markdown
# Hopeless Catch - Peaceful Fishing Horror Game

A cozy pixel art fishing game with a subtle secret. Unwind by the lake, catch 9 unique fish species, and discover what lurks in the tranquil waters after dark.

## Play Now (Web Version)
The web version is now the primary version! Play directly in your browser - no installation needed.

## Download (Desktop Version)
Prefer desktop? Download the Love2D version for the complete experience.

## Features
- 7-phase fishing system
- Dynamic day/night cycle
- 9 unique fish species
- Strategic bait selection
- Fish encyclopedia and catch tracking
- Peaceful and horror modes

## Controls
- WASD / Arrows: Move
- SPACE: Cast/Reel/Hook
- B: Tackle Box
- TAB: Journal
- H: Rest in Cabin
- ESC: Pause/Menu

## Development
The HTML version is actively being developed with new features coming regularly. Check the GitHub repository for the latest updates.

## Links
- GitHub: https://github.com/robfernan/Hopeless-Catch-Fishing-Horror-Game
- Report Issues: https://github.com/robfernan/Hopeless-Catch-Fishing-Horror-Game/issues
```

#### Step 3: Update Screenshots/GIFs
- Replace Love2D screenshots with HTML version screenshots
- Show day and night gameplay
- Show fishing mechanics
- Show journal/catch tracking

#### Step 4: Update Game Page
- Set "Kind of project" to HTML
- Enable "Embed in page"
- Upload HTML version as primary
- Keep Love2D as downloadable file

### Phase 3: Communicate the Change
**Goal**: Inform existing players about the transition

#### Announcement Post
Create a devlog post on itch.io:

```markdown
# HTML Version Now Live!

We're excited to announce that the web version of Hopeless Catch is now the primary playable version!

## What's New
- Play directly in your browser (no installation needed)
- Same core gameplay as the Love2D version
- Faster updates and improvements
- Cross-platform compatibility

## What About Love2D?
The Love2D version is still available as a download for those who prefer desktop play. Both versions will continue to be supported.

## What's Coming
We're actively developing new features:
- Audio system (music and sound effects)
- Enhanced menu system
- Improved world rendering
- UI polish and improvements

## Feedback
We'd love to hear your thoughts! Report bugs or suggest features on our GitHub repository.

Thank you for playing Hopeless Catch! 🎣
```

## Timeline

### Week 1: Development
- [ ] Implement audio system
- [ ] Improve menu system
- [ ] Polish visuals

### Week 2: Testing & Preparation
- [ ] Test HTML version thoroughly
- [ ] Prepare screenshots/GIFs
- [ ] Write announcement

### Week 3: Migration
- [ ] Update itch.io page
- [ ] Post announcement
- [ ] Monitor feedback

### Week 4+: Ongoing Development
- [ ] Continue feature development
- [ ] Gather player feedback
- [ ] Regular updates

## Success Metrics

Track these to measure migration success:

- **Downloads**: HTML version downloads increase
- **Engagement**: Player comments and feedback
- **Ratings**: Community ratings and reviews
- **Issues**: Bug reports and feature requests
- **Retention**: Players returning to play

## Risk Mitigation

### Risk: HTML version crashes or has bugs
**Mitigation**: 
- Thorough testing before migration
- Keep Love2D version available as fallback
- Quick bug fix process

### Risk: Players prefer Love2D version
**Mitigation**:
- Keep Love2D available for download
- Communicate that both versions are supported
- Gather feedback on what's missing

### Risk: Audio/features take too long
**Mitigation**:
- Migrate with core features complete
- Add audio/features after migration
- Post regular development updates

## Development Priorities (To Make HTML Version Ready)

### Critical (Must Have Before Migration)
1. **Audio System** - Game feels incomplete without it
2. **Stable Gameplay** - No crashes or major bugs
3. **Save System** - Must work reliably

### Important (Should Have Before Migration)
1. **Menu System** - Better UX
2. **Settings** - Volume, display options
3. **Visual Polish** - Professional appearance

### Nice to Have (Can Add After Migration)
1. **Enhanced World Rendering** - Terrain, vegetation
2. **Advanced UI** - Better tackle box, catch display
3. **Horror Elements** - Anomalies, atmospheric effects

## Next Steps

1. **Assess Current HTML Version**
   - Test all features
   - Identify critical bugs
   - List missing features

2. **Prioritize Development**
   - Audio system first (biggest impact)
   - Menu system second (better UX)
   - Polish third (professional feel)

3. **Set Migration Date**
   - Realistic timeline based on development
   - Buffer for unexpected issues
   - Announce to community

4. **Execute Migration**
   - Update itch.io page
   - Post announcement
   - Monitor feedback

## Questions to Consider

- When should we migrate? (After audio? After menus?)
- Should we do a beta period first?
- How do we handle players who prefer Love2D?
- What features are must-haves before migration?
- How often will we update after migration?

---

**Goal**: Make HTML version the primary version while maintaining Love2D as a reference and alternative option. This positions the project for long-term web-based development while respecting the existing community.

🎣 Let's make this transition smooth and exciting!