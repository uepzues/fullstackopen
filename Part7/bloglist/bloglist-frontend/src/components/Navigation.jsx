import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
// import Home from './Home'
import Users from './Users'
import Blogs from './Blogs'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../reducers/userReducer'
import Blog from './Blog'
import User from './User'
import Home from './Home'

const Navigation = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.user)

  return (
    <div>
      {user && (
        <>
          <div>
            <Link to='/'>{user.name}</Link>
            <Link to='/users'>Users</Link>
            <Link to='/blogs'>Blogs</Link>
            <h2>{`${user.name} logged in`}</h2>
            <button
              onClick={() => {
                console.log('Logout')
                dispatch(logoutUser())
              }}>
              Logout
            </button>
          </div>
          <Routes>
            <Route
              path='/'
              element={<Home />}
            />
            <Route
              path='/users'
              element={<Users />}
            />
            <Route
              path='/blogs'
              element={<Blogs />}
            />
            <Route
              path='/blogs/:id'
              element={<Blog />}
            />
            <Route
              path='/users/:id'
              element={<User />}
            />
          </Routes>
        </>
      )}
    </div>
  )
}

export default Navigation
