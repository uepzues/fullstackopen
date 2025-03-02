import { createSlice } from '@reduxjs/toolkit'

// export const filterAnecdotes = (value) => {
//   return {
//     type: 'SET_FILTER',
//     payload: value,
//   }
// }

export const getFilteredAnecdotes = (state) => {
  // console.log(state)
  const filter = state.filter.toLowerCase()
  return state.anecdotes.filter((anecdote) =>
    anecdote.content.toLowerCase().includes(filter)
  )
}

// const filterReducer = (state = '', action) => {
//   switch (action.type) {
//     case 'SET_FILTER':
//       return action.payload
//     default:
//       return state
//   }
// }

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    filterAnecdotes(state, action) {
      return action.payload
    },
  },
})

export const { filterAnecdotes } = filterSlice.actions
export default filterSlice.reducer
