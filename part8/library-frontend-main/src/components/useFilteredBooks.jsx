import { useQuery } from "@apollo/client";
import { useState } from "react";
import { ALL_BOOKS } from "../queries";

export default function useFilteredBooks() {
  const [selectedGenre, setSelectedGenre] = useState("");
  const {
    data: allData,
    loading: allLoading,
    error: allError,
  } = useQuery(ALL_BOOKS);
  const { data, loading, error, refetch } = useQuery(ALL_BOOKS, {
    variables: { genre: selectedGenre || null },
  });

  const allBooks = allData?.allBooks || [];
  const filteredBooks = data?.allBooks || [];
  const allGenres = [...new Set(allBooks.flatMap((book) => book.genres))];

  const filterByGenre = (genre) => {
    setSelectedGenre(genre);
    refetch({ genre: genre || null });
  };

  return {
    loading: loading || allLoading,
    error: error || allError,
    filteredBooks,
    allGenres,
    selectedGenre,
    filterByGenre,
  };
}
