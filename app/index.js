module.exports = function (app, mongoose) {
	//imports models
	var Task = mongoose.model('Task', require('./models/task.js'));
	var User = mongoose.model('User',require('./models/usr.js'));
	var House = mongoose.model('House', require('./models/house.js'));//currently does nothing

	//gets info from home page
	app.get('/', function (req, res) {

		if (req.session['id'] == null) { //
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

			User
			.find({})
			.sort('-pointsEarned')
			.exec(function (err, leaderboardData) {
				res.render('index', {
					title: "DidjaDoIt?"
					
				});
			});
		}
	});
};