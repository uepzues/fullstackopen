import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import { useContext } from 'react'
import NotificationContext from './NotificationContext'

const AnecdoteForm = () => {
  const [notif, notifDispatch] = useContext(NotificationContext)
  const queryClient = useQueryClient()

  const anecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onError: (error) => {
      notifDispatch({
        type: 'SET_NOTIF',
        data: error.response.data.error,
      })
      setTimeout(() => {
        notifDispatch({ type: 'CLEAR_NOTIF' })
      }, 5000)
    },
    onSuccess: (anecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(anecdote))
      notifDispatch({
        type: 'SET_NOTIF',
        data: `You created '${anecdote.content}'`,
      })
      setTimeout(() => {
        notifDispatch({ type: 'CLEAR_NOTIF' })
      }, 5000)
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    anecdoteMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
