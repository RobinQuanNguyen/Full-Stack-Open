import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const [newAnecdote, setNewAnecdote] = useState('')
  const dispatch = useDispatch()

  const handleNewAnecdoteChange = (event) => {
    setNewAnecdote(event.target.value)
  }

  const handleAddAnecdote = (event) => {
    event.preventDefault()
    if (newAnecdote.trim() !== '') {
      dispatch(addAnecdote(newAnecdote)) // Dispatch the action to add the new anecdote
      setNewAnecdote('') // Reset the input field after submission
    }
  }

  return (
    <form onSubmit={handleAddAnecdote}>
      <div>
        <input
          value={newAnecdote}
          onChange={handleNewAnecdoteChange}
          placeholder="Enter a new anecdote"
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default AnecdoteForm
