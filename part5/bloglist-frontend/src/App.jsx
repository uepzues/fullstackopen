import { useEffect, useState } from "react"
import loginService from "../services/login"
import blogService from "../services/blogs"

function App() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [notif, setNotif] = useState(null)

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
  }, [])

  const handleLogin = (e) => {
    e.preventDefault()
    // console.log("login")

    loginService
      .login({
        username,
        password,
      })
      .then((user) => {
        console.log("user", user.name)
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
            })
        }
      })
      .catch((err) => {
        console.log("ERROR", err.message)
        setNotif("Wrong Credentials")
        setTimeout(() => {
          setNotif(null)
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
      <h2>Blogs</h2>
      <ul>
        {!blogs.length ? (
          <li>No blogs</li>
        ) : (
          blogs.map((blog) => {
            return <li key={blog.id}>{blog.title} by {blog.author}</li>
          })
        )}
      </ul>
    </div>
  )

  return (
    <>
      <div className="notif">{notif}</div>
      <div>{user === null ? loginSection() : blogSection()}</div>
    </>
  )
}

export default App
