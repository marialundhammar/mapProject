import { createContext, useState } from 'react';
import { ContextStoreType } from '../types/index';

export const ContextStore = createContext<ContextStoreType | null>(null!);

const ContextStoreProvider = ({ children }) => {
  const [step, setStep] = useState(1);

  return (
    <ContextStore.Provider value={{ step, setStep }}>
      {children}
    </ContextStore.Provider>
  );
};

export default ContextStoreProvider;
