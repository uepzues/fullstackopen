import { useState } from "react"

function Blogs({ blogs }) {
  const [visibleBlogId, setVisibleBlogId] = useState(null)

  const toggleVisibility = (id) => {
    setVisibleBlogId(visibleBlogId === id ? null : id)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <>
      {blogs.map((blog) => {
        const isVisible = visibleBlogId === blog.id
        const showWhenVisible = { display: isVisible ? "" : "none" }

        return (
          <li key={blog._id} style={blogStyle}>
            <span>{blog.title}</span>
            <button
              onClick={() => {
                console.log(blog.id)
                return toggleVisibility(blog.id)
              }}
            >
              {isVisible ? "Hide" : "Details"}
            </button>

            <div style={showWhenVisible}>
              <p>Author: {blog.author}</p>
              <p>Url: {blog.url}</p>
              <p>Likes: {blog.likes}</p>
            </div>
          </li>
        )
      })}
    </>
  )
}

export default Blogs
