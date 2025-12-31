# Requirements Document

## Introduction

This document defines the requirements for porting the UI, data, and game logic from the Lovable (React/TypeScript) version to the HTML_CSS_JS version of Hopeless Catch. The goal is to have identical UI components, fish data, menus, fishing journal, and tackle box in the vanilla Canvas implementation.

## Glossary

- **Fish_Data**: The registry of all 9 fish species with properties, bait multipliers, and room availability
- **Bait_Data**: The registry of 4 bait types (worms, minnows, cheese, corn) with images and descriptions
- **Room_Registry**: The collection of all room definitions across lake, forest, and mountain maps
- **Main_Menu**: The starting screen with Play, Settings, About, and Quit options
- **Tackle_Box**: The bait selection overlay showing 4 bait options in a 2x2 grid
- **Journal_Panel**: The fishing journal showing today's catches grouped by fish type with stats
- **Fishing_UI**: The fishing interface showing phase labels, tension meter, and bobber animation
- **Catch_Display**: The popup showing caught fish with image, name, rarity, and description
- **Game_HUD**: The in-game heads-up display with location, time, bait, and catch count
- **Screen_Router**: The system managing navigation between menu, settings, about, and game screens

## Requirements

### Requirement 1: Port Fish Data

**User Story:** As a developer, I want the exact fish data from the Lovable version, so that fish behavior and availability is identical.

#### Acceptance Criteria

1. THE Fish_Data SHALL define 9 fish species: sunfish, bass, trout, catfish, golden_carp, pale_crawler, bleeding_carp, whispering_eel, fishman
2. WHEN defining a fish, THE Fish_Data SHALL include: id, name, image path, rarity (common/uncommon/rare/legendary), isNightOnly, isHorror, description, horrorDescription, tensionPattern, difficulty (1-10), attractedByBait array, and baitMultiplier object
3. THE Fish_Data SHALL provide getDayFish() returning fish where isNightOnly is false
4. THE Fish_Data SHALL provide getNightFish() returning fish where isNightOnly is true
5. THE Fish_Data SHALL provide getAvailableFish(timeOfDay, peacefulMode) returning appropriate fish list
6. THE Fish_Data SHALL provide getRoomFish(roomId, timeOfDay, peacefulMode) returning fish available at specific room

### Requirement 2: Port Bait Data

**User Story:** As a developer, I want the exact bait data from the Lovable version, so that bait selection works identically.

#### Acceptance Criteria

1. THE Bait_Data SHALL define 4 bait types: worms, minnows, cheese, corn
2. WHEN defining a bait, THE Bait_Data SHALL include: type, name, image path, description
3. THE Bait_Data SHALL provide getBaitByType(type) returning the bait info object

### Requirement 3: Port Room Data

**User Story:** As a developer, I want the exact room definitions from the Lovable version, so that location-specific fish availability works.

#### Acceptance Criteria

1. THE Room_Registry SHALL define lake rooms: lake_shallow_dock, lake_deep_pool, lake_lily_pads
2. THE Room_Registry SHALL define mountain rooms: mountain_pass, mountain_frozen_lake, mountain_waterfall_cave, mountain_ice_cavern, mountain_underground_river, mountain_depths, mountain_abyss
3. WHEN defining a room, THE Room_Registry SHALL include: id, name, map, width, height, platforms, waterAreas, fishingSpots, transitions, playerSpawn, ambientLight, fogDensity, anomalyFrequency, isLocked
4. THE Room_Registry SHALL define room-to-fish mappings matching the Lovable getRoomFish function

### Requirement 4: Port Main Menu UI

**User Story:** As a player, I want the same main menu from the Lovable version, so that the game starts with the familiar interface.

#### Acceptance Criteria

1. THE Main_Menu SHALL display the title "HOPELESS" in golden color with text shadow
2. THE Main_Menu SHALL display the subtitle "CATCH" in orange/brown color below the title
3. THE Main_Menu SHALL display tagline "A cozy fishing horror experience" below the subtitle
4. THE Main_Menu SHALL display buttons: Play, Settings, About, Quit in vertical layout
5. THE Main_Menu SHALL have animated water reflection effect in background
6. THE Main_Menu SHALL have floating sun/light orb animations
7. WHEN Play is clicked, THE Screen_Router SHALL transition to game screen
8. WHEN Settings is clicked, THE Screen_Router SHALL transition to settings screen
9. WHEN About is clicked, THE Screen_Router SHALL transition to about screen

### Requirement 5: Port Tackle Box UI

**User Story:** As a player, I want the same tackle box from the Lovable version, so that I can select bait with the familiar interface.

#### Acceptance Criteria

1. THE Tackle_Box SHALL display as a centered modal overlay with semi-transparent backdrop
2. THE Tackle_Box SHALL display title "TACKLE BOX" at the top
3. THE Tackle_Box SHALL display subtitle "Select your bait" below the title
4. THE Tackle_Box SHALL display 4 bait options in a 2x2 grid
5. WHEN displaying a bait option, THE Tackle_Box SHALL show: bait image (pixelated), bait name, and "EQUIPPED" label if currently selected
6. THE Tackle_Box SHALL highlight the currently selected bait with different border/background color
7. WHEN a bait is clicked, THE Tackle_Box SHALL update currentBait and close the overlay
8. THE Tackle_Box SHALL display a Close button at the bottom
9. WHEN B key is pressed during gameplay, THE Tackle_Box SHALL open
10. WHEN ESC key is pressed while Tackle_Box is open, THE Tackle_Box SHALL close

