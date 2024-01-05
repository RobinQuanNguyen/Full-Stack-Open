const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
    response.json(blogs)

    // Blog.find({}).then(blogs => {
    //   response.json(blogs)
    // })
  })

  // blogsRouter.get('/:id', async (request, response) => {
  //   const blog = await Blog.findById(request.params.id)
  //     //.then(blog => {
  //   if (blog) {
  //     response.json(blog)
  //   } else {
  //     response.status(404).end()
  //   }
  // //     })
  // //     .catch(error => next(error))
  // })

  const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
      return authorization.replace('Bearer ', '')
    }
    return null
  }

  blogsRouter.post('/', async (request, response) => {
    const body = request.body

    //const user = await User.findById(body.userId)
  
    //const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    // const decodedToken = jwt.verify(request.token, process.env.SECRET)
    // if (!decodedToken.id) {
    //   return response.status(401).json({ error: 'token invalid' })
    // }
    // const user = await User.findById(decodedToken.id)

    const user = request.user
    if (!user) return response.status(401).json({ error: 'token invalid'})

    const blog =  await (new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        user: user.id,
        // user: {
        //     username: user.username,
        //     name: user.name,
        //     id: user.id
        // },
        likes: body.likes || 0,
    })) .save()

    //const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(blog._id)
    await user.save()

    response.status(201).json(blog)
  
    // blog.save()
    //   .then(savedBlog => {
    //     response.status(201).json(savedBlog)
    //   })
    //   .catch(error => next(error))
    // if (blog) response.status(201).json(blog)
    // else response.status(400).end()
  })

  blogsRouter.delete('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id) // get the blog
    if (!blog) return response.status(404).json({ error: 'blog not found'})

    //const decodedToken = jwt.verify(request.token, process.env.SECRET) // get the token
    const user = request.user // get the user

    if (blog.user.toString() !== user.id.toString()) {
      // console.log('blog.user.id', blog.user.toString())
      // console.log('decodedToken.id', decodedToken.id)
      return response.status(401).json({ error: 'token invalid. You have to be the owner of the blog to delete it'})
    }


    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()

    // Blog.findByIdAndDelete(request.params.id)
    //   .then(() => {
    //     response.status(204).end()
    //   })
    //   .catch(error => next(error))
  })

  blogsRouter.put('/:id', async (request, response) => {
    const body = request.body
    const blog = await Blog.findById(request.params.id, {
      title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }, {new: true})

    response.status(200).json(blog)
    // const blog = {
    //     title: body.title,
    //     author: body.author,
    //     url: body.url,
    //     likes: body.likes
    // }
  
    // Blog.findByIdAndUpdate(request.params.id, note, { new: true })
    //   .then(updatedNote => {
    //     response.json(updatedNote)
    //   })
    //   .catch(error => next(error))
  })

  module.exports = blogsRouter