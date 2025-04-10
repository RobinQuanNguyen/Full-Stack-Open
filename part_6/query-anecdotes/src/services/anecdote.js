import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

// Define functions
const getAnecdotes = async () => {
  try {
    const response = await axios.get(baseUrl)
    return response.data
  } catch (error) {
    throw new Error('Failed to fetch anecdotes. Server may be down or unreachable.')
  }
}

const createAnecdote = async (anecdote) => {
  try {
    const response = await axios.post(baseUrl, anecdote)
    return response.data
  } catch (error) {
    throw new Error('Failed to create a new anecdote. Please try again later.')
  }
}

const updateAnecdote = async (anecdote) => {
  try {
    const response = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote)
    return response.data
  } catch (error) {
    throw new Error('Failed to update the anecdote. Please try again later.')
  }
}

// Export all functions as a default export
const anecdoteService = {
  getAnecdotes,
  createAnecdote,
  updateAnecdote
}

export default anecdoteService
