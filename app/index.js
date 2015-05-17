module.exports = function (app, mongoose) {
	var Task = mongoose.model('Task', require('./models/task.js'));

	app.get('/', function (req, res) {

		if (req.session['id'] == null) {
			res.redirect('/Login.html');
		}
		else {
			Task
			.find({})
			.where('isCompleted').equals(false)
			.sort('-points')
			.exec(function (err, taskData) {
				res.render('index', {
					title: "DidjaDoIt?",
					taskData: taskData
				});
			});
		}
	});
};