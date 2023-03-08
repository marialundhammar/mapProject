import { createContext, useState } from 'react';
import { ContextStoreType } from '../types/index';

export const ContextStore = createContext<ContextStoreType | null>(null!);

const ContextStoreProvider = ({ children }) => {
  const [step, setStep] = useState(1);
  const [user, setUser] = useState(null);

  return (
    <ContextStore.Provider value={{ step, setStep, user, setUser }}>
      {children}
    </ContextStore.Provider>
  );
};

export default ContextStoreProvider;
