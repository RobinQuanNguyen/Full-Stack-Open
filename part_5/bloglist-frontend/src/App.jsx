import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const [message, setMessage] = useState('')
 
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')

    } catch (exception) {
      // setErrorMessage('Wrong credentials')
      // setTimeout(() => {
      //   setErrorMessage(null)
      // }, 5000)
      setUsername('')
      setPassword('')
      console.log('Wrong credentials')
      setMessage({
        message: 'wrong username or password',
        code: 2,
      })

      setTimeout(() => {
        setMessage({
          message: '',
          code: 0,
        })
      }, 5000)
    }
  }

  const handleCreateNewBlog = async (event) => {
    event.preventDefault()

    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    }

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
        setMessage({
          message: `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
          code: 1,
        })

        setTimeout(() => {
          setMessage({message: '', code: 0})
        }, 5000)

        // Fetch blogs from server again
        blogService.getAll().then(blogs =>
          setBlogs(blogs)
      )
      })
  }


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      
    }
  }, [])

  

  const loginForm = () => (
    <form onSubmit={handleLogin}> 
        <h2>log in to application</h2>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
        </div>
        <button type="submit">login</button>
      </form>
  )


  const blogList = () => (
    <div>
      <h2>blogs</h2>

      <p>{user.name} logged in</p> 
      
        <button onClick={() => {
          window.localStorage.clear()
          setUser(null)
        }}>logout</button>

        <p></p>

        <button onClick={() => {
          setBlogs([...blogs].sort((a, b) => b.likes - a.likes))
        }}>Sort by likes</button>
      

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  return (
    <div>
      <Notification message={message.message} code={message.code}/>
      {!user && loginForm()}
      {user && <div>
        {/* {addNoteForm()} */}
        <Togglable buttonLabel="new blog">
          <BlogForm
            newTitle={newTitle}
            newAuthor={newAuthor}
            newUrl={newUrl}
            handleCreateNewBlog={handleCreateNewBlog}
            handleTitleChange={({ target }) => setNewTitle(target.value)}
            handleAuthorChange={({ target }) => setNewAuthor(target.value)}
            handleUrlChange={({ target }) => setNewUrl(target.value)}

          />
        </Togglable>
        {blogList()}
        </div>}
    </div>
  )
}

export default App