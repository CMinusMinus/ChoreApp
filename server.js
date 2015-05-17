var express = require('express'),
app = express(),
mongoose = require('mongoose'),
bodyParser = require('body-parser'),
methodOverride = require('method-override'),
morgan = require('morgan'),
serveStatic = require('serve-static');
path = require('path');


var db = require('./config/db');

mongoose.connect(db.url);

var port = 3000;

app.set('views', path.join(__dirname, 'app', 'views'));
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(methodOverride('X-HTTP-Method-Override'));
app.use('/', express.static(__dirname + '/public'));
require('./app/index')(app, mongoose);
require('./app/taskRoutes')(app, mongoose);
require('./app/userRoutes')(app, mongoose);

app.listen(port);
console.log('Magic happens on port ' + port);
exports = module.exports = app;
