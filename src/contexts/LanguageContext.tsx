
import React, { createContext, useContext, useState, useEffect } from 'react';

interface LanguageContextType {
  language: 'en' | 'te';
  toggleLanguage: () => void;
  t: (key: string, translations: any) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'te'>(() => {
    // Get saved language from localStorage or default to 'en'
    const savedLanguage = localStorage.getItem('preferred-language');
    return (savedLanguage === 'te' || savedLanguage === 'en') ? savedLanguage : 'en';
  });

  // Save language preference to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('preferred-language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'te' : 'en');
  };

  // Helper function to get translated text with proper typing
  const t = (key: string, translations: any): string => {
    const keys = key.split('.');
    let value: any = translations;
    
    // Navigate through the nested object
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key; // Return the key itself if translation not found
      }
    }
    
    // Check if the final value has the expected language structure
    if (value && typeof value === 'object' && 'en' in value && 'te' in value) {
      return language === 'te' ? value.te : value.en;
    }
    
    // If it's a direct string value, return it
    if (typeof value === 'string') {
      return value;
    }
    
    console.warn(`Invalid translation structure for key: ${key}`);
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
