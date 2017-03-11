const Task = require('../../../models/Task')
const _ = require('lodash')

module.exports = (req,res) => {

  const { user } = req

  Task.find()
    .then( dbTasks => {
      const userTasks = dbTasks.filter( task => task.userId === user.id )
      const orderedTasks = _.orderBy(userTasks, task => {
        return [ task.status.category, task.status.order ]
      }, ['asc', 'asc']);
      const tasks = _.groupBy(orderedTasks, 'status.category');
      console.log(tasks)
      res.render('tasks/list', { tasks, user })
    })
    .catch( err => { throw err } )

}