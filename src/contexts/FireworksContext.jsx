import React, { createContext, useContext, useState, useCallback } from 'react';

const FireworksContext = createContext();

export const useFireworks = () => {
  const context = useContext(FireworksContext);
  if (!context) {
    throw new Error('useFireworks must be used within a FireworksProvider');
  }
  return context;
};

export const FireworksProvider = ({ children }) => {
  const [isFiring, setIsFiring] = useState(false);

  const fire = useCallback(() => {
    setIsFiring(true);
    setTimeout(() => {
      setIsFiring(false);
    }, 4000);
  }, []);

  return (
    <FireworksContext.Provider value={{ isFiring, fire }}>
      {children}
    </FireworksContext.Provider>
  );
};