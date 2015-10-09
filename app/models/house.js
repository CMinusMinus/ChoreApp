var mongoose = require('mongoose');
var HouseSchema = mongoose.Schema({
	usrs: {
		type: Array
		//required: true
	},
	tasks: {
		type: Array
		//required: false
	}
});
