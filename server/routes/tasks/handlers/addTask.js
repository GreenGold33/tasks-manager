const Task = require(__base + 'models/Task')
const organizeTasks = require('./_organizeTasks')

module.exports = (req,res) => {

  const { user } = req
  const { title, description, userId } = req.body
  const task = new Task({ title, description, userId })

  debugger;

  task.save()
    .then( () => Task.find() )
    .then( dbTasks => {
      const tasks = organizeTasks(dbTasks, user)
      res.render('tasks/list', { tasks, user })
    })
    .catch( err => { throw err })

}