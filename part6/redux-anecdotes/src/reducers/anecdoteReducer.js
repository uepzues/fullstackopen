export const initialAnecdotes = (anecdotes) => {
  console.log('initial', anecdotes)
  return {
    type: 'INIT_ANECDOTES',
    payload: anecdotes,
  }
}

export const createAnecdote = (anecdote) => {
  return {
    type: 'CREATE_ANECDOTE',
    payload: anecdote,
  }
}

export const updateAnecdote = (anecdote) => {
  return {
    type: 'UPDATE_ANECDOTE',
    payload: anecdote,
  }
}

const sortByVotes = (anecdotes) => {
  return anecdotes.slice().sort((a, b) => b.votes - a.votes)
}

const reducer = (state = [], action) => {
  // console.log('state now: ', state)
  // console.log('action', action)

  switch (action.type) {
    case 'INIT_ANECDOTES':
      return sortByVotes(action.payload)
    case 'UPDATE_ANECDOTE':
      return sortByVotes(
        state.map((a) => (a.id !== action.payload.id ? a : action.payload))
      )
    case 'CREATE_ANECDOTE':
      return sortByVotes([...state, action.payload])
    default:
      return state
  }
}

export default reducer
