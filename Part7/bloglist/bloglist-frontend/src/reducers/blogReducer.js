import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const initialState = []

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    addBlog(state, action) {
      state.push(action.payload)
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload
      return state.map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      )
    },
    removeBlog(state, action) {
      const blogId = action.payload
      return state.filter((blog) => blog.id !== blogId)
    },
  },
})

export const { setBlogs, addBlog, updateBlog, removeBlog } = blogSlice.actions

export const fetchBlogs = () => {
  return async (dispatch, getState) => {
    const state = getState()
    // console.log("State", getState())
    const token = state.user.token
    blogService.setToken(token)
    const blogs = await blogService.getBlogs()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = ( blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.createBlog(blog)
    dispatch(addBlog(newBlog))
  }
}

export const updateBlogAsync = (id, updatedBlog) => {
  return async (dispatch) => {
    const blog = await blogService.updateBlog(id, updatedBlog)
    dispatch(updateBlog(blog))
  }
}

export const removeBlogAsync = (id) => {
  return async (dispatch) => {
    try{
      await blogService.removeBlog(id)
      dispatch(removeBlog(id))
    } catch (error) {
      console.log('Error', error)
    }
  }
}

export default blogSlice.reducer
