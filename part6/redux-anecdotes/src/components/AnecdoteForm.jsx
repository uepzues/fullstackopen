import anecdoteService from '../services/services'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
export default function AnecdoteForm() {
  const dispatch = useDispatch()
  const createNew = async (e) => {
    e.preventDefault()
    const content = e.target.content.value
    e.target.content.value = ''
    const newAnecdote = await anecdoteService.create({ content, votes: 0 })
    dispatch(createAnecdote(newAnecdote))
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={(e) => createNew(e)}>
        <div>
          <input name='content' />
        </div>
        <button>create</button>
      </form>
    </>
  )
}
