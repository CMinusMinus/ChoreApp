var mongoose = require('mongoose');
var usrSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  gender: {
    type: String,
    required: false
  },
  id: {
    type: int,
    required: true
  }
});


module.exports = usrSchema;
