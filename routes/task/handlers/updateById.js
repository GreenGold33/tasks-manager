const Task = require('../../../models/Task')

module.exports = (req,res) => {

  const { id } = req.params

  let { title, description } = req.body

  let updateData = {
    updatedAt: Date.now()
  }
  if (title) updateData.title = title
  if (description) updateData.description = description

  Task.findByIdAndUpdate( id,  updateData )
    .then( task => {
      console.log('task has been updated succesfully')
      res.status(200).json(task)
    })
    .catch( err => res.status(500).json(err) )

}