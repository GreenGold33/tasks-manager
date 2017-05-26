const Task = require(__base + 'models/Task')

module.exports = (req, res) => {
  const { user } = req
  const { title, description, userId } = req.body
  const task = new Task({ title, description, userId })

  task.save()
    .then(() => res.redirect('/tasks'))
    .catch(err => { throw err })
}
