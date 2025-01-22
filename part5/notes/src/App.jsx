import { useState, useEffect, useRef } from "react"
import Note from "./components/Note"
import noteService from "./services/notes"
import Notification from "./components/Notification"
import Footer from "./components/Footer"
import loginUser from "./services/login"
import LoginForm from "./components/LoginForm"
import Togglable from "./components/Togglable"
import NoteForm from "./components/NoteForm"

export default function App() {
  const [notes, setNotes] = useState([])
  // const [newNote, setNewNote] = useState("")
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  // const [loginVisible, setLoginVisible] = useState(false)

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      // console.log(initialNotes)
      setNotes(initialNotes.data)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id)
    const changedNote = { content: note.content, important: !note.important }

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        console.log(returnedNote)
        setNotes(notes.map((n) => (n.id === id ? returnedNote : n)))
      })
      .catch((error) => {
        console.log(error)
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility()
    noteService
      .create(noteObject)
      .then((returnedNote) => {
        console.log("Note successfully created:", returnedNote)
        setNotes(notes.concat(returnedNote))
        // setNewNote("")
      })
      .catch((error) => {
        console.error("Error in note creation:", error)
        setErrorMessage(error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const deleteNote = (id) => {
    const note = notes.find((n) => n.id === id)
    noteService.delNote(note.id).then(() => {
      setNotes(notes.filter((note) => note.id !== id))
    })
  }

  // const handleNoteChange = (e) => {
  //   console.log(e.target.value)
  //   setNewNote(e.target.value)
  // }

  useEffect(() => {
    noteService.getAll().then((response) => {
      setNotes(response.data)
    })
  }, [])

  const notesToShow = showAll ? notes : notes.filter((note) => note.important)

  const handleLogin = async (e) => {
    e.preventDefault()
    // console.log("logging in with", username, password)

    try {
      const user = await loginUser.login({
        username,
        password,
      })

      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user))

      // console.log("user", user)

      noteService.setToken(user.token)
      setUser(user)
      setUsername("")
      setPassword("")
    } catch (exception) {
      setErrorMessage("Wrong credentials")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => {
    return (
      <Togglable buttonLabel="log in">
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </Togglable>
    )
  }

  const noteFormRef = useRef()

  const noteForm = () => (
    <div>
      <button
        onClick={() => {
          window.localStorage.removeItem("loggedNoteappUser")
          setUser(null)
        }}
      >
        logout
      </button>
      <Togglable buttonLabel="new note" ref={noteFormRef}>
        <NoteForm createNote={addNote} />
      </Togglable>
    </div>
  )

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user.username} logged-in</p>
          {noteForm()}
        </div>
      )}

      {!showAll ? (
        <button onClick={() => setShowAll(true)}>Show all</button>
      ) : (
        <button onClick={() => setShowAll(false)}>Show Important</button>
      )}
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
            deleteNote={() => deleteNote(note.id)}
          />
        ))}
      </ul>
      {/* <form onSubmit={addNote}>
        <input type="text" value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form> */}
      <Footer />
    </div>
  )
}
