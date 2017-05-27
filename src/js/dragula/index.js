const updateStatus = require('./handlers/updateStatus')

const $containers = $('.tasks-panel ul')
const containers = Array.from($containers)
const revertOnSpill = true

dragula({ containers, revertOnSpill })
  .on('drop', updateStatus.bind(null, $containers))
