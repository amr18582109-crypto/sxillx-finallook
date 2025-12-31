# Dark Mode Implementation Guide

## Overview

SkillX now features a comprehensive dark mode system with consistent theming across all components. The implementation uses CSS custom properties (variables) for seamless theme switching.

## Architecture

### 1. CSS Variables System

**Location**: `src/styles/designTokens.css`

The theme system uses CSS custom properties that automatically switch when the `.dark` class is applied:

```css
/* Light Mode (default) */
:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;
  --bg-tertiary: #f1f5f9;
  --text-primary: #1e293b;
  --text-secondary: #64748b;
  --text-tertiary: #94a3b8;
  /* ... more variables */
}

/* Dark Mode Override */
.dark {
  --bg-primary: #0f172a;        /* Very dark blue-gray */
  --bg-secondary: #1e293b;      /* Dark slate */
  --bg-tertiary: #334155;       /* Medium slate */
  --text-primary: #f1f5f9;      /* Light gray */
  --text-secondary: #cbd5e1;    /* Medium gray */
  --text-tertiary: #94a3b8;     /* Darker gray */
  /* ... more variables */
}
```

### 2. Theme Manager

**Location**: `src/utils/themeManager.js`

Centralized theme management with utilities:

- `applyTheme(theme)` - Apply 'light' or 'dark' theme
- `getCurrentTheme()` - Get current theme
- `toggleTheme()` - Toggle between themes
- `initializeTheme()` - Initialize theme on app load
- `isDarkMode()` - Check if dark mode is active

### 3. React Hook

**Location**: `src/hooks/useTheme.js`

React hook for component-level theme management:

```javascript
import { useTheme } from '../hooks/useTheme';

const MyComponent = () => {
  const { theme, isDark, toggle, setTheme } = useTheme();
  
  return (
    <div style={{ background: 'var(--bg-primary)' }}>
      <button onClick={toggle}>
        Switch to {isDark ? 'light' : 'dark'} mode
      </button>
    </div>
  );
};
```

## Usage Guide

### Applying Theme-Aware Styles

#### Method 1: Inline Styles (Recommended)

```javascript
<div style={{
  background: 'var(--bg-primary)',
  color: 'var(--text-primary)',
  border: '1px solid var(--border-light)',
  borderRadius: 'var(--radius-lg)',
  boxShadow: 'var(--shadow-md)'
}}>
  Content
</div>
```

#### Method 2: Using Theme Utilities

```javascript
import { themePresets } from '../utils/themeManager';

<div style={themePresets.card}>
  Card content
</div>
```

#### Method 3: CSS Classes

```css
.my-component {
  background: var(--bg-primary);
  color: var(--text-primary);
  border: 1px solid var(--border-light);
}
```

### Available Variables

#### Backgrounds
- `--bg-primary` - Main background (white/dark slate)
- `--bg-secondary` - Secondary background (light gray/darker slate)
- `--bg-tertiary` - Tertiary background (gray/medium slate)
- `--bg-elevated` - Elevated surfaces
- `--bg-overlay` - Modal overlays
- `--bg-glass` - Glass morphism backgrounds

#### Text Colors
- `--text-primary` - Primary text (dark gray/light gray)
- `--text-secondary` - Secondary text (medium gray)
- `--text-tertiary` - Tertiary text (light gray/darker gray)
- `--text-muted` - Muted text
- `--text-disabled` - Disabled text
- `--text-inverse` - Inverse text (for dark backgrounds)

#### Borders
- `--border-light` - Light borders
- `--border-medium` - Medium borders
- `--border-dark` - Dark borders
- `--border-focus` - Focus borders

#### Shadows
- `--shadow-xs` to `--shadow-2xl` - Various shadow intensities
- `--shadow-primary` - Themed primary shadow
- `--shadow-success` - Success shadow
- `--shadow-warning` - Warning shadow
- `--shadow-danger` - Danger shadow

#### Component-Specific
- `--card-bg` - Card background
- `--card-shadow` - Card shadow
- `--input-bg` - Input background
- `--input-border` - Input border
- `--modal-bg` - Modal background
- `--modal-backdrop` - Modal backdrop

