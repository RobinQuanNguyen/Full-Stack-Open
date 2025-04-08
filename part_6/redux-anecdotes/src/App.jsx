import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'  // Import the new AnecdoteList component
import Filter from './components/Filter'

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />  {/* Use Filter to filter anecdotes */}
      <AnecdoteList />  {/* Use AnecdoteList to display the list of anecdotes */}
      <AnecdoteForm />  {/* Use AnecdoteForm to create new anecdotes */}
    </div>
  )
}

export default App
