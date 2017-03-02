const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise

const routerTasks = require('./routes/tasks')
const routerTask = require('./routes/task')
const routerAuth = require('./routes/auth')

const PORT = 3000
const app = express()

app.use( bodyParser.urlencoded({ extended: false }) )
app.use( bodyParser.json() )

app.set('view engine','pug')
app.use( express.static('public') )

const urlDB = 'mongodb://localhost:27017/test'
mongoose.connect(urlDB)

app.use('/', routerAuth)
app.use('/tasks', routerTasks)
app.use('/task', routerTask)


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/login');
}

app.listen(PORT, () =>
  console.log(`💼 Tasks Server running at PORT ${PORT}...`))