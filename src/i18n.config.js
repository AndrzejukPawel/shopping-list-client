import i18n from 'i18next';

i18n.init({
  compatibilityJSON: 'v3',
  fallbackLng: 'en',
  lng: 'en',
  resources: {
    en: {
      translations: require('../locales/en/translations.json')
    },
    es: {
      translations: require('../locales/pl/translations.json')
    }
  },
  ns: ['translations'],
  defaultNS: 'translations',
  initImmediate: false,
  globalInjection: true,
});

i18n.languages = ['en', 'pl'];

export default i18n;
