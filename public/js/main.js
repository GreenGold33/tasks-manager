(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL3dhdGNoaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjbGllbnQvc3JjL2FwcC5qcyIsImNsaWVudC9zcmMvZHJhZ3VsYS9oYW5kbGVycy9fYWRqdXN0Um93cy5qcyIsImNsaWVudC9zcmMvZHJhZ3VsYS9oYW5kbGVycy9fZ2V0VGFza3NTdGF0dXMuanMiLCJjbGllbnQvc3JjL2RyYWd1bGEvaGFuZGxlcnMvdXBkYXRlU3RhdHVzLmpzIiwiY2xpZW50L3NyYy9kcmFndWxhL2luZGV4LmpzIiwiY2xpZW50L3NyYy9ldmVudHMvaGFuZGxlcnMvYWRkVGFzay5qcyIsImNsaWVudC9zcmMvZXZlbnRzL2hhbmRsZXJzL2NsZWFuRm9ybS5qcyIsImNsaWVudC9zcmMvZXZlbnRzL2hhbmRsZXJzL2VkaXRUYXNrLmpzIiwiY2xpZW50L3NyYy9ldmVudHMvaGFuZGxlcnMvcmVtb3ZlVGFzay5qcyIsImNsaWVudC9zcmMvZXZlbnRzL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInJlcXVpcmUoJy4vZXZlbnRzJylcbnJlcXVpcmUoJy4vZHJhZ3VsYScpXG4iLCJmdW5jdGlvbiBhZGp1c3RSb3dzICgkY29udGFpbmVycykge1xuICAkY29udGFpbmVycy5lYWNoKChpLCBjb250YWluZXIpID0+IHtcbiAgICBpZiAoJChjb250YWluZXIpLmZpbmQoJ2xpJykubGVuZ3RoID09PSAwKSB7XG4gICAgICAkKGNvbnRhaW5lcikuYXBwZW5kKCc8bGkgY2xhc3M9XCJsaXN0LWdyb3VwLWl0ZW0gZHVtbXlcIj48L2xpPicpXG4gICAgfVxuICAgIGlmICgkKGNvbnRhaW5lcikuZmluZCgnbGknKS5sZW5ndGggPj0gMikge1xuICAgICAgJChjb250YWluZXIpLmZpbmQoJy5kdW1teScpLnJlbW92ZSgpXG4gICAgfVxuICB9KVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFkanVzdFJvd3NcbiIsImZ1bmN0aW9uIGdldFRhc2tzU3RhdHVzIChjb250YWluZXIpIHtcbiAgY29uc3Qgc3RhdHVzID0gJChjb250YWluZXIpLmRhdGEoJ3N0YXR1cycpXG4gIHJldHVybiBBcnJheS5mcm9tKGNvbnRhaW5lci5nZXRFbGVtZW50c0J5VGFnTmFtZSgnbGknKSkucmVkdWNlKChhY2MsIGl0ZW0pID0+IHtcbiAgICBjb25zdCBpZCA9ICQoaXRlbSkuZGF0YSgnaWQnKVxuICAgIGNvbnN0IG9yZGVyID0gJChjb250YWluZXIpLmNoaWxkcmVuKCkuaW5kZXgoaXRlbSlcbiAgICBhY2MucHVzaCh7IGlkLCBvcmRlciwgc3RhdHVzIH0pXG4gICAgcmV0dXJuIGFjY1xuICB9LCBbXSlcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRUYXNrc1N0YXR1c1xuIiwiY29uc3QgYWRqdXN0Um93cyA9IHJlcXVpcmUoJy4vX2FkanVzdFJvd3MnKVxuY29uc3QgZ2V0VGFza3NTdGF0dXMgPSByZXF1aXJlKCcuL19nZXRUYXNrc1N0YXR1cycpXG5cbmZ1bmN0aW9uIHVwZGF0ZVN0YXR1cyAoJGNvbnRhaW5lcnMsIGVsLCB0YXJnZXQsIHNvdXJjZSwgc2libGluZykge1xuICBsZXQgdGFza3NEYXRhID0gW11cbiAgaWYgKHNvdXJjZSAhPT0gdGFyZ2V0KSB7XG4gICAgdGFza3NEYXRhID0gdGFza3NEYXRhLmNvbmNhdChnZXRUYXNrc1N0YXR1cyh0YXJnZXQpKVxuICB9XG4gIHRhc2tzRGF0YSA9IHRhc2tzRGF0YS5jb25jYXQoZ2V0VGFza3NTdGF0dXMoc291cmNlKSlcblxuICAkLmFqYXgoe1xuICAgIHVybDogJy90YXNrcycsXG4gICAgbWV0aG9kOiAnUFVUJyxcbiAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgZGF0YTogSlNPTi5zdHJpbmdpZnkodGFza3NEYXRhKVxuICB9KVxuICAgIC5kb25lKChyZXNwb25zZSkgPT4ge1xuICAgICAgYWRqdXN0Um93cygkY29udGFpbmVycylcbiAgICB9KVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHVwZGF0ZVN0YXR1c1xuIiwiY29uc3QgdXBkYXRlU3RhdHVzID0gcmVxdWlyZSgnLi9oYW5kbGVycy91cGRhdGVTdGF0dXMnKVxuXG5jb25zdCAkY29udGFpbmVycyA9ICQoJy50YXNrcy1wYW5lbCB1bCcpXG5jb25zdCBjb250YWluZXJzID0gQXJyYXkuZnJvbSgkY29udGFpbmVycylcbmNvbnN0IHJldmVydE9uU3BpbGwgPSB0cnVlXG5cbmRyYWd1bGEoeyBjb250YWluZXJzLCByZXZlcnRPblNwaWxsIH0pXG4gIC5vbignZHJvcCcsIHVwZGF0ZVN0YXR1cy5iaW5kKG51bGwsICRjb250YWluZXJzKSlcbiIsImZ1bmN0aW9uIGFkZFRhc2sgKGUpIHtcbiAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2VkaXQnKSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgIGNvbnN0IHVybCA9IHRoaXMuYWN0aW9uXG4gICAgbGV0IGRhdGEgPSBgdGl0bGU9JHt0aGlzLnRpdGxlLnZhbHVlfWBcbiAgICBkYXRhICs9IGAmZGVzY3JpcHRpb249JHt0aGlzLmRlc2NyaXB0aW9uLnZhbHVlfWBcblxuICAgIGNvbnN0IG1ldGhvZCA9ICdQVVQnXG5cbiAgICAkLmFqYXgoeyB1cmwsIG1ldGhvZCwgZGF0YSB9KVxuICAgICAgLmRvbmUoKCkgPT4ge1xuICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAnL3Rhc2tzJ1xuICAgICAgfSlcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFkZFRhc2tcbiIsImZ1bmN0aW9uIGNsZWFuRm9ybSAoZSkge1xuICBjb25zdCAkZm9ybSA9ICQoJy5lZGl0LWFkZC10YXNrIGZvcm0nKVxuXG4gIC8vIENsZWFuIEZvcm0gdG8gZGVmYXVsdCAnUE9TVCdcbiAgJCgnaDQubW9kYWwtdGl0bGUnKS50ZXh0KCdOZXcgTm90ZScpXG4gICRmb3JtLnJlbW92ZUNsYXNzKClcbiAgICAuYXR0cignYWN0aW9uJywgJy90YXNrcycpXG4gICAgLmZpbmQoJ2lucHV0W25hbWU9XCJ0aXRsZVwiXScpLnZhbCgnJylcbiAgICAgIC5lbmQoKVxuICAgIC5maW5kKCd0ZXh0YXJlYVtuYW1lPVwiZGVzY3JpcHRpb25cIl0nKS52YWwoJycpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gY2xlYW5Gb3JtXG4iLCJmdW5jdGlvbiBlZGl0VGFzayAoZSkge1xuICBjb25zdCBpZFRhc2sgPSAkKHRoaXMpLmNsb3Nlc3QoJ2xpJykuZGF0YSgnaWQnKVxuICBjb25zdCB1cmwgPSBgL3Rhc2svJHtpZFRhc2t9YFxuXG4gICQuYWpheCh7IHVybCB9KVxuICAgIC50aGVuKGZpbGxFZGl0Rm9ybURhdGEpXG4gICAgLmNhdGNoKCgpID0+IGFsZXJ0KCdUaGVyZSB3YXMgYW4gZXJyb3IgcmV0cmlldmluZyBpbmZvIGZyb20gdGhlIHRhc2shJykpXG59XG5cbmZ1bmN0aW9uIGZpbGxFZGl0Rm9ybURhdGEgKHRhc2spIHtcbiAgY29uc3QgJGZvcm0gPSAkKCcuZWRpdC1hZGQtdGFzayBmb3JtJylcbiAgJCgnaDQubW9kYWwtdGl0bGUnKS50ZXh0KCdFZGl0IE5vdGUnKVxuICAkZm9ybS5hZGRDbGFzcygnZWRpdCcpXG4gICAgICAuYXR0cignYWN0aW9uJywgYC90YXNrLyR7dGFzay5faWR9YClcbiAgICAgIC5maW5kKCdpbnB1dFtuYW1lPVwidGl0bGVcIl0nKS52YWwodGFzay50aXRsZSlcbiAgICAgICAgLmVuZCgpXG4gICAgICAuZmluZCgndGV4dGFyZWFbbmFtZT1cImRlc2NyaXB0aW9uXCJdJykudmFsKHRhc2sudGl0bGUpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gZWRpdFRhc2tcbiIsImZ1bmN0aW9uIHJlbW92ZVRhc2sgKGUpIHtcbiAgY29uc3QgJHBhcmVudENvbnRhaW5lciA9ICQodGhpcykuY2xvc2VzdCgnbGknKVxuICBjb25zdCBpZFRhc2sgPSAkcGFyZW50Q29udGFpbmVyLmZpbmQoJ2lucHV0W25hbWU9XCJpZFRhc2tcIl0nKS52YWwoKVxuXG4gIGNvbnN0IHVybCA9IGAvdGFzay8ke2lkVGFza31gXG4gIGNvbnN0IG1ldGhvZCA9ICdERUxFVEUnXG5cbiAgJC5hamF4KHsgdXJsLCBtZXRob2QgfSlcbiAgICAudGhlbigoKSA9PiAkcGFyZW50Q29udGFpbmVyLnJlbW92ZSgpKVxuICAgIC5jYXRjaCgoKSA9PiBhbGVydCgnVGhlcmUgd2FzIGFuIGVycm9yIHJlbW92aW5nIHRoZSB0YXNrIScpKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJlbW92ZVRhc2tcbiIsImNvbnN0IGVkaXRUYXNrID0gcmVxdWlyZSgnLi9oYW5kbGVycy9lZGl0VGFzaycpXG5jb25zdCByZW1vdmVUYXNrID0gcmVxdWlyZSgnLi9oYW5kbGVycy9yZW1vdmVUYXNrJylcbmNvbnN0IGNsZWFuRm9ybSA9IHJlcXVpcmUoJy4vaGFuZGxlcnMvY2xlYW5Gb3JtJylcbmNvbnN0IGFkZFRhc2sgPSByZXF1aXJlKCcuL2hhbmRsZXJzL2FkZFRhc2snKVxuXG4kKCcuZWRpdCcpLm9uKCdjbGljaycsIGVkaXRUYXNrKVxuJCgnLnJlbW92ZScpLm9uKCdjbGljaycsIHJlbW92ZVRhc2spXG4kKCcubmV3bm90ZWJ0bicpLm9uKCdjbGljaycsIGNsZWFuRm9ybSlcbiQoJy5lZGl0LWFkZC10YXNrIGZvcm0nKS5vbignc3VibWl0JywgYWRkVGFzaylcbiJdfQ==
