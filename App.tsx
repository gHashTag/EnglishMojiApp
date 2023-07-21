import React from 'react'
import { LogBox } from 'react-native'
import './src/i18n'
import { AppWithProviders } from './src/AppWithProviders'
import * as Sentry from '@sentry/react-native'

LogBox.ignoreLogs([
  'ViewPropTypes will be removed from React Native',
  'Cannot record touch end without a touch start.'
])

Sentry.init({
  dsn: 'https://11b2332955ba4e05858786b2d38816b8@o749286.ingest.sentry.io/4505561170771968',
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // We recommend adjusting this value in production.
  tracesSampleRate: 1.0,
  enabled: process.env.NODE_ENV !== 'development'
})

function App() {
  // throw new Error('My first Sentry error!')
  return <AppWithProviders />
}

export default Sentry.wrap(App)
