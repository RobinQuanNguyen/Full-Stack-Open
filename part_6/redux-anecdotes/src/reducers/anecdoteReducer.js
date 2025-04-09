import { createSlice } from '@reduxjs/toolkit'

// Initial state for anecdotes (simulating loading from a backend or database)
const initialState = [
  { content: 'If it hurts, do it more often', id: 1, votes: 0 },
  { content: 'Adding manpower to a late software project makes it later!', id: 2, votes: 0 },
  { content: 'The first 90 percent of the code accounts for the first 90 percent of the development time... The remaining 10 percent of the code accounts for the other 90 percent of the development time.', id: 3, votes: 0 },
  { content: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', id: 4, votes: 0 },
  { content: 'Premature optimization is the root of all evil.', id: 5, votes: 0 },
  { content: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.', id: 6, votes: 0 }
]

// Create the slice with reducers and actions
const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    // Action to vote for an anecdote
    voteAnecdote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find((n) => n.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      }
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : changedAnecdote
      )
    },
    // Action to add a new anecdote
    addAnecdote(state, action) {
      const newAnecdote = action.payload
      state.push(newAnecdote) // Add new anecdote to the state
    },
    // Action to set all anecdotes (if you need to replace the entire list of anecdotes)
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

// Export actions
export const { voteAnecdote, addAnecdote, setAnecdotes } = anecdotesSlice.actions

// Example of a thunk to simulate fetching anecdotes (without the actual service)
export const initialAnecdotes = () => {
  return async (dispatch) => {
    // Simulate loading data from a "service" (can replace this with actual API call)
    const anecdotes = initialState
    dispatch(setAnecdotes(anecdotes)) // Dispatch the fetched anecdotes to Redux
  }
}

// Action to create a new anecdote
export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = {
      content,
      id: Math.floor(Math.random() * 1000000),  // Generate unique ID
      votes: 0,
    }
    dispatch(addAnecdote(newAnecdote))  // Dispatch the new anecdote to Redux store
  }
}

export default anecdotesSlice.reducer
