import { useState, useEffect } from "react";
import axios from "axios";
import SearchFilter from "./components/SearchFilter";
import FormPerson from "./components/FormPerson";
import Persons from "./components/Persons";

export default function App() {
  const [persons, setPersons] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [newContact, setNewContact] = useState({
    newName: "",
    newValue: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((res) => setPersons(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewContact({ ...newContact, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (persons.some((person) => person.name === newContact.newName)) {
      alert(`${newContact.newName} is already added to phonebook`);
      return;
    }

    setPersons([
      ...persons,
      { name: newContact.newName, number: newContact.newNumber },
    ]);
    setNewContact({ newName: "", newValue: "" });
  };

  const handleSearch = (e) => {
    setSearchName(e.target.value);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchName.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchFilter onChange={handleSearch} />

      <h2>Add a new</h2>
      <FormPerson
        onSubmit={handleSubmit}
        onChange={handleChange}
        newContact={newContact}
      />

      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} />
    </div>
  );
}
