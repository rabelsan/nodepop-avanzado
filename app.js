/* eslint-disable no-undef */
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const jwtAuth = require('./lib/jwtAuth');
const loginController   = require('./routes/loginController');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');

var app = express();

// connect to the DataBase
require('./lib/connectMongoose');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').__express);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Setup i18n
// As i18n configuration creates the cookie 'nodeapi-locale', 
// it has to be initialized afer cookies middleware setup
const i18n = require('./lib/i18nConfigure');
app.use(i18n.init); // metemos un middleware a express

/**
 *  Website routes
 */
app.use('/', indexRouter);
app.use('/changeLocale', require('./routes/changeLocale'));
app.use('/users', usersRouter);
app.use('/login', loginRouter);


/**
*   API routes
**/
app.post('/api/authenticate', loginController.postJWT);
app.use('/api/anuncios', jwtAuth(), require('./routes/api/advertisements'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
// eslint-disable-next-line no-unused-vars
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);

  if (req.originalUrl.startsWith('/api/')) { // API request
    res.json({ error: err.message });
    return;
  }
  
  res.render('error');
});

module.exports = app;
