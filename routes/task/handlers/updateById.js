const Task = require('../../../models/Task')

module.exports = (req,res) => {

  const { id } = req.params

  let { title, done } = req.body
  const updatedAt = Date.now()
  done = done === "true" ? true : false

  Task.findByIdAndUpdate( id,  { title, done, updatedAt } )
    .then( task => {
      console.log('task has been updated succesfully')
      res.status(200).json(task)
    })
    .catch( err => res.status(500).json(err) )

}