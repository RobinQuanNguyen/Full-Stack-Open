import { useState, useEffect } from 'react'
import axios from 'axios'
import Person from './components/Person'
import React from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

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
      <Filter filter = {filter} handleFindPerson = {handleFindPerson}/>

      <h2>Add a new</h2>
      <PersonForm 
          newName={newName}
          newNumber={newNumber}
          // handleNameChange={handleNameChange}
          // handleNumberChange={handleNumberChange}
          addName={addName}
      />

      <h2>Numbers</h2>
      {foundPersons.map((person) => (
        <Person key={person.id} name={person.name} number={person.number}/>
      ))
      }
    </div>
  )

}

export default App