import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = (anecdotes) =>
  axios.get(baseUrl, anecdotes).then((res) => res.data)

export const createAnecdote = (anecdote) =>
  axios.post(baseUrl, anecdote).then((res) => res.data)

export const updateAnecdote = (anecdote) =>
  axios.put(`${baseUrl}/${anecdote.id}`, anecdote).then((res) => res.data)
