const _ = require('lodash')

module.exports = (dbTasks, userId) => {
  const userTasks = dbTasks.filter(task => task.userId === userId)
  const orderedTasks = _.orderBy(userTasks, task => {
    return [ task.status.category, task.status.order ]
  }, ['asc', 'asc'])
  const tasks = _.groupBy(orderedTasks, 'status.category')
  return tasks
}
