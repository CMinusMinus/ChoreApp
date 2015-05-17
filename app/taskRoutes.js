module.exports = function (app, mongoose) {
  var Task = mongoose.model('Task', require('./models/task.js'));
  var fs = require('fs');
  var util = require('util');

  app.post('/task/create', function (req, res) {
    var name = req.body.name;
    var description = req.body.description;
    var points = req.body.points;
    var isComplete = false;

    var newTask = new Task({
      name: name,
      description: description,
      points: points,
      isComplete: isComplete
    });

    newTask.save(function(err) {
      if (err) {
        console.log(err);
        return;
      }
      else
        res.redirect("/");
    });
  });

  app.get('/task/create', function (req, res) {
    res.redirect('http://localhost:' + 3000 +'/newtask.html');
  });

  app.get('/Tasks/all', function (req, res) {
    Task.find({}, function (err, results) {
      if (err || !results) {
        res.send("No tasks yet!");
      }
      else {
        res.redirect('http://localhost/allTasks.html');
      }
    });
  });

  app.get('/Tasks/done', function (req, res) {
    Task.find({isComplete: true}, function (err, results) {
        if (err || !results) {
          res.send("No tasks yet!");
        }
        else {
          res.redirect('http://localhost/Tasks/done');
        }
    });
  });

  app.get('/Tasks/notDone', function (req, res) {
    Task.find({isComplete: false}, function (err, results) {
        if (err || !results) {
          res.send("No tasks yet!");
        }
        else {
          res.redirect('http://localhost/Tasks/notDone');
        }
    });
  });

  app.get('/api/Taskcount', function (req, res) {
    var ret = {};
    Task.count(function (err, count) {
      if (!err) {
        res.json(count);
      }
    });
  });
};