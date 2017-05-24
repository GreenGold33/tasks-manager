const Task = require(__base + 'models/Task')

module.exports = (req,res) => {

  const { id } = req.params

  Task.findByIdAndRemove( id )
    .then( task => res.status(200).json(task) )
    .catch( err => res.status(500).json(err) )

}
