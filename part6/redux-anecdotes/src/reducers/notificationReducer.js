import { createSlice } from '@reduxjs/toolkit'
import { updateAnecdote } from './anecdoteReducer.js'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    clearNotification() {
      return ''
    },
  },
})

export const notif = (anecdote, time) => {
  return async (dispatch) => {
    dispatch(updateAnecdote(anecdote))
    dispatch(setNotification(`you voted '${anecdote.content}'`))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 1000 * time)
  }
}

export const notifCreate = (anecdote, time) => {
  return async (dispatch) => {
    dispatch(setNotification(`you created '${anecdote.content}'`))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 1000 * time)
  }
}

export const { setNotification, clearNotification } = notificationSlice.actions

export default notificationSlice.reducer
