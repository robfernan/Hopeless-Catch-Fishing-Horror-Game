# Implementation Plan: Hopeless Catch - Metroidvania Horror Fishing

## Overview

This implementation plan transforms Hopeless Catch into a metroidvania-style horror fishing game. Tasks are organized to build incrementally: core systems first, then room/map structure, then fishing mechanics, then progression, and finally polish. The existing UI and journal systems will be preserved and integrated.

## Tasks

- [x] 1. Core Type Definitions and State Management
  - [x] 1.1 Define Room, FishingSpot, RoomTransition, Platform, WaterArea interfaces
    - Create src/types/room.ts with all room-related types
    - _Requirements: 3.1, 3.2_
  - [x] 1.2 Define Ability, AbilityDefinition, UnlockRequirement interfaces
    - Create src/types/progression.ts with progression types
    - _Requirements: 9.1, 4.1_
  - [x] 1.3 Update GameState interface with metroidvania fields
    - Add currentRoom, unlockedRooms, unlockedAbilities, playerVelocity, playerState
    - _Requirements: 2.1, 3.3, 9.1_
  - [x] 1.4 Create room data structures for all 21 rooms (7 per map)
    - Create src/data/rooms/lake.ts, forest.ts, mountain.ts
    - Define platforms, water areas, fishing spots, transitions for each room
    - _Requirements: 5.1, 5.2_

- [x] 2. Player Physics System
  - [x] 2.1 Implement horizontal movement with velocity
    - Update useGameState with physics-based movement
    - Add walkSpeed, acceleration, friction
    - _Requirements: 2.1_
  - [x] 2.2 Implement gravity and grounding detection
    - Add gravity, isGrounded state, platform collision
    - _Requirements: 2.2_
  - [x] 2.3 Implement jump mechanics
    - Add jumpForce, canJump state, jump input handling
    - _Requirements: 2.4_
  - [x] 2.4 Implement swim mechanics
    - Add swim state, water detection, vertical movement in water
    - Requires swim ability to access deep water
    - _Requirements: 2.5, 9.6_
  - [x] 2.5 Implement climb mechanics
    - Add climb state, climbable detection, vertical movement on climbables
    - _Requirements: 2.6_

- [x] 2.6 Write property test for player movement boundaries
  - **Property 4: Player Movement Boundaries**
  - **Validates: Requirements 2.2, 2.7**

- [x] 3. Room System and Transitions
  - [x] 3.1 Create RoomRenderer component
    - Render platforms, water areas, decorations based on room data
    - Use Craftpix tiles for water, pier, grass
    - _Requirements: 3.2, 16.5, 16.6, 16.7_
  - [x] 3.2 Implement room transition detection
    - Detect when player overlaps transition zones
    - _Requirements: 2.3_
  - [x] 3.3 Implement room loading and state preservation
    - Load target room, set player position, preserve game state
    - _Requirements: 3.3, 3.6_
  - [x] 3.4 Implement discovered rooms tracking
    - Add room to discoveredRooms on first entry
    - _Requirements: 3.4_
  - [x] 3.5 Create minimap component showing discovered rooms
    - Display room connections and current position
    - _Requirements: 3.4_

- [x] 3.6 Write property test for room transitions
  - **Property 5: Room Transition Consistency**
  - **Validates: Requirements 2.3, 3.6**

- [x] 3.7 Write property test for discovered rooms
  - **Property 11: Discovered Rooms Tracking**
  - **Validates: Requirements 3.4**

- [x] 4. Sprite Animation System
  - [x] 4.1 Create SpriteAnimator component
    - Load sprite sheets, handle frame timing, render current frame
    - Support horizontal flip for facing direction
    - _Requirements: 16.1_
  - [x] 4.2 Integrate Fisherman animations
    - Map player states to animations (idle, walk, fish, hook, row, hurt)
    - _Requirements: 16.1_
  - [x] 4.3 Create animated player component
    - Replace static player image with animated sprite
    - Handle state transitions between animations
    - _Requirements: 16.1_

- [x] 5. Fishing Mechanics Overhaul
  - [x] 5.1 Implement fishing spot detection
    - Detect when player is at valid fishing spot
    - Show fishing prompt when at spot
    - _Requirements: 1.1_
  - [x] 5.2 Implement fishing state machine with proper transitions
    - IDLE → CASTING → WAITING → TENSION → HOOKING → REELING → CAUGHT/ESCAPED
    - Validate transitions, prevent invalid states
    - _Requirements: 1.1, 1.4, 1.6_
  - [x] 5.3 Implement tension system with fish-specific patterns
    - Different tension patterns per fish (steady, erratic, aggressive, passive)
    - Visual tension bar with green/yellow/red zones
    - _Requirements: 1.3, 7.3_
  - [x] 5.4 Implement catch success/failure based on tension management
    - Success if tension stays in green zone during reel
    - Failure if tension goes to red zone
    - _Requirements: 1.5_
  - [x] 5.5 Implement fishing line and bobber rendering
    - Draw line from player to bobber
    - Animate bobber based on tension state
    - _Requirements: 1.1, 1.2, 1.3_

