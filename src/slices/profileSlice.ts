import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { themeT } from '../types/LessonTypes'

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
  },
  exam: false
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    saveResult: (state, action: PayloadAction<{ part: themeT }>) => {
      const { part } = action.payload
      console.log('part', part)
      // state.passed[part].push(true)
    },
    examComplete: state => {
      state.exam = true
    }
  }
})

export const { saveResult, examComplete } = profileSlice.actions

export const profileReducer = profileSlice.reducer

interface initT {
  passed: Record<themeT, boolean[]>
  exam: boolean
}
