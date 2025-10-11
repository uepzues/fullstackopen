import useFilteredBooks from './useFilteredBooks'

export default function Books() {
  const {
    loading,
    error,
    filteredBooks,
    allGenres,
    selectedGenre,
    filterByGenre,
  } = useFilteredBooks()

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div>
      <h2>books</h2>
      <div>
        <h3>{`In genre ${selectedGenre}` || 'All'}</h3>
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
      <div>
        {allGenres.map((genre, idx) => {
          return (
            <button
              key={idx}
              onClick={() => filterByGenre(genre)}>
              {genre}
            </button>
          )
        })}
        <button onClick={() => filterByGenre('')}>All</button>
      </div>
    </div>
  )
}
