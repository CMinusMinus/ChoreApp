var mongoose = require('mongoose');
var TaskSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  points: {
    type: Number,
    required: false
  },
  isCompleted: boolean
});


module.exports = TaskSchema;
