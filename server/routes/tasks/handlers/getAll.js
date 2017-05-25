const Task = require(__base + 'models/Task')
const organizeTasks = require('./_organizeTasks')

module.exports = (req, res) => {
  const { user } = req
  const userId = user._id.toString()
  Task.find()
    .then(dbTasks => {
      const tasks = organizeTasks(dbTasks, userId)
      res.render('tasks/list', { tasks, user })
    })
    .catch(err => { throw err })
}
