import { configureStore } from '@reduxjs/toolkit'
import blogReducer from '../reducers/blogReducer'
import userReducer from '../reducers/userReducer'
import notificationReducer from '../reducers/notificationReducer'

export const store = configureStore({
  reducer: {
    user: userReducer,
    blogs: blogReducer,
    notification: notificationReducer,
  },
})
