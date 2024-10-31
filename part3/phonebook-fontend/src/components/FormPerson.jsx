export default function FormPerson({ onSubmit, onChange, newContact }) {
  return (
    <div className="formPerson">
      <form onSubmit={onSubmit}>
        <div>
          name
          <br />
          <input
            required
            name="newName"
            value={newContact.newName}
            onChange={onChange}
          />
        </div>
        <div>
          number <br />
          <input
            required
            name="newNumber"
            type="tel"
            value={newContact.newNumber}
            onChange={onChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
}
