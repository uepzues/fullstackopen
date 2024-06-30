import React from "react";

export default function Persons({ filteredPersons }) {
  return (
    <div>
      {filteredPersons.map((person) => (
        <div key={person.name}>
          {person.name} : {person.number}
        </div>
      ))}
    </div>
  );
}
