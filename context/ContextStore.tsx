import { createContext, useState } from 'react';
import { ContextStoreType } from '../types/index';

export const ContextStore = createContext<ContextStoreType | null>(null!);

const ContextStoreProvider = ({ children }) => {
  const [step, setStep] = useState(1);
  const [user, setUser] = useState(null);
  const [currentBarTour, setCurrentBarTour] = useState(null);
  const [userLocation, setUserLocation] = useState({
    lat: 55.592296775105524,
    long: 13.01675573718772,
  });

  const [currentBar, setCurrentBar] = useState({
    lat: 0,
    long: 0,
    name: '',
    distance: 0,
    description: '',
  });

  const [events, setEvents] = useState([
    'test',
    'test',
    'test',
    'test',
    'test',
  ]);

  return (
    <ContextStore.Provider
      value={{
        step,
        setStep,
        user,
        setUser,
        currentBarTour,
        setCurrentBarTour,
        userLocation,
        setUserLocation,
        currentBar,
        setCurrentBar,
        events,
        setEvents,
      }}
    >
      {children}
    </ContextStore.Provider>
  );
};

export default ContextStoreProvider;
