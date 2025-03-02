export const filterAnecdotes = (value) => {
  return {
    type: 'SET_FILTER',
    payload: value,
  }
}

export const getFilteredAnecdotes = (state) => {
  // console.log(state)
  const filter = state.filter.toLowerCase()
  return state.anecdotes.filter((anecdote) =>
    anecdote.content.toLowerCase().includes(filter)
  )
}

const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.payload
    default:
      return state
  }
}

export default filterReducer
