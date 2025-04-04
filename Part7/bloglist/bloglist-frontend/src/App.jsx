import { useEffect, useState } from 'react'
import blogService from './services/blogs'
import LoginSection from './components/LoginSection'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './reducers/userReducer'
import { fetchBlogs, createBlog } from './reducers/blogReducer'
import Navigation from './components/Navigation'

function App() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.user)
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

  return (
    <div className='main'>
      {(user && notif !== null) && <div className='notif absolute bg-green-300 opacity-80 top-5 right-0 w-3/4 p-5 rounded-s-3xl shadow-md shadow-slate-950'>{notif}</div>}
      <Navigation />

      <div>{!user && <LoginSection />}</div>
    </div>
  )
}

export default App
