import { useState } from 'react';
import Filter from './components/filter';
import PersonForm from './components/PersonForm';
import Person from './components/Person';


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' , number: "040-1234567", id: 1},
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('');

  const addName = (event) => {
    event.preventDefault()

    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already in the list.`)
      return
    }
    else 
    {
      console.log('Button clicked', event.target)
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
      setPersons([...persons, personObject])
    }

    
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }


  const foundPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleFindPerson  = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} handleFindPerson={handleFindPerson}/>
      
      <h2>add a new</h2>

      <PersonForm 
          newName={newName}
          newNumber={newNumber}
          handleNameChange={handleNameChange}
          handleNumberChange={handleNumberChange}
          addName={addName}
      />

      <h2>Numbers</h2>
      {/* {filteredPersons.map((person, index) => (
        <div key={index}>
          {person.name}: {person.number} 
        </div>
        ))} */}

      {foundPersons.map((person) => (
        <Person key={person.id} name={person.name} number={person.number}/>
      ))
      }

    </div>
  );
};

export default App;
