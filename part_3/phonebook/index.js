const { response } = require('express')
//const http = require('http')
const express = require('express')
const morgan = require('morgan')

const app = express()

const cors = require('cors')

app.use(cors())

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
    response.json(persons)
})


app.get('/api/info', (request, response) => {

    const total = persons.length
    var date = new Date()

    const info =  ` Phonebook has info for ${total} people`

    const reply = `${info}<br>${date}`

    response.send(reply)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log(id)

    // const person = persons.find(person => {
    //     console.log(person.id, typeof person.id, id, typeof id, person.id === id)
    //     return person.id === id
    // })

    const person = persons.find(person => person.id === id)
    console.log(person)
    if (person) {
        response.json(person)
    }
    else {
        response.status(404).end()
    }
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
    const body = request.body
    // console.log(body)
    // response.json(body)

    if (!body.name) {
        return response.status(400).json({
          error: 'name missing'
        })
      }
    
    if (!body.number) {
        return response.status(400).json({
            error: 'number missing'
        })
    }
    
    //persons = persons.filter(person => person.id !== id)
    check_person = persons.find(person => person.name === body.name)
    if (check_person) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        id: generatedId(),
        name: body.name,
        number: body.number,
    }

    persons = persons.concat(person)

    response.json(person)
})



const PORT = 3001
app.listen(PORT)
console.log(`Server running on PORT ${PORT}`)