var mongoose = require('mongoose');
var TaskSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  points: {
    type: int,
    required: false
  },
  isAquired: boolean,
  isCompleted: boolean
});


module.exports = TaskSchema;
