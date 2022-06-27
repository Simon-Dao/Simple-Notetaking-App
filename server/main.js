const express = require('express')
const app = express()
const mongoose = require('mongoose')
const NotebookRoute = require('./routes/Notebook')
const PageRoute = require('./routes/Page')
const cors = require('cors')

const PORT = 5000;

mongoose.connect(`mongodb://localhost:27017/Notebook`, {useNewUrlParser: true})

const db = mongoose.connection
db.on('error', (error) => console.log(error))

const namesList = []

db.once('open', () => {

  db.db.listCollections().toArray((err, names) => {
    /*for (let i = 0; i < names.length; i++) {
      // gets only the name and adds it to a list
      const nameOnly = names[i].name;
      namesList.push(nameOnly);
    }
    console.log(namesList); */
  })

})

app.use(cors())
app.use(express.json())

app.use('/notebook',NotebookRoute)
app.use('/page', PageRoute)

app.listen(PORT, () => console.log('Server started on port '+PORT))

