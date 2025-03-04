import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import anecdoteService from '../services/services'
import { initialAnecdotes, updateAnecdote } from '../reducers/anecdoteReducer'
import { getFilteredAnecdotes } from '../reducers/filterReducer'
import Filter from './Filter'
import { notif } from '../reducers/notificationReducer'

export default function AnecdoteList() {
  const dispatch = useDispatch()
  const anecdotes = useSelector(getFilteredAnecdotes)

  useEffect(() => {
    const fetchAnecdotes = async () => {
      const anecdotes = await anecdoteService.getAll()
      dispatch(initialAnecdotes(anecdotes))
    }

    fetchAnecdotes()
  }, [dispatch])

  const vote = async (id) => {
    console.log('vote', id)
    const anecdote = await anecdotes.find((a) => a.id === id)
    const changedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    const updatedAnecdote = await anecdoteService.update(id, changedAnecdote)
    dispatch(updateAnecdote(updatedAnecdote))
    dispatch(notif(updatedAnecdote, 3))
  }
  const style = {
    width: '100%',
    overflow: 'auto',
  }

  return (
    <>
      <Filter />
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div style={style}>{anecdote.content}</div>
          <div>
            has {anecdote.votes}{' '}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  )
}
