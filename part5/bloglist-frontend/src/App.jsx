import { useEffect, useState } from "react"
import loginService from "../services/login"
import blogService from "../services/blogs"

function App() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [notif, setNotif] = useState(null)
  const [errNotif, setErrNotif] = useState(null)
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
    user: "",
  })
  const [blogRefresh, setBlogRefresh] = useState(false)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      if (user.token) {
        blogService
          .getBlogs()
          .then((blogs) => {
            console.log("App blogs", blogs)
            setBlogs(blogs)
          })
          .catch((err) => {
            console.log("Error", err)
          })
      }
    }
  }, [blogRefresh])

  const handleLogin = (e) => {
    e.preventDefault()
    // console.log("login")

    loginService
      .login({
        username,
        password,
      })
      .then((user) => {
        console.log("user", user)
        window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user))
        blogService.setToken(user.token)
        setUser(user)
        setUsername("")
        setPassword("")
        if (user.token) {
          blogService
            .getBlogs()
            .then((blogs) => {
              console.log(blogs)
              setBlogs(blogs)
              setNotif(`Welcome ${user.name}`)
              setTimeout(() => {
                setNotif(null)
              }, 5000)
            })
            .catch((err) => {
              console.log("Error", err)
              throw new Error({ Error: err })
            })
        }
      })
      .catch((err) => {
        console.log("ERROR", err.message)
        setErrNotif("Wrong Credentials")
        setTimeout(() => {
          setErrNotif(null)
        }, 5000)
      })
  }

  const handleCreate = (e) => {
    e.preventDefault()
    // console.log("Create")

    const blogObject = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
      user: user._id,
    }

    blogService
      .createBlog(blogObject)
      .then((blog) => {
        if (!blog.title || !blog.author) {
          console.log("create blog", blog)
          setErrNotif("set notif error ", blog.error)
          setTimeout(() => {
            setErrNotif(null)
          }, 5000)
          setBlogRefresh(!blogRefresh)
          return
        } else {
          console.log("handle create Blog", blog)
          setBlogs((prev) => [...prev, blog])
          setNotif(`New Blog ${blog.title} by ${blog.author} created`)
          setTimeout(() => {
            setNotif(null)
          }, 5000)
          setNewBlog({ title: "", author: "", url: "", user: "" })
          setBlogRefresh(!blogRefresh)
        }
      })
      .catch((err) => {
        console.log("handle create error", err.message)
        setErrNotif("Title or Author must not be empty")
        setTimeout(() => {
          setErrNotif(null)
        }, 5000)
      })
  }

  const loginSection = () => (
    <form onSubmit={handleLogin}>
      <h2>Log in to application</h2>
      <label>
        username:
        <input
          type="text"
          value={username}
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button>Login</button>
    </form>
  )

  const blogSection = () => (
    <div>
      <h2>{`${user.name} logged in`}</h2>
      <button
        onClick={() => {
          console.log("Logout")
          window.localStorage.removeItem("loggedBlogAppUser")
          setUser(null)
        }}
      >
        Logout
      </button>

      <h2>Create New</h2>
      <form onSubmit={handleCreate}>
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
            onChange={(e) => setNewBlog({ ...newBlog, author: e.target.value })}
          />
        </label>
        <label>
          Url: &nbsp; &nbsp; &nbsp; &nbsp;
          <input
            type="text"
            value={newBlog.url}
            onChange={(e) => setNewBlog({ ...newBlog, url: e.target.value })}
          />
        </label>
        <button>Create</button>
      </form>

      <h2>Blogs</h2>
      <ul>
        {blogs.length === 0 ? (
          <li>No blogs</li>
        ) : (
          blogs.map((blog) => {
            return (
              <li key={blog._id}>
                {blog.title} by {blog.author}
              </li>
            )
          })
        )}
      </ul>
    </div>
  )

  return (
    <div className="main">
      {errNotif && <div className="errNotif">{errNotif}</div>}
      {notif && <div className="notif">{notif}</div>}
      <div>{user === null ? loginSection() : blogSection()}</div>
    </div>
  )
}

export default App
