import PropTypes from 'prop-types'
const LoginSection = ({
  onSubmit,
  setUsername,
  setPassword,
  username,
  password,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <label>
        username:
        <input
          type="text"
          value={username}
          placeholder="username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          placeholder="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </label>
      <button>Login</button>
    </form>
  )
}

LoginSection.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}

export default LoginSection
