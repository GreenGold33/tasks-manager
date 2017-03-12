const Task = require('../../../models/Task')
const organizeTasks = require('./_organizeTasks')

module.exports = (req,res) => {

  debugger;
  const { user } = req

  Task.find()
    .then( dbTasks => {
      const tasks = organizeTasks(dbTasks, user)
      res.render('tasks/list', { tasks, user })
    })
    .catch( err => { throw err } )

}