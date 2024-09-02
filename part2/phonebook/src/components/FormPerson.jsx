export default function FormPerson({ onSubmit, onChange, newContact }) {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          name:{" "}
          <input
            name="newName"
            value={newContact.newName || ""}
            onChange={onChange}
          />
        </div>
        <div>
          number:{" "}
          <input
            name="newNumber"
            type="tel"
            value={newContact.newNumber || ""}
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
