function getTasksStatus (container) {
  const status = $(container).data('status')
  return Array.from(container.getElementsByTagName('li')).reduce((acc, item) => {
    const id = $(item).data('id')
    const order = $(container).children().index(item)
    acc.push({ id, order, status })
    return acc
  }, [])
}

module.exports = getTasksStatus
