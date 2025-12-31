# Requirements: Hopeless Catch Web Rebuild (Metroidvania Fishing)

## Introduction

Hopeless Catch is being rebuilt for web as a metroidvania-style horror fishing game. The player explores three distinct interconnected environments (Lake, Mountain, Forest), each containing multiple rooms/areas with unique fishing spots. Players cast fishing lines into water, encounter both peaceful day fish and unsettling night creatures, and unlock new areas and abilities through progression. The game maintains the atmospheric horror tone of the original Love2D version while adding exploration-based gameplay through metroidvania mechanics.

## Glossary

- **Player**: The character controlled by the user, can walk, climb, swim, and fish
- **Room/Area**: A distinct section within a map that the player can explore
- **Fishing Spot**: A specific location within a room where the player can cast their line
- **Boat**: Optional vessel the player can use to access deeper water fishing spots
- **Fishing Line**: The cast line with bobber that extends into the water
- **Fish**: Catchable creatures, categorized as day fish or night creatures
- **Day Fish**: Peaceful species that appear during daytime (Sunfish, Bass, Trout, Catfish, Golden Carp)
- **Night Creatures**: Unsettling species that appear after dark (Pale Crawler, Bleeding Carp, Whispering Eel, Fishman)
- **Bobber**: Visual indicator at the end of the fishing line showing tension/activity
- **Catch**: Successfully reeling in a fish
- **Journal**: In-game record of all catches with timestamps and species data
- **Anomaly**: Environmental glitch or unnatural occurrence (screen flicker, audio cues, physics breaks)
- **Peaceful Mode**: Game mode that disables anomalies and night creatures
- **Map/Location**: One of three fishing environments (Lake, Mountain, Forest)
- **Day/Night Cycle**: Time progression system that affects available fish and atmosphere
- **Bait**: Item used to attract specific fish species (4 types: worms, corn, minnows, cheese)
- **Progression Gate**: A barrier that requires specific catches or abilities to unlock
- **Ability**: A skill the player unlocks through progression (deep cast, precision cast, night vision)
- **Transition**: A doorway or path connecting two rooms/areas

## Requirements

### Requirement 1: Core Fishing Mechanic

**User Story:** As a player, I want to cast a fishing line and catch fish, so that I can experience the core gameplay loop.

#### Acceptance Criteria

1. WHEN the player presses the cast button at a fishing spot, THE Game SHALL display a fishing line extending from the player into the water
2. WHEN a fishing line is cast, THE Game SHALL position the bobber at the end of the line in the water
3. WHEN a fish is attracted to the bobber, THE Game SHALL display visual feedback (bobber movement/tension)
4. WHEN the player presses the hook button during tension, THE Game SHALL enter the reeling phase
5. WHEN the player successfully reels, THE Game SHALL add the caught fish to the player's journal
6. WHEN a catch is completed, THE Game SHALL return the player to the idle state ready for another cast

### Requirement 2: Player Movement and Exploration

**User Story:** As a player, I want to move my character around the fishing location and explore different areas, so that I can discover new fishing spots.

#### Acceptance Criteria

1. WHEN the player presses movement keys (WASD/Arrows), THE Player SHALL move horizontally across the screen
2. WHILE the player is on land/platform, THE Player SHALL remain grounded and not fall
3. WHEN the player reaches a room transition, THE Game SHALL load the connected room/area
4. WHEN the player presses the jump button, THE Player SHALL jump to reach elevated platforms
5. WHEN the player is in water, THE Player SHALL be able to swim horizontally and vertically
6. WHEN the player is near a climbable surface (vine, rope, ladder), THE Player SHALL be able to climb up or down
7. WHEN the player reaches the edge of a room without a transition, THE Game SHALL prevent further movement in that direction

### Requirement 3: Metroidvania Map Structure

**User Story:** As a player, I want to explore interconnected rooms within each map, so that I can discover hidden fishing spots and progress through the game.

#### Acceptance Criteria

1. THE Game SHALL display each map as a collection of interconnected rooms/areas
2. WHEN the player enters a room, THE Game SHALL render the room's unique environment, platforms, and fishing spots
3. WHEN the player moves through a transition, THE Game SHALL seamlessly load the connected room
4. THE Game SHALL maintain a map of discovered rooms that the player can view
5. EACH room SHALL have distinct visual characteristics and fishing opportunities
6. THE Game SHALL preserve player position when transitioning between rooms

### Requirement 4: Progression-Gated Areas

**User Story:** As a player, I want to unlock new areas by catching specific fish or obtaining abilities, so that I feel a sense of progression.

#### Acceptance Criteria

