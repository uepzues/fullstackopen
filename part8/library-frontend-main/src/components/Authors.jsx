import SetBirthYear from "./SetBirthYear";
import PropTypes from "prop-types";

const Authors = ({ allAuthors }) => {
  if (!allAuthors) {
    return <div className="noAuthors">No authors available</div>;
  }
  const authors = [...allAuthors];

  return (
    <>
      <div className="Authors">
        <h1>authors</h1>
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
  );
};

Authors.propTypes = {
  allAuthors: PropTypes.array,
};

export default Authors;
