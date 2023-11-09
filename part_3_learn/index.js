require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
//const mongoose = require('mongoose')
const Note = require('./models/note')
require('dotenv').config()




// const url =
//   `mongodb+srv://robin:${password}@dtbase.bnswbxs.mongodb.net/noteApp?retryWrites=true&w=majority`

// mongoose.set('strictQuery',false)
// mongoose.connect(url)

// const noteSchema = new mongoose.Schema({
//   content: String,
//   important: Boolean,
// })

// const Note = mongoose.model('Note', noteSchema)

// noteSchema.set('toJSON', {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString()
//     delete returnedObject._id
//     delete returnedObject.__v
//   }
// })

app.use(cors())
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(express.static('dist'))
app.use(express.json())
app.use(requestLogger)

let notes = [
    {
      id: 1,
      content: "HTML is easy",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
    }
  ]


  app.get('/', (request, response) => {
    response.send('<h1>Hello again!</h1>')
  })

  // get all notes
  app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
      response.json(notes)
    })
  })
  
  app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    //console.log(id)
    // const note = notes.find(note => {
    //   console.log(note.id, typeof note.id, id, typeof id, note.id === id)
    //   return note.id === id
    // }) ===> this shows how to find the bug
    const note = notes.find(note => note.id === id)

    if (note) {
      response.json(note)
    }
    else {
      response.status(404).end()
    }
    //console.log(note)
    //sresponse.json(note)
  })

  app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
  
    response.status(204).end()
  })

  const generatedId = () => {
    const maxId = notes.length > 0
      ? Math.max(...notes.map(n => n.id))
      : 0
    return maxId + 1
  }

  app.post('/api/notes', (request, response) => {
    // const note = request.body
    // console.log(note)
    // response.json(note) this is used to check the early stage of the post
    
    const body = request.body
    
    if (!body.content) {
      return response.status(400).json({
        error: 'content missing'
      })
    }

    const note = {
      id: generatedId(),
      content: body.content,
      important: body.important || false,
    }

    notes = notes.concat(note)

    response.json(note)
  })
  app.use(unknownEndpoint)

  const PORT = process.env.PORT
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })