import React from 'react';
import { FishingPhase } from '@/types/game';

interface FishingUIProps {
  phase: FishingPhase;
  tension: number;
  onCast: () => void;
  onHook: () => void;
  onReel: () => void;
}

const phaseLabels: Record<FishingPhase, string> = {
  idle: 'Press SPACE to cast',
  cast: 'Casting...',
  wait: 'Waiting for a bite...',
  bite: 'BITE! Press SPACE!',
  hook: 'Hooked!',
  reel: 'Hold SPACE to reel in!',
  catch: 'Caught something!',
  fail: 'It got away...',
};

export const FishingUI: React.FC<FishingUIProps> = ({ 
  phase, 
  tension, 
  onCast, 
  onHook, 
  onReel 
}) => {
  const getTensionColor = () => {
    if (tension < 40) return 'bg-tension-low';
    if (tension < 70) return 'bg-tension-medium';
    return 'bg-tension-high';
  };

  const showTension = phase === 'reel' || phase === 'hook';

  return (
    <div className="absolute bottom-24 left-1/2 -translate-x-1/2 w-full max-w-md px-4">
      {/* Fishing Phase Indicator */}
      <div className={`game-panel p-4 text-center ${phase === 'bite' ? 'animate-tension-shake border-accent' : ''}`}>
        <p className={`text-sm font-pixel ${
          phase === 'bite' ? 'text-accent pixel-text-glow' : 
          phase === 'catch' ? 'text-tension-low' :
          phase === 'fail' ? 'text-destructive' :
          'text-foreground'
        }`}>
          {phaseLabels[phase]}
        </p>

        {/* Tension Meter */}
        {showTension && (
          <div className="mt-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[8px] text-muted-foreground">TENSION</span>
              <span className={`text-[8px] ${
                tension < 40 ? 'text-tension-low' :
                tension < 70 ? 'text-tension-medium' :
                'text-tension-high'
              }`}>
                {tension}%
              </span>
            </div>
            <div className="h-3 bg-muted border border-border overflow-hidden">
              <div 
                className={`h-full transition-all duration-100 ${getTensionColor()}`}
                style={{ width: `${tension}%` }}
              />
            </div>
            <p className="text-[8px] text-muted-foreground mt-1">
              {tension > 80 ? 'Too much tension!' : tension < 20 ? 'Reel faster!' : 'Keep steady!'}
            </p>
          </div>
        )}

        {/* Catch Indicator (bobber) */}
        {(phase === 'wait' || phase === 'bite') && (
          <div className="mt-4 flex justify-center">
            <div className={`relative ${phase === 'bite' ? 'animate-bobber' : 'animate-float'}`}>
              <div className={`w-4 h-6 rounded-full ${
                phase === 'bite' ? 'bg-accent' : 'bg-destructive'
              }`} />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0.5 h-4 bg-foreground/30" />
            </div>
          </div>
        )}

        {/* Action hint */}
        <div className="mt-3">
          {phase === 'idle' && (
            <button onClick={onCast} className="game-button text-[10px] px-4 py-2">
              Cast Line
            </button>
          )}
          {phase === 'bite' && (
            <button onClick={onHook} className="game-button text-[10px] px-4 py-2 animate-pulse">
              Hook It!
            </button>
          )}
          {phase === 'reel' && (
            <button 
              onMouseDown={onReel}
              onMouseUp={onReel}
              className="game-button text-[10px] px-4 py-2"
            >
              Reel In!
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
