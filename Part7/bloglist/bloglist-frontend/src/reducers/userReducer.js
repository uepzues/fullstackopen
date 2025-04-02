import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import userService from '../services/users'

const initialState = {
  user: null,
  users: [],
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    setUsers: (state, action) => {
      state.users = action.payload
    },
    clearUser: (state, action) => {
      state.user = null
    },
  },
})

export const { setUser, setUsers, clearUser } = userSlice.actions

export const getUser = (state, id) =>
  state.user.users.find((user) => user.id === id)

export const getUsers = () => async (dispatch, getState) => {
  const users = await userService.getUsers()
  console.log('users', users)
  console.log('state', getState())
  dispatch(setUsers(users))
}

export const loginUser = (credentials) => async (dispatch) => {
  const user = await loginService.login(credentials)
  window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
  blogService.setToken(user.token)
  dispatch(setUser(user))
}

export const logoutUser = () => (dispatch) => {
  window.localStorage.removeItem('loggedBlogAppUser')
  dispatch(clearUser())
}

export default userSlice.reducer
