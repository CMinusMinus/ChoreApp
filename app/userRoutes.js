module.exports = function (app, mongoose) { //allows routes to be accessible to other
  var User = mongoose.model('User', require('./models/usr.js'));//includes the user object
  var fs = require('fs'); //no clue
  var util = require('util'); //internal API's

  app.post('/users/new', function (req, res) { //creates a new user from the form
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var pointsEarned = 0;

    var newUser = new User({ //initiates new user
      name: name,
      email: email,
      password: password,
      pointsEarned: pointsEarned
    });

    newUser.save(function(err) { //saves new user in data base
      if (err) { //if fails
        console.log(err); //logs description of error that caused failure

        return;
      }
      else { //if successful
        res.redirect("/"); //redirects to home page
      }
    });
  });

  app.get('/users/all', function(req, res) { //route to all users stored in the database
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
