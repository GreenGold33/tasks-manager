const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise

const routerTasks = require('./routes/tasks')
const routerTask = require('./routes/task')
const routerAuth = require('./routes/auth')

const PORT = process.env.PORT || 3000
const urlDB = process.env.DB_URI || 'mongodb://localhost:27017/test'
const app = express()

app.locals.moment = require('moment');

app.use( bodyParser.urlencoded({ extended: false }) )
app.use( bodyParser.json() )

app.set('view engine','pug')
app.use( express.static('public') )

mongoose.connect(urlDB)

app.use('/', routerAuth)
app.use('/tasks', routerTasks)
app.use('/task', routerTask)

app.listen(PORT, () =>
  console.log(`💼 Tasks Server running at PORT ${PORT}...`))