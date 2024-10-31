import { useState, useEffect } from "react";
import SearchFilter from "./components/SearchFilter";
import FormPerson from "./components/FormPerson";
import Persons from "./components/Persons";
import contactService from "./services/contacts";
import Notification from "./components/Notification";

export default function App() {
  const [persons, setPersons] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [newContact, setNewContact] = useState({
    newName: "",
    newNumber: "",
  });
  const [notif, setNotif] = useState(null);
  const [errNotif, setErrNotif] = useState(null);

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

    const existingPerson = persons.find((p) => p.name === newContact.newName);

    if (existingPerson) {
      if (
        window.confirm(
          `${newContact.newName} is already added to phonebook do you want to change the number?`
        )
      ) {
        contactService
          .update(existingPerson.id, contactObject)
          .then((res) => {
            setPersons(
              persons.map((per) => (per.id !== existingPerson.id ? per : res))
            );
            setNotif(`Changed ${newContact.newName}'s number`);
            setTimeout(() => {
              setNotif(null);
            }, 5000);
          })
          .catch((err) => {
            console.log(err.message);
            setErrNotif(
              `Information of ${newContact.newName} has already been removed from server`
            );
            setTimeout(() => {
              setErrNotif(null);
            }, 5000);
            setPersons(
              persons.filter((person) => person.name !== newContact.newName)
            );
          });
        setNewContact({ newName: "", newNumber: "" });
      }
      return;
    }

    contactService
      .create(contactObject)
      .then((response) => {
        setPersons(persons.concat(response));

        setNotif(`Added ${newContact.newName}`);
        setTimeout(() => {
          setNotif(null);
        }, 5000);
      })
      .catch((err) => {
        console.log(err);
        setErrNotif("An error occurred while adding the contact.");
        setTimeout(() => {
          setErrNotif(null);
        }, 5000);
      });

    setNewContact({ newName: "", newNumber: "" });
  };

  const delContact = (id) => {
    console.log("from frontend", id);

    const foundPerson = persons.find((person) => person.id === id);

    if (
      window.confirm(
        `Do you want to delete ${
          foundPerson ? foundPerson.name : "this entry"
        }?`
      )
    ) {
      contactService
        .delContact(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));

          if (foundPerson) {
            setNotif(`Deleted ${foundPerson.name}`);
          }
          setTimeout(() => {
            setNotif(null);
          }, 5000);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleSearch = (e) => {
    return setSearchName(e.target.value);
  };

  const filteredPersons = persons.filter((person) =>
    person?.name.toLowerCase().includes(searchName.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Phonebook</h1>
      <Notification message={notif} notification="notification" />
      <Notification message={errNotif} notification="error" />
      <SearchFilter onChange={handleSearch} />

      <h2>Add new</h2>
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
