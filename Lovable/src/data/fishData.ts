import { Fish } from '@/types/game';

import sunfishImg from '@/assets/fish/sunfish.png';
import bassImg from '@/assets/fish/bass.png';
import troutImg from '@/assets/fish/trout.png';
import catfishImg from '@/assets/fish/catfish.png';
import goldenCarpImg from '@/assets/fish/golden_carp.png';
import paleCrawlerImg from '@/assets/fish/pale_crawler.png';
import bleedingCarpImg from '@/assets/fish/bleeding_carp.png';
import whisperingEelImg from '@/assets/fish/whispering_eel.png';
import fishmanImg from '@/assets/fish/fishman.png';

export const fishData: Fish[] = [
  // Day Fish (5 species)
  {
    id: 'sunfish',
    name: 'Sunfish',
    image: sunfishImg,
    rarity: 'common',
    isNightOnly: false,
    isHorror: false,
    description: 'A cheerful golden fish that loves the sun.',
    tensionPattern: 'steady',
    difficulty: 2,
    attractedByBait: ['worms', 'corn'],
    baitMultiplier: { worms: 1.5, corn: 1.2, minnows: 0.5, cheese: 0.3 },
  },
  {
    id: 'bass',
    name: 'Bass',
    image: bassImg,
    rarity: 'common',
    isNightOnly: false,
    isHorror: false,
    description: 'A sturdy fish, popular among anglers.',
    tensionPattern: 'aggressive',
    difficulty: 4,
    attractedByBait: ['minnows', 'worms'],
    baitMultiplier: { worms: 1.0, corn: 0.5, minnows: 1.8, cheese: 0.4 },
  },
  {
    id: 'trout',
    name: 'Trout',
    image: troutImg,
    rarity: 'uncommon',
    isNightOnly: false,
    isHorror: false,
    description: 'A sleek, quick fish that prefers cold water.',
    tensionPattern: 'erratic',
    difficulty: 5,
    attractedByBait: ['minnows', 'worms'],
    baitMultiplier: { worms: 1.2, corn: 0.3, minnows: 1.6, cheese: 0.2 },
  },
  {
    id: 'catfish',
    name: 'Catfish',
    image: catfishImg,
    rarity: 'uncommon',
    isNightOnly: false,
    isHorror: false,
    description: 'A bottom-dweller with long whiskers. Mostly harmless.',
    tensionPattern: 'passive',
    difficulty: 3,
    attractedByBait: ['cheese', 'worms'],
    baitMultiplier: { worms: 1.3, corn: 0.6, minnows: 0.8, cheese: 1.7 },
  },
  {
    id: 'golden_carp',
    name: 'Golden Carp',
    image: goldenCarpImg,
    rarity: 'rare',
    isNightOnly: false,
    isHorror: false,
    description: 'A shimmering golden fish said to bring good fortune.',
    tensionPattern: 'steady',
    difficulty: 7,
    attractedByBait: ['corn', 'cheese'],
    baitMultiplier: { worms: 0.8, corn: 1.5, minnows: 0.5, cheese: 1.2 },
  },
  // Night Creatures (4 species)
  {
    id: 'pale_crawler',
    name: 'Pale Crawler',
    image: paleCrawlerImg,
    rarity: 'uncommon',
    isNightOnly: true,
    isHorror: true,
    description: 'You shouldn\'t have caught this.',
    horrorDescription: 'Its pale flesh seems to glow. It has too many eyes.',
    tensionPattern: 'erratic',
    difficulty: 6,
    attractedByBait: ['worms', 'minnows'],
    baitMultiplier: { worms: 1.5, corn: 0.2, minnows: 1.3, cheese: 0.5 },
  },
  {
    id: 'bleeding_carp',
    name: 'Bleeding Carp',
    image: bleedingCarpImg,
    rarity: 'rare',
    isNightOnly: true,
    isHorror: true,
    description: 'A fish that shouldn\'t exist.',
    horrorDescription: 'It bleeds constantly, yet lives. The water around it turns red.',
    tensionPattern: 'aggressive',
    difficulty: 8,
    attractedByBait: ['cheese', 'worms'],
    baitMultiplier: { worms: 1.4, corn: 0.1, minnows: 0.9, cheese: 1.6 },
  },
  {
    id: 'whispering_eel',
    name: 'Whispering Eel',
    image: whisperingEelImg,
    rarity: 'rare',
    isNightOnly: true,
    isHorror: true,
    description: 'You hear it before you see it.',
    horrorDescription: 'It whispers in a language you almost understand. Your mind aches.',
    tensionPattern: 'erratic',
    difficulty: 9,
    attractedByBait: ['minnows', 'worms'],
    baitMultiplier: { worms: 1.2, corn: 0.3, minnows: 1.7, cheese: 0.4 },
  },
  {
    id: 'fishman',
    name: 'The Fishman',
    image: fishmanImg,
    rarity: 'legendary',
    isNightOnly: true,
    isHorror: true,
    description: 'They say it was once human.',
    horrorDescription: 'The boss of the deep waters. It watches you. It has always been watching.',
    tensionPattern: 'aggressive',
    difficulty: 10,
    attractedByBait: ['minnows'],
    baitMultiplier: { worms: 0.5, corn: 0.1, minnows: 2.0, cheese: 0.3 },
  },
];

export const getDayFish = () => fishData.filter(f => !f.isNightOnly);
export const getNightFish = () => fishData.filter(f => f.isNightOnly);
export const getAvailableFish = (timeOfDay: 'day' | 'night', peacefulMode: boolean) => {
  if (peacefulMode) return getDayFish();
  return timeOfDay === 'day' ? getDayFish() : [...getDayFish(), ...getNightFish()];
};

// Room-specific fish availability
export const getRoomFish = (roomId: string, timeOfDay: 'day' | 'night', peacefulMode: boolean): Fish[] => {
  const allAvailable = getAvailableFish(timeOfDay, peacefulMode);
  
  const roomFishMap: Record<string, string[]> = {
    // Lake rooms
    lake_shallow_dock: ['sunfish', 'bass'],
    lake_deep_pool: ['bass', 'trout', 'catfish'],
    lake_lily_pads: ['sunfish', 'golden_carp'],
    lake_old_pier: ['catfish', 'trout'],
    lake_sunken_boat: ['trout', 'catfish', 'golden_carp'],
    lake_underground_spring: ['catfish', 'pale_crawler'],
    
    // Forest rooms
    forest_entrance: ['bass', 'trout'],
    forest_misty_shore: ['catfish', 'bleeding_carp'],
    forest_murky_pond: ['catfish', 'golden_carp', 'pale_crawler'],
    forest_fog_bank: ['trout', 'whispering_eel'],
    forest_submerged_ruins: ['golden_carp', 'bleeding_carp', 'whispering_eel'],
    forest_the_hollow: ['pale_crawler', 'whispering_eel'],
    forest_sunken_chapel: ['fishman'],
    
    // Mountain rooms
    mountain_pass: ['trout', 'bass'],
    mountain_frozen_lake: ['trout', 'catfish', 'golden_carp'],
    mountain_waterfall_cave: ['catfish', 'whispering_eel'],
    mountain_ice_cavern: ['golden_carp', 'pale_crawler'],
    mountain_underground_river: ['bleeding_carp', 'whispering_eel'],
    mountain_the_depths: ['fishman'],
  };
  
  const fishIds = roomFishMap[roomId] || [];
  return allAvailable.filter(f => fishIds.includes(f.id));
};
