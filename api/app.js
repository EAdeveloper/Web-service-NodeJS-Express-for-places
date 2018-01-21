var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');

// This middleware validates the jsonwebtoken
const jwtMiddleware = require('express-jwt');
const secrets = require('./config/secrets');


const places = require('./routes/places');
const users = require('./routes/users');
const sessions = require('./routes/sessions');


const db = require('./config/database');

db.connect();
var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


// Using the express-jwt all routes request are protected with a json web token
// Unless you specified which ones do not  need to be protected
app.use(
	jwtMiddleware({secret: secrets.jwtSecret})
	//to loging and create user are excluded from the protection so you can request without needing a json web token.
		// .unless({path: ['/sessions', 'users'] })
	// This line excludes the protection to the "GET" request
		.unless({path: ['/sessions', '/users'], method: 'GET'} )

	)

// from the router places
app.use('/places', places);
// routes for users
app.use('/users', users);
// routes for sessions
app.use('/sessions', sessions);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err);

});

module.exports = app;
