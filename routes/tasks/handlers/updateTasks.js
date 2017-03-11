const Task = require('../../../models/Task')

module.exports = (req,res) => {

  const { user } = req
  const tasks = req.body

  const promiseUpdateTasks = tasks.map( task => {
    const { id, order, status } = task
    return Task.findByIdAndUpdate( id, {
      'status.category': status,
      'status.order': order,
    } )
  })

  Promise.all( promiseUpdateTasks )
    .then( () => {
      return Task.find()
    })
    .then( tasks => {
      res.json({ tasks, user })
    })
    .catch( err => { throw err })

}