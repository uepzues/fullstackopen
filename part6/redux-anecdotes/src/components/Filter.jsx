import { useDispatch } from 'react-redux'
import { filterAnecdotes } from '../reducers/filterReducer'

export default function Filter() {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    console.log(event.target.value)
    dispatch(filterAnecdotes(event.target.value))
  }

  return (
    <>
      <div>
        Filter: <input onChange={handleChange} />
      </div>
    </>
  )
}
