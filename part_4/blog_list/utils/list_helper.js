const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}
  
const favoriteBlog = (blogs) => {
  return blogs.reduce((max, blog) => max.likes > blog.likes ? max : blog)
}

const mostBlog = (blogs) => {
  const authors = blogs.map(blog => blog.author) // collect all authors
  const uniqAuthors = [...new Set(authors)] //remove duplicates
  const blogCount = uniqAuthors.map(author => {
    return {author: author, blogs: authors.filter(a => a === author).length} // count blogs per author
  })
  return blogCount.reduce((max, author) => max.blogs > author.blogs ? max : author) // return author with most blogs
}

const mostLikes = (blogs) => {
  const authors = blogs.map(blog => blog.author) // collect all authors
  const uniqAuthors = [...new Set(authors)] // remove the duplicates
  const likesCount = uniqAuthors.map(author => {
    return {author: author, likes: blogs.filter(blog => blog.author === author).reduce((sum, blog) => sum + blog.likes, 0)} // count likes per author
  })
  return likesCount.reduce((max, author) => max.likes > author.likes ? max : author) // return the author with most likes
}

  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlog,
    mostLikes
  } 