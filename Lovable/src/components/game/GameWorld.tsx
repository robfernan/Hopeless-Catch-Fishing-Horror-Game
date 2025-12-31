import React from 'react';
import { Location, TimeOfDay, PlayerState, FishingPhase } from '@/types/game';
import { Player } from './Player';

interface GameWorldProps {
  location: Location;
  timeOfDay: TimeOfDay;
  peacefulMode: boolean;
  playerPosition: { x: number; y: number };
  playerState?: PlayerState;
  fishingPhase?: FishingPhase;
  facingDirection?: 'left' | 'right';
  onCabinClick: () => void;
}

const locationStyles: Record<Location, { 
  skyDay: string; 
  skyNight: string;
  waterDay: string;
  waterNight: string;
  ground: string;
  elements: React.ReactNode;
}> = {
  lake: {
    skyDay: 'from-sky-day via-blue-300 to-cyan-200',
    skyNight: 'from-sky-night via-indigo-950 to-purple-950',
    waterDay: 'from-water-day/80 to-cyan-600/60',
    waterNight: 'from-water-night to-indigo-900/80',
    ground: 'from-game-grass to-emerald-800',
    elements: (
      <>
        {/* Dock */}
        <div className="absolute bottom-[30%] left-[40%] w-32 h-4 bg-game-wood border-2 border-amber-900" />
        <div className="absolute bottom-[26%] left-[42%] w-28 h-3 bg-amber-800 border-2 border-amber-900" />
      </>
    ),
  },
  forest: {
    skyDay: 'from-emerald-200 via-green-300 to-cyan-200',
    skyNight: 'from-gray-950 via-emerald-950 to-black',
    waterDay: 'from-emerald-600/70 to-teal-700/60',
    waterNight: 'from-emerald-950 to-black/80',
    ground: 'from-emerald-900 to-green-950',
    elements: (
      <>
        {/* Trees */}
        <div className="absolute bottom-[45%] left-[10%]">
          <div className="w-0 h-0 border-l-[20px] border-r-[20px] border-b-[40px] border-l-transparent border-r-transparent border-b-emerald-800" />
          <div className="w-3 h-6 bg-amber-900 mx-auto" />
        </div>
        <div className="absolute bottom-[48%] left-[20%]">
          <div className="w-0 h-0 border-l-[25px] border-r-[25px] border-b-[50px] border-l-transparent border-r-transparent border-b-green-900" />
          <div className="w-4 h-8 bg-amber-800 mx-auto" />
        </div>
        <div className="absolute bottom-[44%] right-[15%]">
          <div className="w-0 h-0 border-l-[22px] border-r-[22px] border-b-[45px] border-l-transparent border-r-transparent border-b-emerald-900" />
          <div className="w-3 h-7 bg-amber-900 mx-auto" />
        </div>
        {/* Lily pads */}
        <div className="absolute bottom-[18%] left-[30%] w-6 h-4 bg-green-600 rounded-full opacity-60" />
        <div className="absolute bottom-[20%] left-[60%] w-5 h-3 bg-green-500 rounded-full opacity-50" />
      </>
    ),
  },
  mountain: {
    skyDay: 'from-blue-300 via-sky-300 to-white',
    skyNight: 'from-slate-950 via-blue-950 to-indigo-950',
    waterDay: 'from-blue-400/70 to-cyan-500/60',
    waterNight: 'from-blue-950 to-slate-900/80',
    ground: 'from-stone-600 to-slate-700',
    elements: (
      <>
        {/* Mountains in background */}
        <div className="absolute bottom-[50%] left-[5%]">
          <div className="w-0 h-0 border-l-[60px] border-r-[60px] border-b-[80px] border-l-transparent border-r-transparent border-b-slate-500" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[20px] border-r-[20px] border-b-[25px] border-l-transparent border-r-transparent border-b-white" />
        </div>
        <div className="absolute bottom-[55%] right-[10%]">
          <div className="w-0 h-0 border-l-[50px] border-r-[50px] border-b-[70px] border-l-transparent border-r-transparent border-b-slate-600" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[15px] border-r-[15px] border-b-[20px] border-l-transparent border-r-transparent border-b-gray-100" />
        </div>
        {/* Rocks */}
        <div className="absolute bottom-[28%] left-[25%] w-8 h-5 bg-stone-500 rounded-t-full" />
        <div className="absolute bottom-[26%] right-[30%] w-6 h-4 bg-stone-600 rounded-t-full" />
      </>
    ),
  },
};

