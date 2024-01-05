const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const bcrypt = require('bcrypt')
const User = require('../models/user')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})


// beforeEach(async () => {
//     await Blog.deleteMany({}) // empty the database
//     let blogObject = new Blog(initialBlogs[0]) // create a new blog object using initialBlogs[0]
//     await blogObject.save()
//     blogObject = new Blog(initialBlogs[1])
//     await blogObject.save()
//     blogObject = new Blog(initialBlogs[2])
//     await blogObject.save()
// })

describe('getting the blogs', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
    
    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')
    
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })
})

describe('checking for id', () => {
    test('id is defined', async() => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].id).toBeDefined()
    })
})

describe('checking the post', () => {

    test('a valid blog can be added', async () => {
        const newBlog = {
            title: "test blog",
            author: 'nemo',
            url: 'www.test.com',
            likes: 69,
        }

        // Sign up a new user
        const newUser = {
            username: 'test_user',
            name: 'just_a_bot',
            password: 'test_password'
        }
        await api
            .post('/api/users')
            .send(newUser)
        
        // Login user
        const loginUser = {
            username: 'test_user',
            password: 'test_password'
        }
        const loginMessage = await api
            .post('/api/login')
            .send(loginUser)
        
        const token = loginMessage.body.token

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await Blog.find({}) // get all the blogs
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1) // check if the length of the blogs is the same as the initial blogs + 1

        const contents = blogsAtEnd.map(n => n.title) //get the title of the blogs
        expect(contents).toContain('test blog')
    })

    test('if likes is missing, it will default to 0', async() => {
        const newBlog = {
            title: "test blog",
            author: "not nemo",
            url: "www.nemo.com",
        }

        // sign in 
        const loginUser = {
            username: 'test_user',
            password: 'test_password'
        }
        const loginMessage = await api
            .post('/api/login')
            .send(loginUser)
        
        const token = loginMessage.body.token

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        
        const blogsAtEnd = await Blog.find({})
        const addedBlog = blogsAtEnd.find(blog => blog.title === 'test blog')
        expect(addedBlog.likes).toBe(0)
    })

    test('if title and/or url is missing, it will return 400', async() => {
        const newBlog = {
            author: "nemo again",
            likes: 420,
        }

        // sign in 
        const loginUser = {
            username: 'test_user',
            password: 'test_password'
        }
        const loginMessage = await api
            .post('/api/login')
            .send(loginUser)
        
        const token = loginMessage.body.token

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(400)

        const blogsAtEnd = await Blog.find({})
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })
})

describe('test for deletion', () => {
    
    test('a blog can be deleted', async() => {
        // add a new blog
        const newBlog = {
            title: "test blog",
            author: 'nemo',
            url: 'www.test.com',
            likes: 69,
        }

        // Sign up a new user
        const newUser = {
            username: 'test_user',
            name: 'just_a_bot',
            password: 'test_password'
        }
        await api
            .post('/api/users')
            .send(newUser)
        
        // Login user
        const loginUser = {
            username: 'test_user',
            password: 'test_password'
        }
        const loginMessage = await api
            .post('/api/login')
            .send(loginUser)
        
        const token = loginMessage.body.token

        const responseMessage = await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
        
        const addedBlog = responseMessage.body

        await api
            .delete(`/api/blogs/${addedBlog.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(204)

    })
})

describe('test for updating', () => {
    test('a blog can be updated', async () => { 
        const blogAtStart = await helper.blogsInDb()
        const blogToBeUpdated = blogAtStart[0]

        const updatedBlog = {
            title: "blog for update test",
            author: blogToBeUpdated.author,
            url: blogToBeUpdated.url,
            likes: blogToBeUpdated.likes,
        }

        await api
            .put(`/api/blogs/${blogToBeUpdated.id}`)
            .send(updatedBlog)
            .expect(200)
        
        const blogAtEnd = await helper.blogsInDb()
        expect(blogAtEnd).toHaveLength(blogAtStart.length)

        // const content = blogAtEnd.map(blog => blog.title)
        // expect(content).toContain("blog for update test")
    })
})

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
      await User.deleteMany({})
  
      const passwordHash = await bcrypt.hash('sekret', 10)
      const user = new User({ username: 'root', passwordHash })
  
      await user.save()
    })
  
    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb()
  
      const newUser = {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'salainen',
      }
  
      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)
  
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
  
      const usernames = usersAtEnd.map(u => u.username)
      expect(usernames).toContain(newUser.username)
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
          username: 'root',
          name: 'Superuser',
          password: 'salainen',
        }
    
        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)
    
        expect(result.body.error).toContain('expected `username` to be unique')
    
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toEqual(usersAtStart)
      })

    test('cannot create an account if user is less than 3 characters', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'no',
            name: 'no',
            password: 'n12asdasdo', 
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('username must be at least 3 characters long and unique')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toEqual(usersAtStart)
    })
  })

afterAll(async () => {
    await mongoose.connection.close()
})