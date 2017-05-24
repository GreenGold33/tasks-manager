const express = require('express')
const router = express.Router()

const getAll = require('./handlers/getAll')
const addTask = require('./handlers/addTask')
const updateTasks = require('./handlers/updateTasks')

const logReq = require('../_middleware/logReq')

router.get('/', logReq.bind({}, 'preShowAllTasks'), isLoggedIn, getAll)
router.post('/', addTask)
router.put('/', updateTasks)

module.exports = router

function isLoggedIn(req, res, next) {
    console.log('is Logged in?');
    if (req.isAuthenticated()) return next();
    res.redirect('/login');
}