export const GameWorld: React.FC<GameWorldProps> = ({ 
  location, 
  timeOfDay, 
  peacefulMode,
  playerPosition, 
  playerState = 'idle',
  fishingPhase = 'idle',
  facingDirection = 'right',
  onCabinClick 
}) => {
  const styles = locationStyles[location];
  const isNight = timeOfDay === 'night';
  const showHorrorEffects = isNight && !peacefulMode;

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Sky */}
      <div 
        className={`absolute inset-0 bg-gradient-to-b transition-all duration-1000 ${
          isNight ? styles.skyNight : styles.skyDay
        }`}
      >
        {/* Stars (night only) */}
        {isNight && (
          <div className="absolute inset-0">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 40}%`,
                  opacity: Math.random() * 0.8 + 0.2,
                  animation: `flicker ${1 + Math.random() * 2}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
        )}

        {/* Sun/Moon */}
        <div 
          className={`absolute w-16 h-16 rounded-full transition-all duration-1000 ${
            isNight 
              ? 'bg-gray-200 top-10 right-20 shadow-[0_0_40px_rgba(200,200,220,0.5)]' 
              : 'bg-amber-300 top-8 right-24 shadow-[0_0_60px_rgba(255,200,100,0.6)]'
          }`}
        >
          {isNight && (
            <div className="absolute top-2 left-3 w-4 h-4 bg-gray-300 rounded-full opacity-50" />
          )}
        </div>
      </div>

      {/* Location elements */}
      {styles.elements}

      {/* Ground/shore */}
      <div 
        className={`absolute bottom-0 left-0 right-0 h-[35%] bg-gradient-to-t ${styles.ground}`}
      />

      {/* Water */}
      <div 
        className={`absolute bottom-0 left-0 right-0 h-[25%] bg-gradient-to-t transition-all duration-1000 water-shimmer ${
          isNight ? styles.waterNight : styles.waterDay
        }`}
      >
        {/* Horror water effects */}
        {showHorrorEffects && (
          <>
            <div className="absolute inset-0 bg-game-horror/10 animate-pulse" />
            <div 
              className="absolute w-8 h-8 rounded-full bg-game-horror/30 blur-sm horror-glow"
              style={{ 
                left: `${30 + Math.sin(Date.now() / 1000) * 10}%`, 
                top: '40%',
              }}
            />
          </>
        )}
      </div>

      {/* Cabin */}
      <button
        onClick={onCabinClick}
        className="absolute bottom-[38%] right-[15%] group cursor-pointer transition-transform hover:scale-105"
      >
        {/* Cabin structure */}
        <div className="relative">
          {/* Roof */}
          <div className="w-0 h-0 border-l-[35px] border-r-[35px] border-b-[25px] border-l-transparent border-r-transparent border-b-amber-700" />
          {/* Body */}
          <div className="w-[70px] h-[35px] bg-amber-800 border-2 border-amber-900">
            {/* Window */}
            <div className={`absolute top-[30px] left-[10px] w-[15px] h-[12px] ${
              isNight ? 'bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.5)]' : 'bg-cyan-200/50'
            }`} />
            {/* Door */}
            <div className="absolute top-[25px] right-[10px] w-[12px] h-[20px] bg-amber-900" />
          </div>
        </div>
        <p className="text-[8px] text-center mt-1 text-foreground/50 group-hover:text-foreground transition-colors">
          {isNight ? 'Rest until dawn' : 'Rest until dusk'}
        </p>
      </button>

      {/* Player character */}
      <div 
        className="absolute transition-all duration-200"
        style={{ 
          left: `${playerPosition.x}%`, 
          bottom: `${100 - playerPosition.y}%`,
          transform: 'translateX(-50%)',
        }}
      >
        <Player 
          x={0}
          y={0}
          playerState={playerState}
          fishingPhase={fishingPhase}
          facingDirection={facingDirection}
          scale={2}
        />
      </div>

      {/* Anomaly effects (night horror mode only) */}
      {showHorrorEffects && (
        <>
          {/* Random glitch effects */}
          {Math.random() > 0.7 && (
            <div 
              className="absolute inset-0 bg-game-horror/5 pointer-events-none eerie-flicker"
              style={{ mixBlendMode: 'overlay' }}
            />
          )}
          
          {/* Creepy eyes in water */}
          <div className="absolute bottom-[15%] left-[20%] flex gap-2 opacity-40">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }} />
          </div>
        </>
      )}

      {/* Vignette effect for night */}
      {isNight && (
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)',
          }}
        />
      )}
    </div>
  );
};
