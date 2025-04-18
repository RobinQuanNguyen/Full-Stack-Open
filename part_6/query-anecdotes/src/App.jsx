import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import AnecdoteForm from "./components/AnecdoteForm"
import Notifications from "./components/Notification"
import anecdoteService from "./services/anecdote"
import { useNotificationHandler } from "./context/NotificationContext"

const App = () => {
  const queryClient = useQueryClient()
  const notificationHandler = useNotificationHandler()

  const updateAnecdoteMutation = useMutation({
    mutationFn: anecdoteService.updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(
        ['anecdotes'],
        anecdotes.map((anecdote) =>
          anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
        )
      )
      const id = Math.floor(Math.random() * 1000000)
      notificationHandler({ content: `you voted '${updatedAnecdote.content}'`, id })
    }
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }

  const { isLoading, isError, data: anecdotes } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: anecdoteService.getAnecdotes,
    retry: 1,
    refetchOnWindowFocus: false,
  })

  if (isLoading) {
    return <div>loading data...</div>
  }

  if (isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notifications />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
