module.exports = function (app, mongoose) {
  var User = mongoose.model('User', require('./models/usr.js'));
  var fs = require('fs');
  var util = require('util');

  app.post('/users/new', function (req, res) {
    User.create(req.body, function (err) {
      if (err) {
        res.send(err);
        return;
      }
      res.send({"authorized": "200"});
    });
    res.json(req.body);
  });

  app.get('/users/all', function(req, res) {
    User.find({}, function (err, results) {
      if (err) {
        res.send(err);
        return;
      }
      else {
        res.send(results);
      }
    });
  });

  app.get('/users/new', function(req, res) {
    res.redirect('http://localhost:' + 3000 +'/newuser.html');
  });

  app.get('/', function (req, res) {/*
    User.findOne({email: req.params.email}, function (err, user) {
      if (err) throw err;

      user.save(function (err) {
        if (err) throw err;
      });
    });*/
    res.redirect('http://localhost/home.html');
  });

  app.get('/login', function (req, res) {
    User.findOne({email: req.body.email}, function (err, user) {
      if (err || !user) { 
        res.body({"error": "Failed to login. Please try again."});
        res.redirect('http://localhost/login.html');
      }
      user.loginCount += 1;
      user.save(function (err) {
        if (err) throw err;
      });
      res.redirect('http://localhost/home.html');
    });
  });

  app.get('/users/Usercount', function (req, res) {
    var ret = {};
    User.count(function (err, count) {
      if (!err) {
        res.json(count);
      }
    });
  });
};
