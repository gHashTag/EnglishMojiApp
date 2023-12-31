import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ThemeT } from '../types/LessonTypes'
import { captureException } from '@sentry/react-native'

const initialState: initT = {
  passed: {
    alphabet: [false],
    numbers: [false],
    food: [false],
    animals: [false],
    activities: [false],
    clothes: [false],
    smiles: [false],
    symbols: [false],
    objects: [false],
    travel: [false],
    time: [false],
    people: [false],
    nature: [false]
  }
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    saveResult: (state, action: PayloadAction<{ part: ThemeT }>) => {
      const { part } = action.payload

      if (state.passed[part]) {
        state.passed[part][0] = true
      } else {
        captureException(`Invalid part: ${part}`)
      }
    }
  }
})

export const { saveResult } = profileSlice.actions

export const profileReducer = profileSlice.reducer

interface initT {
  passed: Record<ThemeT, boolean[]>
}
