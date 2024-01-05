const Blog = require('../models/blog')
const User = require('../models/user')


const initialBlogs = [
    {
        title: 'number one',
        author: 'captain 1',
        url: 'www.1.com',
        likes: 1,
    },
    {
        title: 'number two',
        author: 'captain 2',
        url: 'www.2.com',
        likes: 2,
    },
    {
        title: 'number three',
        author: 'captain 3',
        url: 'www.3.com',
        likes: 3,
    },
]

const nonExisingId = async () => {
    const blog = new Blog({ content: 'willremocethissoon'})

    await blog.save()
    await blog.deleteOne()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})

    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    initialBlogs, nonExisingId, blogsInDb, usersInDb
}