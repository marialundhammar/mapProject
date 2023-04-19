import { createContext, useState } from 'react';
import { arrayOfBarTours } from '../configs/barTours';
import { ContextStoreType } from '../types/index';

export const ContextStore = createContext<ContextStoreType | null>(null!);

const ContextStoreProvider = ({ children }) => {
  const [step, setStep] = useState(1);
  const [user, setUser] = useState(null);
  const [currentBarTour, setCurrentBarTour] = useState(arrayOfBarTours[1]);
  const [onBar, setOnBar] = useState(true);
  const [userLocation, setUserLocation] = useState({
    lat: 55.592296775105524,
    long: 13.01675573718772,
  });

  const [currentChallenge, setCurrentChallenge] = useState({
    id: '',
    name: '',
    description: '',
    type: '',
    mediaType: '',
  });

  const [currentBar, setCurrentBar] = useState(null);
  const [completedChallenges, setCompletedChallenges] = useState([]);

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
        setOnBar,
        onBar,
        currentChallenge,
        setCurrentChallenge,
        completedChallenges,
        setCompletedChallenges,
      }}
    >
      {children}
    </ContextStore.Provider>
  );
};

export default ContextStoreProvider;
