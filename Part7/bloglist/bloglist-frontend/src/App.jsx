import { useEffect, useState } from 'react'
import loginService from './services/login'
import blogService from './services/blogs'
import LoginSection from './components/LoginSection'
import Togglable from './components/Togglable'
import BlogSection from './components/BlogSection'
import Blogs from './components/Blogs'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, setUser, logoutUser } from './reducers/userReducer'
import {
  fetchBlogs,
  setBlogs,
  createBlog,
  updateBlogAsync,
  removeBlogAsync,
} from './reducers/blogReducer'
import {
  setNotification,
  clearNotification,
} from './reducers/notificationReducer'

function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
    user: '',
  })
  const [blogRefresh, setBlogRefresh] = useState(false)

  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const blogs = useSelector((state) => state.blogs)
  const notif = useSelector((state) => state.notification)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
      dispatch(fetchBlogs())
    }
  }, [dispatch])

  const handleLogin = (e) => {
    e.preventDefault()
    dispatch(loginUser({ username, password }))

    setUsername('')
    setPassword('')
  }

  const handleCreate = (blogObject) => {
    dispatch(createBlog(blogObject))
    dispatch(fetchBlogs())
    dispatch(
      setNotification(
        `A new blog ${blogObject.title} by ${blogObject.author} added`
      )
    )
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }

  const handleLike = (blog) => {
    dispatch(updateBlogAsync(blog.id, { ...blog, likes: blog.likes + 1 }))
    dispatch(fetchBlogs())
    dispatch(setNotification(`You liked ${blog.title}`))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }

  const handleRemove = (blog) => {
    if (window.confirm(`Delete ${blog.title} by ${blog.author}`)) {
      dispatch(removeBlogAsync(blog.id))
      dispatch(setNotification(`Blog ${blog.title} by ${blog.author} removed`))
      dispatch(fetchBlogs())
      setTimeout(() => {
        dispatch(clearNotification())
      }, 5000)
    }
  }

  const loginSection = () => (
    <div>
      <h2>Log in to application</h2>
      <Togglable
        buttonLabel1='Login'
        buttonLabel2='Cancel'>
        <LoginSection
          password={password}
          username={username}
          setUsername={setUsername}
          setPassword={setPassword}
          onSubmit={handleLogin}
        />
      </Togglable>
    </div>
  )

  const blogSection = () => (
    <div>
      <h2>{`${user.name} logged in`}</h2>
      <button
        onClick={() => {
          console.log('Logout')
          dispatch(logoutUser())
        }}>
        Logout
      </button>
      <Togglable
        buttonLabel1={'New Blog'}
        buttonLabel2={'Cancel'}>
        <BlogSection
          newBlog={newBlog}
          setNewBlog={setNewBlog}
          handleCreate={handleCreate}
          user={user}
        />
      </Togglable>

      <h2>Blogs</h2>
      <ul>
        <Blogs
          blogs={blogs}
          handleLike={handleLike}
          handleRemove={handleRemove}
          user={user}
        />
      </ul>
    </div>
  )

  return (
    <div className='main'>
      {notif && <div className='notif'>{notif}</div>}
      <div>{user === null ? loginSection() : blogSection()}</div>
    </div>
  )
}

export default App
