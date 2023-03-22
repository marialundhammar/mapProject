import { createContext, useState } from 'react';
import { ContextStoreType } from '../types/index';

export const ContextStore = createContext<ContextStoreType | null>(null!);

const ContextStoreProvider = ({ children }) => {
  const [step, setStep] = useState(1);
  const [user, setUser] = useState(null);
  const [barTour, setBarTour] = useState(null);
  const [userLocation, setUserLocation] = useState({
    lat: 55.592296775105524,
    long: 13.01675573718772,
  });

  const [showModal, setShowModal] = useState(false);

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
        showModal,
        setShowModal,
      }}
    >
      {children}
    </ContextStore.Provider>
  );
};

export default ContextStoreProvider;
