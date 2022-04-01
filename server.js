// Dependencies
const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors')
const db = mongoose.connection 

// Environment Variables (getting ready for Heroku)
const app = express();
const mongoURI = process.env.MONGODB_URI 
const PORT = process.env.PORT || 3001

// Connect to Mongo
mongoose.connect(mongoURI, { useNewUrlParser: true },
    () => console.log('MongoDB connection established:', mongoURI)
  )

// Error / Disconnection
db.on('error', err => console.log(err.message + ' is Mongod not running?'))
db.on('disconnected', () => console.log('mongo disconnected'))

// Middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json()); 
app.use(express.static('public')) 
app.use(cors())

// Routes
const todosController = require('./controllers/todos.js')
app.use('/todos', todosController)


app.listen(PORT, () => {
  console.log('Showing up on', PORT)
})