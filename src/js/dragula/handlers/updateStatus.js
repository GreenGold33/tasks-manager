const adjustRows = require('./_adjustRows')
const getTasksStatus = require('./_getTasksStatus')

function updateStatus ($containers, el, target, source, sibling) {
  let tasksData = []
  if (source !== target) {
    tasksData = tasksData.concat(getTasksStatus(target))
  }
  tasksData = tasksData.concat(getTasksStatus(source))

  $.ajax({
    url: '/tasks',
    method: 'PUT',
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify(tasksData)
  })
    .done((response) => {
      adjustRows($containers)
    })
}

module.exports = updateStatus
