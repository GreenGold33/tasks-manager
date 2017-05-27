(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
console.log('Another different message')
require('./events')
require('./dragula')

},{"./dragula":5,"./events":10}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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

},{"./_adjustRows":2,"./_getTasksStatus":3}],5:[function(require,module,exports){
const updateStatus = require('./handlers/updateStatus')

const $containers = $('.tasks-panel ul')
const containers = Array.from($containers)
const revertOnSpill = true

dragula({ containers, revertOnSpill })
  .on('drop', updateStatus.bind(null, $containers))

},{"./handlers/updateStatus":4}],6:[function(require,module,exports){
function addTask (e) {
  if ($(this).hasClass('edit')) {
    e.preventDefault()
    const url = this.action
    let data = `title=${this.title.value}`
    data += `&description=${this.description.value}`

    const method = 'PUT'

    $.ajax({ url, method, data })
      .done(() => {
        window.location = '/tasks'
      })
  }
}

module.exports = addTask

},{}],7:[function(require,module,exports){
function cleanForm (e) {
  const $form = $('.edit-add-task form')

  // Clean Form to default 'POST'
  $('h4.modal-title').text('New Note')
  $form.removeClass()
    .attr('action', '/tasks')
    .find('input[name="title"]').val('')
      .end()
    .find('textarea[name="description"]').val('')
}

module.exports = cleanForm

},{}],8:[function(require,module,exports){
function editTask (e) {
  const idTask = $(this).closest('li').data('id')
  const url = `/task/${idTask}`

  $.ajax({ url })
    .then(fillEditFormData)
    .catch(() => alert('There was an error retrieving info from the task!'))
}

function fillEditFormData (task) {
  const $form = $('.edit-add-task form')
  $('h4.modal-title').text('Edit Note')
  $form.addClass('edit')
      .attr('action', `/task/${task._id}`)
      .find('input[name="title"]').val(task.title)
        .end()
      .find('textarea[name="description"]').val(task.title)
}

module.exports = editTask

},{}],9:[function(require,module,exports){
function removeTask (e) {
  const $parentContainer = $(this).closest('li')
  const idTask = $parentContainer.find('input[name="idTask"]').val()

  const url = `/task/${idTask}`
  const method = 'DELETE'

  $.ajax({ url, method })
    .then(() => $parentContainer.remove())
    .catch(() => alert('There was an error removing the task!'))
}

module.exports = removeTask

},{}],10:[function(require,module,exports){
const editTask = require('./handlers/editTask')
const removeTask = require('./handlers/removeTask')
const cleanForm = require('./handlers/cleanForm')
const addTask = require('./handlers/addTask')

$('.edit').on('click', editTask)
$('.remove').on('click', removeTask)
$('.newnotebtn').on('click', cleanForm)
$('.edit-add-task form').on('submit', addTask)

},{"./handlers/addTask":6,"./handlers/cleanForm":7,"./handlers/editTask":8,"./handlers/removeTask":9}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL3dhdGNoaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjbGllbnQvc3JjL2FwcC5qcyIsImNsaWVudC9zcmMvZHJhZ3VsYS9oYW5kbGVycy9fYWRqdXN0Um93cy5qcyIsImNsaWVudC9zcmMvZHJhZ3VsYS9oYW5kbGVycy9fZ2V0VGFza3NTdGF0dXMuanMiLCJjbGllbnQvc3JjL2RyYWd1bGEvaGFuZGxlcnMvdXBkYXRlU3RhdHVzLmpzIiwiY2xpZW50L3NyYy9kcmFndWxhL2luZGV4LmpzIiwiY2xpZW50L3NyYy9ldmVudHMvaGFuZGxlcnMvYWRkVGFzay5qcyIsImNsaWVudC9zcmMvZXZlbnRzL2hhbmRsZXJzL2NsZWFuRm9ybS5qcyIsImNsaWVudC9zcmMvZXZlbnRzL2hhbmRsZXJzL2VkaXRUYXNrLmpzIiwiY2xpZW50L3NyYy9ldmVudHMvaGFuZGxlcnMvcmVtb3ZlVGFzay5qcyIsImNsaWVudC9zcmMvZXZlbnRzL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiY29uc29sZS5sb2coJ0Fub3RoZXIgZGlmZmVyZW50IG1lc3NhZ2UnKVxucmVxdWlyZSgnLi9ldmVudHMnKVxucmVxdWlyZSgnLi9kcmFndWxhJylcbiIsImZ1bmN0aW9uIGFkanVzdFJvd3MgKCRjb250YWluZXJzKSB7XG4gICRjb250YWluZXJzLmVhY2goKGksIGNvbnRhaW5lcikgPT4ge1xuICAgIGlmICgkKGNvbnRhaW5lcikuZmluZCgnbGknKS5sZW5ndGggPT09IDApIHtcbiAgICAgICQoY29udGFpbmVyKS5hcHBlbmQoJzxsaSBjbGFzcz1cImxpc3QtZ3JvdXAtaXRlbSBkdW1teVwiPjwvbGk+JylcbiAgICB9XG4gICAgaWYgKCQoY29udGFpbmVyKS5maW5kKCdsaScpLmxlbmd0aCA+PSAyKSB7XG4gICAgICAkKGNvbnRhaW5lcikuZmluZCgnLmR1bW15JykucmVtb3ZlKClcbiAgICB9XG4gIH0pXG59XG5cbm1vZHVsZS5leHBvcnRzID0gYWRqdXN0Um93c1xuIiwiZnVuY3Rpb24gZ2V0VGFza3NTdGF0dXMgKGNvbnRhaW5lcikge1xuICBjb25zdCBzdGF0dXMgPSAkKGNvbnRhaW5lcikuZGF0YSgnc3RhdHVzJylcbiAgcmV0dXJuIEFycmF5LmZyb20oY29udGFpbmVyLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdsaScpKS5yZWR1Y2UoKGFjYywgaXRlbSkgPT4ge1xuICAgIGNvbnN0IGlkID0gJChpdGVtKS5kYXRhKCdpZCcpXG4gICAgY29uc3Qgb3JkZXIgPSAkKGNvbnRhaW5lcikuY2hpbGRyZW4oKS5pbmRleChpdGVtKVxuICAgIGFjYy5wdXNoKHsgaWQsIG9yZGVyLCBzdGF0dXMgfSlcbiAgICByZXR1cm4gYWNjXG4gIH0sIFtdKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldFRhc2tzU3RhdHVzXG4iLCJjb25zdCBhZGp1c3RSb3dzID0gcmVxdWlyZSgnLi9fYWRqdXN0Um93cycpXG5jb25zdCBnZXRUYXNrc1N0YXR1cyA9IHJlcXVpcmUoJy4vX2dldFRhc2tzU3RhdHVzJylcblxuZnVuY3Rpb24gdXBkYXRlU3RhdHVzICgkY29udGFpbmVycywgZWwsIHRhcmdldCwgc291cmNlLCBzaWJsaW5nKSB7XG4gIGxldCB0YXNrc0RhdGEgPSBbXVxuICBpZiAoc291cmNlICE9PSB0YXJnZXQpIHtcbiAgICB0YXNrc0RhdGEgPSB0YXNrc0RhdGEuY29uY2F0KGdldFRhc2tzU3RhdHVzKHRhcmdldCkpXG4gIH1cbiAgdGFza3NEYXRhID0gdGFza3NEYXRhLmNvbmNhdChnZXRUYXNrc1N0YXR1cyhzb3VyY2UpKVxuXG4gICQuYWpheCh7XG4gICAgdXJsOiAnL3Rhc2tzJyxcbiAgICBtZXRob2Q6ICdQVVQnLFxuICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh0YXNrc0RhdGEpXG4gIH0pXG4gICAgLmRvbmUoKHJlc3BvbnNlKSA9PiB7XG4gICAgICBhZGp1c3RSb3dzKCRjb250YWluZXJzKVxuICAgIH0pXG59XG5cbm1vZHVsZS5leHBvcnRzID0gdXBkYXRlU3RhdHVzXG4iLCJjb25zdCB1cGRhdGVTdGF0dXMgPSByZXF1aXJlKCcuL2hhbmRsZXJzL3VwZGF0ZVN0YXR1cycpXG5cbmNvbnN0ICRjb250YWluZXJzID0gJCgnLnRhc2tzLXBhbmVsIHVsJylcbmNvbnN0IGNvbnRhaW5lcnMgPSBBcnJheS5mcm9tKCRjb250YWluZXJzKVxuY29uc3QgcmV2ZXJ0T25TcGlsbCA9IHRydWVcblxuZHJhZ3VsYSh7IGNvbnRhaW5lcnMsIHJldmVydE9uU3BpbGwgfSlcbiAgLm9uKCdkcm9wJywgdXBkYXRlU3RhdHVzLmJpbmQobnVsbCwgJGNvbnRhaW5lcnMpKVxuIiwiZnVuY3Rpb24gYWRkVGFzayAoZSkge1xuICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnZWRpdCcpKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgY29uc3QgdXJsID0gdGhpcy5hY3Rpb25cbiAgICBsZXQgZGF0YSA9IGB0aXRsZT0ke3RoaXMudGl0bGUudmFsdWV9YFxuICAgIGRhdGEgKz0gYCZkZXNjcmlwdGlvbj0ke3RoaXMuZGVzY3JpcHRpb24udmFsdWV9YFxuXG4gICAgY29uc3QgbWV0aG9kID0gJ1BVVCdcblxuICAgICQuYWpheCh7IHVybCwgbWV0aG9kLCBkYXRhIH0pXG4gICAgICAuZG9uZSgoKSA9PiB7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9ICcvdGFza3MnXG4gICAgICB9KVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYWRkVGFza1xuIiwiZnVuY3Rpb24gY2xlYW5Gb3JtIChlKSB7XG4gIGNvbnN0ICRmb3JtID0gJCgnLmVkaXQtYWRkLXRhc2sgZm9ybScpXG5cbiAgLy8gQ2xlYW4gRm9ybSB0byBkZWZhdWx0ICdQT1NUJ1xuICAkKCdoNC5tb2RhbC10aXRsZScpLnRleHQoJ05ldyBOb3RlJylcbiAgJGZvcm0ucmVtb3ZlQ2xhc3MoKVxuICAgIC5hdHRyKCdhY3Rpb24nLCAnL3Rhc2tzJylcbiAgICAuZmluZCgnaW5wdXRbbmFtZT1cInRpdGxlXCJdJykudmFsKCcnKVxuICAgICAgLmVuZCgpXG4gICAgLmZpbmQoJ3RleHRhcmVhW25hbWU9XCJkZXNjcmlwdGlvblwiXScpLnZhbCgnJylcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjbGVhbkZvcm1cbiIsImZ1bmN0aW9uIGVkaXRUYXNrIChlKSB7XG4gIGNvbnN0IGlkVGFzayA9ICQodGhpcykuY2xvc2VzdCgnbGknKS5kYXRhKCdpZCcpXG4gIGNvbnN0IHVybCA9IGAvdGFzay8ke2lkVGFza31gXG5cbiAgJC5hamF4KHsgdXJsIH0pXG4gICAgLnRoZW4oZmlsbEVkaXRGb3JtRGF0YSlcbiAgICAuY2F0Y2goKCkgPT4gYWxlcnQoJ1RoZXJlIHdhcyBhbiBlcnJvciByZXRyaWV2aW5nIGluZm8gZnJvbSB0aGUgdGFzayEnKSlcbn1cblxuZnVuY3Rpb24gZmlsbEVkaXRGb3JtRGF0YSAodGFzaykge1xuICBjb25zdCAkZm9ybSA9ICQoJy5lZGl0LWFkZC10YXNrIGZvcm0nKVxuICAkKCdoNC5tb2RhbC10aXRsZScpLnRleHQoJ0VkaXQgTm90ZScpXG4gICRmb3JtLmFkZENsYXNzKCdlZGl0JylcbiAgICAgIC5hdHRyKCdhY3Rpb24nLCBgL3Rhc2svJHt0YXNrLl9pZH1gKVxuICAgICAgLmZpbmQoJ2lucHV0W25hbWU9XCJ0aXRsZVwiXScpLnZhbCh0YXNrLnRpdGxlKVxuICAgICAgICAuZW5kKClcbiAgICAgIC5maW5kKCd0ZXh0YXJlYVtuYW1lPVwiZGVzY3JpcHRpb25cIl0nKS52YWwodGFzay50aXRsZSlcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBlZGl0VGFza1xuIiwiZnVuY3Rpb24gcmVtb3ZlVGFzayAoZSkge1xuICBjb25zdCAkcGFyZW50Q29udGFpbmVyID0gJCh0aGlzKS5jbG9zZXN0KCdsaScpXG4gIGNvbnN0IGlkVGFzayA9ICRwYXJlbnRDb250YWluZXIuZmluZCgnaW5wdXRbbmFtZT1cImlkVGFza1wiXScpLnZhbCgpXG5cbiAgY29uc3QgdXJsID0gYC90YXNrLyR7aWRUYXNrfWBcbiAgY29uc3QgbWV0aG9kID0gJ0RFTEVURSdcblxuICAkLmFqYXgoeyB1cmwsIG1ldGhvZCB9KVxuICAgIC50aGVuKCgpID0+ICRwYXJlbnRDb250YWluZXIucmVtb3ZlKCkpXG4gICAgLmNhdGNoKCgpID0+IGFsZXJ0KCdUaGVyZSB3YXMgYW4gZXJyb3IgcmVtb3ZpbmcgdGhlIHRhc2shJykpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gcmVtb3ZlVGFza1xuIiwiY29uc3QgZWRpdFRhc2sgPSByZXF1aXJlKCcuL2hhbmRsZXJzL2VkaXRUYXNrJylcbmNvbnN0IHJlbW92ZVRhc2sgPSByZXF1aXJlKCcuL2hhbmRsZXJzL3JlbW92ZVRhc2snKVxuY29uc3QgY2xlYW5Gb3JtID0gcmVxdWlyZSgnLi9oYW5kbGVycy9jbGVhbkZvcm0nKVxuY29uc3QgYWRkVGFzayA9IHJlcXVpcmUoJy4vaGFuZGxlcnMvYWRkVGFzaycpXG5cbiQoJy5lZGl0Jykub24oJ2NsaWNrJywgZWRpdFRhc2spXG4kKCcucmVtb3ZlJykub24oJ2NsaWNrJywgcmVtb3ZlVGFzaylcbiQoJy5uZXdub3RlYnRuJykub24oJ2NsaWNrJywgY2xlYW5Gb3JtKVxuJCgnLmVkaXQtYWRkLXRhc2sgZm9ybScpLm9uKCdzdWJtaXQnLCBhZGRUYXNrKVxuIl19
