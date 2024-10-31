// i18n.js

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import common_en from "./public/locales/en/common.json";
import common_pt from "./public/locales/pt/common.json";
import common_es from "./public/locales/es/common.json";

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  resources: {
    en: {
      common: common_en,
    },
    pt: {
      common: common_pt,
    },
    es: {
      common: common_es,
    },
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