- [x] 5.6 Write property test for fishing state machine
  - **Property 3: Fishing State Machine Transitions**
  - **Validates: Requirements 1.4, 1.5, 1.6**

- [x] 5.7 Write property test for bobber position
  - **Property 10: Bobber Position Validity**
  - **Validates: Requirements 1.1, 1.2**

- [x] 6. Fish Data and Availability System
  - [x] 6.1 Update fish data with all 9 species
    - Add tensionPattern, difficulty, baitMultiplier to each fish
    - Include horror descriptions for night creatures
    - _Requirements: 7.1, 7.2_
  - [x] 6.2 Implement room-specific fish availability
    - Each room has specific fish that can be caught there
    - _Requirements: 7.6_
  - [x] 6.3 Implement time-based fish filtering
    - Day fish during day, night creatures during night
    - _Requirements: 5.3, 5.4_
  - [x] 6.4 Implement bait probability system
    - Apply bait multipliers to fish catch probability
    - _Requirements: 7.3_

- [x] 6.5 Write property test for fish availability
  - **Property 2: Fish Availability by Time and Mode**
  - **Validates: Requirements 5.3, 5.4, 11.1**

- [x] 6.6 Write property test for bait effectiveness
  - **Property 7: Bait Effectiveness on Fish Species**
  - **Validates: Requirements 7.3**

- [x] 7. Progression System
  - [x] 7.1 Implement ability unlock logic
    - Track catches, check unlock requirements, grant abilities
    - _Requirements: 9.2_
  - [x] 7.2 Implement room unlock logic
    - Check catch/ability requirements, unlock rooms
    - _Requirements: 4.2, 4.3_
  - [x] 7.3 Implement locked room UI
    - Show lock icon and requirement when approaching locked room
    - _Requirements: 4.4_
  - [x] 7.4 Implement ability effects
    - Deep Cast: access deep fishing spots
    - Precision Cast: target specific fish
    - Night Vision: reduced anomaly effects
    - Swim: access underwater areas
    - _Requirements: 9.3, 9.4, 9.5, 9.6_
  - [x] 7.5 Implement bait unlock progression
    - Start with worms, unlock others through catches
    - _Requirements: 8.6_

- [x] 7.6 Write property test for progression unlocks
  - **Property 6: Progression Unlock Logic**
  - **Validates: Requirements 4.2, 4.3, 9.2**

- [x] 7.7 Write property test for locked room access
  - **Property 12: Locked Room Access Prevention**
  - **Validates: Requirements 4.1**

- [x] 8. Checkpoint - Core Gameplay Loop
  - Ensure player can move, jump, and navigate between rooms
  - Ensure fishing works at fishing spots with tension system
  - Ensure catches are recorded and progression unlocks work
  - Ensure room transitions work correctly
  - Run all property tests and verify they pass
  - ✅ All 45 tests passing (6 test files)

- [ ] 9. Boat System
  - [ ] 9.1 Create boat component with Craftpix sprite
    - Render boat at designated positions in rooms
    - _Requirements: 15.5, 16.3_
  - [ ] 9.2 Implement boat boarding/exiting
    - Player can interact with boat to board
    - Player can exit boat to return to dock
    - _Requirements: 15.1, 15.4_
  - [ ] 9.3 Implement boat movement (rowing)
    - Use row animation when moving in boat
    - Access deeper fishing spots from boat
    - _Requirements: 15.2, 15.3_
  - [ ] 9.4 Update fishing to work from boat
    - Cast from boat position when boarded
    - _Requirements: 15.2_

- [ ] 10. Anomaly System
  - [ ] 10.1 Implement anomaly triggering logic
    - Check time, peaceful mode, room frequency
    - Random trigger based on frequency
    - _Requirements: 12.1_
  - [ ] 10.2 Implement visual anomalies
    - Screen flicker, color shift, distortion effects
    - CSS filters and canvas effects
    - _Requirements: 12.2_
  - [ ] 10.3 Implement audio anomalies
    - Whispers, breathing, splash sounds
    - Random audio cues during anomalies
    - _Requirements: 12.3_
  - [ ] 10.4 Implement physics anomalies
    - Bobber twitches, line wobbles
    - Subtle wrongness in fishing mechanics
    - _Requirements: 12.4_
  - [ ] 10.5 Implement Night Vision ability effect
    - Reduce anomaly intensity when ability is active
    - _Requirements: 9.5_

- [ ] 10.6 Write property test for anomaly conditions
  - **Property 9: Anomaly Triggering Conditions**
  - **Validates: Requirements 11.2, 12.1**

- [ ] 11. Persistent Storage System
  - [ ] 11.1 Implement localStorage save/load for game state
    - Save journal, progression, position, settings
    - _Requirements: 13.1, 13.2, 13.3_
  - [ ] 11.2 Implement auto-save on key events
    - Save after catch, room change, unlock
    - _Requirements: 13.1, 13.2, 13.3_
  - [ ] 11.3 Implement manual save at cabin
    - Create checkpoint save
    - _Requirements: 13.5_
  - [ ] 11.4 Implement load game on startup
    - Restore all saved state
    - _Requirements: 13.4_
  - [ ] 11.5 Implement save data validation
    - Validate loaded data, use defaults for invalid fields
    - Handle corrupted saves gracefully

