# Implementation Plan: HTML_CSS_JS Enhancement

## Overview

This implementation plan ports the UI, data, and game logic from the Lovable (React/TypeScript) version to the HTML_CSS_JS (vanilla Canvas) version. Tasks are ordered to build incrementally, with data layer first, then UI components, then integration.

## Tasks

- [ ] 1. Enhance Fish Data Module
  - [x] 1.1 Update fishdata.js with full Lovable fish properties
    - Add id, image, rarity enum, isNightOnly, isHorror, horrorDescription, tensionPattern, attractedByBait, baitMultiplier to all 9 fish
    - Port exact values from Lovable/src/data/fishData.ts
    - _Requirements: 1.1, 1.2_

  - [x] 1.2 Implement getDayFish() and getNightFish() functions
    - getDayFish returns fish where isNightOnly === false
    - getNightFish returns fish where isNightOnly === true
    - _Requirements: 1.3, 1.4_

  - [x] 1.3 Implement getAvailableFish(timeOfDay, peacefulMode) function
    - In peaceful mode, return only day fish
    - At night without peaceful mode, return day fish + night fish
    - _Requirements: 1.5_

  - [ ]* 1.4 Write property test for fish filtering
    - **Property 2: Day/Night Fish Filtering**
    - **Validates: Requirements 1.3, 1.4, 1.5**

- [ ] 2. Create Bait Data Module
  - [x] 2.1 Create baitdata.js with 4 bait types
    - Define worms, minnows, cheese, corn with type, name, image, description
    - Port exact values from Lovable/src/data/baitData.ts
    - _Requirements: 2.1, 2.2_

  - [x] 2.2 Implement getBaitByType(type) function
    - Return bait object matching the given type
    - Return undefined for invalid types
    - _Requirements: 2.3_

  - [ ]* 2.3 Write property test for bait lookup
    - **Property 5: Bait Lookup Round-Trip**
    - **Validates: Requirements 2.3**

- [ ] 3. Create Room Data Module
  - [x] 3.1 Create roomdata.js with lake room definitions
    - Define lake_shallow_dock, lake_deep_pool, lake_lily_pads
    - Include all required properties: id, name, map, platforms, waterAreas, fishingSpots, transitions, playerSpawn, ambientLight, fogDensity, anomalyFrequency, isLocked
    - _Requirements: 3.1, 3.3_

  - [x] 3.2 Add mountain room definitions
    - Define mountain_pass, mountain_frozen_lake, mountain_waterfall_cave, mountain_ice_cavern, mountain_underground_river, mountain_depths, mountain_abyss
    - _Requirements: 3.2, 3.3_

  - [x] 3.3 Implement room-to-fish mapping and getRoomFish function
    - Create ROOM_FISH_MAP with fish IDs per room
    - getRoomFish returns intersection of room fish and available fish
    - _Requirements: 3.4, 1.6_

  - [ ]* 3.4 Write property test for room fish filtering
    - **Property 3: Room Fish Filtering**
    - **Validates: Requirements 1.6, 3.4**

- [x] 4. Checkpoint - Data Layer Complete
  - Ensure all data modules load without errors
  - Verify fish, bait, and room data are accessible globally
  - Ask the user if questions arise

- [ ] 5. Enhance UI Manager with Overlay System
  - [x] 5.1 Add overlay state management to UIManager
    - Track activeOverlay: null | 'tacklebox' | 'journal' | 'catch' | 'pause'
    - Add methods: openOverlay(type), closeOverlay(), isOverlayOpen()
    - _Requirements: 5.1, 6.1, 8.1_

  - [x] 5.2 Implement renderTackleBox method
    - Render semi-transparent backdrop
    - Render title "TACKLE BOX" and subtitle
    - Render 2x2 grid of bait options with images
    - Highlight selected bait, show "EQUIPPED" label
    - Render Close button
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8_

  - [x] 5.3 Implement renderJournalPanel method
    - Render semi-transparent backdrop
    - Render title "FISHING JOURNAL" and catch count
    - Group catches by fish type and render entries
    - Apply horror styling for horror fish
    - Render stats footer and Close button
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 6.8, 6.9_

  - [ ]* 5.4 Write property test for journal grouping
    - **Property 7: Journal Grouping Correctness**
    - **Validates: Requirements 6.4, 6.5**

