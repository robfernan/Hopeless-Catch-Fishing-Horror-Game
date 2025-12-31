import React, { useEffect, useRef, useState } from 'react';

export interface SpriteAnimation {
  spriteSheet: string;
  frameWidth: number;
  frameHeight: number;
  frameCount: number;
  frameDuration: number; // ms per frame
  loop: boolean;
  offsetY?: number; // vertical offset in sprite sheet
}

interface SpriteAnimatorProps {
  animation: SpriteAnimation;
  x: number;
  y: number;
  flipX?: boolean;
  scale?: number;
  onAnimationEnd?: () => void;
}

export const SpriteAnimator: React.FC<SpriteAnimatorProps> = ({
  animation,
  x,
  y,
  flipX = false,
  scale = 1,
  onAnimationEnd,
}) => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const frameRef = useRef<number>(0);
  const lastUpdateRef = useRef<number>(Date.now());

  useEffect(() => {
    // Reset frame when animation changes
    setCurrentFrame(0);
    frameRef.current = 0;
    lastUpdateRef.current = Date.now();
  }, [animation.spriteSheet]);

  useEffect(() => {
    const animate = () => {
      const now = Date.now();
      const elapsed = now - lastUpdateRef.current;

      if (elapsed >= animation.frameDuration) {
        lastUpdateRef.current = now;
        
        const nextFrame = frameRef.current + 1;
        
        if (nextFrame >= animation.frameCount) {
          if (animation.loop) {
            frameRef.current = 0;
            setCurrentFrame(0);
          } else {
            onAnimationEnd?.();
          }
        } else {
          frameRef.current = nextFrame;
          setCurrentFrame(nextFrame);
        }
      }
    };

    const intervalId = setInterval(animate, 16); // ~60fps check
    return () => clearInterval(intervalId);
  }, [animation, onAnimationEnd]);

  const width = animation.frameWidth * scale;
  const height = animation.frameHeight * scale;
  const offsetX = currentFrame * animation.frameWidth;
  const offsetY = animation.offsetY || 0;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width,
        height,
        backgroundImage: `url(${animation.spriteSheet})`,
        backgroundPosition: `-${offsetX}px -${offsetY}px`,
        backgroundSize: `${animation.frameWidth * animation.frameCount * scale}px ${animation.frameHeight * scale}px`,
        imageRendering: 'pixelated',
        transform: flipX ? 'scaleX(-1)' : 'none',
      }}
    />
  );
};

export default SpriteAnimator;
