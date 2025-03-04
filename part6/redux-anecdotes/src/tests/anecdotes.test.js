import { test, after, beforeEach, describe } from 'node:test'
import aService from '../services/services.js'
import assert from 'assert'
import anecdoteReducer from '../reducers/anecdoteReducer.js'
import filterReducer from '../reducers/filterReducer.js'
import notificationReducer from '../reducers/notificationReducer.js'

describe('Anecdotes', () => {
  test('Anecdotes are returned', async () => {
    const anecdotes = await aService.getAll()

    assert(Array.isArray(anecdotes), 'Anecdotes should be an array')
    assert(anecdotes.length > 0, 'Anecdotes should not be empty')
  })
})

describe('Anecdote reducer', () => {
  test('Anecdotes are returned', async () => {
    const anecdotes = await aService.getAll()
    const state = []
    const action = {
      type: 'anecdotes/initialAnecdotes',
      payload: anecdotes,
    }

    const newState = anecdoteReducer(state, action)

    assert(Array.isArray(newState), 'New state should be an array')
    assert(newState.length > 0, 'New state should not be empty')
  })

  test('Anecdote is created', async () => {
    const anecdotes = await aService.getAll()
    const anecdote = {
      content: 'New anecdote',
      votes: 0,
      id: anecdotes.length + 1,
    }
    const state = anecdotes
    const action = {
      type: 'anecdotes/createAnecdote',
      payload: anecdote,
    }

    const newState = anecdoteReducer(state, action)

    console.log('newState', anecdotes.length)
    assert(anecdotes.length + 1 === newState.length, 'Anecdote should be added')
    assert(newState.length > 0, 'New state should not be empty')
    assert(
      newState.some((a) => a.content === anecdote.content),
      'New anecdote should be in the state'
    )
  })

  test('Anecdote is voted and updated', async () => {
    const anecdotes = await aService.getAll()
    const anecdote = { ...anecdotes[0], votes: anecdotes[0].votes + 1 }
    const state = anecdotes
    const action = {
      type: 'anecdotes/updateAnecdote',
      payload: anecdote,
    }

    const newState = anecdoteReducer(state, action)
    assert(
      newState.some((a) => a.votes === anecdote.votes),
      'Anecdote should be voted'
    )
  })

  test('Filter updates correctly', () => {
    const state = 'test'
    const action = {
      type: 'filter/setFilter',
      payload: 'test',
    }

    const newState = filterReducer(state, action)
    assert.strictEqual(newState, 'test', 'Filter should be updated')
  })

  test('Notification displays correctly', () => {
    const state = null
    const action = {
      type: 'notification/setNotification',
      payload: 'Test notification',
    }

    const newState = notificationReducer(state, action)
    assert.strictEqual(
      newState,
      action.payload,
      'Notification should be displayed'
    )
  })
})
