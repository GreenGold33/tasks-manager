function adjustRows ($containers) {
  $containers.each((i, container) => {
    if ($(container).find('li').length === 0) {
      $(container).append('<li class="list-group-item dummy"></li>')
    }
    if ($(container).find('li').length >= 2) {
      $(container).find('.dummy').remove()
    }
  })
}

module.exports = adjustRows
