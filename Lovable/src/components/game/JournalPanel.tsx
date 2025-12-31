import React from 'react';
import { CatchRecord } from '@/types/game';

interface JournalPanelProps {
  catches: CatchRecord[];
  onClose: () => void;
}

export const JournalPanel: React.FC<JournalPanelProps> = ({ catches, onClose }) => {
  const todaysCatches = catches.filter(c => {
    const today = new Date();
    return c.timestamp.toDateString() === today.toDateString();
  });

  const groupedByFish = todaysCatches.reduce((acc, catch_) => {
    const key = catch_.fish.id;
    acc[key] = acc[key] || { fish: catch_.fish, count: 0 };
    acc[key].count++;
    return acc;
  }, {} as Record<string, { fish: CatchRecord['fish']; count: number }>);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm animate-fade-in">
      <div className="game-panel p-6 w-full max-w-md max-h-[80vh] overflow-hidden animate-scale-in">
        <h2 className="text-lg font-pixel text-accent text-center mb-4 pixel-text">
          FISHING JOURNAL
        </h2>

        <div className="border-b border-border pb-2 mb-4">
          <p className="text-[8px] text-muted-foreground text-center">
            Today's Catches: {todaysCatches.length}
          </p>
        </div>

        <div className="overflow-y-auto max-h-[300px] space-y-2 pr-2">
          {Object.values(groupedByFish).length > 0 ? (
            Object.values(groupedByFish).map(({ fish, count }) => (
              <div 
                key={fish.id} 
                className={`flex items-center gap-3 p-3 border-2 ${
                  fish.isHorror 
                    ? 'border-game-horror/50 bg-game-horror/10' 
                    : 'border-border bg-muted/30'
                }`}
              >
                <img 
                  src={fish.image} 
                  alt={fish.name}
                  className={`w-12 h-12 object-contain pixelated ${fish.isHorror ? 'horror-glow' : ''}`}
                  style={{ imageRendering: 'pixelated' }}
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-pixel ${fish.isHorror ? 'text-game-horror' : 'text-foreground'}`}>
                      {fish.name}
                    </span>
                    <span className="text-[8px] text-muted-foreground">x{count}</span>
                  </div>
                  <p className="text-[8px] text-muted-foreground mt-1">
                    {fish.description}
                  </p>
                </div>
                <div className={`text-[8px] px-2 py-1 rounded ${
                  fish.rarity === 'legendary' ? 'bg-accent text-accent-foreground' :
                  fish.rarity === 'rare' ? 'bg-primary text-primary-foreground' :
                  fish.rarity === 'horror' ? 'bg-game-horror text-background' :
                  'bg-muted text-muted-foreground'
                }`}>
                  {fish.rarity.toUpperCase()}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-xs text-muted-foreground">No catches yet today.</p>
              <p className="text-[8px] text-muted-foreground mt-2">Cast your line to get started!</p>
            </div>
          )}
        </div>

        <div className="border-t border-border pt-4 mt-4">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <p className="text-lg font-pixel text-primary">{todaysCatches.length}</p>
              <p className="text-[8px] text-muted-foreground">Total</p>
            </div>
            <div>
              <p className="text-lg font-pixel text-accent">
                {Object.values(groupedByFish).filter(g => g.fish.rarity === 'rare' || g.fish.rarity === 'legendary').length}
              </p>
              <p className="text-[8px] text-muted-foreground">Rare</p>
            </div>
            <div>
              <p className="text-lg font-pixel text-game-horror">
                {Object.values(groupedByFish).filter(g => g.fish.isHorror).length}
              </p>
              <p className="text-[8px] text-muted-foreground">Horror</p>
            </div>
          </div>
        </div>

        <button onClick={onClose} className="game-button w-full mt-4">
          Close
        </button>
      </div>
    </div>
  );
};
