const express = require('express')
const path = require('path')

const routerConfig = require('./config/express')

const routerTasks = require('./routes/tasks')
const routerTask = require('./routes/task')
const routerAuth = require('./routes/auth')

const app = express()

/* DEBUG init */
app.use((req, res, next) => {
  require('debug')(`new request to [${req.method}] ${req.path}`)('-'.repeat(40))
  next()
})

app.locals.moment = require('moment')

app.set('view engine', 'pug')
app.set('views', path.join(__base, '/views'))

app.use(routerConfig)

app.get('/', (req, res) => res.redirect('/tasks'))

app.use(routerAuth)

/* DEBUG req.user */
app.use((req, res, next) => {
  require('debug')('req.user')(req.user)
  next()
})

app.use('/tasks', routerTasks)
app.use('/task', routerTask)

module.exports = app
