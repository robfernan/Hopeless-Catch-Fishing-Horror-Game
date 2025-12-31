import React from 'react';
import { PlayerState, FishingPhase } from '@/types/game';
import { SpriteAnimator } from './SpriteAnimator';
import { getPlayerAnimation, FISHING_ANIMATIONS } from '@/data/playerAnimations';

interface PlayerProps {
  x: number;
  y: number;
  playerState: PlayerState;
  fishingPhase: FishingPhase;
  facingDirection: 'left' | 'right';
  scale?: number;
}

export const Player: React.FC<PlayerProps> = ({
  x,
  y,
  playerState,
  fishingPhase,
  facingDirection,
  scale = 1.5,
}) => {
  // Determine which animation to use
  let animation = getPlayerAnimation(playerState);
  
  // Override with fishing animations when actively fishing
  if (fishingPhase === 'casting') {
    animation = FISHING_ANIMATIONS.cast;
  } else if (fishingPhase === 'hooking') {
    animation = FISHING_ANIMATIONS.hook;
  } else if (fishingPhase === 'reeling' || fishingPhase === 'tension') {
    animation = FISHING_ANIMATIONS.reel;
  } else if (fishingPhase === 'escaped') {
    animation = FISHING_ANIMATIONS.hurt;
  }

  const flipX = facingDirection === 'left';

  return (
    <SpriteAnimator
      animation={animation}
      x={x}
      y={y}
      flipX={flipX}
      scale={scale}
    />
  );
};

export default Player;
