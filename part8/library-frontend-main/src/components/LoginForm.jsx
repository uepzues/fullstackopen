import { useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'
import { LOGIN } from '../queries'
import { useNavigate } from 'react-router-dom'

export default function LoginForm({ setToken }) {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message)
    },
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('userToken', token)
      navigate('/addBook')
    }
  }, [result.data])

  const handleSubmit = (e) => {
    e.preventDefault()

    login({ variables: { username, password } })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        username:{' '}
        <input
          type='text'
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
        password:
        <input
          type='password'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <button type='submit'>login</button>
      </form>
    </div>
  )
}
