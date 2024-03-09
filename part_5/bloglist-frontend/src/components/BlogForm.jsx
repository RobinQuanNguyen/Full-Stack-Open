const addBlogForm = ({ newTitle, newAuthor, newUrl, handleCreateNewBlog, handleTitleChange, handleAuthorChange, handleUrlChange}) => { 
    return (
    <form onSubmit={handleCreateNewBlog}>
      <h2>create new</h2>
      <div>
        title
          <input
            type="text"
            value={newTitle}
            name="Title"
            onChange={handleTitleChange}
          />
      </div>
      <div>
        author
          <input
            type="text"
            value={newAuthor}
            name="Author"
            onChange={handleAuthorChange}
          />
      </div>
      <div>
        url 
          <input
            type="text"
            value={newUrl}
            name="Url"
            onChange={handleUrlChange}
          />
      </div>
      <button type="submit">save</button>
    </form>
  )}

export default addBlogForm