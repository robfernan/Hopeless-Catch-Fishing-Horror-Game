import React from 'react';

interface AboutMenuProps {
  onBack: () => void;
}

export const AboutMenu: React.FC<AboutMenuProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center animate-fade-in">
      <div className="game-panel p-8 w-full max-w-md animate-scale-in">
        <h2 className="text-xl font-pixel text-accent text-center mb-6 pixel-text">
          ABOUT
        </h2>

        <div className="space-y-4 text-xs leading-relaxed text-foreground/80">
          <p>
            <span className="text-primary">Hopeless Catch</span> is a cozy fishing game with a dark secret lurking beneath the calm waters.
          </p>
          
          <p>
            By day, enjoy peaceful fishing at various scenic locations. But when night falls, the waters reveal something... unsettling.
          </p>

          <p>
            Can you catch the legendary <span className="text-game-horror">Fishman</span> that haunts these waters?
          </p>

          <div className="border-t border-border pt-4 mt-4">
            <p className="text-[8px] text-muted-foreground">
              Interactive Web Mockup
            </p>
            <p className="text-[8px] text-muted-foreground mt-1">
              Built with love for fishing and horror
            </p>
          </div>
        </div>

        <button onClick={onBack} className="game-button w-full mt-6">
          Back
        </button>
      </div>
    </div>
  );
};
