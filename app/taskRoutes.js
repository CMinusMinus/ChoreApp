module.exports = function (app, mongoose) {
  var Task = mongoose.model('Task', require('./models/task.js'));
  var User = mongoose.model('User', require('./models/usr.js'));
  var fs = require('fs');
  var util = require('util');

  app.post('/task/create', function (req, res) {
    var name = req.body.name;
    var description = req.body.description;
    var points = req.body.points;
    var isCompleted = false;

    var newTask = new Task({
      name: name,
      description: description,
      points: points,
      isCompleted: isCompleted
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

  app.post('/task/complete', function (req, res) {
    var checkedTasks = req.body.checkedTasks;

    for (i=0; i < req.body.checkedTasks.length; i++) {
      // find the task
      Task.findOne({_id: checkedTasks[i]}, function (err, task) {
        if (err) {
          throw err;
          return;
        }
        task.isCompleted = true;

        // give the user points
        User.findOne({_id: req.session['id']}, function (err, user) {
          user.pointsEarned += task.points;
          user.save(function (err) {
            if (err) {
              throw err;
              return;
            }
          });
        });

        // save the task
        task.save(function (err) {
          if (err) {
            throw err;
            return;
          }
        });

        res.status(200);
        res.send();
      });
    }
  });

  app.get('/tasks/all', function (req, res) {
    Task.find({}, function (err, results) {
      if (err || !results) {
        res.send("No tasks yet!");
      }
      else {
        res.redirect('http://localhost:3000/tasks/all');
      }
    });
  });

  app.get('/tasks/done', function (req, res) {
    Task.find({isComplete: true}, function (err, results) {
        if (err || !results) {
          res.send("No tasks yet!");
        }
        else {
          res.json(results);
        }
    });
  });

  app.get('/tasks/notDone', function (req, res) {
    Task.find({isComplete: false}, function (err, results) {
        if (err || !results) {
          res.send("No tasks yet!");
        }
        else {
          res.redirect('http://localhost:3000/tasks/notDone');
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