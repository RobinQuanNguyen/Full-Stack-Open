import Togglable from "./Togglable"
import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, addLike }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [likes, setLikes] = useState(blog.likes)

  const handleLike = (blog) => {
    blog.likes = blog.likes + 1
    blogService
      .update(blog.id, blog)
      .then((returnedBlog) => {
        setLikes(returnedBlog.likes)
        if (addLike) {
          addLike(blog)
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  const handleDelete = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      console.log('delete', blog.id)
      blogService
        .deleteBlog(blog.id)
        .then(() => {
          window.location.reload()
        })
        .catch(error => {
          console.log(error)
        })
    }
  }



  return (

    <div style={blogStyle} className="blog">
      <div>
        {blog.title} {blog.author}
      </div>
      <Togglable buttonLabel="view">
        <div>{blog.url} </div> 
        <div>{blog.likes} <button onClick={() => handleLike(blog)}>like</button></div>
        <div>{blog.user.name} </div>
        <p></p>
        <button onClick={() => handleDelete(blog)}>remove</button>
        <p></p>
      </Togglable>
  </div>
)}

export default Blog