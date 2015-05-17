module.exports = function (app, mongoose) {
  var User = mongoose.model('User', require('./models/usr.js'));
  var fs = require('fs');
  var util = require('util');

  app.post('/users/new', function (req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var pointsEarned = 0;

    var newUser = new User({
      name: name,
      email: email,
      password: password,
      pointsEarned: pointsEarned
    });

    newUser.save(function(err) {
      if (err) {
        console.log(err);
        return;
      }
      else {
        res.redirect("/");
      }
    });
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

  app.post('/login', function (req, res) {
    User.findOne({email: req.body.email}, function (err, user) {
      if (err || !user) {
        res.send("Failed to login. Please try again.");
        res.redirect('http://localhost:3000/login.html');
      }

      req.session.name = 'userID';
      req.session['id'] = user._id;

      res.redirect('/');
    });
  });

  app.get('/logout', function (req, res) {
    req.session = null;
    res.redirect('/');
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
