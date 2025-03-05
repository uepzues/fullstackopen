import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useReducer } from 'react'
import { getAnecdotes, updateAnecdote } from './requests'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import NotificationContext from './components/NotificationContext'

const notifReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIF':
      return action.data
    case 'CLEAR_NOTIF':
      return ''
    default:
      return state
  }
}
const App = () => {
  const [notif, notifDispatch] = useReducer(notifReducer, '')

  const queryClient = useQueryClient()

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
  })

  const voteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (anecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])

      queryClient.setQueryData(
        ['anecdotes'],
        anecdotes.map((a) => (a.id === anecdote.id ? anecdote : a))
      )
    },
  })

  const handleVote = (anecdote) => {
    console.log('vote', anecdote.id)
    voteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    notifDispatch({
      type: 'SET_NOTIF',
      data: `You voted on ${anecdote.content}`,
    })
    setTimeout(() => {
      notifDispatch({ type: 'CLEAR_NOTIF' })
    }, 5000)
  }

  if (result.isPending) {
    return <div>Loading...</div>
  }

  if (result.isError) {
    return (
      <div>anecdote service is not available due to problems in server</div>
    )
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
      <NotificationContext.Provider value={[notif, notifDispatch]}>
        <Notification notif={notif} />
        <AnecdoteForm />

        {anecdotes.map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
      </NotificationContext.Provider>
    </div>
  )
}

export default App
