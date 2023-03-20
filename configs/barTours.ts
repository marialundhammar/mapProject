import { BarTourTypes } from '../types';
import { arrayOfBars } from '../configs/bars';

export const arrayOfBarTours: BarTourTypes[] = [
  {
    title: 'TALKATIVERUNDAN',
    numbersOfBars: 4,
    bars: [arrayOfBars[0], arrayOfBars[1], arrayOfBars[2], arrayOfBars[3]],
  },
  {
    title: 'Short Round',
    numbersOfBars: 2,
    bars: [arrayOfBars[0], arrayOfBars[1]],
  },
];
