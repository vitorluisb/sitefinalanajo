import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import ptBR from './locales/pt-BR.json';
import en from './locales/en.json';
import de from './locales/de.json';

const resources = {
  'pt-BR': {
    translation: ptBR,
  },
  en: {
    translation: en,
  },
  de: {
    translation: de,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'pt-BR',
    debug: false, // Desabilita debug para produção
    // lng: 'pt-BR', // Remove a força do idioma português para permitir mudança de idioma
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
    react: {
      useSuspense: false, // Desabilita suspense para evitar problemas de carregamento
    },
    keySeparator: '.', // Usa ponto como separador de chaves aninhadas
    nsSeparator: false, // Não usa separador de namespace
  });

export default i18n;