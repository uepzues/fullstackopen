import { useState } from 'react'
import { loginUser } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'
import Togglable from './Togglable'
import { useNavigate } from 'react-router-dom'

const LoginSection = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    dispatch(loginUser({ username, password }))
    setUsername('')
    setPassword('')
    navigate('/')
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <Togglable
        buttonLabel1='Login'
        buttonLabel2='Cancel'>
        <form onSubmit={handleLogin}>
          <label>
            username:
            <input
              type='text'
              value={username}
              placeholder='username'
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
          <label>
            Password:
            <input
              type='password'
              value={password}
              placeholder='password'
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
          <button>Login</button>
        </form>
      </Togglable>
    </div>
  )
}

export default LoginSection
