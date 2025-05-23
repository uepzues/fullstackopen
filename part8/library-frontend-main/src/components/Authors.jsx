import SetBirthYear from './SetBirthYear'

const Authors = ({ allAuthors }) => {
  if (!allAuthors) {
    return <div>No authors available</div>
  }
  const authors = [...allAuthors]

  return (
    <>
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>born</th>
              <th>books</th>
            </tr>
            {authors.map((a) => (
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <SetBirthYear authors={authors} />
      </div>
    </>
  )
}

export default Authors