### Requirement 6: Port Journal Panel UI

**User Story:** As a player, I want the same fishing journal from the Lovable version, so that I can view my catches with the familiar interface.

#### Acceptance Criteria

1. THE Journal_Panel SHALL display as a centered modal overlay with semi-transparent backdrop
2. THE Journal_Panel SHALL display title "FISHING JOURNAL" at the top
3. THE Journal_Panel SHALL display "Today's Catches: [count]" below the title
4. THE Journal_Panel SHALL group catches by fish type and show count per type
5. WHEN displaying a catch entry, THE Journal_Panel SHALL show: fish image (pixelated), fish name, count (x[n]), description, and rarity badge
6. WHEN a fish is horror type, THE Journal_Panel SHALL apply horror styling (red border, glow effect)
7. THE Journal_Panel SHALL display stats at bottom: Total catches, Rare catches, Horror catches
8. THE Journal_Panel SHALL display a Close button at the bottom
9. WHEN no catches exist, THE Journal_Panel SHALL display "No catches yet today" message
10. WHEN TAB key is pressed during gameplay, THE Journal_Panel SHALL open
11. WHEN ESC key is pressed while Journal_Panel is open, THE Journal_Panel SHALL close

### Requirement 7: Port Fishing UI

**User Story:** As a player, I want the same fishing interface from the Lovable version, so that fishing feels identical.

#### Acceptance Criteria

1. THE Fishing_UI SHALL display phase labels: "Press SPACE to cast", "Casting...", "Waiting for a bite...", "BITE! Press SPACE!", "Hooked!", "Hold SPACE to reel in!", "Caught something!", "It got away..."
2. WHEN in bite phase, THE Fishing_UI SHALL animate/shake the panel and highlight text
3. WHEN in reel or hook phase, THE Fishing_UI SHALL display tension meter with percentage
4. THE Fishing_UI SHALL color tension meter: green (<40%), yellow (40-70%), red (>70%)
5. THE Fishing_UI SHALL display tension advice: "Too much tension!" (>80%), "Reel faster!" (<20%), "Keep steady!" (20-80%)
6. WHEN in wait or bite phase, THE Fishing_UI SHALL display animated bobber
7. THE Fishing_UI SHALL display action buttons: "Cast Line" (idle), "Hook It!" (bite), "Reel In!" (reel)

### Requirement 8: Port Catch Display UI

**User Story:** As a player, I want the same catch popup from the Lovable version, so that catching fish feels rewarding.

#### Acceptance Criteria

1. THE Catch_Display SHALL display as a centered modal when a fish is caught
2. THE Catch_Display SHALL show the caught fish image (large, pixelated)
3. THE Catch_Display SHALL show the fish name with appropriate styling (horror fish get red color)
4. THE Catch_Display SHALL show the fish rarity badge
5. THE Catch_Display SHALL show the fish description (or horrorDescription for horror fish)
6. THE Catch_Display SHALL display a dismiss button or auto-dismiss on click
7. WHEN horror fish is caught, THE Catch_Display SHALL apply horror styling (red glow, darker background)

### Requirement 9: Port Game HUD

**User Story:** As a player, I want the same HUD from the Lovable version, so that I can see game status at a glance.

#### Acceptance Criteria

1. THE Game_HUD SHALL display current location name in top-left area
2. THE Game_HUD SHALL display time of day indicator (day/night icon or text)
3. THE Game_HUD SHALL display current bait with icon
4. THE Game_HUD SHALL display total catch count
5. THE Game_HUD SHALL provide quick access buttons: Map (M), Tackle Box (B), Journal (TAB)
6. WHEN peacefulMode is enabled, THE Game_HUD SHALL display peaceful mode indicator

### Requirement 10: Port Screen Routing and Keyboard Controls

**User Story:** As a player, I want the same navigation and controls from the Lovable version, so that the game feels identical to play.

#### Acceptance Criteria

1. THE Screen_Router SHALL support screens: menu, game, settings, about
2. WHEN ESC is pressed during gameplay with no overlay open, THE Screen_Router SHALL show pause menu
3. WHEN ESC is pressed with an overlay open, THE Screen_Router SHALL close the overlay
4. WHEN WASD or arrow keys are pressed, THE Player SHALL move in that direction
5. WHEN SPACE is pressed in idle phase, THE Fishing_Controller SHALL start casting
6. WHEN SPACE is pressed in bite phase, THE Fishing_Controller SHALL hook the fish
7. WHEN SPACE is pressed/held in reel phase, THE Fishing_Controller SHALL increase tension
8. WHEN TAB is pressed, THE Journal_Panel SHALL open
9. WHEN B is pressed, THE Tackle_Box SHALL open
10. WHEN H is pressed, THE Game SHALL toggle time of day (rest in cabin)
11. WHEN M is pressed, THE Map_Selection SHALL open
