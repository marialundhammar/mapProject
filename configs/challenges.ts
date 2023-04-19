const challenge1 = {
  id: 'test-1',
  name: 'Fota er! ',
  description: 'T en bild på dig och ditt sällskap framför barens skylt',
  type: 'default',
  mediaType: 'image',
};

const challenge2 = {
  id: 'test-2',
  name: 'Fråga bartendern',
  description:
    'Be om ett glas mjölk från bartendern och ge det sedan till grannbordet',
  type: 'default',
  mediaType: 'image',
};

const challenge3 = {
  id: 'test-3',
  name: 'test3',
  description: 'fdffdff',
  type: 'default',
  mediaType: 'image',
};
const challenge4 = {
  id: 'test-4',
  name: 'test4',
  description: 'lorem ipsum',
  type: 'default',
  mediaType: 'image',
};
const challenge5 = {
  id: 'test-5',
  name: 'test5',
  description: 'lorem ipsum hohoh',
  type: 'default',
  mediaType: 'image',
};

export const challenges1 = {
  preChallenges: [challenge3],
  countdown: [challenge1, challenge2, challenge3],
};
export const challenges2 = [challenge2, challenge3, challenge1, challenge4];
