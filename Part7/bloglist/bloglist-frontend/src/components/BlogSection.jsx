import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createBlog, fetchBlogs } from '../reducers/blogReducer'
import {
  setNotification,
  clearNotification,
} from '../reducers/notificationReducer'

const BlogSection = () => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

  const dispatch = useDispatch()

  const user = useSelector((state) => state.user.user)

  const handleCreate = (blogObject) => {
    dispatch(createBlog(blogObject))
    dispatch(
      setNotification(
        `A new blog ${blogObject.title} by ${blogObject.author} added`
      )
    )
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
    dispatch(fetchBlogs())
  }

  const addBlog = (e) => {
    e.preventDefault()
    handleCreate({
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
      likes: 0,
      user: user._id,
    })
    setNewBlog({ title: '', author: '', url: '', user: '' })
  }

  return (
    <div>
      <h2 className='uppercase text-xl font-bold text-center mb-5'>Create New</h2>
      <form onSubmit={addBlog}>
        <label className='font-semibold'>
          Title:
          <input className='placeholder:bg-slate-200 placeholder:indent-2 px-2 '
            placeholder='Title'
            type='text'
            value={newBlog.title}
            onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
          />
        </label>&nbsp;&nbsp;&nbsp;
        <label className='font-semibold'>
          Author: &nbsp;
          <input className='placeholder:bg-slate-200 placeholder:indent-2 px-2 '
            placeholder='Author'
            type='text'
            value={newBlog.author}
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, author: target.value })
            }
          />
        </label>&nbsp; &nbsp; &nbsp;
        <label className='font-semibold'>
          Url: 
          <input className='placeholder:bg-slate-200 placeholder:indent-2 px-2 '
            placeholder='URL'
            type='text'
            value={newBlog.url}
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, url: target.value })
            }
          />
        </label>
        <button className=' bg-slate-800 text-white p-2 rounded-xl mb-3'>Create</button>
      </form>
    </div>
  )
}

export default BlogSection
