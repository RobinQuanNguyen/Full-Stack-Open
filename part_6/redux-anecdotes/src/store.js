import { configureStore } from '@reduxjs/toolkit'
import acnedoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'

const store = configureStore({
  reducer: {
    anecdotes: acnedoteReducer,
    filter: filterReducer,
  },
})

export default store