const Task = require('../../../models/Task')

module.exports = (req,res) => {

  Task.find()
    .then( tasks => res.json(tasks) )
    .catch( err => { throw err } )

}