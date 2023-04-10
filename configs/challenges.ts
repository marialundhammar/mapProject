const challenge1 = {
  id: 'test-1',
  name: 'Fota er! ',
  description: 'T en bild på dig och ditt sällskap framför ',
  type: 'countdown',
  mediaType: 'video',
};

const challenge2 = {
  id: 'test-2',
  name: 'Fråga bartendern',
  description:
    'Be om ett glas mjölk från bartendern och ge det sedan till grannbordet',
  type: 'countdown',
  mediaType: 'video',
};

const challenge3 = {
  id: 'test-3',
  name: 'fdfd',
  description: 'fdffdff',
  type: 'countdown',
  mediaType: 'video',
};

export const challenges1 = {
  preChallenges: [challenge3],
  countdown: [challenge1, challenge2, challenge3],
};
export const challenges2 = [challenge2, challenge3, challenge1];
