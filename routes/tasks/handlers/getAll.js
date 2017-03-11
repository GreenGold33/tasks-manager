const Task = require('../../../models/Task')
const _ = require('lodash')

module.exports = (req,res) => {

  const { user } = req

  Task.find()
    .then( dbTasks => {
      console.log("step1...")
      const userTasks = dbTasks.filter( task => task.userId === user.id )
      console.log("step2...")
      const orderedTasks = _.orderBy(userTasks, task => {
        return [ task.status.category, task.status.order ]
      }, ['asc', 'asc']);
      console.log("step3...")
      const tasks = _.groupBy(orderedTasks, 'status.category');
      console.log(tasks)
      res.render('tasks/list', { tasks, user })
    })
    .catch( err => { throw err } )

}