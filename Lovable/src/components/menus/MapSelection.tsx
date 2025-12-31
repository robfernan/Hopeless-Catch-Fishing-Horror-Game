import React from 'react';
import { Location } from '@/types/game';

interface MapSelectionProps {
  currentLocation: Location;
  onSelectLocation: (location: Location) => void;
  onClose: () => void;
}

const locations: { id: Location; name: string; description: string; unlocked: boolean }[] = [
  { 
    id: 'lake', 
    name: 'Quiet Lake', 
    description: 'Calm waters, perfect for beginners. Your cabin awaits.',
    unlocked: true 
  },
  { 
    id: 'forest', 
    name: 'Forest Pond', 
    description: 'Darker waters hide mysterious creatures...',
    unlocked: true 
  },
  { 
    id: 'mountain', 
    name: 'Mountain Stream', 
    description: 'Cold alpine waters with rare mountain fish.',
    unlocked: true 
  },
];

export const MapSelection: React.FC<MapSelectionProps> = ({ 
  currentLocation, 
  onSelectLocation, 
  onClose 
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm animate-fade-in">
      <div className="game-panel p-6 w-full max-w-lg animate-scale-in">
        <h2 className="text-lg font-pixel text-accent text-center mb-6 pixel-text">
          SELECT LOCATION
        </h2>

        <div className="grid gap-3">
          {locations.map((loc) => (
            <button
              key={loc.id}
              onClick={() => loc.unlocked && onSelectLocation(loc.id)}
              disabled={!loc.unlocked}
              className={`p-4 text-left border-2 transition-all ${
                currentLocation === loc.id
                  ? 'bg-primary/20 border-primary'
                  : loc.unlocked
                    ? 'bg-muted/50 border-border hover:border-primary/50 hover:bg-muted'
                    : 'bg-muted/20 border-border/50 opacity-50 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-pixel text-foreground">{loc.name}</span>
                {currentLocation === loc.id && (
                  <span className="text-[8px] text-primary">CURRENT</span>
                )}
                {!loc.unlocked && (
                  <span className="text-[8px] text-muted-foreground">LOCKED</span>
                )}
              </div>
              <p className="text-[8px] text-muted-foreground leading-relaxed">
                {loc.description}
              </p>
            </button>
          ))}
        </div>

        <button onClick={onClose} className="game-button-secondary w-full mt-6">
          Close
        </button>
      </div>
    </div>
  );
};
