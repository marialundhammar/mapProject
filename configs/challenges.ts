const challenge1 = {
  id: 'challenge-1',
  name: 'Selfie!',
  description: 'Ta en selfie med bartendern',
  type: 'default',
  mediaType: 'image',
};

const challenge2 = {
  id: 'challenge-2',
  name: 'Bjud till',
  description: 'Bjud en random person på något valfritt och dokumentera det',
  type: 'default',
  mediaType: 'image',
};

const challenge3 = {
  id: 'challenge-3',
  name: 'Gruppbild',
  description: 'Be någon ta en gruppbild på er',
  type: 'default',
  mediaType: 'image',
};
const challenge4 = {
  id: 'challenge-4',
  name: 'Grannen i Beck',
  description:
    'Återskapa när grannen i beck tar en snaps på balkongen och dokumentera ',
  type: 'default',
  mediaType: 'image',
};
const challenge5 = {
  id: 'challenge-5',
  name: 'Låna något!',
  description: 'Låna något från någon annan och ta en bild',
  type: 'default',
  mediaType: 'image',
};
const challenge6 = {
  id: 'challenge-6',
  name: 'Olivia mediterar',
  description:
    'Se ut som Olivia när hon går på meditation - be någon annan fota dig',
  type: 'default',
  mediaType: 'image',
};
const challenge7 = {
  id: 'challenge-7',
  name: 'Seriefiguren Lisa',
  description: 'Rita av Lisa som en seriefigur - dokumentera!  ',
  type: 'default',
  mediaType: 'image',
};
const challenge8 = {
  id: 'challenge-8',
  name: 'Klättra som Anton',
  description: 'Klättra på väggarna - tänkt Anton style, be någon fota dig',
  type: 'default',
  mediaType: 'image',
};
const challenge9 = {
  id: 'challenge-9',
  name: 'Skulpturen',
  description: 'Bygg en liten skulptur Mackan skulle varit stolt över',
  type: 'default',
  mediaType: 'image',
};
const challenge10 = {
  id: 'challenge-10',
  name: 'Första ölen',
  description:
    'Låtsas som detta är din första öl i det fria efter 15 år i fängelse, ta en selfie',
  type: 'default',
  mediaType: 'image',
};
const challenge11 = {
  id: 'challenge-11',
  name: 'Ge bort en present',
  description: 'Köp en present till någon i gänget, dokumentera!  ',
  type: 'default',
  mediaType: 'image',
};
const challenge12 = {
  id: 'challenge-12',
  name: 'Lejonkungen',
  description:
    'Återskapa scenen i lejonkungen när simba föddes, be någon fota ',
  type: 'default',
  mediaType: 'image',
};
const challenge13 = {
  id: 'challenge-13',
  name: 'Beställ något på danska',
  description: 'Beställ något på danska - dokumentera vad du beställde',
  type: 'default',
  mediaType: 'image',
};
const challenge14 = {
  id: 'challenge-14',
  name: 'Beställ något på norska',
  description:
    'Beställ något som att du är norsk  - dokumentera vad du beställde',
  type: 'default',
  mediaType: 'image',
};
const challenge15 = {
  id: 'challenge-15',
  name: 'Beställ något som att du är från Dalarna',
  description:
    'Beställ något som att du är från dalarna  - dokumentera vad du beställde ',
  type: 'default',
  mediaType: 'image',
};
const challenge16 = {
  id: 'challenge-16',
  name: 'Köp något nytt',
  description: 'Köp något du aldrig köpt förut - dokumentera',
  type: 'default',
  mediaType: 'image',
};
const challenge17 = {
  id: 'challenge-17',
  name: 'Selfie med sällskapet',
  description: 'Ta en selfie med ditt sällskap',
  type: 'default',
  mediaType: 'image',
};
const challenge18 = {
  id: 'challenge-18',
  name: 'Skåla!',
  description: 'Utbringa en skål (där skålen är för något speciellt) - fota! ',
  type: 'default',
  mediaType: 'image',
};
const challenge19 = {
  id: 'challenge-19',
  name: 'Personligt föremål',
  description:
    'Hitta något på baren som du kan tänka dig ta med som personlig grej i Robinson, skriv också en motivering i kommentaren',
  type: 'default',
  mediaType: 'image',
};
const challenge20 = {
  id: 'challenge-20',
  name: 'Teddy dricker cappuccino',
  description:
    'Låtsas att du dricker en cappuccino som Teddy dricker sin  - fota!',
  type: 'default',
  mediaType: 'image',
};
const challenge21 = {
  id: 'challenge-21',
  name: 'Be om is',
  description:
    'Be om is till din dryck - likt Sara ber om is till sin dryck, fota!',
  type: 'default',
  mediaType: 'image',
};
const challenge22 = {
  id: 'challenge-22',
  name: 'Sätt på fotboll på tvn',
  description:
    'Fråga om baren kan antingen sätta på radio eller tv med fotboll, likt Rebecka hade gjort - dokumentera!',
  type: 'default',
  mediaType: 'image',
};
const challenge23 = {
  id: 'challenge-23',
  name: 'Fråga om Huel',
  description:
    'Fråga om har Huel i baren, be om något likvärdig annars, fota resultatet!',
  type: 'default',
  mediaType: 'image',
};
const challenge24 = {
  id: 'challenge-24',
  name: 'Köp en whiskey till Clara ',
  description: 'Köp en whisky till Clara - fota Clara när hon dricker den!  ',
  type: 'default',
  mediaType: 'image',
};

export const challenges1 = {
  preChallenges: [challenge3],
  countdown: [challenge1, challenge2, challenge3],
};
export const challenges2 = [challenge2, challenge3, challenge1, challenge4];

export const challengeKaffe = [challenge6, challenge7, challenge8];

export const challengesTalkative = [
  challenge1,
  challenge2,
  challenge3,
  challenge4,
  challenge5,
  challenge6,
  challenge7,
  challenge8,
  challenge9,
  challenge10,
  challenge11,
  challenge12,
  challenge13,
  challenge14,
  challenge15,
  challenge16,
  challenge17,
  challenge18,
  challenge19,
  challenge20,
  challenge21,
  challenge22,
  challenge23,
  challenge24,
];
