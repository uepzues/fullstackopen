import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { ALL_BOOKS } from '../queries'

const useFilteredBooks = () => {
  const { data, loading, error } = useQuery(ALL_BOOKS)
  const [selectedGenre, setSelectedGenre] = useState('')
  const [filteredBooks, setFilteredBooks] = useState([])

  // When data or selectedGenre changes, update the filtered list
  useEffect(() => {
    if (!data || !data.allBooks) return

    if (selectedGenre === '') {
      setFilteredBooks(data.allBooks)
    } else {
      const filtered = data.allBooks.filter((book) =>
        book.genres.includes(selectedGenre)
      )
      setFilteredBooks(filtered)
    }
  }, [data, selectedGenre])

  const allBooks = data?.allBooks || []
  const allGenres = [...new Set(allBooks.flatMap((book) => book.genres))]

  const filterByGenre = (genre) => {
    setSelectedGenre(genre)
  }

  return {
    loading,
    error,
    filteredBooks,
    allGenres,
    selectedGenre,
    filterByGenre,
  }
}

export default useFilteredBooks
