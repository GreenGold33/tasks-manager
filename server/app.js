const express = require('express')
const path = require('path')

const routerConfig = require('./config/express')

const routerTasks = require('./routes/tasks')
const routerTask = require('./routes/task')
const routerAuth = require('./routes/auth')

const app = express()

app.locals.moment = require('moment');

app.set('view engine','pug')
app.set('views', path.join(__base, '/views'))

app.use(routerConfig)

app.get('/', (req, res) => res.redirect('/tasks') )

app.use( routerAuth)
app.use('/tasks', routerTasks)
app.use('/task', routerTask)

module.exports = app