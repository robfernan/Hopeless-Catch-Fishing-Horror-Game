import React from 'react';

interface PauseMenuProps {
  onResume: () => void;
  onSettings: () => void;
  onJournal: () => void;
  onQuit: () => void;
}

export const PauseMenu: React.FC<PauseMenuProps> = ({ onResume, onSettings, onJournal, onQuit }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm animate-fade-in">
      <div className="game-panel p-8 min-w-[280px] animate-scale-in">
        <h2 className="text-xl font-pixel text-accent text-center mb-8 pixel-text">
          PAUSED
        </h2>

        <div className="flex flex-col gap-3">
          <button onClick={onResume} className="game-button w-full">
            Resume
          </button>
          <button onClick={onSettings} className="game-button-secondary w-full">
            Settings
          </button>
          <button onClick={onJournal} className="game-button-secondary w-full">
            Journal
          </button>
          <button onClick={onQuit} className="game-button-secondary w-full text-destructive">
            Quit to Menu
          </button>
        </div>

        <p className="text-[8px] text-muted-foreground text-center mt-6">
          Press ESC to resume
        </p>
      </div>
    </div>
  );
};
