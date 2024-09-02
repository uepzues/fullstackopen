export default function Persons({ filteredPersons, delContact }) {
  return (
    <div>
      {filteredPersons.map((person) => (
        <div key={person.name}>
          {person.name} : {person.number}
          <button onClick={() => delContact(person.id)}>delete</button>
        </div>
      ))}
      
    </div>
  );
}
