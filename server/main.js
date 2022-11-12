const express = require('express')
const app = express()
const mongoose = require('mongoose')
const NotebookRoute = require('./routes/Notebook')
const PageRoute = require('./routes/Page')
const cors = require('cors')
require("dotenv").config();

const PORT = 5000;

//Please use env variables
//also please stop using a local database
console.log(process.env.MONGO_DB_URL)
mongoose.connect(process.env.MONGO_DB_URL, {useNewUrlParser: true})

const db = mongoose.connection
db.on('error', (error) => console.log(error))

const namesList = []

db.once('open', () => {

  db.db.listCollections().toArray((err, names) => {
  })

})

app.use(cors())
app.use(express.json())

app.use('/notebook',NotebookRoute)
app.use('/page', PageRoute)

app.listen(PORT, () => console.log('Server started on port '+PORT))

