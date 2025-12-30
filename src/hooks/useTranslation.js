import { useState, useEffect } from 'react';
import { translations } from '../utils/translations';
import { getFromStorage, saveToStorage } from '../utils/storage';

// Language switching disabled: app will always use English (ltr)
export function useTranslation() {
  const [language] = useState('en');

  useEffect(() => {
    // Force LTR and English language regardless of stored settings
    if (typeof document !== 'undefined') {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = 'en';
    }
    // Persist settings.language as 'en' to avoid legacy RTL flags
    try {
      const settings = getFromStorage('settings') || {};
      if (settings.language !== 'en') {
        saveToStorage('settings', { ...settings, language: 'en' });
      }
    } catch (e) {
      // ignore storage errors
    }
  }, []);

  const t = (key) => {
    return translations['en']?.[key] || key;
  };

  // No-op functions to prevent language changes
  const toggleLanguage = () => {};
  const setLanguage = () => {};

  return { t, language: 'en', toggleLanguage, setLanguage };
}

