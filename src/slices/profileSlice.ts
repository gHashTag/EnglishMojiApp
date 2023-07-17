import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ThemeT } from '../types/LessonTypes'

const initialState: initT = {
  passed: {
    alphabet: [],
    numbers: [],
    foodanddrinks: [],
    animals: [],
    activities: [],
    clothes: [],
    smiles: [],
    symbols: [],
    objects: [],
    travel: [],
    time: [],
    people: [],
    nature: []
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
        console.error(`Invalid part: ${part}`)
      }
    }
  }
})

export const { saveResult } = profileSlice.actions

export const profileReducer = profileSlice.reducer

interface initT {
  passed: Record<ThemeT, boolean[]>
}
