import React from 'react';

interface MainMenuProps {
  onPlay: () => void;
  onSettings: () => void;
  onAbout: () => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({ onPlay, onSettings, onAbout }) => {
  return (
    <div 
      className="fixed inset-0 flex flex-col items-center justify-center"
      style={{ background: 'linear-gradient(to bottom, hsl(200 70% 65%), hsl(195 50% 40%), hsl(30 25% 15%))' }}
    >
      {/* Animated water reflection */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute bottom-0 left-0 right-0 h-1/2 water-shimmer" 
          style={{ background: 'linear-gradient(to top, hsl(195 50% 35% / 0.6), transparent)' }} 
        />
        <div 
          className="absolute top-20 left-1/4 w-32 h-32 rounded-full blur-3xl animate-float" 
          style={{ background: 'hsl(45 90% 60% / 0.3)' }}
        />
        <div 
          className="absolute top-40 right-1/3 w-24 h-24 rounded-full blur-2xl animate-float" 
          style={{ background: 'hsl(32 80% 55% / 0.4)', animationDelay: '1s' }}
        />
      </div>

      {/* Title */}
      <div className="relative z-10 text-center mb-16 animate-fade-in">
        <h1 
          className="text-4xl md:text-6xl font-pixel mb-4"
          style={{ 
            color: 'hsl(45 100% 70%)', 
            textShadow: '3px 3px 0 hsl(0 0% 0% / 0.5), 0 0 20px hsl(45 100% 60% / 0.5)' 
          }}
        >
          HOPELESS
        </h1>
        <h2 
          className="text-3xl md:text-5xl font-pixel"
          style={{ 
            color: 'hsl(32 80% 60%)', 
            textShadow: '2px 2px 0 hsl(0 0% 0% / 0.5)' 
          }}
        >
          CATCH
        </h2>
        <p 
          className="text-xs mt-6 tracking-wider"
          style={{ color: 'hsl(200 30% 85%)' }}
        >
          A cozy fishing horror experience
        </p>
      </div>

      {/* Menu buttons */}
      <div className="relative z-10 flex flex-col gap-4 animate-slide-up">
        <button onClick={onPlay} className="game-button min-w-[200px]">
          Play
        </button>
        <button onClick={onSettings} className="game-button-secondary min-w-[200px]">
          Settings
        </button>
        <button onClick={onAbout} className="game-button-secondary min-w-[200px]">
          About
        </button>
        <button 
          onClick={() => window.close()} 
          className="game-button-secondary min-w-[200px] opacity-60"
        >
          Quit
        </button>
      </div>

      {/* Floating fish silhouette */}
      <div 
        className="absolute bottom-32 right-20 opacity-30 animate-float" 
        style={{ animationDelay: '0.5s' }}
      >
        <svg width="80" height="40" viewBox="0 0 80 40" fill="hsl(200 20% 90%)">
          <ellipse cx="35" cy="20" rx="30" ry="15" />
          <polygon points="65,20 80,8 80,32" />
        </svg>
      </div>

      {/* Version */}
      <p className="absolute bottom-4 text-[8px]" style={{ color: 'hsl(200 20% 60%)' }}>
        v0.1.0 - Interactive Mockup
      </p>
    </div>
  );
};