- [ ] 6. Implement Fishing UI Component
  - [x] 6.1 Implement renderFishingUI method
    - Render phase labels for all 8 fishing phases
    - Animate/shake panel during bite phase
    - _Requirements: 7.1, 7.2_

  - [x] 6.2 Implement tension meter rendering
    - Render tension bar with percentage
    - Color based on thresholds: green (<40%), yellow (40-70%), red (>70%)
    - Display tension advice text
    - _Requirements: 7.3, 7.4, 7.5_

  - [x] 6.3 Implement bobber animation and action buttons
    - Render animated bobber during wait/bite phases
    - Render appropriate action button based on phase
    - _Requirements: 7.6, 7.7_

  - [ ]* 6.4 Write property test for tension coloring
    - **Property 8: Tension Meter Coloring**
    - **Validates: Requirements 7.4**

- [ ] 7. Implement Catch Display Component
  - [x] 7.1 Implement renderCatchDisplay method
    - Render centered modal with fish image
    - Display fish name with horror styling if applicable
    - Show rarity badge and description
    - Render Continue button
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 8.7_

- [ ] 8. Implement Game HUD Component
  - [x] 8.1 Implement renderGameHUD method
    - Render location name and time indicator in top-left
    - Render catch counter in top-right
    - Render current bait display in bottom-left
    - Render quick access buttons and controls hint
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6_

- [x] 9. Checkpoint - UI Components Complete
  - Test each overlay renders correctly
  - Verify styling matches Lovable version
  - Ask the user if questions arise

- [ ] 10. Implement Main Menu Scene
  - [x] 10.1 Update menuScene.js with Lovable styling
    - Render title "HOPELESS" in golden color with shadow
    - Render subtitle "CATCH" in orange/brown
    - Render tagline and vertical button layout
    - _Requirements: 4.1, 4.2, 4.3, 4.4_

  - [x] 10.2 Add animated background effects
    - Implement water reflection animation
    - Add floating light orb animations
    - _Requirements: 4.5, 4.6_

  - [x] 10.3 Wire button click handlers
    - Play button transitions to game screen
    - Settings button transitions to settings screen
    - About button transitions to about screen
    - _Requirements: 4.7, 4.8, 4.9_

- [ ] 11. Implement Keyboard Controls and Screen Routing
  - [x] 11.1 Enhance keyboard input handling
    - ESC closes overlays or shows pause menu
    - TAB opens journal, B opens tackle box
    - H toggles time of day, M opens map
    - WASD/arrows for movement, SPACE for fishing actions
    - _Requirements: 10.2, 10.3, 10.4, 10.5, 10.6, 10.7, 10.8, 10.9, 10.10, 10.11_

  - [x] 11.2 Implement screen routing in SceneManager
    - Support screens: menu, game, settings, about
    - Handle transitions between screens
    - _Requirements: 10.1_

- [ ] 12. Integration and Wiring
  - [x] 12.1 Connect fish data to fishing controller
    - Use getRoomFish for fish selection based on current room
    - Apply bait multipliers to catch probability
    - _Requirements: 1.6_

  - [x] 12.2 Connect UI overlays to game state
    - TackleBox updates currentBait in GameState
    - JournalPanel reads catches from GameState
    - CatchDisplay shows fish from last catch
    - _Requirements: 5.7, 6.4_

  - [x] 12.3 Connect HUD to game state
    - Display current location, time, bait, catch count
    - Update on state changes
    - _Requirements: 9.1, 9.2, 9.3, 9.4_

- [x] 13. Final Checkpoint - Integration Complete
  - Run all property tests
  - Verify full gameplay loop works
  - Test all keyboard shortcuts
  - Ask the user if questions arise

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties
- Unit tests validate specific examples and edge cases
