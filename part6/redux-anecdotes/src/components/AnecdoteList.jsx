import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import anecdoteService from '../services/services'
import { initialAnecdotes, updateAnecdote } from '../reducers/anecdoteReducer'
import Filter from './Filter'
import { getFilteredAnecdotes } from '../reducers/filterReducer'

export default function AnecdoteList() {
  const dispatch = useDispatch()
  const anecdotes = useSelector(getFilteredAnecdotes)

  useEffect(() => {
    anecdoteService.getAll().then((anecdotes) => {
      dispatch(initialAnecdotes(anecdotes))
    })
  }, [dispatch])

  const vote = async (id) => {
    console.log('vote', id)
    const anecdote = await anecdotes.find((a) => a.id === id)
    const changedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    const updatedAnecdote = await anecdoteService.update(id, changedAnecdote)
    dispatch(updateAnecdote(updatedAnecdote))
  }

  return (
    <>
      <Filter />
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  )
}
