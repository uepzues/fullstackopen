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
    <div className='bg-slate-200 p-5 gap-5 flex flex-col items-center justify-center rounded-lg shadow-md'>
      <h1 className='uppercase font-bold text-2xl mb-6'>Blog Post</h1>
      <h2 className='font-semibold text-lg'>{blog.title}</h2>
      <p className='underline'>{blog.url}</p>
      <p>Likes: {blog.likes}</p>
      <p>By: {blog.author}</p>
      <div className='grid grid-flow-col gap-2 w-full'>
        <button
          onClick={() => handleLike(blog)}
          className=' bg-slate-800 text-white p-2 rounded-xl mb-3 hover:bg-slate-600 hover:text-slate-800'>
          Like
        </button>
        {user && user.username === blog.user.username && (
          <button
            onClick={() => handleRemove(blog)}
            className=' bg-slate-800 text-white p-2 rounded-xl mb-3 hover:bg-slate-600 hover:text-slate-800 ml-5'>
            Remove
          </button>
        )}
      </div>
      <Comments />
    </div>
  )
}

export default Blog
