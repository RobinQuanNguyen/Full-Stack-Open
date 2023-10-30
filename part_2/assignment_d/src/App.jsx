import { useState, useEffect } from 'react'
import axios from 'axios'
import Person from './components/Person'
import React from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('');

  useEffect(() => {
    // axios
    //   .get('http://localhost:3001/persons')
    //   .then(response => {
    //     setPersons(response.data)
    //   })
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()

    if (persons.some((person) => person.name === newName && person.number === newNumber)) {
      alert(`${newName} is already in the list.`)
      return
    }
    else if (persons.some((person) => person.name === newName && person.number !== newNumber)) {
      const that_person = persons.find((person) => person.name === newName)
      const updatedPerson = {...that_person, number: newNumber}

      personService
        .update(that_person.id, updatedPerson)
        .then((response) => {
          setPersons(
            persons.map((person) => 
               person.id === that_person.id ? response.data : person)
            //persons.concat(response.data) Cannot use this because there will be 2 "person" that have the same id
          )
        })
    }
    else 
    {
      console.log('Button clicked', event.target)
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
      //setPersons([...persons, personObject])
    //   axios
    //     .post('http://localhost:3001/persons', personObject)
    //     .then(response => {
    //       //console.log(response)
    //       setPersons(persons.concat(response.data))
          
    // })
      personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
        })
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

  const handleDeleteOf = (id, name) => {
    const confirm_check = window.confirm(`Delete ${name}?`)

    if (confirm_check === false) {
      return
    }

    axios
      .delete(`http://localhost:3001/persons/${id}`)
      .then((response) => {
        console.log("Delete successfully")
        //Update the list after delete
        setPersons(persons.filter(person => person.id !== id))
      })
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter = {filter} handleFindPerson = {handleFindPerson}/>

      <h2>Add a new</h2>
      <PersonForm 
          newName={newName}
          newNumber={newNumber}
          handleNameChange={handleNameChange}
          handleNumberChange={handleNumberChange}
          addName={addName}
      />

      <h2>Numbers</h2>
      {foundPersons.map((person) => (
        <Person 
          key={person.id} 
          name={person.name} 
          number={person.number}
          handleDelete={() => handleDeleteOf(person.id, person.name)}
        />
      ))
      }
    </div>
  )

}

export default App