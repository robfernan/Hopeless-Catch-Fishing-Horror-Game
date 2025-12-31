import { useState, useCallback } from 'react';
import { GameState, GameScreen, Location, TimeOfDay, FishingPhase, BaitType, CatchRecord, createInitialGameState } from '@/types/game';
import { getAvailableFish, getRoomFish } from '@/data/fishData';
import { ROOM_REGISTRY } from '@/data/rooms';

export function useGameState() {
  const [state, setState] = useState<GameState>(createInitialGameState());

  const setScreen = useCallback((screen: GameScreen) => {
    setState(prev => ({ ...prev, screen, isPaused: false }));
  }, []);

  const setLocation = useCallback((location: Location) => {
    // When location changes, find the starting room for that map
    const mapRooms = Object.values(ROOM_REGISTRY).filter(room => room.map === location);
    const startingRoom = mapRooms.find(room => !room.isLocked) || mapRooms[0];
    
    if (startingRoom) {
      setState(prev => ({ 
        ...prev, 
        currentMap: location,
        currentRoom: startingRoom.id,
        fishingPhase: 'idle',
        playerPosition: { x: startingRoom.width / 2, y: startingRoom.height / 2 },
      }));
    }
  }, []);

  const toggleTimeOfDay = useCallback(() => {
    setState(prev => ({
      ...prev,
      timeOfDay: prev.timeOfDay === 'day' ? 'night' : 'day',
    }));
  }, []);

  const togglePeacefulMode = useCallback(() => {
    setState(prev => ({
      ...prev,
      peacefulMode: !prev.peacefulMode,
      settings: { ...prev.settings, peacefulMode: !prev.peacefulMode },
    }));
  }, []);

  const setFishingPhase = useCallback((phase: FishingPhase) => {
    setState(prev => ({ ...prev, fishingPhase: phase }));
  }, []);

  const setTension = useCallback((tension: number) => {
    setState(prev => ({ ...prev, tension: Math.max(0, Math.min(100, tension)) }));
  }, []);

  const setBait = useCallback((bait: BaitType) => {
    setState(prev => ({ ...prev, currentBait: bait }));
  }, []);

  const togglePause = useCallback(() => {
    setState(prev => ({ ...prev, isPaused: !prev.isPaused }));
  }, []);

  const addCatch = useCallback((record: CatchRecord) => {
    setState(prev => ({ ...prev, catches: [...prev.catches, record] }));
  }, []);

  const updateSettings = useCallback((settings: Partial<GameState['settings']>) => {
    setState(prev => ({
      ...prev,
      settings: { ...prev.settings, ...settings },
      peacefulMode: settings.peacefulMode ?? prev.peacefulMode,
    }));
  }, []);

  const movePlayer = useCallback((dx: number, dy: number) => {
    setState(prev => ({
      ...prev,
      playerPosition: {
        x: Math.max(10, Math.min(90, prev.playerPosition.x + dx)),
        y: Math.max(50, Math.min(85, prev.playerPosition.y + dy)),
      },
    }));
  }, []);

  const completeCatch = useCallback(() => {
    const currentRoom = ROOM_REGISTRY[state.currentRoom];
    const availableFish = getRoomFish(state.currentRoom, state.timeOfDay, state.peacefulMode);
    const randomFish = availableFish.length > 0 
      ? availableFish[Math.floor(Math.random() * availableFish.length)]
      : getAvailableFish(state.timeOfDay, state.peacefulMode)[0];
    
    addCatch({
      id: `catch-${Date.now()}`,
      fish: randomFish,
      time: state.timeOfDay,
      location: state.currentMap,
      roomId: state.currentRoom,
      roomName: currentRoom?.name || 'Unknown',
      baitUsed: state.currentBait,
      timestamp: new Date(),
    });
    
    setFishingPhase('catch');
    setTimeout(() => setFishingPhase('idle'), 2000);
  }, [state.timeOfDay, state.peacefulMode, state.currentRoom, state.currentMap, state.currentBait, addCatch, setFishingPhase]);

  return {
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
  };
}
