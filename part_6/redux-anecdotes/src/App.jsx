import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'  // Import the new AnecdoteList component

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList />  {/* Use AnecdoteList to display the list of anecdotes */}
      <AnecdoteForm />  {/* Use AnecdoteForm to create new anecdotes */}
    </div>
  )
}

export default App
