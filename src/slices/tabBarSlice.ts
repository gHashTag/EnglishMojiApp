import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { pink } from '../constants'

const initialState: initT = {
  lineColor: pink
}

export const tabBarSlice = createSlice({
  name: 'bgColor',
  initialState,
  reducers: {
    setTabLineColor: (state, action: PayloadAction<string>) => {
      state.lineColor = action.payload
    }
  }
})

export const { setTabLineColor } = tabBarSlice.actions

export const tabBarReducer = tabBarSlice.reducer

interface initT {
  lineColor: string
}
