import { BaitType } from '@/types/game';

import cheeseImg from '@/assets/bait/cheese.png';
import cornImg from '@/assets/bait/corn.png';
import minnowsImg from '@/assets/bait/minnows.png';
import wormsImg from '@/assets/bait/worms.png';

export interface BaitInfo {
  type: BaitType;
  name: string;
  image: string;
  description: string;
}

export const baitData: BaitInfo[] = [
  {
    type: 'cheese',
    name: 'Cheese',
    image: cheeseImg,
    description: 'Attracts curious fish.',
  },
  {
    type: 'corn',
    name: 'Corn',
    image: cornImg,
    description: 'Sweet and effective.',
  },
  {
    type: 'minnows',
    name: 'Minnows',
    image: minnowsImg,
    description: 'Live bait for bigger catches.',
  },
  {
    type: 'worms',
    name: 'Worms',
    image: wormsImg,
    description: 'Classic fishing bait.',
  },
];

export const getBaitByType = (type: BaitType) => baitData.find(b => b.type === type);
