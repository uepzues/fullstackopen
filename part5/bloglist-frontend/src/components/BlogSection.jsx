import { useState } from "react"

const BlogSection = ({ handleCreate, user }) => {
  const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" })
  const addBlog = (e) => {
    e.preventDefault()
    handleCreate({
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
      user: user._id,
    })
    setNewBlog({ title: "", author: "", url: "", user: "" })
  }

  return (
    <div>
      <h2>Create New</h2>
      <form onSubmit={addBlog}>
        <label>
          Title: &nbsp; &nbsp; &nbsp;
          <input
            type="text"
            value={newBlog.title}
            onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
          />
        </label>
        <label>
          Author: &nbsp;
          <input
            type="text"
            value={newBlog.author}
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, author: target.value })
            }
          />
        </label>
        <label>
          Url: &nbsp; &nbsp; &nbsp; &nbsp;
          <input
            type="text"
            value={newBlog.url}
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, url: target.value })
            }
          />
        </label>
        <button>Create</button>
      </form>
    </div>
  )
}

export default BlogSection
