import React, { useState } from 'react';
import { Sun, Moon, Sparkles } from 'lucide-react';
import { useTheme, Theme } from '../contexts/ThemeContext';

const ThemeSelector: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  const themes: { value: Theme; icon: React.ReactNode; label: string }[] = [
    { value: 'white', icon: <Sun className="w-4 h-4" />, label: 'Light' },
    { value: 'dark', icon: <Moon className="w-4 h-4" />, label: 'Dark' },
    { value: 'glass', icon: <Sparkles className="w-4 h-4" />, label: 'Glass' },
  ];

  const currentTheme = themes.find((t) => t.value === theme);

  return (
    <div
      className="fixed top-4 right-4 md:top-12 md:right-28 z-50 flex gap-2 p-2 rounded-full border border-border bg-background/80 backdrop-blur-md shadow-lg transition-all duration-300"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {isExpanded ? (
        themes.map((t) => (
          <button
            key={t.value}
            onClick={() => setTheme(t.value)}
            className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all ${
              theme === t.value
                ? 'bg-accent text-accent-foreground'
                : 'text-muted-foreground hover:text-accent hover:bg-accent/10'
            }`}
            title={t.label}
          >
            {t.icon}
            {theme === t.value && <span className="text-sm font-medium">{t.label}</span>}
          </button>
        ))
      ) : (
        <button
          className="px-4 py-2 rounded-full flex items-center gap-2 bg-accent text-accent-foreground"
          title={currentTheme?.label}
        >
          {currentTheme?.icon}
        </button>
      )}
    </div>
  );
};

export default ThemeSelector;
