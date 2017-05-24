const Task = require(__base + 'models/Task')

module.exports = (req,res) => {

  const { id } = req.params

  Task.findById( id )
    .then( task => res.json(task) )
    .catch( err => { throw err } )

}