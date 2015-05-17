module.exports = function (app, mongoose) {
	var Task = mongoose.model('Task', require('./models/task.js'));

	app.get('/', function (req, res) {

		// find all tasks and store them in json object

		Task
			.find({})
			.sort('-points')
			.exec(function (err, taskData) {
				res.render('index', {
					title: "DidjaDoIt?",
					taskData: taskData
				});
			});
	});
};