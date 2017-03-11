const express = require('express')
const router = express.Router()

const getAll = require('./handlers/getAll')
const addTask = require('./handlers/addTask')
const updateTasks = require('./handlers/updateTasks')

router.get('/', isLoggedIn, getAll)
router.post('/', addTask)
router.put('/', updateTasks)

module.exports = router

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/login');
}