1. THE Game SHALL lock certain rooms/areas behind progression gates
2. WHEN the player catches a required fish species, THE Game SHALL unlock the associated area
3. WHEN the player obtains a required ability, THE Game SHALL unlock the associated area
4. WHEN the player approaches a locked area, THE Game SHALL display what is required to unlock it
5. THE Game SHALL persist unlocked areas across game sessions

### Requirement 5: Three Distinct Maps with Multiple Rooms

**User Story:** As a player, I want to explore different fishing locations with multiple areas each, so that I can experience varied environments and fish species.

#### Acceptance Criteria

1. THE Game SHALL provide three playable maps: Lake, Mountain, and Forest
2. EACH map SHALL contain at least 4 interconnected rooms/areas
3. WHEN the player selects a map, THE Game SHALL load the starting room of that map
4. WHEN a room is loaded, THE Game SHALL display location-specific fish species available for that room
5. WHEN the player transitions between maps, THE Game SHALL preserve the player's journal and progression data
6. EACH map SHALL have distinct visual characteristics (color palette, terrain, water appearance)
7. THE Game SHALL unlock maps progressively (Lake → Forest → Mountain)

### Requirement 6: Day/Night Cycle and Atmosphere

**User Story:** As a player, I want the game world to change between day and night, so that I experience different fish and atmospheric effects.

#### Acceptance Criteria

1. WHEN the game starts, THE Game SHALL begin in daytime with bright visual appearance
2. WHEN time progresses, THE Game SHALL transition to nighttime with dark visual appearance
3. WHILE it is daytime, THE Game SHALL only spawn day fish species
4. WHILE it is nighttime, THE Game SHALL only spawn night creatures (unsettling species)
5. WHEN the player transitions from day to night, THE Game SHALL apply visual effects (darkening, color shift, atmospheric changes)
6. WHEN the player rests in the cabin, THE Game SHALL advance time and update the day/night state

### Requirement 7: Fish Species and Behavior

**User Story:** As a player, I want to encounter different fish species with distinct appearances, so that I can build a diverse journal.

#### Acceptance Criteria

1. THE Game SHALL include at least 5 day fish species (Sunfish, Bass, Trout, Catfish, Golden Carp)
2. THE Game SHALL include at least 4 night creatures (Pale Crawler, Bleeding Carp, Whispering Eel, Fishman)
3. WHEN a fish is attracted to the bobber, THE Fish Species SHALL determine the tension pattern and difficulty
4. WHEN a fish is caught, THE Game SHALL record the species, time, and location in the journal
5. EACH fish species SHALL have a unique visual appearance in the still image format
6. EACH room SHALL have a specific set of fish species that can be caught there

### Requirement 8: Bait System

**User Story:** As a player, I want to select different baits, so that I can attract specific fish species.

#### Acceptance Criteria

1. THE Game SHALL provide 4 bait types available for selection (worms, corn, minnows, cheese)
2. WHEN the player selects a bait before casting, THE Game SHALL use that bait for the next cast
3. WHEN a specific bait is used, THE Game SHALL increase the probability of attracting certain fish species
4. WHEN the player catches a fish, THE Game SHALL consume the selected bait
5. THE Game SHALL display the current bait selection in the UI
6. THE Game SHALL unlock additional baits through progression

### Requirement 9: Ability Progression System

**User Story:** As a player, I want to unlock new fishing abilities as I progress, so that I can access new areas and catch different fish.

#### Acceptance Criteria

1. THE Game SHALL provide unlockable abilities (Deep Cast, Precision Cast, Night Vision, Swim)
2. WHEN the player catches a required number of fish, THE Game SHALL unlock the associated ability
3. WHEN the player unlocks Deep Cast, THE Player SHALL be able to cast into deeper water
4. WHEN the player unlocks Precision Cast, THE Player SHALL be able to target specific fish species
5. WHEN the player unlocks Night Vision, THE Player SHALL see better during night and anomalies
6. WHEN the player unlocks Swim, THE Player SHALL be able to access underwater areas
7. THE Game SHALL persist unlocked abilities across game sessions

### Requirement 10: Journal and Catch Tracking

**User Story:** As a player, I want to track all my catches, so that I can see my progress and build a collection.

#### Acceptance Criteria

1. WHEN a fish is caught, THE Game SHALL add an entry to the journal with species, time, location, and room
2. WHEN the player opens the journal, THE Game SHALL display all previous catches organized by date
3. WHEN the player views the journal, THE Game SHALL show statistics (total catches, species count, favorite location, rooms discovered)
4. WHEN the game is closed and reopened, THE Game SHALL preserve all journal entries
5. THE Game SHALL display the journal in an accessible, readable format

### Requirement 11: Peaceful Mode

