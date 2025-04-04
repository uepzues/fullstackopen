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
    <div className='flex flex-col items-center justify-center h-screen'>
      <h2 className='mb-6 uppercase font-bold text-xl'>
        Log in to application
      </h2>
      <Togglable
        buttonLabel1='Login'
        buttonLabel2='Cancel'>
        <form
          className='flex items-center justify-center gap-4 font-semibold'
          onSubmit={handleLogin}>
          <label>
            Username:
            <input
              className='px-2 placeholder:bg-slate-200 '
              type='text'
              value={username}
              placeholder='username'
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
          <label>
            Password:
            <input
              className='px-2 placeholder:bg-slate-200 '
              type='password'
              value={password}
              placeholder='password'
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
          <button className=' bg-slate-800 text-white p-2 rounded-xl mb-3 hover:bg-slate-600 hover:text-slate-800'>
            Login
          </button>
        </form>
      </Togglable>
    </div>
  )
}

export default LoginSection
