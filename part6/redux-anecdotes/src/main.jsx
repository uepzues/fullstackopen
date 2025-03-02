import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import reducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import { configureStore } from '@reduxjs/toolkit'

const combinedReducer = {
  reducer: { anecdotes: reducer, filter: filterReducer },
}

const store = configureStore(combinedReducer)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
