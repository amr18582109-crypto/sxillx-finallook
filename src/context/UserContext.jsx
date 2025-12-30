import { createContext, useContext, useState, useEffect } from 'react';
import { getFromStorage, saveToStorage } from '../utils/storage';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load user from localStorage on mount
    const savedUser = getFromStorage('currentUser');
    if (savedUser) {
      setUser(savedUser);
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    saveToStorage('currentUser', userData);
  };

  const logout = () => {
    setUser(null);
    saveToStorage('currentUser', null);
    // Ensure theme is reset to light on logout and remove dark class from document
    try {
      const settings = getFromStorage('settings') || {};
      const updatedSettings = { ...settings, theme: 'light' };
      saveToStorage('settings', updatedSettings);
    } catch (err) {
      // ignore storage errors
    }
    if (typeof document !== 'undefined') {
      document.body.classList.remove('dark');
      document.documentElement.classList.remove('dark');
    }
  };

  const updateUser = (updates) => {
    const updated = { ...user, ...updates };
    setUser(updated);
    saveToStorage('currentUser', updated);
  };

  const value = {
    user,
    login,
    logout,
    updateUser,
    loading,
    isAuthenticated: !!user,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};


