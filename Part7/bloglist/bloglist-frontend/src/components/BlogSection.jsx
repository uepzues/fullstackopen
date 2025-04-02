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
      <h2>Create New</h2>
      <form onSubmit={addBlog}>
        <label>
          Title: &nbsp; &nbsp; &nbsp;
          <input
            placeholder='Title'
            type='text'
            value={newBlog.title}
            onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
          />
        </label>
        <label>
          Author: &nbsp;
          <input
            placeholder='Author'
            type='text'
            value={newBlog.author}
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, author: target.value })
            }
          />
        </label>
        <label>
          Url: &nbsp; &nbsp; &nbsp; &nbsp;
          <input
            placeholder='URL'
            type='text'
            value={newBlog.url}
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, url: target.value })
            }
          />
        </label>
        <button>Create</button>
      </form>
    </div>
  )
}

export default BlogSection