- [ ] 11.6 Write property test for state persistence
  - **Property 1: State Persistence Round Trip**
  - **Validates: Requirements 4.5, 9.7, 10.4, 11.5, 13.4**

- [ ] 12. Journal Statistics Update
  - [ ] 12.1 Add rooms discovered to journal statistics
    - Track and display discovered rooms count
    - _Requirements: 10.3_
  - [ ] 12.2 Add room-specific catch tracking
    - Show catches per room in journal
    - _Requirements: 10.1_

- [ ] 12.3 Write property test for journal statistics
  - **Property 8: Journal Statistics Accuracy**
  - **Validates: Requirements 10.3**

- [ ] 13. Environment Art Integration
  - [ ] 13.1 Integrate Craftpix water tiles
    - Use Water.png for water rendering
    - Implement water shimmer animation
    - _Requirements: 16.5_
  - [ ] 13.2 Integrate Craftpix pier tiles
    - Use Pier_Tiles.png for dock/platform rendering
    - _Requirements: 16.6_
  - [ ] 13.3 Integrate Craftpix fishing hut
    - Use Fishing_hut.png for cabin in each map
    - _Requirements: 16.4_
  - [ ] 13.4 Integrate Craftpix decorations
    - Use Grass1-4.png, barrels, boxes for environment
    - _Requirements: 16.7_
  - [ ] 13.5 Integrate Craftpix boat sprites
    - Use Boat.png, Boat2.png for boat rendering
    - _Requirements: 16.3_
  - [ ] 13.6 Integrate Craftpix icons for UI
    - Use Icons_01-20.png for bait, abilities, UI elements
    - _Requirements: 16.8_

- [ ] 14. Checkpoint - All Features Complete
  - Ensure all 21 rooms are navigable
  - Ensure all fish species are catchable in correct rooms
  - Ensure all abilities unlock correctly
  - Ensure boat system works
  - Ensure anomalies trigger correctly
  - Ensure save/load works
  - Run all property tests and verify they pass

- [ ] 15. Time System Enhancement
  - [ ] 15.1 Implement hour-based time (0-23)
    - Replace simple day/night toggle with hour tracking
    - _Requirements: 6.1, 6.2_
  - [ ] 15.2 Implement cabin rest mechanic
    - Rest advances time by 12 hours
    - _Requirements: 6.6_
  - [ ] 15.3 Implement smooth day/night transitions
    - Gradual color changes during dawn/dusk
    - _Requirements: 6.5_

- [ ] 16. Peaceful Mode Integration
  - [ ] 16.1 Ensure peaceful mode disables night creatures
    - Filter out night creatures from all rooms
    - _Requirements: 11.1_
  - [ ] 16.2 Ensure peaceful mode disables anomalies
    - Set anomaly chance to 0 in peaceful mode
    - _Requirements: 11.2_
  - [ ] 16.3 Ensure peaceful mode persists
    - Save and load peaceful mode setting
    - _Requirements: 11.5_

- [ ] 17. Mobile and Responsive Support
  - [ ] 17.1 Implement touch controls
    - Virtual joystick for movement
    - Tap zones for jump, fish, interact
    - _Requirements: 14.3_
  - [ ] 17.2 Implement responsive scaling
    - Scale game canvas to fit screen
    - Maintain pixel art aesthetic
    - _Requirements: 14.2_
  - [ ] 17.3 Test on various screen sizes
    - Mobile, tablet, desktop
    - _Requirements: 14.5_

- [ ] 18. Performance Optimization
  - [ ] 18.1 Implement sprite sheet caching
    - Cache loaded sprite sheets
  - [ ] 18.2 Optimize room rendering
    - Only render visible elements
  - [ ] 18.3 Debounce input handling
    - Prevent excessive state updates
  - [ ] 18.4 Profile and optimize to 60 FPS
    - _Requirements: 17.5_

- [ ] 19. Final Polish and Testing
  - [ ] 19.1 Run all property tests
    - Verify all 12 properties pass
  - [ ] 19.2 Test complete gameplay flow
    - Play through all maps and rooms
  - [ ] 19.3 Test horror atmosphere
    - Verify anomalies feel unsettling
  - [ ] 19.4 Test progression balance
    - Verify unlock requirements feel fair
  - [ ] 19.5 Browser compatibility testing
    - Chrome, Firefox, Safari, Edge
    - _Requirements: 14.5_

## Notes

- All tasks including property-based tests are required
- Existing UI and journal systems will be preserved and integrated
- Craftpix assets are located in src/assets/FromCraftpixFishingPack/
- Custom fish assets are in src/assets/fish/
- Custom bait assets are in src/assets/bait/
- Focus on core gameplay loop first (tasks 1-8), then features (9-16), then polish (17-19)
