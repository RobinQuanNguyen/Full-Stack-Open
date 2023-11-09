const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('Give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const phone_number = process.argv[4]


const url =
  `mongodb+srv://robin:${password}@dtbase.bnswbxs.mongodb.net/personApp?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  content: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (name && phone_number) {
    const person = new Person({
        content: name,
        number: phone_number,
    })

    person.save().then(result => {
        console.log(`added ${name} number ${phone_number} to phonebook`)
        mongoose.connection.close()
      })
} else {
    console.log("phonebook:")
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person.content, person.number)
        })
        mongoose.connection.close()
      })
}

