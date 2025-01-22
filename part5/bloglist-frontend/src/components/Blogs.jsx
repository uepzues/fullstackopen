import Togglable from "./Togglable"
function Blogs({ blogs, visibleRef }) {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div>
      {blogs.map((blog) => {
        return (
          <li key={blog._id}>
            <span> {blog.title}</span>

            <Togglable
              buttonLabel2="Hide"
              buttonLabel1="Details"
              ref={visibleRef}
            >
              <div style={blogStyle}>
                <p>Author:{blog.author}</p>
                <p>Url: {blog.url}</p>
                <p>Likes: {blog.likes}</p>
              </div>
            </Togglable>
          </li>
        )
      })}
    </div>
  )
}

export default Blogs
