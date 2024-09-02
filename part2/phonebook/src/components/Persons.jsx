export default function Persons({ filteredPersons, delContact }) {
  return (
    <div className="persons">
      {filteredPersons.map((person) => (
        <div key={person.name}>
          {person.name} : {person.number}
          <button onClick={() => delContact(person.id)}>del</button>
        </div>
      ))}
      
    </div>
  );
}
