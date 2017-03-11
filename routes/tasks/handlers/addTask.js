const Task = require('../../../models/Task')

module.exports = (req,res) => {

  const { user } = req
  const { title, description, userId } = req.body
  const task = new Task({ title, description, userId })

  task.save()
    .then( () => Task.find() )
    .then( tasks => {
      console.log(tasks)
      console.log(user)
      res.render('tasks/list', { tasks, user })
    })
    .catch( err => { throw err })

}