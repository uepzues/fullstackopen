import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { updateBlogAsync, removeBlogAsync } from '../reducers/blogReducer'
import {
  setNotification,
  clearNotification,
} from '../reducers/notificationReducer'
import Comments from './Comments'

const Blog = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const blog = useSelector((state) => state.blogs.find((b) => b.id === id))
  const user = useSelector((state) => state.user.user)
  // console.log('User from Blog', user)
  // console.log('Blog from Blog', blog)
  if (!blog) {
    return <p>Blog not found</p>
  }

  const handleLike = (blog) => {
    dispatch(updateBlogAsync(blog.id, { ...blog, likes: blog.likes + 1 }))
    dispatch(setNotification(`You liked ${blog.title}`))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }

  const handleRemove = (blog) => {
    if (window.confirm(`Delete ${blog.title} by ${blog.author}`)) {
      dispatch(removeBlogAsync(blog.id))
      dispatch(setNotification(`Blog ${blog.title} by ${blog.author} removed`))
      setTimeout(() => {
        dispatch(clearNotification())
      }, 5000)
    }
  }
  return (
    <div>
      <h2>{blog.title}</h2>
      <p>{blog.url}</p>
      <p>Likes: {blog.likes}</p>
      <p>added by: {blog.author}</p>
      <button onClick={() => handleLike(blog)}>Like</button>
      {user && user.username === blog.user.username && (
        <button onClick={() => handleRemove(blog)}>Remove</button>
      )}
      <Comments user={user} blog={blog} />
    </div>
  )
}

export default Blog
