import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector, useStore } from 'react-redux'
import { profileReducer, tabBarReducer } from './slices'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'

const profileConfig = {
  key: 'profile',
  version: 1,
  storage: AsyncStorage
}

let middlewareArray = getDefaultMiddleware({
  serializableCheck: {
    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
  }
})

if (__DEV__) {
  const createFlipperDebugger = require('redux-flipper').default
  middlewareArray.push(createFlipperDebugger())
}

const persistedProfileReducer = persistReducer(profileConfig, profileReducer)

export const store = configureStore({
  reducer: {
    profile: persistedProfileReducer,
    tabBar: tabBarReducer
  },
  middleware: middlewareArray
})

export let persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// typed hooks
export const useTypedDispatch = () => useDispatch<AppDispatch>()
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
export const useTypedStore = () => useStore<RootState>()
