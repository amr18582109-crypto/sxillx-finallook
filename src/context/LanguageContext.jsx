import { createContext, useContext } from 'react';
import { useTranslation } from '../hooks/useTranslation';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const translation = useTranslation();
  return (
    <LanguageContext.Provider value={translation}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useT = () => useContext(LanguageContext);

