import { createContext, useState } from 'react';
import { ContextStoreType } from '../types/index';

export const ContextStore = createContext<ContextStoreType | null>(null!);

const ContextStoreProvider = ({ children }) => {
  const [step, setStep] = useState(1);
  const [user, setUser] = useState(null);
  const [barTour, setBarTour] = useState(null);

  return (
    <ContextStore.Provider
      value={{ step, setStep, user, setUser, barTour, setBarTour }}
    >
      {children}
    </ContextStore.Provider>
  );
};

export default ContextStoreProvider;
