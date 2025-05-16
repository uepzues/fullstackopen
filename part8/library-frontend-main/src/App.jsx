import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendation from './components/Recommendation'
import { useQuery, ApolloClient, useApolloClient } from '@apollo/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { ALL_AUTHORS } from './queries'
import { useEffect, useState } from 'react'

const App = () => {
  const result = useQuery(ALL_AUTHORS)
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    const savedToken = localStorage.getItem('userToken')
    setToken(savedToken)
  })

  if (result.loading) {
    return <div>Loading...</div>
  }

  if (result.error) {
    return <div>Error: {result.error.message}</div>
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <BrowserRouter>
      <div>
        <Link to='/'>
          <button>authors</button>
        </Link>
        <Link to={'/books'}>
          <button>books</button>
        </Link>

        {token ? (
          <>
            <Link to={'/addBook'}>
              <button>add book</button>
            </Link>
            <Link to={'/recommend'}>
              <button>recommend</button>
            </Link>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <Link to={'/login'}>
            <button>login</button>
          </Link>
        )}
      </div>

      <Routes>
        <Route
          path='/'
          element={<Authors allAuthors={result.data.allAuthors} />}
        />
        <Route
          path='/books'
          element={<Books />}
        />
        <Route
          path='/addBook'
          element={<NewBook />}
        />
        <Route
          path='/login'
          element={
            <LoginForm
              setToken={setToken}
              token={token}
            />
          }
        />
        <Route
          path='/recommend'
          element={<Recommendation />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
