import i18next from 'i18next'
import HttpApi from 'i18next-http-backend'
import { isoCountry } from 'iso-country'
import { initReactI18next } from 'react-i18next'
import * as RNLocalize from 'react-native-localize'

const locales = RNLocalize.getLocales()

export const lang = locales[0].languageCode
export const flagEmoji = isoCountry(locales[0].countryCode)?.emoji ?? '🇷🇺'

export const supportedLngs = [
  'bn',
  'en',
  'es',
  'fr',
  'hi',
  'pt',
  'ru',
  'zh',
  'mr',
  'te',
  'tr',
  'uk',
  'de',
  'ja',
  'jv',
  'ko',
  'pl',
  'ta',
  'ur',
  'vi'
]

export const isSupportedLang = supportedLngs.includes(locales[0].languageCode)
export const ruOrEnLang = locales[0].languageCode === 'ru' ? 'ru' : 'en'

i18next
  .use(HttpApi)
  .use(initReactI18next)
  .init({
    backend: {
      allowMultiLoading: false,
      loadPath: 'https://leelachakra.com/resource/999dao/locales/{{lng}}/translation.json'
    },
    compatibilityJSON: 'v3',
    supportedLngs,
    ns: ['common', 'validation', 'rules', 'plans'],
    defaultNS: 'common',
    lng: lang,
    fallbackLng: 'en',
    debug: __DEV__,
    interpolation: {
      escapeValue: true
    },
    react: {
      useSuspense: false
    }
  })

export default i18next
