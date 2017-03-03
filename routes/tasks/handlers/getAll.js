const Task = require('../../../models/Task')

module.exports = (req,res) => {

  const { user } = req

  Task.find()
    .then( tasks => res.render('tasks/list', { tasks, user }) )
    .catch( err => { throw err } )

}