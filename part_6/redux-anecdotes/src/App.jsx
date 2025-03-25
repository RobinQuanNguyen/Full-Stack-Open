import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote, addAnecdote } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const [newAnecdote, setNewAnecdote] = useState('')
  const [sorted, setSorted] = useState(false)

  // Function to vote for an anecdote
  const vote = (id) => {
    dispatch(voteAnecdote(id)) // Dispatch the action creator for voting
  }

  // Function to handle new anecdote creation
  const handleNewAnecdoteChange = (event) => {
    setNewAnecdote(event.target.value)
  }

  const handleAddAnecdote = (event) => {
    event.preventDefault()
    if (newAnecdote.trim() !== '') {
      dispatch(addAnecdote(newAnecdote)) // Dispatch the action creator for adding a new anecdote
      setNewAnecdote('') // Reset the input field
    }
  }

  // Function to toggle sorting based on votes
  const toggleSort = () => {
    setSorted(!sorted)
  }

  // Sort anecdotes by votes if sorted is true
  const sortedAnecdotes = sorted
    ? [...anecdotes].sort((a, b) => b.votes - a.votes) // Sort in descending order by votes
    : anecdotes

  return (
    <div>
      <h2>Anecdotes</h2>
      {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}

      <h2>create new</h2>
      <form onSubmit={handleAddAnecdote}>
        <div>
          <input
            value={newAnecdote}
            onChange={handleNewAnecdoteChange}
          />
        </div>
        <button type="submit">create</button>
      </form>

      <button onClick={toggleSort}>
        {sorted ? 'Unsort' : 'Sort'} by votes
      </button>
    </div>
  )
}

export default App
