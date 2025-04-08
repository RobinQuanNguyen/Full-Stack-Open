import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

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
  
  // Get filter and anecdotes from the Redux store
  const filter = useSelector(state => state.filter)  // The filter state
  const anecdotes = useSelector(state => state.anecdotes)  // The list of anecdotes
  
  // Filter anecdotes based on the filter state
  const filteredAnecdotes = anecdotes.filter(anecdote =>
    anecdote.content.toLowerCase().includes(filter.toLowerCase())  // Filter by content matching the filter term
  )

  const [sorted, setSorted] = useState(false)

  // Function to handle voting
  const vote = (id) => {
    dispatch(voteAnecdote(id))  // Dispatch the vote action
  }

  // Function to toggle sorting
  const toggleSort = () => {
    setSorted(!sorted)
  }

  // Sort anecdotes by votes if sorted is true
  const sortedAnecdotes = sorted
    ? [...filteredAnecdotes].sort((a, b) => b.votes - a.votes)  // Sort by votes
    : filteredAnecdotes

  return (
    <div>
      <button onClick={toggleSort}>
        {sorted ? 'Unsort' : 'Sort'} by votes
      </button>

      {/* Display filtered anecdotes */}
      {sortedAnecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => vote(anecdote.id)}  // Handle voting
        />
      ))}
    </div>
  )
}

export default AnecdoteList
