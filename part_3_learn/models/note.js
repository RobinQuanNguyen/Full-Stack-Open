const mongoose = require('mongoose')

mongoose.set('strictQuery', false)


const url = process.env.MONGODB_URI

const new_note = process.argv[2]
const new_boolean = process.argv[3]

console.log("new note is: " + new_note)
//console.log('connecting to', url)


mongoose.connect(url)

  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

if (new_note && new_boolean) {
    const note = new Note({
      content: new_note,
      important: new_boolean,
    })

    note.save().then(result => {
      console.log("Saved new note!")
    })
}

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('Note', noteSchema)