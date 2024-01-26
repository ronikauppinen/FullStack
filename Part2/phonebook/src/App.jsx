import React, { useState } from 'react';

const Filter = ({ searchTerm, handleSearchChange }) => (
  <div>
    Filter shown with <input value={searchTerm} onChange={handleSearchChange} />
  </div>
);

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

const Persons = ({ persons, searchTerm }) => {
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {filteredPersons.map((person) => (
        <p key={person.id}>
          {person.name} - {person.number}
        </p>
      ))}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
    { name: 'Saul Goodman', number: '(505) 503-4455', id: 5 },
  ]);

  const [Name, setName] = useState('');
  const [Number, setNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

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

    if (persons.some((person) => person.name === Name)) {
      alert(Name + ' is already in the phonebook');
      console.log(Name + ' is already in the phonebook :(');
    } else {
      const newPerson = { name: Name, number: Number, id: persons.length + 1 };
      setPersons([...persons, newPerson]);
      setName('');
      setNumber('');
      console.log('Hooray!! ' + Name + ' is added to the phonebook!!');
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>

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

      <Persons persons={persons} searchTerm={searchTerm} />
    </div>
  );
};

export default App;
