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
  },
  exam: false,
  courseLength: {
    alphabet: 0,
    numbers: 0,
    foodanddrinks: 0,
    animals: 0,
    activities: 0,
    clothes: 0,
    smiles: 0,
    symbols: 0,
    objects: 0,
    travel: 0,
    time: 0,
    people: 0,
    nature: 0
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
    },
    examComplete: state => {
      state.exam = true
    },
    changeCourseLength: (
      state,
      action: PayloadAction<{ part: ThemeT; length: number }>
    ) => {
      const { part, length } = action.payload
      state.courseLength[part] = length
    }
  }
})

export const { saveResult, examComplete, changeCourseLength } = profileSlice.actions

export const profileReducer = profileSlice.reducer

interface initT {
  passed: Record<ThemeT, boolean[]>
  exam: boolean
  courseLength: Record<ThemeT, number>
}
