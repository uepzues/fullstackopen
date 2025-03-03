import reducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'
import { configureStore } from '@reduxjs/toolkit'

const combinedReducer = {
  reducer: {
    anecdotes: reducer,
    filter: filterReducer,
    notification: notificationReducer,
  },
}

const store = configureStore(combinedReducer)

export default store
