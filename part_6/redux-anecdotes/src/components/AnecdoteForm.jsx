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
      // Dispatch createAnecdote to create the new anecdote on the backend
      dispatch(createAnecdote(newAnecdote))
      // Dispatch setNotificationTime to show a notification for 5 seconds
      dispatch(setNotificationTime(`You created a new anecdote: '${newAnecdote}'`, 5))
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
