import { createContext, useState } from 'react';
import { ContextStoreType } from '../types/index';

export const ContextStore = createContext<ContextStoreType | null>(null!);

const ContextStoreProvider = ({ children }) => {
  const [step, setStep] = useState(1);
  const [user, setUser] = useState(null);
  const [barTour, setBarTour] = useState(null);
  const [userLocation, setUserLocation] = useState({
    lat: 55.595,
    long: 13.0099,
  });

  return (
    <ContextStore.Provider
      value={{
        step,
        setStep,
        user,
        setUser,
        barTour,
        setBarTour,
        userLocation,
        setUserLocation,
      }}
    >
      {children}
    </ContextStore.Provider>
  );
};

export default ContextStoreProvider;
