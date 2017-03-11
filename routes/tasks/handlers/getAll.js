const Task = require('../../../models/Task')
const _ = require('lodash')
const organizeTasks = require('_organizeTasks')

module.exports = (req,res) => {

  const { user } = req

  Task.find()
    .then( dbTasks => {
      const tasks = organizeTasks(dbTasks, user)
      res.render('tasks/list', { tasks, user })
    })
    .catch( err => { throw err } )

}