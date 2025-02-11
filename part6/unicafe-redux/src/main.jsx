import React from 'react'
import ReactDOM from 'react-dom/client'

import { legacy_createStore as createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  

  const reviewType = (type) => {
    switch (type) {
      case 'GOOD':
        return store.dispatch({ type: 'GOOD' })
      case 'OK':
        return store.dispatch({ type: 'OK' })
      case 'BAD':
        return store.dispatch({ type: 'BAD' })
      case 'ZERO':
        return store.dispatch({ type: 'ZERO' })
      default:
        return
    }
  }

  return (
    <div>
      <button onClick={() => reviewType('GOOD')}>good</button>
      <button onClick={() => reviewType('OK')}>ok</button>
      <button onClick={() => reviewType('BAD')}>bad</button>
      <button onClick={() => reviewType('ZERO')}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
