import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Theme = 'white' | 'dark' | 'glass';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('glass');

  useEffect(() => {
    // Add a micro-delay to ensure smooth transition
    const root = document.documentElement;

    // Force a reflow to ensure transitions are smooth
    root.style.transition = 'background-color 0.6s cubic-bezier(0.4, 0, 0.2, 1)';

    // Apply theme class
    requestAnimationFrame(() => {
      root.className = theme;
    });
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
