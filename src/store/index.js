import { configureStore } from '@reduxjs/toolkit'
import rounds from './rounds.js'
export const store = configureStore({
  reducer: rounds,
})