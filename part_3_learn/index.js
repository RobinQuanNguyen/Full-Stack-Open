require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const Note = require('./models/note')


// DO NOT SAVE YOUR PASSWORD TO GITHUB!!


// const url =
//   `mongodb+srv://robin:${password}@dtbase.bnswbxs.mongodb.net/?retryWrites=true&w=majority`

// mongoose.set('strictQuery',false)
// mongoose.connect(url)

// const noteSchema = new mongoose.Schema({
//   content: String,
//   important: Boolean,
// })

// const Note = mongoose.model('Note', noteSchema)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

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
  
  app.get('/api/notes/:id', (request, response, next) => {
  //   const id = Number(request.params.id)
  //   //console.log(id)
  //   // const note = notes.find(note => {
  //   //   console.log(note.id, typeof note.id, id, typeof id, note.id === id)
  //   //   return note.id === id
  //   // }) ===> this shows how to find the bug
  //   const note = notes.find(note => note.id === id)

  //   if (note) {
  //     response.json(note)
  //   }
  //   else {
  //     response.status(404).end()
  //   }
  //   //console.log(note)
  //   //sresponse.json(note)
  // })

  // Note.findById(request.params.id)
  //   .then(note => {
  //     if (note) {
  //       response.json(note)
  //     } else {
  //       response.status(404).end()
  //     }
  //   })
  //   .catch(error => {
  //     console.log(error)
  //     //response.status(500).end()
  //     respond.status(400).send({error: "malformatted id"})
  //   })

  Note.findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
    
})



  app.delete('/api/notes/:id', (request, response, next) => {
    Note.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
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

  app.put('/api/notes/:id', (request, response, next) => {
    const body = request.body
  
    const note = {
      content: body.content,
      important: body.important,
    }
  
    Note.findByIdAndUpdate(request.params.id, note, { new: true })
      .then(updatedNote => {
        response.json(updatedNote)
      })
      .catch(error => next(error))
  })

  app.use(unknownEndpoint)
  app.use(errorHandler)

  const PORT = process.env.PORT
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })

