import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotificationTime } from '../reducers/notificationReducer'  // Import the notification action

const AnecdoteForm = () => {
  const [newAnecdote, setNewAnecdote] = useState('')
  const dispatch = useDispatch()

  const handleChange = (event) => {
    setNewAnecdote(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (newAnecdote.trim() !== '') {
      dispatch(createAnecdote(newAnecdote))  // Dispatch the action to create the new anecdote
      dispatch(setNotificationTime(`You created a new anecdote: '${newAnecdote}'`, 5))  // Display notification for 5 seconds
      setNewAnecdote('')  // Clear the input field
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          value={newAnecdote}
          onChange={handleChange}
          placeholder="Enter a new anecdote"
        />
      </div>
      <button type="submit">Create</button>
    </form>
  )
}

export default AnecdoteForm
