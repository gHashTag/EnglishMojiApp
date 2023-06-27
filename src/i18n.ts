import i18next from 'i18next'
import { isoCountry } from 'iso-country'
import { initReactI18next } from 'react-i18next'
import * as RNLocalize from 'react-native-localize'
import bn from './locales/bn/translation.json'
import en from './locales/en/translation.json'
import es from './locales/es/translation.json'
import fr from './locales/fr/translation.json'
import hi from './locales/hi/translation.json'
import pt from './locales/pt/translation.json'
import ru from './locales/ru/translation.json'
import zh from './locales/zh/translation.json'
import mr from './locales/mr/translation.json'
import te from './locales/te/translation.json'
import tr from './locales/tr/translation.json'
import uk from './locales/uk/translation.json'
import de from './locales/de/translation.json'
import ja from './locales/ja/translation.json'
import jv from './locales/jv/translation.json'
import ko from './locales/ko/translation.json'
import pl from './locales/pl/translation.json'
import ta from './locales/ta/translation.json'
import ur from './locales/ur/translation.json'
import vi from './locales/vi/translation.json'

const locales = RNLocalize.getLocales()

if (!Array.isArray(locales) || locales.length === 0) {
  throw new Error('No locales found')
}

export const lang = locales[0]?.languageCode
if (!lang) {
  throw new Error('No language code found for first locale')
}

export const flagEmoji = isoCountry(locales[0]?.countryCode)?.emoji ?? '🇷🇺'

const resources = {
  bn: {
    translation: bn
  },
  en: {
    translation: en
  },
  es: {
    translation: es
  },
  fr: {
    translation: fr
  },
  hi: {
    translation: hi
  },
  pt: {
    translation: pt
  },
  ru: {
    translation: ru
  },
  zh: {
    translation: zh
  },
  mr: {
    translation: mr
  },
  te: {
    translation: te
  },
  tr: {
    translation: tr
  },
  uk: {
    translation: uk
  },
  de: {
    translation: de
  },
  ja: {
    translation: ja
  },
  jv: {
    translation: jv
  },
  ko: {
    translation: ko
  },
  pl: {
    translation: pl
  },
  ta: {
    translation: ta
  },
  ur: {
    translation: ur
  },
  vi: {
    translation: vi
  }
}

for (const [key, value] of Object.entries(resources)) {
  if (typeof value !== 'object' || value === null) {
    throw new Error(`Invalid locale data for language ${key}`)
  }
}

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

export const isSupportedLang = supportedLngs.includes(lang)
export const ruOrEnLang = lang === 'ru' ? 'ru' : 'en'

i18next.use(initReactI18next).init(
  {
    compatibilityJSON: 'v3', //To make it work for Android devices, add this line.
    resources,
    lng: isSupportedLang ? lang : ruOrEnLang,
    debug: __DEV__,
    interpolation: {
      escapeValue: true
    },
    react: {
      useSuspense: false
    }
  },
  err => {
    if (err) {
      console.error('Error initializing i18next:', err)
    }
  }
)
