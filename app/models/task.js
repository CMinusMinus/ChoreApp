var mongoose = require('mongoose');
var TaskSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  points: {
    type: Number,
    required: false
  },
  isCompleted: Boolean
});


module.exports = TaskSchema;
