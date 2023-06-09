const ability = require('./defineAbility.js');

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const directorsRouter = require('./routes/directors');
const moviesRouter = require('./routes/movies');
const membersRouter = require('./routes/members')

// "mongdb"://<dbUser>?:<dbPass>?@?<direction>:<port>/<dbName>
const uri = "mongodb://127.0.0.1:27017/videoclub";
mongoose.connect(uri);
const db = mongoose.connection;

const app = express();

db.on('open',()=>{
  console.log("Conexion ok");
})


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/directors',directorsRouter);
app.use('/movies',moviesRouter);
app.use('/members',membersRouter);

//Abilities
ability.can('read', 'Post') // true
ability.can('read', 'User') // true
ability.can('update', 'User') // true
ability.can('delete', 'User') // false
ability.cannot('delete', 'User') // true

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;