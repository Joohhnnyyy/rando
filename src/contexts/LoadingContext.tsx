import React, { createContext, useContext, useState } from 'react';

const LoadingContext = createContext<{
  isLoading: boolean;
  completeLoading: () => void;
}>({
  isLoading: true,
  completeLoading: () => {},
});

export const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(() => {
    try {
      return localStorage.getItem('seedsync-loading-seen') !== 'true';
    } catch {
      return true;
    }
  });

  const completeLoading = () => {
    setIsLoading(false);
    try {
      localStorage.setItem('seedsync-loading-seen', 'true');
    } catch (error) {
      console.error('Failed to save loading state:', error);
    }
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
