const Task = require('../../../models/Task')

module.exports = (req,res) => {

  const { id } = req.params

  let { title, description, status } = req.body
  const updatedAt = Date.now()
  status = +status

  Task.findByIdAndUpdate( id,  { title, description, status, updatedAt } )
    .then( task => {
      console.log('task has been updated succesfully')
      res.status(200).json(task)
    })
    .catch( err => res.status(500).json(err) )

}