## Theme Switching Implementation

### Settings Component

The theme toggle is implemented in `src/components/shared/Settings.jsx`:

```javascript
const updateSetting = (key, value) => {
  const updated = { ...settings, [key]: value };
  setSettings(updated);
  saveToStorage('settings', updated);
  // Theme switching is handled by useEffect
};

useEffect(() => {
  applyTheme(settings.theme);
}, [settings.theme]);
```

### Automatic Theme Detection

The system automatically:
1. Detects system preference (`prefers-color-scheme`)
2. Falls back to light mode if no preference
3. Respects user's manual selection
4. Persists selection in localStorage

## Component Updates

### Updated Components

All major components have been updated to use the new theming system:

1. **JobsList & JobCard** - Complete dark mode support
2. **ApplyModal** - Themed inputs and overlays
3. **Settings** - All sections and controls themed
4. **Hero & Footer** - Landing page theming
5. **Navbar** - Consistent navigation theming
6. **App** - Main background theming

### Migration Pattern

When updating components to support dark mode:

1. **Replace hardcoded colors**:
   ```javascript
   // Before
   backgroundColor: '#ffffff',
   color: '#1e293b'
   
   // After
   backgroundColor: 'var(--bg-primary)',
   color: 'var(--text-primary)'
   ```

2. **Use semantic variables**:
   ```javascript
   // Instead of specific colors
   borderColor: '#e2e8f0'
   
   // Use semantic variables
   borderColor: 'var(--border-light)'
   ```

3. **Add hover states**:
   ```javascript
   onMouseEnter={(e) => {
     e.target.style.background = 'var(--bg-tertiary)';
   }}
   onMouseLeave={(e) => {
     e.target.style.background = 'var(--bg-primary)';
   }}
   ```

## Testing

### Manual Testing Checklist

- [ ] Theme toggle works in Settings
- [ ] All components switch themes properly
- [ ] Text is readable in both themes
- [ ] Borders and shadows are visible
- [ ] Hover states work in both themes
- [ ] Modal overlays are properly themed
- [ ] Form inputs are themed correctly
- [ ] Theme preference persists across sessions

### Automated Testing

```javascript
import { isDarkMode, getCurrentTheme } from '../utils/themeManager';

test('theme switching', () => {
  expect(isDarkMode()).toBe(false);
  
  toggleTheme();
  expect(isDarkMode()).toBe(true);
  expect(getCurrentTheme()).toBe('dark');
});
```

## Best Practices

1. **Always use CSS variables** for colors, backgrounds, borders
2. **Test in both themes** when making UI changes
3. **Use semantic variables** (primary, secondary, tertiary)
4. **Provide hover states** for interactive elements
5. **Maintain contrast ratios** in both themes
6. **Use the theme hook** for component-level theme needs

## Troubleshooting

### Common Issues

1. **Theme not applying**: Check if `.dark` class is on `html` and `body`
2. **Colors not switching**: Verify CSS variable usage
3. **Contrast issues**: Ensure proper variable selection
4. **LocalStorage errors**: Theme gracefully degrades

### Debug Tools

```javascript
// Check current theme
console.log('Current theme:', getCurrentTheme());
console.log('Is dark mode:', isDarkMode());

// Check CSS variables
console.log('Primary background:', getCSSVariable('bg-primary'));
console.log('Primary text:', getCSSVariable('text-primary'));
```

## Future Enhancements

1. **System theme detection** - Already implemented
2. **Theme transition animations** - Smooth transitions included
3. **Custom themes** - Extensible for future themes
4. **Theme-aware components** - Built-in theme support
5. **Accessibility improvements** - High contrast mode support

## Files Modified

- `src/styles/designTokens.css` - CSS variables
- `src/utils/themeManager.js` - Theme management utilities
- `src/hooks/useTheme.js` - React hook
- `src/App.jsx` - Theme initialization
- `src/components/shared/Settings.jsx` - Theme toggle
- Multiple component files - Theme-aware styling

This implementation provides a robust, maintainable, and extensible dark mode system for the SkillX application.
