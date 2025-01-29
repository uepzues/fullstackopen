import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogSection = ({ handleCreate, user }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })
  const addBlog = (e) => {
    e.preventDefault()
    handleCreate({
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
      likes: 0,
      user: user._id,
    })
    setNewBlog({ title: '', author: '', url: '', user: '' })
  }

  return (
    <div>
      <h2>Create New</h2>
      <form onSubmit={addBlog}>
        <label>
          Title: &nbsp; &nbsp; &nbsp;
          <input
            placeholder="Title"
            type="text"
            value={newBlog.title}
            onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
          />
        </label>
        <label>
          Author: &nbsp;
          <input
            placeholder="Author"
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
            placeholder="URL"
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

BlogSection.propTypes = {
  handleCreate: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}
export default BlogSection
