import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function Blogs() {
  const blogs = useSelector((state) => state.blogs)

  const blogStyle = {
    padding: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div className='blogs'>
      <h2>Blogs</h2>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => {
          return (
            <li
              key={blog.id}
              style={blogStyle}
              className='blog'>
              <Link to={`/blogs/${blog.id}`}>
                <span className='blog-title'>{blog.title}</span> by{' '}
                <span>{blog.author}</span>
              </Link>
            </li>
          )
        })}
    </div>
  )
}

export default Blogs
