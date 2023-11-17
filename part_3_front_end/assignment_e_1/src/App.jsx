import { useState, useEffect } from 'react'
import axios from 'axios'
import Person from './components/Person'
import React from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('');
  const [errorMessage, setErrorMessage] = useState('')

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
    const that_person = persons.find((person) => person.name === newName)
    if (persons.some((person) => person.name === newName && person.number === newNumber)) {
      alert(`${newName} is already in the list.`)
      return
    }
    else if (persons.some((person) => person.name === newName && person.number !== newNumber)) {
      //const that_person = persons.find((person) => person.name === newName)
      const updatedPerson = {...that_person, number: newNumber}

      personService
        .update(that_person.id, updatedPerson)
        .then((response) => {
          setPersons(
            persons.map((person) => 
               person.id === that_person.id ? response.data : person)
            //persons.concat(response.data) Cannot use this because there will be 2 "person" that have the same id
          )
          setErrorMessage({
            message: `Changed ${that_person.name}`,
            code: 1, 
          })
          // setErrorMessage(
          //   `Changed ${that_person.name}`
          // )
          setTimeout(() => {
            setErrorMessage({message: '', code: 0})
          }, 5000)
        })
        .catch((error) => {
          setErrorMessage({
            message: `Information of ${updatedPerson.name} has been removed from server`,
            code: 2,
          })
          // setErrorMessage(
          //   `Information of ${updatedPerson.name} has been removed from server`
          // )
          setTimeout(() => {
            setErrorMessage({message: '', code: 0})
          }, 5000)
        })
    }
    else 
    {
      console.log('Button clicked', event.target)
      const personObject = {
        name: newName,
        number: newNumber,
        //id: persons.length + 1
      }

      personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))

          setErrorMessage({
            message: `Added ${newName}`,
            code: 1
          })
          // setErrorMessage(
          //   `Added ${newName}`
          // )
          setTimeout(() => {
            setErrorMessage({message: '', code: 0})
          }, 5000)
        })
        .catch(error => {
          setErrorMessage({
            message: error.response.data.error,
            code: 2
          })
          setTimeout(() => {
            setErrorMessage({message: '', code: 0})
          }, 5000)
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
    //typeof person.name === 'string' && typeof filter === 'string' && 
    person.name.toLowerCase().includes(filter.toLowerCase())
);

  const handleFindPerson  = (event) => {
    const value = event.target.value || '';
    setFilter(value)
  }

  const handleDeleteOf = (_id, name) => {
    const confirm_check = window.confirm(`Delete ${name}?`)

    if (confirm_check === false) {
      return
    }

    axios
      .delete(`http://localhost:3001/api/persons/${_id}`)
      .then((response) => {
        console.log("Delete successfully")
        //Update the list after delete
        setPersons(persons.filter(person => person._id !== _id))

        setErrorMessage({
          message: `Deleted ${name}`,
          code: 2
        })
        setTimeout(() => {
          setErrorMessage({message: '', code: 0})
        }, 5000)


      })
  }


  return (
    <div>
      <h2>Phonebook</h2>

      {errorMessage.message && (<Notification message={errorMessage.message} code={errorMessage.code} /> )}

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
          key={person._id} 
          name={person.name} 
          number={person.number}
          handleDelete={() => handleDeleteOf(person._id, person.name)}
        />
      ))
      }
    </div>
  )

}

export default App