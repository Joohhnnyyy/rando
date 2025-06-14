
import React, { createContext, useContext, useState, useEffect } from 'react';

interface LoadingContextType {
  hasSeenLoading: boolean;
  setHasSeenLoading: (seen: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
  const [hasSeenLoading, setHasSeenLoading] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem('seedsync-loading-seen');
    if (seen) {
      setHasSeenLoading(true);
    }
  }, []);

  const updateSeenLoading = (seen: boolean) => {
    setHasSeenLoading(seen);
    if (seen) {
      localStorage.setItem('seedsync-loading-seen', 'true');
    }
  };

  return (
    <LoadingContext.Provider value={{ hasSeenLoading, setHasSeenLoading: updateSeenLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within LoadingProvider');
  }
  return context;
};
