const _ = require('lodash')

module.exports = (dbTasks, user) => {
  const userTasks = dbTasks.filter( task => task.userId === user.id )
  const orderedTasks = _.orderBy(userTasks, task => {
    return [ task.status.category, task.status.order ]
  }, ['asc', 'asc']);
  const tasks = _.groupBy(orderedTasks, 'status.category');
  return tasks
}