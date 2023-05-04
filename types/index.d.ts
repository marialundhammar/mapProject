export type BarType = {
  lat: number;
  long: number;
  name: string;
  id?: string;
  image?: any;
  distance?: number;
  description?: string;
  challenges?: number;
  text?: string;
};

export type GroupType = {
  title: string;
};

export type BarTourTypes = {
  title: string;
  numbersOfBars: number;
  bars: BarType[];
  description?: string;
  trofee?: any;
  area: string;
};

interface CalculateDistanceFunctionType {
  lat1: number;
  lon1: number;
  lat2: number;
  lon2: number;
}

interface CoordsType {
  lat: number;
  long: number;
}

interface CurrentChallengeType {
  id: string;
  name: string;
  description: string;
  type: string;
  mediaType: string;
}

const enum Page {
  Profile,
  Rounds,
  Trofees,
}

interface PageType {
  profile: string;
  rounds: string;
  trofees: string;
}

interface ProfileImageType {
  title: string;
  profileImages: any;
}

export type ContextStoreType = {
  step: number;
  setStep: (number) => void;
  user: { email: string; uid: number; profileImage: string };
  setUser: (number) => void;
  currentBarTour: BarTourTypes;
  setCurrentBarTour: (object) => void;
  userLocation: CoordsType;
  setUserLocation: (CoordsType) => void;
  currentBar: BarType;
  setCurrentBar: (BarType) => void;
  setOnBar: (boolean) => void;
  onBar: boolean;
  currentChallenge: CurrentChallengeType;
  setCurrentChallenge: (CurrentChallengeType) => void;
  completedChallenges: CurrentChallengeType[];
  setCompletedChallenges: (challenges: CurrentChallengeType[]) => void;
  finishedTour: boolean;
  setFinishedTour: (boolean) => void;
  pageProfile: string;
  setPageProfile: (string) => void;
  onProfile: boolean;
  setOnProfile: (boolean) => void;
  onHome: boolean;
  setOnHome: (boolean) => void;
  pageHandler: string;
  setPageHandler: (string) => void;
  roundStarted: boolean;
  setRoundIsStarted: (boolean) => void;
  visitedBars: BarType[];
  setVisitedBars: (visitedBars: BarType[]) => void;
};
