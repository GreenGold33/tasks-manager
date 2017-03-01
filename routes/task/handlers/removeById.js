const Task = require('../../../models/Task')

module.exports = (req,res) => {

  const { id } = req.params

  Task.findByIdAndRemove( id )
    .then( task => {
      console.log(`tasks has been removed succesfully`)
      res.status(200).json(task)
    })
    .catch( err => res.status(500).json(err) )

}
