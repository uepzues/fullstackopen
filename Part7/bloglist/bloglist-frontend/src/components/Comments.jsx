import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { updateBlogComments } from '../reducers/blogReducer'
import {
  setNotification,
  clearNotification,
} from '../reducers/notificationReducer'

const Comments = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const blogDetails = useSelector((state) =>
    state.blogs.find((b) => b.id === id)
  )

  const comments = blogDetails?.comments || []

  const handleCommentSubmit = async (e) => {
    e.preventDefault()
    const comment = e.target.comment.value
    e.target.comment.value = ''
    console.log('Comment', blogDetails)

    if (!comment) {
      dispatch(setNotification('Comment cannot be empty'))
      setTimeout(() => {
        dispatch(clearNotification())
      }, 5000)
      return
    }

    try {
      const updatedBlog = {
        ...blogDetails,
        comments: blogDetails.comments.concat(comment),
      }
      console.log('Updated Blog', updatedBlog)
      await dispatch(updateBlogComments(updatedBlog))
      dispatch(setNotification(`You commented on ${blogDetails.title}`))
      setTimeout(() => {
        dispatch(clearNotification())
      }, 5000)
    } catch (error) {
      console.log('Error', error)
      dispatch(setNotification('Failed to add comment'))
      setTimeout(() => {
        dispatch(clearNotification())
      }, 5000)
    }
  }

  return (
    <div className='comments'>
      <h2>Comments</h2>
      <form onSubmit={handleCommentSubmit}>
        <input
          type='text'
          name='comment'
        />
        <button>Submit</button>
      </form>
      <div>
        {comments.map((comment) => {
          return <p key={comment}>{comment}</p>
        })}
      </div>
    </div>
  )
}

export default Comments
