import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { ALL_BOOKS } from '../queries'

export default function useFilteredBooks() {
  const [selectedGenre, setSelectedGenre] = useState('')
  const { data, loading, error, refetch } = useQuery(ALL_BOOKS, {
    variables: { genre: selectedGenre || null },
  })

  const allBooks = data?.allBooks || []
  const allGenres = [...new Set(allBooks.flatMap((book) => book.genres))]

  const filterByGenre = (genre) => {
    setSelectedGenre(genre)
    refetch({ genre: genre || null })
  }

  return {
    loading,
    error,
    filteredBooks: allBooks,
    allGenres,
    selectedGenre,
    filterByGenre,
  }
}
