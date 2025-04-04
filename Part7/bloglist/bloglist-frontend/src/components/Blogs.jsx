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
      <h2 className='uppercase font-bold text-2xl mb-3'>Blogs</h2>
      <ul >
        {[...blogs]
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => {
            return (
              <li 
                key={blog.id}
                style={blogStyle}
                className='blog odd:bg-slate-100 even:bg-sky-200 rounded-xl'>
                <Link to={`/blogs/${blog.id}`}>
                  <span className='blog-title underline font-semibold'>{blog.title}</span> by{' '}
                  <span>{blog.author}</span>
                </Link>
              </li>
            )
          })}
      </ul>
    </div>
  )
}

export default Blogs
