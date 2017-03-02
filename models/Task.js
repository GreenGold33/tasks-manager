const mongoose = require('mongoose');
const collection = 'tasks'

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  done: { type: Boolean, default: false },
  createdAt: { type: Number, default: Date.now },
  updatedAt: Number
}, { collection })

module.exports = mongoose.model('Task', TaskSchema);