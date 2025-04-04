import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getUser } from '../reducers/userReducer'
import { Link } from 'react-router-dom'
const User = () => {
  const { id } = useParams()
  const user = useSelector((state) => getUser(state, id))
  console.log('User ID', id)
  console.log('User', user)
  if (!user) {
    return <p>User not found</p>
  }
  const blogs = user.blogs.map((blog) => (
    <li
      key={blog.id}
      className='list-none  p-2 odd:bg-slate-200 even:bg-slate-300'>
      <Link
        className='underline'
        to={`/blogs/${blog.id}`}>
        {blog.title}
      </Link>{' '}
      by {blog.author}
    </li>
  ))

  return (
    <div>
      <h2 className='uppercase font-bold text-2xl mb-5'>{user.name}'s post</h2>
      <div>{blogs}</div>
    </div>
  )
}

export default User
