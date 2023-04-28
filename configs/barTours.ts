import { BarTourTypes } from '../types';
import { arrayOfBars } from '../configs/bars';

export const arrayOfBarTours: BarTourTypes[] = [
  {
    title: 'TALKATIVERUNDAN <3',
    numbersOfBars: 4,
    bars: [arrayOfBars[0], arrayOfBars[1], arrayOfBars[2], arrayOfBars[3]],
    description: 'Det här är den bästa rundan enligt oss/ Talkative',
    trofee: require('../assets/trofees/talkativerundan.png'),
    area: 'Möllan',
  },
  {
    title: 'Snabbisen',
    numbersOfBars: 2,
    bars: [arrayOfBars[0], arrayOfBars[1]],
    trofee: require('../assets/trofees/snabbisen.png'),
    area: 'Möllan',
  },
  {
    title: 'Lyxrundan',
    numbersOfBars: 2,
    bars: [arrayOfBars[3], arrayOfBars[1]],
    trofee: require('../assets/trofees/lyxrundan.png'),
    area: 'Möllan',
  },
  {
    title: 'Vinhaggans bästa barer',
    numbersOfBars: 2,
    bars: [arrayOfBars[3], arrayOfBars[1]],
    trofee: require('../assets/trofees/winelovers.png'),
    area: 'Möllan',
  },
  {
    title: 'Pubrundan',
    numbersOfBars: 2,
    bars: [arrayOfBars[3], arrayOfBars[1]],
    trofee: require('../assets/trofees/beeroclock.png'),
    area: 'Möllan',
  },
];
