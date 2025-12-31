import React from 'react';
import { GameSettings } from '@/types/game';

interface SettingsMenuProps {
  settings: GameSettings;
  onUpdateSettings: (settings: Partial<GameSettings>) => void;
  onBack: () => void;
  isInGame?: boolean;
}

export const SettingsMenu: React.FC<SettingsMenuProps> = ({ 
  settings, 
  onUpdateSettings, 
  onBack,
  isInGame = false 
}) => {
  return (
    <div className={`${isInGame ? 'fixed inset-0 z-50 bg-background/80 backdrop-blur-sm' : 'min-h-screen bg-background'} flex items-center justify-center animate-fade-in`}>
      <div className="game-panel p-8 w-full max-w-md animate-scale-in">
        <h2 className="text-xl font-pixel text-accent text-center mb-8 pixel-text">
          SETTINGS
        </h2>

        <div className="space-y-6">
          {/* Peaceful Mode */}
          <div className="flex items-center justify-between">
            <span className="text-xs">Peaceful Mode</span>
            <button
              onClick={() => onUpdateSettings({ peacefulMode: !settings.peacefulMode })}
              className={`w-16 h-8 rounded border-2 transition-all ${
                settings.peacefulMode 
                  ? 'bg-tension-low border-tension-low' 
                  : 'bg-muted border-border'
              }`}
            >
              <span className="text-[8px] font-pixel">
                {settings.peacefulMode ? 'ON' : 'OFF'}
              </span>
            </button>
          </div>

          {/* Music Volume */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs">Music</span>
              <span className="text-xs text-muted-foreground">{settings.musicVolume}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={settings.musicVolume}
              onChange={(e) => onUpdateSettings({ musicVolume: parseInt(e.target.value) })}
              className="w-full h-2 bg-muted rounded appearance-none cursor-pointer accent-primary"
            />
          </div>

          {/* SFX Volume */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs">Sound Effects</span>
              <span className="text-xs text-muted-foreground">{settings.sfxVolume}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={settings.sfxVolume}
              onChange={(e) => onUpdateSettings({ sfxVolume: parseInt(e.target.value) })}
              className="w-full h-2 bg-muted rounded appearance-none cursor-pointer accent-primary"
            />
          </div>

          {/* Graphics Quality */}
          <div className="space-y-2">
            <span className="text-xs">Graphics</span>
            <div className="flex gap-2">
              {(['low', 'medium', 'high'] as const).map((quality) => (
                <button
                  key={quality}
                  onClick={() => onUpdateSettings({ graphicsQuality: quality })}
                  className={`flex-1 py-2 text-[8px] uppercase border-2 transition-all ${
                    settings.graphicsQuality === quality
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-muted border-border hover:border-primary/50'
                  }`}
                >
                  {quality}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button onClick={onBack} className="game-button w-full mt-8">
          Back
        </button>
      </div>
    </div>
  );
};
