import React from 'react';
import { Fish } from '@/types/game';

interface CatchDisplayProps {
  fish: Fish;
  onDismiss: () => void;
}

export const CatchDisplay: React.FC<CatchDisplayProps> = ({ fish, onDismiss }) => {
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm animate-fade-in"
      onClick={onDismiss}
    >
      <div className="game-panel p-8 text-center animate-scale-in max-w-sm">
        <p className="text-xs text-muted-foreground mb-2">You caught a</p>
        
        <h2 className={`text-xl font-pixel mb-4 pixel-text ${
          fish.isHorror ? 'text-game-horror pixel-text-glow' : 'text-accent'
        }`}>
          {fish.name}
        </h2>

        <div className={`relative inline-block mb-4 ${fish.isHorror ? 'horror-glow' : ''}`}>
          <img 
            src={fish.image} 
            alt={fish.name}
            className="w-24 h-24 object-contain animate-float"
            style={{ imageRendering: 'pixelated' }}
          />
        </div>

        <div className={`inline-block px-3 py-1 text-[8px] mb-4 ${
          fish.rarity === 'legendary' ? 'bg-accent text-accent-foreground' :
          fish.rarity === 'rare' ? 'bg-primary text-primary-foreground' :
          fish.isHorror ? 'bg-game-horror text-background' :
          'bg-muted text-muted-foreground'
        }`}>
          {fish.rarity.toUpperCase()}
        </div>

        <p className="text-[10px] text-foreground/70 mb-6 leading-relaxed">
          {fish.description}
        </p>

        <button className="game-button">
          Continue
        </button>
      </div>
    </div>
  );
};
