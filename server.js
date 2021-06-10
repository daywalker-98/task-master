const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const mongoose = require("mongoose");

const router = require('./routes/index');

const app = express();
const PORT = process.env.PORT || 3001;

const cors = require("cors");
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/', router);

app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

mongoose.set('returnOriginal', false);
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/task-master", {useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false});

app.listen(PORT, console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`));