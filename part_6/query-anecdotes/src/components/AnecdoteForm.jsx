import { useMutation, useQueryClient } from '@tanstack/react-query'
import anecdoteService from "../services/anecdote"
import { useNotificationHandler } from "../context/NotificationContext"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const notificationHandler = useNotificationHandler()

  const newAnecdoteMutation = useMutation({
    mutationFn: anecdoteService.createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes']) || []
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))

      const id = Math.floor(Math.random() * 1000000)
      notificationHandler({ content: `you created '${newAnecdote.content}'`, id })
    },
    onError: (error) => {
      const id = Math.floor(Math.random() * 1000000)
      notificationHandler({ content: error.message, id })
    }
  })

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    // Enforce the "at least 5 characters" validation
    if (content.length < 5) return

    newAnecdoteMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>Create a new anecdote</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
