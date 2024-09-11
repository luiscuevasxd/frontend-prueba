'use client';
import React, { createContext, useState } from 'react';

export enum LanguageType {
  EN = 'en',
  ES = 'es',
}

interface LanguageContextType {
  language: LanguageType;
  changeLanguage: (type: LanguageType) => void;
}

export const LanguageContext = createContext<LanguageContextType>({
  language: LanguageType.ES,
  changeLanguage: () => null,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<LanguageType>(LanguageType.ES);

  const changeLanguage = (type: LanguageType) => {
    setLanguage(type);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
