/**
 * Theme Utilities for consistent dark/light mode styling
 */

/**
 * Get themed style object for common properties
 * @param {Object} options - Configuration options
 * @returns {Object} Style object with CSS variables
 */
export const getThemedStyles = (options = {}) => {
  const {
    background = 'primary',
    text = 'primary',
    border = 'light',
    shadow = 'md'
  } = options;

  return {
    background: `var(--bg-${background})`,
    color: `var(--text-${text})`,
    borderColor: `var(--border-${border})`,
    boxShadow: `var(--shadow-${shadow})`
  };
};

/**
 * Get themed background style
 * @param {string} variant - Background variant (primary, secondary, tertiary, elevated)
 * @returns {Object} Style object
 */
export const getBackground = (variant = 'primary') => ({
  background: `var(--bg-${variant})`
});

/**
 * Get themed text style
 * @param {string} variant - Text variant (primary, secondary, tertiary, muted, disabled)
 * @returns {Object} Style object
 */
export const getText = (variant = 'primary') => ({
  color: `var(--text-${variant})`
});

/**
 * Get themed border style
 * @param {string} variant - Border variant (light, medium, dark, focus)
 * @returns {Object} Style object
 */
export const getBorder = (variant = 'light') => ({
  borderColor: `var(--border-${variant})`
});

/**
 * Get themed shadow style
 * @param {string} variant - Shadow variant (xs, sm, md, lg, xl)
 * @returns {Object} Style object
 */
export const getShadow = (variant = 'md') => ({
  boxShadow: `var(--shadow-${variant})`
});

/**
 * Get complete themed card style
 * @param {Object} options - Card styling options
 * @returns {Object} Complete style object for cards
 */
export const getCardStyle = (options = {}) => {
  const {
    background = 'primary',
    border = 'light',
    shadow = 'md',
    radius = 'lg'
  } = options;

  return {
    background: `var(--bg-${background})`,
    border: `1px solid var(--border-${border})`,
    borderRadius: `var(--radius-${radius})`,
    boxShadow: `var(--shadow-${shadow})`
  };
};

/**
 * Get themed modal style
 * @returns {Object} Style object for modals
 */
export const getModalStyle = () => ({
  background: `var(--bg-overlay)`
});

/**
 * Get themed modal content style
 * @returns {Object} Style object for modal content
 */
export const getModalContentStyle = () => ({
  background: `var(--bg-glass)`,
  backdropFilter: 'blur(10px)',
  border: `1px solid var(--border-light)`,
  borderRadius: `var(--radius-xl)`,
  boxShadow: `var(--shadow-lg)`
});

/**
 * Get themed input style
 * @param {Object} options - Input styling options
 * @returns {Object} Style object for inputs
 */
export const getInputStyle = (options = {}) => {
  const {
    background = 'primary',
    border = 'light',
    text = 'primary'
  } = options;

  return {
    background: `var(--bg-${background})`,
    color: `var(--text-${text})`,
    border: `2px solid var(--border-${border})`,
    borderRadius: `var(--radius-lg)`
  };
};

/**
 * Get themed button style for primary buttons
 * @returns {Object} Style object for primary buttons
 */
export const getPrimaryButtonStyle = () => ({
  background: `var(--gradient-primary)`,
  color: `var(--text-inverse)`,
  boxShadow: `var(--shadow-primary)`
});

/**
 * Get themed button style for secondary buttons
 * @returns {Object} Style object for secondary buttons
 */
export const getSecondaryButtonStyle = () => ({
  background: `var(--bg-tertiary)`,
  color: `var(--text-primary)`,
  border: `2px solid var(--border-light)`
});

/**
 * Apply theme-aware hover effects
 * @param {HTMLElement} element - Element to apply hover to
 * @param {Object} hoverStyles - Styles to apply on hover
 */
export const applyThemeHover = (element, hoverStyles = {}) => {
  if (!element) return;

  element.addEventListener('mouseenter', () => {
    Object.assign(element.style, hoverStyles);
  });

  element.addEventListener('mouseleave', () => {
    // Reset to original styles (you may want to store original styles)
    Object.keys(hoverStyles).forEach(prop => {
      element.style[prop] = '';
    });
  });
};

/**
 * Check if dark mode is currently active
 * @returns {boolean} True if dark mode is active
 */
export const isDarkMode = () => {
  return document.documentElement.classList.contains('dark') || 
         document.body.classList.contains('dark');
};

/**
 * Get current theme
 * @returns {string} 'dark' or 'light'
 */
export const getCurrentTheme = () => {
  return isDarkMode() ? 'dark' : 'light';
};

/**
 * Common themed styles for frequently used patterns
 */
export const commonStyles = {
  // Page backgrounds
  pageBackground: getBackground('secondary'),
  
  // Card styles
  card: getCardStyle(),
  cardElevated: getCardStyle({ shadow: 'lg' }),
  
  // Text styles
  primaryText: getText('primary'),
  secondaryText: getText('secondary'),
  mutedText: getText('tertiary'),
  
  // Input styles
  input: getInputStyle(),
  
  // Button styles
  primaryButton: getPrimaryButtonStyle(),
  secondaryButton: getSecondaryButtonStyle(),
  
  // Modal styles
  modalOverlay: getModalStyle(),
  modalContent: getModalContentStyle()
};

export default {
  getThemedStyles,
  getBackground,
  getText,
  getBorder,
  getShadow,
  getCardStyle,
  getModalStyle,
  getModalContentStyle,
  getInputStyle,
  getPrimaryButtonStyle,
  getSecondaryButtonStyle,
  applyThemeHover,
  isDarkMode,
  getCurrentTheme,
  commonStyles
};
