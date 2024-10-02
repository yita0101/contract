import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslations from './locales/en.json';
import zhTranslations from './locales/zh.json';
import trTranslations from './locales/tr.json';
import ruTranslations from './locales/ru.json';
import ukTranslations from './locales/uk.json';
import jaTranslations from './locales/ja.json';
import koTranslations from './locales/ko.json';

const resources = {
  en: { translation: enTranslations },
  zh: { translation: zhTranslations },
  tr: { translation: trTranslations },
  ru: { translation: ruTranslations },
  uk: { translation: ukTranslations },
  ja: { translation: jaTranslations },
  ko: { translation: koTranslations },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    detection: {
      order: ['navigator', 'htmlTag', 'path', 'subdomain'],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;