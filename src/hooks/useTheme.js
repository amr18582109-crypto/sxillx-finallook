import { useState, useEffect } from 'react';
import { applyTheme, getCurrentTheme, toggleTheme, watchThemeChanges } from '../utils/themeManager';

/**
 * Theme Hook for React components
 * Provides theme state and toggle functionality
 */
export const useTheme = () => {
  const [theme, setTheme] = useState(getCurrentTheme());

  useEffect(() => {
    // Initialize theme on mount
    setTheme(getCurrentTheme());
    
    // Watch for theme changes
    const cleanup = watchThemeChanges((newTheme) => {
      setTheme(newTheme);
    });
    
    return cleanup;
  }, []);

  const toggle = () => {
    const newTheme = toggleTheme();
    setTheme(newTheme);
    return newTheme;
  };

  const setThemeMode = (newTheme) => {
    applyTheme(newTheme);
    setTheme(newTheme);
  };

  return {
    theme,
    isDark: theme === 'dark',
    isLight: theme === 'light',
    toggle,
    setTheme: setThemeMode
  };
};

export default useTheme;
