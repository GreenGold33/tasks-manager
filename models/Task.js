const mongoose = require('mongoose');
const collection = 'tasks'

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  status: { type: Number, default: 0 },
  userId: String,
  createdAt: { type: Number, default: Date.now },
  updatedAt: Number
}, { collection })

module.exports = mongoose.model('Task', TaskSchema);