import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslations from './locales/en.json';
import zhTranslations from './locales/zh.json';
import trTranslations from './locales/tr.json';
import ruTranslations from './locales/ru.json';
import ukTranslations from './locales/uk.json';
import jaTranslations from './locales/ja.json';
import koTranslations from './locales/ko.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      zh: { translation: zhTranslations },
      tr: { translation: trTranslations },
      ru: { translation: ruTranslations },
      uk: { translation: ukTranslations },
      ja: { translation: jaTranslations },
      ko: { translation: koTranslations },
    },
    lng: 'zh', // 默认语言
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;