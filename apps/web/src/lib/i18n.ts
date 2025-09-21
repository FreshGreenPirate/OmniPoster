import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import enCommon from "../../public/locales/en/common.json";

const resources = {
  en: {
    translation: enCommon,
  },
};

export const i18nInstance = i18next.createInstance();

if (!i18nInstance.isInitialized) {
  i18nInstance.use(initReactI18next).init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });
}
