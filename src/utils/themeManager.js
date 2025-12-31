/**
 * Centralized Theme Manager
 * Handles dark/light mode switching and ensures consistent application
 */

/**
 * Apply theme to the document
 * @param {string} theme - 'light' or 'dark'
 */
export const applyTheme = (theme) => {
  const root = document.documentElement;
  const body = document.body;
  
  // Remove existing theme classes
  root.classList.remove('light', 'dark');
  body.classList.remove('light', 'dark');
  
  // Apply new theme
  if (theme === 'dark') {
    root.classList.add('dark');
    body.classList.add('dark');
  } else {
    root.classList.add('light');
    body.classList.add('light');
  }
  
  // Store preference
  try {
    localStorage.setItem('theme', theme);
  } catch (error) {
    console.warn('Could not save theme preference:', error);
  }
  
  // Dispatch custom event for theme change
  window.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
};

/**
 * Get current theme from localStorage or system preference
 * @returns {string} 'light' or 'dark'
 */
export const getCurrentTheme = () => {
  // Check localStorage first
  try {
    const stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
  } catch (error) {
    console.warn('Could not read theme preference:', error);
  }
  
  // Fall back to system preference
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  
  return 'light';
};

/**
 * Initialize theme on app load
 */
export const initializeTheme = () => {
  const theme = getCurrentTheme();
  applyTheme(theme);
  
  // Listen for system theme changes
  if (window.matchMedia) {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', (e) => {
      // Only change if user hasn't explicitly set a preference
      try {
        if (!localStorage.getItem('theme')) {
          applyTheme(e.matches ? 'dark' : 'light');
        }
      } catch (error) {
        console.warn('Could not check theme preference:', error);
      }
    });
  }
};

/**
 * Toggle between light and dark themes
 * @returns {string} The new theme ('light' or 'dark')
 */
export const toggleTheme = () => {
  const currentTheme = getCurrentTheme();
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(newTheme);
  return newTheme;
};

/**
 * Check if dark mode is currently active
 * @returns {boolean}
 */
export const isDarkMode = () => {
  return getCurrentTheme() === 'dark';
};

/**
 * Get theme-aware CSS variable value
 * @param {string} variable - CSS variable name (without --)
 * @returns {string} CSS value
 */
export const getCSSVariable = (variable) => {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(`--${variable}`)
    .trim();
};

/**
 * Watch for theme changes
 * @param {Function} callback - Function to call when theme changes
 * @returns {Function} Cleanup function
 */
export const watchThemeChanges = (callback) => {
  const handleThemeChange = (event) => {
    callback(event.detail.theme);
  };
  
  window.addEventListener('themechange', handleThemeChange);
  
  // Return cleanup function
  return () => {
    window.removeEventListener('themechange', handleThemeChange);
  };
};

/**
 * Theme-aware styles object generator
 * @param {Object} styles - Styles with CSS variables
 * @returns {Object} Processed styles object
 */
export const getThemedStyles = (styles = {}) => {
  const processed = {};
  
  Object.keys(styles).forEach(key => {
    const value = styles[key];
    if (typeof value === 'string' && value.startsWith('var(--')) {
      processed[key] = value;
    } else {
      processed[key] = value;
    }
  });
  
  return processed;
};

/**
 * Common themed style presets
 */
export const themePresets = {
  card: {
    background: 'var(--bg-primary)',
    color: 'var(--text-primary)',
    border: '1px solid var(--border-light)',
    borderRadius: 'var(--radius-lg)',
    boxShadow: 'var(--shadow-md)'
  },
  
  input: {
    background: 'var(--input-bg, var(--bg-primary))',
    color: 'var(--text-primary)',
    border: '2px solid var(--input-border, var(--border-light))',
    borderRadius: 'var(--radius-lg)'
  },
  
  modal: {
    background: 'var(--modal-bg, var(--bg-primary))',
    backdropFilter: 'blur(10px)',
    border: '1px solid var(--border-light)',
    borderRadius: 'var(--radius-xl)',
    boxShadow: 'var(--shadow-lg)'
  },
  
  modalOverlay: {
    background: 'var(--modal-backdrop, var(--bg-overlay))'
  },
  
  text: {
    primary: { color: 'var(--text-primary)' },
    secondary: { color: 'var(--text-secondary)' },
    tertiary: { color: 'var(--text-tertiary)' },
    muted: { color: 'var(--text-muted)' }
  },
  
  background: {
    primary: { background: 'var(--bg-primary)' },
    secondary: { background: 'var(--bg-secondary)' },
    tertiary: { background: 'var(--bg-tertiary)' },
    elevated: { background: 'var(--bg-elevated)' }
  }
};

// Auto-initialize theme when module loads
initializeTheme();

export default {
  applyTheme,
  getCurrentTheme,
  initializeTheme,
  toggleTheme,
  isDarkMode,
  getCSSVariable,
  watchThemeChanges,
  getThemedStyles,
  themePresets
};
