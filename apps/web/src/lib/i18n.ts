import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

export async function initI18n() {
  if (!i18next.isInitialized) {
    await i18next
      .use(HttpBackend)
      .use(LanguageDetector)
      .use(initReactI18next)
      .init({
        fallbackLng: 'en',
        supportedLngs: ['en'],
        ns: ['common'],
        defaultNS: 'common',
        interpolation: { escapeValue: false },
      });
  }
  return i18next;
}
