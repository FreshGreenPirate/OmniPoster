'use client';

import { I18nextProvider } from 'react-i18next';
import { useEffect, useState } from 'react';
import i18n from 'i18next';
import HttpApi from '@i18next/http-backend';
import { initReactI18next } from 'react-i18next';

let initialized = false;

function initI18n() {
  if (initialized) return;
  i18n
    .use(initReactI18next)
    .use(HttpApi)
    .init({
      fallbackLng: 'en',
      lng: 'en',
      interpolation: {
        escapeValue: false
      },
      backend: {
        loadPath: '/locales/{{lng}}/{{ns}}.json'
      }
    });
  initialized = true;
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(initialized);

  useEffect(() => {
    initI18n();
    setReady(true);
  }, []);

  if (!ready) {
    return null;
  }

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
