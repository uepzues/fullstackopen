import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../reducers/userReducer'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'

const Users = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])
  const users = useSelector((state) => state.user.users)

  return (
    <div>
      <h2 className='uppercase text-2xl font-bold mb-5' >Users</h2>
      {!users || users.length === 0 ? (
        <p className='text-2xl font-bold uppercase'>No users found</p>
      ) : (
        <table>
          <thead>
            <tr className='bg-slate-800 text-white '>
              <th className='p-3'>Name</th>
              <th className='p-3'>Blogs Created</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className='odd:bg-slate-200 even:bg-slate-300'>
                <td className='pl-3 underline'>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td className='text-center'>{user.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Users
