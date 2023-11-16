require('dotenv').config()

const { response } = require('express')
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')


const app = express()

const cors = require('cors')
const nodemon = require('nodemon')

app.use(cors())

app.use(express.static('dist'))

const password = process.argv[2]

// const name = process.argv[3]
// const phone_number = process.argv[4]


// const url =
//   `mongodb+srv://robin:${password}@dtbase.bnswbxs.mongodb.net/personApp?retryWrites=true&w=majority`

// mongoose.set('strictQuery',false)
// mongoose.connect(url)



// const Person = mongoose.model('Person', personSchema)

// if (name && phone_number) {
//     const person = new Person({
//         content: name,
//         number: phone_number,
//     })

//     person.save().then(result => {
//         console.log(`added ${name} number ${phone_number} to phonebook`)
//         //mongoose.connection.close()
//       })
    
    
// }



morgan.token('body', function(request, response) {
    return request.method === "POST" ? JSON.stringify(request.body) : ""
})

app.use(
    morgan(':method :url :status :res[content-length] - :response-time ms :body')
)

app.use(express.json())
let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

// const app = http.createServer((request, response) => {
//     response.writeHead(200, { 'Content-Type': 'application/json' })
//     response.end(JSON.stringify(persons))
// })

app.get('/', (request, response) => {
    response.send('<h1>Welcome To ... nowhere</h1>')
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
            response.send(persons)
        })
    
})


app.get('/api/info', (request, response) => {

    // const total = persons.length
    // var date = new Date()

    // const info =  ` Phonebook has info for ${total} people`

    // const reply = `${info}<br>${date}`

    // response.send(reply)
    Person.find({}).then(result => {
        response.send(persons)
            .send(`<p>Phonebook has info for ${result.length} people</p><p>${Date()}</p>`)
      })
})

app.get('/api/persons/:id', (request, response, next) => {
    // const id = Number(request.params.id)
    // console.log(id)

    // // const person = persons.find(person => {
    // //     console.log(person.id, typeof person.id, id, typeof id, person.id === id)
    // //     return person.id === id
    // // })

    // const person = persons.find(person => person.id === id)
    // console.log(person)
    // if (person) {
    //     response.json(person)
    // }
    // else {
    //     response.status(404).end()
    // }
    Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
    const {name, number} = request.body

    Person.findByIdAndUpdate(request.params.id, {name, number}, {new: true})
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => next(error))
})
  

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    console.log('Deleted')
    response.status(204).end()
})

const generatedId = () => {
    const min = 1
    const max = 10000

    const newId = Math.floor(Math.random() * (max - min + 1) + min)
    return newId
}

app.post('/api/persons', (request, response) => {
    if ( body.name || body.number) {
        return respond.status(400).json({
          error: 'Name or number is missing',
        })
      }
      const person = new Person({
        name: body.name,
        number: body.number,
      })
      person.save().then(result => {
        respond.json(result)
      }).catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const { name, number } = request.body
  
    Person.findByIdAndUpdate(
      request.params.id,
      { name, number },
      { new: true, runValidators: true, context: 'query' }
    )
      .then(updatedPerson => {
        response.json(updatedPerson)
      })
      .catch(error => next(error))
  })

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
      }
  
    next(error)
  }

app.use(errorHandler)
const PORT = process.env.PORT
app.listen(PORT)
//console.log("password is " + password)
console.log(`Server running on PORT ${PORT}`)