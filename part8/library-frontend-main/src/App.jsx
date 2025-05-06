import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { useQuery } from '@apollo/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { ALL_AUTHORS } from './queries'

const App = () => {
  const result = useQuery(ALL_AUTHORS)

  if (result.loading) {
    return <div>Loading...</div>
  }

  if (result.error) {
    return <div>Error: {result.error.message}</div>
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
        <Link to={'/addBook'}>
          <button>add book</button>
        </Link>
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
      </Routes>
    </BrowserRouter>
  )
}

export default App
