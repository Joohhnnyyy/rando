import React, { createContext, useContext, useState, useEffect } from 'react';

const LoadingContext = createContext<{
  isLoading: boolean;
  completeLoading: () => void;
}>({
  isLoading: true,
  completeLoading: () => {},
});

export const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if this is the first visit
    const hasVisited = localStorage.getItem('seedsync-first-visit');
    if (!hasVisited) {
      setIsLoading(true);
      localStorage.setItem('seedsync-first-visit', 'true');
    } else {
      setIsLoading(false);
    }
  }, []);

  const completeLoading = () => {
    setIsLoading(false);
  };

  return (
    <LoadingContext.Provider value={{ isLoading, completeLoading }}>
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
