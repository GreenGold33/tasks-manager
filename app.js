const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const routerTasks = require('./routes/tasks')
const routerTask = require('./routes/task')

mongoose.Promise = global.Promise

const PORT = 3000
const app = express()

app.use( bodyParser.urlencoded({ extended: false }) )
app.use( bodyParser.json() )

const urlDB = 'mongodb://localhost:27017/test'
mongoose.connect(urlDB)

app.use('/tasks', routerTasks)
app.use('/task', routerTask)

app.listen(PORT, () =>
  console.log(`💼 Tasks Server running at PORT ${PORT}...`))