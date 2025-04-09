import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

// Fetch all anecdotes from the backend
export const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data  // Return the data from the response
}

// Create a new anecdote on the backend
export const createNew = async (content) => {
  const newAnecdote = { content, votes: 0 }
  const response = await axios.post(baseUrl, newAnecdote)  // POST request to create a new anecdote
  return response.data  // Return the newly created anecdote
}

// Update the votes of an anecdote on the backend
export const updateVotes = async (id) => {
  const anecdote = await axios.get(`${baseUrl}/${id}`)
  const updatedAnecdote = { ...anecdote.data, votes: anecdote.data.votes + 1 }
  await axios.put(`${baseUrl}/${id}`, updatedAnecdote)
  return updatedAnecdote
}
