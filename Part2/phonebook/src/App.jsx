/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import services from './services/persons';
import './index.css'

//Notification 
const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}

//Search
const Filter = ({ searchTerm, handleSearchChange }) => (
  <div>
    Filter shown with <input value={searchTerm} onChange={handleSearchChange} />
  </div>
);

//Form to add person or change number
const PersonForm = ({
  Name,
  Number,
  handleNameChange,
  handleNumberChange,
  addPerson,
}) => (
  <form onSubmit={addPerson}>
    <div>
      Name: <input value={Name} onChange={handleNameChange} />
    </div>
    <div>
      Number: <input value={Number} onChange={handleNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

const Persons = ({ persons, searchTerm, setPersons }) => {
  const handleDelete = (id, name) => {
    const confirmed = window.confirm('Delete ' + name);
    
    if (confirmed) {
      services.deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));
          console.log(name + ' deleted from the phonebook.');
        })
        .catch(error => {
          console.error('Error deleting data:' + error);
        });
    }
  };
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div>
      {filteredPersons.map((person) => (
        <div key={person.id}>
          <p>
            {person.name} - {person.number}
          </p>
          <button onClick={() => handleDelete(person.id, person.name)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [Name, setName] = useState('');
  const [Number, setNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('')

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();

    const existingPerson = persons.find((person) => person.name === Name);

    if (existingPerson) {
      const confirmed = window.confirm(
        Name + ' is already added to phonebook, replace the old number with a new one?'
      );
  
      if (confirmed) {
        const updatedPerson = { ...existingPerson, number: Number };
  
        services.updatePerson(existingPerson.id, updatedPerson)
          .then(() => {
            setPersons(persons.map(person =>
              person.id === existingPerson.id ? updatedPerson : person
            ));
            setName('');
            setNumber('');
            console.log(Name + "'s phone number updated.");
            setErrorMessage(
              Name + "'s phone number updated."
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
          .catch(error => {
            console.error('Error updating data:' + error);
          });
      }
    } else {const newPerson = { id: (persons.length + 1).toString(), name: Name, number: Number };

      services.addPerson(newPerson)
        .then(addedPerson => {
          setPersons([...persons, addedPerson]);
          setName('');
          setNumber('');
          console.log('Hooray!! ' + Name + ' is added to the phonebook!!');
          setErrorMessage(
            'Added ' + Name
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
        .catch(error => {
          console.error('Error saving data:' + error);
        });
    }
  };

  useEffect(() => {
    services.getAllPersons()
      .then(initialPersons => {
        setPersons(initialPersons);
      })
      .catch(error => {
        console.error('Error fetching data:' + error);
      });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Filter searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
      <h3>Add a new</h3>
      <PersonForm
        Name={Name}
        Number={Number}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} searchTerm={searchTerm} setPersons={setPersons} />
    </div>
  );
};

export default App;
