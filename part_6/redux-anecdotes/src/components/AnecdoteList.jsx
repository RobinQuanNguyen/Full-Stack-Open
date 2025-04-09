import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotificationTime } from '../reducers/notificationReducer'  // Import the notification action

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()

  // Access filter and anecdotes from Redux store
  const filter = useSelector(state => state.filter)  // The filter state
  const anecdotes = useSelector(state => state.anecdotes)  // The list of anecdotes
  
  // Filter anecdotes based on the filter state (search term)
  const filteredAnecdotes = anecdotes.filter(anecdote =>
    anecdote.content.toLowerCase().includes(filter.toLowerCase())  // Filter by content matching the filter term
  )

  // State to handle sorting
  const [sorted, setSorted] = useState(false)

  // Function to handle voting
  const vote = (id, content) => {
    dispatch(voteAnecdote(id))  // Dispatch vote action for the anecdote
    dispatch(setNotificationTime(`You voted for '${content}'`, 5))  // Display notification for 5 seconds
  }

  // Function to toggle sorting
  const toggleSort = () => {
    setSorted(!sorted)
  }

  // Sort anecdotes by votes if sorted is true
  const sortedAnecdotes = sorted
    ? [...filteredAnecdotes].sort((a, b) => b.votes - a.votes)  // Create a copy and sort
    : filteredAnecdotes

  return (
    <div>
      {/* Button to toggle sorting */}
      <button onClick={toggleSort}>
        {sorted ? 'Unsort' : 'Sort'} by votes
      </button>

      {/* Display filtered and sorted anecdotes */}
      {sortedAnecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => vote(anecdote.id, anecdote.content)}  // Pass content for notification
        />
      ))}
    </div>
  )
}

export default AnecdoteList
