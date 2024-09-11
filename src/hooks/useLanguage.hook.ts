import { useContext } from 'react';
import { LanguageContext } from '@context';
import dot from 'dot-object';
import { es, en } from '../language';

const languages = {
  en,
  es,
};

export const useLanguage = () => {
  const { language } = useContext(LanguageContext);

  const handleLanguage = (path: string) => {
    return dot.pick(path, languages[language]);
  };

  return handleLanguage;
};
