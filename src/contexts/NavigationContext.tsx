import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface NavigationContextType {
  isCollapsed: boolean;
  toggleCollapse: () => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Start collapsed by default on mobile screens (< 768px)
  const [isCollapsed, setIsCollapsed] = useState(() => {
    return window.innerWidth < 768;
  });

  useEffect(() => {
    const handleResize = () => {
      // Auto-collapse on mobile, auto-expand on desktop
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <NavigationContext.Provider value={{ isCollapsed, toggleCollapse }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
