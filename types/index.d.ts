export type BarType = {
  lat: number;
  long: number;
  name: string;
  id?: string;
  image?: any;
  distance?: number;
  description?: string;
};

export type GroupType = {
  title: string;
};

export type BarTourTypes = {
  title: string;
  numbersOfBars: number;
  bars: BarType[];
  description?: string;
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

export type ContextStoreType = {
  step: number;
  setStep: (number) => void;
  user: { email: string; uid: number };
  setUser: (number) => void;
  currentBarTour: BarTourTypes;
  setCurrentBarTour: (object) => void;
  userLocation: CoordsType;
  setUserLocation: (CoordsType) => void;
  currentBar: BarType;
  setCurrentBar: (BarType) => void;
  events: string[];
  setEvents: (events: string[]) => void;
  setOnBar: (boolean) => void;
  onBar: boolean;
};
