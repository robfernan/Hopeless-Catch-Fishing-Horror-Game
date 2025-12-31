import React from 'react';
import { Location, TimeOfDay, BaitType } from '@/types/game';
import { getBaitByType } from '@/data/baitData';

interface GameHUDProps {
  location: Location;
  timeOfDay: TimeOfDay;
  peacefulMode: boolean;
  currentBait: BaitType;
  catchCount: number;
  onOpenMap: () => void;
  onOpenTackleBox: () => void;
  onOpenJournal: () => void;
  onToggleTime: () => void;
  onTogglePeaceful: () => void;
}

const locationNames: Record<Location, string> = {
  lake: 'Quiet Lake',
  forest: 'Forest Pond',
  mountain: 'Mountain Stream',
};

export const GameHUD: React.FC<GameHUDProps> = ({
  location,
  timeOfDay,
  peacefulMode,
  currentBait,
  catchCount,
  onOpenMap,
  onOpenTackleBox,
  onOpenJournal,
  onToggleTime,
  onTogglePeaceful,
}) => {
  const bait = getBaitByType(currentBait);

  return (
    <>
      {/* Top HUD */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start pointer-events-none">
        {/* Location & Time */}
        <div className="game-panel p-3 pointer-events-auto">
          <div className="flex items-center gap-3">
            <div>
              <p className="text-[10px] font-pixel text-foreground">{locationNames[location]}</p>
              <p className="text-[8px] text-muted-foreground mt-1">
                {timeOfDay === 'day' ? '☀️ Day' : '🌙 Night'}
                {peacefulMode && ' • Peaceful'}
              </p>
            </div>
            <button 
              onClick={onOpenMap}
              className="text-[8px] px-2 py-1 bg-muted hover:bg-muted/80 border border-border transition-colors"
            >
              MAP
            </button>
          </div>
        </div>

        {/* Catches counter */}
        <div className="game-panel p-3 pointer-events-auto">
          <div className="flex items-center gap-2">
            <span className="text-lg font-pixel text-primary">{catchCount}</span>
            <span className="text-[8px] text-muted-foreground">catches</span>
          </div>
        </div>
      </div>

      {/* Right side - Quick actions */}
      <div className="absolute top-1/3 right-4 flex flex-col gap-2 pointer-events-auto">
        <button
          onClick={onToggleTime}
          className="game-panel p-2 text-[8px] hover:bg-muted/50 transition-colors"
          title="Toggle day/night"
        >
          {timeOfDay === 'day' ? '🌙' : '☀️'}
        </button>
        <button
          onClick={onTogglePeaceful}
          className={`game-panel p-2 text-[8px] transition-colors ${peacefulMode ? 'bg-tension-low/20' : 'hover:bg-muted/50'}`}
          title="Toggle peaceful mode"
        >
          {peacefulMode ? '😊' : '👻'}
        </button>
      </div>

      {/* Bottom HUD - Bait & Quick buttons */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end pointer-events-none">
        {/* Current bait */}
        <button 
          onClick={onOpenTackleBox}
          className="game-panel p-3 flex items-center gap-2 pointer-events-auto hover:bg-muted/50 transition-colors"
        >
          {bait && (
            <img 
              src={bait.image} 
              alt={bait.name}
              className="w-8 h-8 object-contain"
              style={{ imageRendering: 'pixelated' }}
            />
          )}
          <div className="text-left">
            <p className="text-[8px] text-muted-foreground">BAIT</p>
            <p className="text-[10px] font-pixel">{bait?.name || 'None'}</p>
          </div>
        </button>

        {/* Quick buttons */}
        <div className="flex gap-2 pointer-events-auto">
          <button 
            onClick={onOpenJournal}
            className="game-panel p-3 text-xs hover:bg-muted/50 transition-colors"
          >
            📖 Journal
          </button>
        </div>
      </div>

      {/* Controls hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none">
        <div className="text-[8px] text-muted-foreground/50 text-center space-y-1">
          <p>WASD: Move • SPACE: Cast/Action • TAB: Journal • B: Tackle Box • ESC: Pause</p>
        </div>
      </div>
    </>
  );
};
