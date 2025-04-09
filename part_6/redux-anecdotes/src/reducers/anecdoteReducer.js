import { createSlice } from '@reduxjs/toolkit'
import { getAll, createNew, updateVotes } from '../services/anecdote'  // Named imports

const initialState = []

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    voteAnecdoteSuccess(state, action) {
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
    addAnecdote(state, action) {
      const newAnecdote = action.payload
      state.push(newAnecdote)  // Add the new anecdote to the store
    },
    setAnecdotes(state, action) {
      return action.payload  // Set the anecdotes to the fetched data
    },
  },
})

// Export actions
export const { voteAnecdoteSuccess, addAnecdote, setAnecdotes } = anecdotesSlice.actions

// Async action to initialize anecdotes from the backend
export const initialAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await getAll()  // Fetch all anecdotes
    dispatch(setAnecdotes(anecdotes))
  }
}

// Action to create a new anecdote (persist in backend and Redux store)
export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await createNew(content)  // Create the new anecdote in the backend
    dispatch(addAnecdote(newAnecdote))  // Add the newly created anecdote to the Redux store
  }
}

// Action to update votes for an anecdote
export const voteAnecdote = (id) => {
  return async (dispatch) => {
    dispatch(voteAnecdoteSuccess(id))  // Update the vote count in Redux store
    await updateVotes(id)  // Persist the vote in the backend
  }
}

export default anecdotesSlice.reducer
