import { createSlice } from '@reduxjs/toolkit'

const sortByVotes = (anecdotes) => {
  return [...anecdotes].sort((a, b) => b.votes - a.votes)
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    initialAnecdotes(state, action) {
      return sortByVotes(action.payload)
    },
    createAnecdote(state, action) {
      return sortByVotes([...state, action.payload])
    },
    updateAnecdote(state, action) {
      return sortByVotes(
        state.map((a) => (a.id !== action.payload.id ? a : action.payload))
      )
    },
  },
})

export const { initialAnecdotes, createAnecdote, updateAnecdote } =
  anecdoteSlice.actions

export default anecdoteSlice.reducer
