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
      <h2>Users</h2>
      {!users || users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Blogs Created</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Users
