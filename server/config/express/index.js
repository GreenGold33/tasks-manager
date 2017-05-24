const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const session = require('express-session')
const FileStore = require('session-file-store')(session)

const passport = require(__base + 'config/passport')

const router = express.Router()

// static files
router.use( express.static( path.join(__base, '../public') ) )

// reception of data to req.body
router.use( bodyParser.urlencoded({ extended: false }) )
router.use( bodyParser.json() )

// use sessions
router.use(session({
  name: 'tasksManager-session-cookieId',
  secret: 'supersecretworddonottelltoanyone',
  saveUninitialized: true,
  resave: true,
  store: new FileStore()
}))

// use passport
router.use( passport.initialize() );
router.use( passport.session() );

module.exports = router