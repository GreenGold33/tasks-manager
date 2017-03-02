const Task = require('../../../models/Task')

module.exports = (req,res) => {

  const { title, description } = req.body
  const task = new Task({ title, description })

  task.save()
    .then( () => Task.find() )
    .then( tasks => res.render('tasks/list', { tasks }) )
    .catch( err => { throw err })

}