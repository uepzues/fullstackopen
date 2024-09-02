import { useState, useEffect } from "react";
import SearchFilter from "./components/SearchFilter";
import FormPerson from "./components/FormPerson";
import Persons from "./components/Persons";
import contactService from "./services/contacts";

export default function App() {
  const [persons, setPersons] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [newContact, setNewContact] = useState({
    newName: "",
    newNumber: "",
  });

  useEffect(() => {
    contactService.getContacts().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewContact({ ...newContact, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const contactObject = {
      name: newContact.newName,
      number: newContact.newNumber,
    };

    if (persons.some((person) => person.name === newContact.newName)) {
      if (
        window.confirm(
          `${newContact.newName} is already added to phonebook do you want to change the number?`
        )
      ) {
        const person = persons.find(
          (person) => person.name === newContact.newName
        );
        contactService.update(person.id, contactObject).then((res) => {
          return setPersons(persons.map((p) => (p.id !== person.id ? p : res)));
        });
        setNewContact({ newName: "", newNumber: "" });
      }
      return;
    }

    contactService
      .create(contactObject)
      .then((response) => setPersons(persons.concat(response)))
      .catch((err) => console.log(err));

    setNewContact({ newName: "", newNumber: "" });
  };

  const delContact = (id) => {
    contactService
      .delContact(id)
      .then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      })
      .catch((err) => console.log(err));
    console.log(id);
  };

  const handleSearch = (e) => {
    return setSearchName(e.target.value);
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
      <Persons filteredPersons={filteredPersons} delContact={delContact} />
    </div>
  );
}
