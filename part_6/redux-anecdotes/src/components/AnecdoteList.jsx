import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  // State to handle whether anecdotes are sorted
  const [sorted, setSorted] = useState(false)

  // Function to handle voting
  const vote = (id) => {
    dispatch(voteAnecdote(id)) // Dispatch the vote action
  }

  // Function to toggle sorting
  const toggleSort = () => {
    setSorted(!sorted)
  }

  // Sort anecdotes by votes if sorted is true
  const sortedAnecdotes = sorted
    ? [...anecdotes].sort((a, b) => b.votes - a.votes) // Sort in descending order by votes
    : anecdotes

  return (
    <div>
      {/* List of anecdotes */}
      {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}

      {/* Sort button placed below the create button */}
      <div style={{ marginTop: '20px' }}>
        <button onClick={toggleSort}>
          {sorted ? 'Unsort' : 'Sort'} by votes
        </button>
      </div>
    </div>
  )
}

export default AnecdoteList
