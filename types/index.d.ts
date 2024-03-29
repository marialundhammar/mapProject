export type BarType = {
  lat: number;
  long: number;
  name: string;
  id: string;
  image?: any;
};

export type GroupType = {
  title: string;
};

export type BarTourTypes = {
  title: string;
  numbersOfBars: number;
  bars: BarType[];
};

interface CalculateDistanceFunctionType {
  lat1: number;
  lon1: number;
  lat2: number;
  lon2: number;
}

export type ContextStoreType = {
  step: number;
  setStep: (number) => void;
  user: { email: string; uid: number };
  setUser: (number) => void;
  barTour: BarTourTypes;
  setBarTour: (object) => void;
};
