export type BarType = {
  lat: number;
  long: number;
  name: string;
  id: string;
  image?: any;
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
};
