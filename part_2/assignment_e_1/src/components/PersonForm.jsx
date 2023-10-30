import React from 'react'

const PersonForm = ({newName, newNumber, handleNameChange, handleNumberChange, addName}) => {
    return (
        <form onSubmit={addName} >
        <div>
            <p>name: <input value={newName} onChange={handleNameChange} /> </p>
            <p>number: <input value={newNumber} onChange={handleNumberChange} /> </p>
          <button type="submit">Add</button>
        </div>
      </form>
    )
}

export default PersonForm