import { createSlice } from '@reduxjs/toolkit'
import { updateAnecdote } from './anecdoteReducer'

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

export const notif = (anecdote) => {
  return async (dispatch) => {
    dispatch(updateAnecdote(anecdote))
    dispatch(setNotification(`you voted '${anecdote.content}'`))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }
}

export const notifCreate = (anecdote) => {
  return async (dispatch) => {
    dispatch(setNotification(`you created '${anecdote.content}'`))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }
}

export const { setNotification, clearNotification } = notificationSlice.actions

export default notificationSlice.reducer