**User Story:** As a player, I want an option to disable horror elements, so that I can enjoy a relaxing fishing experience.

#### Acceptance Criteria

1. WHEN the player enables Peaceful Mode, THE Game SHALL disable all night creatures
2. WHEN Peaceful Mode is enabled, THE Game SHALL disable all environmental anomalies
3. WHEN Peaceful Mode is enabled, THE Game SHALL keep the day/night cycle but only spawn day fish
4. WHEN the player toggles Peaceful Mode, THE Game SHALL apply the setting immediately
5. WHEN the game is closed and reopened, THE Game SHALL remember the Peaceful Mode setting

### Requirement 12: Environmental Anomalies (Normal Mode Only)

**User Story:** As a player, I want to experience unsettling environmental effects, so that the game feels mysterious and slightly wrong.

#### Acceptance Criteria

1. WHILE it is nighttime and Peaceful Mode is disabled, THE Game SHALL randomly trigger visual anomalies
2. WHEN an anomaly occurs, THE Game SHALL display screen flicker or visual distortion
3. WHEN an anomaly occurs, THE Game SHALL play audio cues (whispers, breathing, unnatural sounds)
4. WHEN an anomaly occurs, THE Game SHALL cause physics anomalies (bobber twitches incorrectly, line behaves strangely)
5. WHEN an anomaly occurs, THE Game SHALL not prevent the player from continuing to fish
6. CERTAIN rooms SHALL have higher anomaly frequency than others

### Requirement 13: Save and Load System

**User Story:** As a player, I want my progress to be saved automatically, so that I can resume my game later.

#### Acceptance Criteria

1. WHEN the player catches a fish, THE Game SHALL save the journal entry to persistent storage
2. WHEN the player unlocks an area or ability, THE Game SHALL save the progression state
3. WHEN the player changes rooms, THE Game SHALL save the current room and position
4. WHEN the game is closed and reopened, THE Game SHALL restore all saved data (journal, progression, position)
5. WHEN the player manually saves, THE Game SHALL create a checkpoint that can be loaded later

### Requirement 14: Responsive Web Presentation

**User Story:** As a player, I want the game to work on different screen sizes, so that I can play on desktop, tablet, or mobile.

#### Acceptance Criteria

1. THE Game SHALL maintain the pixel art aesthetic as the base resolution
2. WHEN the game is displayed on different screen sizes, THE Game SHALL scale responsively without distortion
3. WHEN the game is displayed on mobile, THE Game SHALL provide touch-friendly controls
4. WHEN the game is displayed on desktop, THE Game SHALL support keyboard controls (WASD/Arrows)
5. THE Game SHALL maintain consistent gameplay experience across all screen sizes

### Requirement 15: Boat Asset Integration

**User Story:** As a player, I want to use a boat to access deeper water, so that I can reach new fishing spots.

#### Acceptance Criteria

1. WHEN the player interacts with the boat, THE Game SHALL allow the player to board it
2. WHEN the player is in the boat, THE Game SHALL position the fishing line to cast from the boat
3. WHEN the player is in the boat, THE Game SHALL allow access to deeper water fishing spots
4. WHEN the player exits the boat, THE Game SHALL return the player to the dock/land
5. THE Boat SHALL be rendered in side-scroller perspective matching the player sprite
6. CERTAIN rooms SHALL have boats available while others do not

### Requirement 16: Craftpix Asset Integration

**User Story:** As a developer, I want to use the Craftpix fishing asset pack, so that the game has professional pixel art visuals.

#### Acceptance Criteria

1. THE Game SHALL use Fisherman sprites for player animations (idle, walk, fish, hook, row, attack, death, hurt)
2. THE Game SHALL use the 8 fish catch sprites for caught fish display
3. THE Game SHALL use the boat sprites for boat rendering
4. THE Game SHALL use the fishing hut sprite for cabin/rest areas
5. THE Game SHALL use water tiles for water rendering
6. THE Game SHALL use pier tiles for dock/platform rendering
7. THE Game SHALL use grass and bush sprites for environment decoration
8. THE Game SHALL use the 20 icon sprites for UI elements

### Requirement 17: Web Technology Stack

**User Story:** As a developer, I want the game built with modern web technologies, so that it's maintainable and deployable.

#### Acceptance Criteria

1. THE Game SHALL be built using React + TypeScript + Tailwind
2. THE Game SHALL be deployable to web platforms (itch.io, web hosting)
3. THE Game SHALL be wrappable with NW.js for desktop distribution
4. THE Game SHALL load and run without external dependencies beyond the chosen framework
5. THE Game SHALL maintain performance at 60 FPS on modern browsers
