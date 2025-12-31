// Player animation definitions using Craftpix Fisherman sprites
import { SpriteAnimation } from '@/components/game/SpriteAnimator';
import { PlayerState } from '@/types/game';

// Import sprite sheets
import fishermanIdle from '@/assets/FromCraftpixFishingPack/1 Fisherman/Fisherman_idle.png';
import fishermanWalk from '@/assets/FromCraftpixFishingPack/1 Fisherman/Fisherman_walk.png';
import fishermanFish from '@/assets/FromCraftpixFishingPack/1 Fisherman/Fisherman_fish.png';
import fishermanRow from '@/assets/FromCraftpixFishingPack/1 Fisherman/Fisherman_row.png';
import fishermanAttack from '@/assets/FromCraftpixFishingPack/1 Fisherman/Fisherman_attack.png';
import fishermanHook from '@/assets/FromCraftpixFishingPack/1 Fisherman/Fisherman_hook.png';
import fishermanHurt from '@/assets/FromCraftpixFishingPack/1 Fisherman/Fisherman_hurt.png';

// Animation definitions
export const PLAYER_ANIMATIONS: Record<PlayerState, SpriteAnimation> = {
  idle: {
    spriteSheet: fishermanIdle,
    frameWidth: 48,
    frameHeight: 48,
    frameCount: 4,
    frameDuration: 200,
    loop: true,
  },
  walking: {
    spriteSheet: fishermanWalk,
    frameWidth: 48,
    frameHeight: 48,
    frameCount: 6,
    frameDuration: 100,
    loop: true,
  },
  jumping: {
    spriteSheet: fishermanIdle,
    frameWidth: 48,
    frameHeight: 48,
    frameCount: 1,
    frameDuration: 200,
    loop: false,
  },
  falling: {
    spriteSheet: fishermanIdle,
    frameWidth: 48,
    frameHeight: 48,
    frameCount: 1,
    frameDuration: 200,
    loop: false,
  },
  swimming: {
    spriteSheet: fishermanRow,
    frameWidth: 48,
    frameHeight: 48,
    frameCount: 4,
    frameDuration: 150,
    loop: true,
  },
  climbing: {
    spriteSheet: fishermanWalk,
    frameWidth: 48,
    frameHeight: 48,
    frameCount: 6,
    frameDuration: 150,
    loop: true,
  },
  fishing: {
    spriteSheet: fishermanFish,
    frameWidth: 48,
    frameHeight: 48,
    frameCount: 4,
    frameDuration: 150,
    loop: true,
  },
  rowing: {
    spriteSheet: fishermanRow,
    frameWidth: 48,
    frameHeight: 48,
    frameCount: 4,
    frameDuration: 200,
    loop: true,
  },
};

// Special animations for fishing phases
export const FISHING_ANIMATIONS = {
  cast: {
    spriteSheet: fishermanAttack,
    frameWidth: 48,
    frameHeight: 48,
    frameCount: 4,
    frameDuration: 100,
    loop: false,
  },
  hook: {
    spriteSheet: fishermanHook,
    frameWidth: 48,
    frameHeight: 48,
    frameCount: 6,
    frameDuration: 100,
    loop: false,
  },
  reel: {
    spriteSheet: fishermanFish,
    frameWidth: 48,
    frameHeight: 48,
    frameCount: 4,
    frameDuration: 100,
    loop: true,
  },
  hurt: {
    spriteSheet: fishermanHurt,
    frameWidth: 48,
    frameHeight: 48,
    frameCount: 2,
    frameDuration: 200,
    loop: false,
  },
};

// Get animation for current player state
export function getPlayerAnimation(state: PlayerState): SpriteAnimation {
  return PLAYER_ANIMATIONS[state] || PLAYER_ANIMATIONS.idle;
}

export default PLAYER_ANIMATIONS;
