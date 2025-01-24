import PropTypes from 'prop-types'

const Note = ({ note, toggleImportance, deleteNote }) => {
  const label = note.important ? 'make not important' : 'make important'

  return (
    <li className="note">
      {note.content}
      <button onClick={toggleImportance}>{label}</button>
      <button onClick={deleteNote}>Delete</button>
    </li>
  )
}

Note.propTypes = {
  note: PropTypes.object.isRequired,
  toggleImportance: PropTypes.func.isRequired,
  deleteNote: PropTypes.func.isRequired,
}

export default Note
