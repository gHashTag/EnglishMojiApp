import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import detector from 'detect-browser-language'

// Загрузка переводов
import en from './locales/en/translation.json'
import ru from './locales/ru/translation.json'
import bn from './locales/bn/translation.json'
import de from './locales/de/translation.json'
import es from './locales/es/translation.json'
import fr from './locales/fr/translation.json'
import hi from './locales/hi/translation.json'
import ja from './locales/ja/translation.json'
import jv from './locales/jv/translation.json'
import ko from './locales/ko/translation.json'
import mr from './locales/mr/translation.json'
import pl from './locales/pl/translation.json'
import pt from './locales/pt/translation.json'
import ta from './locales/ta/translation.json'
import te from './locales/te/translation.json'
import tr from './locales/tr/translation.json'
import uk from './locales/uk/translation.json'
import vi from './locales/vi/translation.json'
import zh from './locales/zh/translation.json'

const resources = {
  en: {
    translation: en
  },
  ru: {
    translation: ru
  },
  bn: {
    translation: bn
  },
  de: {
    translation: de
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
  ja: {
    translation: ja
  },
  jv: {
    translation: jv
  },
  ko: {
    translation: ko
  },
  mr: {
    translation: mr
  },
  pl: {
    translation: pl
  },
  pt: {
    translation: pt
  },
  ta: {
    translation: ta
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
  vi: {
    translation: vi
  },
  zh: {
    translation: zh
  }
}

const defaultLanguage = 'en' // язык по умолчанию

// Определение системного языка
const browserLanguage = detector.detect()

i18n.use(initReactI18next).init({
  resources,
  lng: browserLanguage || defaultLanguage, // язык по умолчанию
  fallbackLng: 'en', // резервный язык
  interpolation: {
    escapeValue: false // не экранировать HTML-теги
  }
})

export default i18n
