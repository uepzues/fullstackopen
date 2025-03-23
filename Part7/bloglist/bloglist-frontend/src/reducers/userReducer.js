import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'

const initialState = null

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => action.payload,
    clearUser: () => null,
  },
})

export const { setUser, clearUser } = userSlice.actions

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
