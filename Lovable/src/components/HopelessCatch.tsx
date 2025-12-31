import React, { useState, useEffect, useCallback } from 'react';
import { useGameState } from '@/hooks/useGameState';
import { MainMenu } from '@/components/menus/MainMenu';
import { PauseMenu } from '@/components/menus/PauseMenu';
import { SettingsMenu } from '@/components/menus/SettingsMenu';
import { AboutMenu } from '@/components/menus/AboutMenu';
import { MapSelection } from '@/components/menus/MapSelection';
import { GameWorld } from '@/components/game/GameWorld';
import { GameHUD } from '@/components/game/GameHUD';
import { FishingUI } from '@/components/game/FishingUI';
import { TackleBox } from '@/components/game/TackleBox';
import { JournalPanel } from '@/components/game/JournalPanel';
import { CatchDisplay } from '@/components/game/CatchDisplay';
import { getAvailableFish, getRoomFish } from '@/data/fishData';
import { ROOM_REGISTRY } from '@/data/rooms';
import { CatchRecord } from '@/types/game';

const HopelessCatch: React.FC = () => {
  const {
    state,
    setScreen,
    setLocation,
    toggleTimeOfDay,
    togglePeacefulMode,
    setFishingPhase,
    setTension,
    setBait,
    togglePause,
    addCatch,
    updateSettings,
    movePlayer,
  } = useGameState();

  const [showMap, setShowMap] = useState(false);
  const [showTackleBox, setShowTackleBox] = useState(false);
  const [showJournal, setShowJournal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [lastCatch, setLastCatch] = useState<typeof state.catches[0] | null>(null);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (state.screen !== 'game') return;

      switch (e.key.toLowerCase()) {
        case 'escape':
          if (showMap || showTackleBox || showJournal || showSettings) {
            setShowMap(false);
            setShowTackleBox(false);
            setShowJournal(false);
            setShowSettings(false);
          } else {
            togglePause();
          }
          break;
        case 'w':
          movePlayer(0, -3);
          break;
        case 's':
          movePlayer(0, 3);
          break;
        case 'a':
          movePlayer(-3, 0);
          break;
        case 'd':
          movePlayer(3, 0);
          break;
        case ' ':
          e.preventDefault();
          if (state.fishingPhase === 'idle') {
            handleStartFishing();
          } else if (state.fishingPhase === 'tension') {
            handleHook();
          } else if (state.fishingPhase === 'reeling') {
            handleReel();
          }
          break;
        case 'tab':
          e.preventDefault();
          setShowJournal(true);
          break;
        case 'b':
          setShowTackleBox(true);
          break;
        case 'h':
          toggleTimeOfDay();
          break;
        case 'm':
          setShowMap(true);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state.screen, state.fishingPhase, state.isPaused, showMap, showTackleBox, showJournal, showSettings]);

  const handleStartFishing = useCallback(() => {
    setFishingPhase('casting');
    setTimeout(() => setFishingPhase('waiting'), 800);
    
    // Simulate tension after random time
    const tensionTime = 2000 + Math.random() * 3000;
    setTimeout(() => {
      setFishingPhase('tension');
    }, tensionTime);
  }, [setFishingPhase]);

  const handleHook = useCallback(() => {
    setFishingPhase('hooking');
    setTension(30);
    setTimeout(() => {
      setFishingPhase('reeling');
    }, 500);
  }, [setFishingPhase, setTension]);

  const handleReel = useCallback(() => {
    // Simulate reeling - increase tension, then catch
    const newTension = state.tension + 15;
    setTension(newTension);

    if (newTension >= 70) {
      // Caught!
      const currentRoom = ROOM_REGISTRY[state.currentRoom];
      const availableFish = getRoomFish(state.currentRoom, state.timeOfDay, state.peacefulMode);
      const randomFish = availableFish.length > 0 
        ? availableFish[Math.floor(Math.random() * availableFish.length)]
        : getAvailableFish(state.timeOfDay, state.peacefulMode)[0];
      
      const catchRecord: CatchRecord = {
        id: `catch-${Date.now()}`,
        fish: randomFish,
        time: state.timeOfDay,
        location: state.currentMap,
        roomId: state.currentRoom,
        roomName: currentRoom?.name || 'Unknown',
        baitUsed: state.currentBait,
        timestamp: new Date(),
      };
      
      addCatch(catchRecord);
      setLastCatch(catchRecord);
      setFishingPhase('caught');
      setTension(0);
    }
  }, [state.tension, state.timeOfDay, state.peacefulMode, state.currentRoom, state.currentMap, state.currentBait, setTension, addCatch, setFishingPhase]);

  const handleCabinClick = () => {
    toggleTimeOfDay();
  };

  const dismissCatch = () => {
    setLastCatch(null);
    setFishingPhase('idle');
  };

  // Render based on current screen
  if (state.screen === 'menu') {
    return (
      <MainMenu
        onPlay={() => setScreen('game')}
        onSettings={() => setScreen('settings')}
        onAbout={() => setScreen('about')}
      />
    );
  }

  if (state.screen === 'settings') {
    return (
      <SettingsMenu
        settings={state.settings}
        onUpdateSettings={updateSettings}
        onBack={() => setScreen('menu')}
      />
    );
  }

  if (state.screen === 'about') {
    return (
      <AboutMenu onBack={() => setScreen('menu')} />
    );
  }

  // Game screen
  return (
    <div className="fixed inset-0 overflow-hidden select-none">
      {/* Game World - Keep the beautiful original GameWorld */}
      <GameWorld
        location={state.currentMap}
        timeOfDay={state.timeOfDay}
        peacefulMode={state.peacefulMode}
        playerPosition={state.playerPosition}
        playerState={state.playerState}
        fishingPhase={state.fishingPhase}
        facingDirection={state.facingDirection}
        onCabinClick={handleCabinClick}
      />

      {/* Game HUD */}
      <GameHUD
        location={state.currentMap}
        timeOfDay={state.timeOfDay}
        peacefulMode={state.peacefulMode}
        currentBait={state.currentBait}
        catchCount={state.catches.length}
        onOpenMap={() => setShowMap(true)}
        onOpenTackleBox={() => setShowTackleBox(true)}
        onOpenJournal={() => setShowJournal(true)}
        onToggleTime={toggleTimeOfDay}
        onTogglePeaceful={togglePeacefulMode}
      />

      {/* Fishing UI */}
      <FishingUI
        phase={state.fishingPhase}
        tension={state.tension}
        onCast={handleStartFishing}
        onHook={handleHook}
        onReel={handleReel}
      />

      {/* Overlays */}
      {state.isPaused && (
        <PauseMenu
          onResume={togglePause}
          onSettings={() => setShowSettings(true)}
          onJournal={() => setShowJournal(true)}
          onQuit={() => {
            togglePause();
            setScreen('menu');
          }}
        />
      )}

      {showSettings && (
        <SettingsMenu
          settings={state.settings}
          onUpdateSettings={updateSettings}
          onBack={() => setShowSettings(false)}
          isInGame
        />
      )}

      {showMap && (
        <MapSelection
          currentLocation={state.currentMap}
          onSelectLocation={(loc) => {
            setLocation(loc);
            setShowMap(false);
          }}
          onClose={() => setShowMap(false)}
        />
      )}

      {showTackleBox && (
        <TackleBox
          currentBait={state.currentBait}
          onSelectBait={(bait) => {
            setBait(bait);
            setShowTackleBox(false);
          }}
          onClose={() => setShowTackleBox(false)}
        />
      )}

      {showJournal && (
        <JournalPanel
          catches={state.catches}
          onClose={() => setShowJournal(false)}
        />
      )}

      {lastCatch && state.fishingPhase === 'caught' && (
        <CatchDisplay
          fish={lastCatch.fish}
          onDismiss={dismissCatch}
        />
      )}
    </div>
  );
};

export default HopelessCatch;
