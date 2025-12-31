import React from 'react';
import { BaitType } from '@/types/game';
import { baitData } from '@/data/baitData';

interface TackleBoxProps {
  currentBait: BaitType;
  onSelectBait: (bait: BaitType) => void;
  onClose: () => void;
}

export const TackleBox: React.FC<TackleBoxProps> = ({ currentBait, onSelectBait, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm animate-fade-in">
      <div className="game-panel p-6 w-full max-w-sm animate-scale-in">
        <h2 className="text-lg font-pixel text-accent text-center mb-4 pixel-text">
          TACKLE BOX
        </h2>

        <p className="text-[8px] text-muted-foreground text-center mb-4">
          Select your bait
        </p>

        <div className="grid grid-cols-2 gap-3">
          {baitData.map((bait) => (
            <button
              key={bait.type}
              onClick={() => onSelectBait(bait.type)}
              className={`p-4 border-2 transition-all flex flex-col items-center gap-2 ${
                currentBait === bait.type
                  ? 'bg-primary/20 border-primary'
                  : 'bg-muted/30 border-border hover:border-primary/50'
              }`}
            >
              <img 
                src={bait.image} 
                alt={bait.name}
                className="w-10 h-10 object-contain"
                style={{ imageRendering: 'pixelated' }}
              />
              <span className="text-[10px] font-pixel">{bait.name}</span>
              {currentBait === bait.type && (
                <span className="text-[8px] text-primary">EQUIPPED</span>
              )}
            </button>
          ))}
        </div>

        <button onClick={onClose} className="game-button-secondary w-full mt-4">
          Close
        </button>
      </div>
    </div>
  );
};
