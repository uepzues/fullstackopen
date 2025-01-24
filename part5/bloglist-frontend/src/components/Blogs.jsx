import { useState } from "react"

function Blogs({ blogs, handleLike }) {
  const [blogId, setBlogId] = useState(null)

  const toggleVisibility = (id) => {
    setBlogId(blogId === id ? null : id)
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
      {[...blogs].sort((a, b) => b.likes - a.likes).map((blog) => {
        const isVisible = blogId === blog.id
        const showWhenVisible = { display: isVisible ? "" : "none" }

        return (
          <li key={blog.id} style={blogStyle}>
            <span>{blog.title}</span> by <span>{blog.author}</span>
            <button
              onClick={() => {
                console.log(blog.id)
                return toggleVisibility(blog.id)
              }}
            >
              {isVisible ? "Hide" : "Details"}
            </button>
            <div style={showWhenVisible}>
              <p>Url: {blog.url}</p>
              <p>
                Likes: {blog.likes}{" "}
                <span>
                  <button onClick={() => handleLike(blog)}>Like</button>
                </span>{" "}
              </p>
              <p>Added by: {blog.user.name}</p>
            </div>
          </li>
        )
      })}
    </>
  )
}

export default Blogs
