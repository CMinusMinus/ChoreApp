module.exports = function (app, mongoose) {
  var Task = mongoose.model('Task', require('./models/usr.js'));
  var fs = require('fs');
  var util = require('util');

  app.post('/task/create', function (req, res) {
    Task.create(req.body, function (err) {
      if (err) {
        res.send(err);
        return;
      }
      res.redirect('http://localhost/task/create');//ask Curtis
    });
  });

  app.get('/task/create', function(req, res) {
    
  });

/*
  app.get('/Tasks', function (req, res) {
    Task.findAll(function (err, Tasks) {
      if (err) throw err;

      Tasks[].save(function (err) {
        if (err) throw err;
      });
      res.redirect('http://localhost/Tasks.html');
    });
  });
*/
  app.get('/Tasks/all', function (req, res) {
    Task.findAll(function (err, results) {
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