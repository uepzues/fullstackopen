import { useState } from 'react'
import PropTypes from 'prop-types'

function Blogs({ blogs, handleLike, handleRemove }) {
  const [blogId, setBlogId] = useState(null)

  const toggleVisibility = (id) => {
    setBlogId(blogId === id ? null : id)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => {
          const isVisible = blogId === blog.id
          const showWhenVisible = { display: isVisible ? '' : 'none' }

          return (
            <li
              key={blog.id}
              style={blogStyle}
              className='blog'>
              <span>{blog.title}</span> by <span>{blog.author}</span>
              <button
                data-testid='view-button'
                onClick={() => {
                  // console.log(blog.id)
                  return toggleVisibility(blog.id)
                }}>
                &nbsp; {isVisible ? 'Hide' : 'Details'} &nbsp;
              </button>
              <div
                style={showWhenVisible}
                data-testid='blogDetails'>
                <p>Url: {blog.url}</p>
                <p>
                  Likes: {blog.likes}{' '}
                  <span>
                    <button onClick={() => handleLike(blog)}>Like</button>
                  </span>{' '}
                </p>
                <p>Added by: {blog.user.name}</p>
                <button onClick={() => handleRemove(blog)}>Remove</button>
              </div>
            </li>
          )
        })}
    </>
  )
}

Blogs.propTypes = {
  blogs: PropTypes.array.isRequired,
  handleLike: PropTypes.func,
  handleRemove: PropTypes.func,
}

export default Blogs
