import { useEffect, useState } from 'react'
import useFilteredBooks from './useFilteredBooks'
import { useQuery } from '@apollo/client'
import { ME } from '../queries'

export default function Recommendation() {
  const { data: meData, loading: meLoading, error: meError } = useQuery(ME)

  const {
    loading: booksLoading,
    error: booksError,
    filteredBooks,
    allGenres,
    selectedGenre,
    filterByGenre,
  } = useFilteredBooks()

  // console.log(meData.me.favouriteGenre)
  useEffect(() => {
    if (meData && meData.me.favouriteGenre) {
      filterByGenre(meData.me.favouriteGenre)
    }
  }, [meData, filterByGenre])

  if (meLoading || booksLoading) {
    return <div>Loading...</div>
  }

  if (meError) {
    return <div>Error fetching user: {meError.message}</div>
  }

  if (booksError) {
    return <div>Error fetching books: {booksError.message}</div>
  }

  return (
    <div>
      <div>
        books in your favourite genre <h4>{selectedGenre}</h4>
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((b) => (
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
