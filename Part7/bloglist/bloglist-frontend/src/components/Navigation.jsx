import { Routes, Route, Link } from 'react-router-dom'
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
    <div className='container mx-auto'>
      {user && (
        <>
          <div className='bg-sky-700 flex justify-center items-center gap-5 p-5 text-white uppercase font-bold mb-8 '>
            <Link to={`/`}>{user.name}</Link>
            <Link to='/users'>Users</Link>
            <Link to='/'>Blogs</Link>
            <h2 className='text-slate-900'>{`${user.name} logged in`}</h2>
            <button
              className='flex items-center  bg-white p-2 rounded-lg hover:bg-slate-800 hover:text-white  text-slate-800 font-semibold uppercase '
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
