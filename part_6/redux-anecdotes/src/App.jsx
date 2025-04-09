import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'  // Import the new AnecdoteList component
import Filter from './components/Filter'
import Notification from './components/Notification'  // Import the Notification component

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />  {/* Use Filter to filter anecdotes */}
      <Notification />  {/* Display notification */}
      <AnecdoteList />  {/* Use AnecdoteList to display the list of anecdotes */}
      <AnecdoteForm />  {/* Use AnecdoteForm to create new anecdotes */}
    </div>
  )
}

export default App
