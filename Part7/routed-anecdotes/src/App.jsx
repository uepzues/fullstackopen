import { useState } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
} from 'react-router-dom'

const Menu = ({ anecdotes, addNew, notification, setNotification }) => {
  const padding = {
    paddingRight: 5,
  }
  return (
    <BrowserRouter>
      <div>
        <Link
          to='/'
          style={padding}>
          anecdotes
        </Link>
        <Link
          to='/create'
          style={padding}>
          create new
        </Link>
        <Link
          to='/about'
          style={padding}>
          about
        </Link>
      </div>

      <Routes>
        <Route
          path='/'
          element={
            <AnecdoteList
              anecdotes={anecdotes}
              notification={notification}
              setNotification={setNotification}
            />
          }
        />
        <Route
          path='/create'
          element={
            <CreateNew
              addNew={addNew}
              setNotification={setNotification}
            />
          }
        />
        <Route
          path='/about'
          element={<About />}
        />
        <Route
          path='/anecdote/:id'
          element={<Anecdote anecdotes={anecdotes} />}
        />
      </Routes>
    </BrowserRouter>
  )
}

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id
  const anecdote = anecdotes.find((anecdote) => anecdote.id === Number(id))
  return (
    <div>
      <h2>
        {anecdote.content} by {anecdote.author}
      </h2>
    </div>
  )
}

const AnecdoteList = ({ anecdotes, notification }) => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <p>{notification}</p>

      <ul>
        {anecdotes.map((anecdote) => (
          <li key={anecdote.id}>
            <Link to={`/anecdote/${anecdote.id}`}>{anecdote.content}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>
      An anecdote is a brief, revealing account of an individual person or an
      incident. Occasionally humorous, anecdotes differ from jokes because their
      primary purpose is not simply to provoke laughter but to reveal a truth
      more general than the brief tale itself, such as to characterize a person
      by delineating a specific quirk or trait, to communicate an abstract idea
      about a person, place, or thing through the concrete details of a short
      narrative. An anecdote is "a story with a point."
    </em>

    <p>
      Software engineering is full of excellent anecdotes, at this app you can
      find the best and add more.
    </p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.
    See{' '}
    <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>
      https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js
    </a>{' '}
    for the source code.
  </div>
)

import { useField } from './hooks'

const CreateNew = (props) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.values.value,
      author: author.values.value,
      info: info.values.value,
      votes: 0,
    })

    content.reset()
    author.reset()
    info.reset()

    navigate('/')
    props.setNotification(`a new anecdote ${content.values.value} created!`)
    setTimeout(() => {
      props.setNotification('')
    }, 5000)
  }

  const handleReset = () => {
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content.values} />
        </div>
        <div>
          author
          <input {...author.values} />
        </div>
        <div>
          url for more info
          <input {...info.values} />
        </div>
        <button>create</button>
        <button
          type='button'
          onClick={handleReset}>
          reset
        </button>
      </form>
    </div>
  )
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1,
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2,
    },
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    }

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu
        anecdotes={anecdotes}
        addNew={addNew}
        notification={notification}
        setNotification={setNotification}
      />
      <Footer />
    </div>
  )
}

export default App
