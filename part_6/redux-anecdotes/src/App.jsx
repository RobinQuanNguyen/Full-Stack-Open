import React, { useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { useDispatch } from 'react-redux'
import { initialAnecdotes } from './reducers/anecdoteReducer'  // Import the action to fetch anecdotes

const App = () => {
  const dispatch = useDispatch()

  // Dispatch initialAnecdotes action when the component mounts
  useEffect(() => {
    dispatch(initialAnecdotes())  // Fetch the anecdotes from the backend on app launch
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
