let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');

let index = require('./routes/index');
let register = require('./routes/register');
let feed = require('./routes/feed');
let report = require('./routes/report');
let review = require('./routes/review');
let schedule = require('./routes/schedule');

let app = express();

let MongoClient = require('mongodb').MongoClient;
let Config = require('./config.json')
let MongoURL = Config.MongoURL;


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.all('/*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  next()
})

app.use('/', index);
app.use('/register', register);
app.use('/feed', feed);
app.use('/report', report);
app.use('/review', review);
app.use('/schedule', schedule);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
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
  res.render('error');
});

MongoClient.connect(MongoURL, { useNewUrlParser: true })
.then(client => {
  const db = client.db("Backend");
  const review = db.collection("Review");
  const register = db.collection("Register");
  const feed_event = db.collection("Feed_Event")
  const feed_announcement = db.collection("Feed_Announcement")
  const feed_company = db.collection("Feed_Company")
  const schedule = db.collection("Schedule")
  app.locals.DB_REVIEW = review
  app.locals.DB_REGISTER = register
  app.locals.DB_FEED_EVENT = feed_event
  app.locals.DB_FEED_ANNOUNCEMENT = feed_announcement
  app.locals.DB_FEED_COMPANY = feed_company
  app.locals.DB_SCHEDULE = schedule
})
.catch(error => console.error(error));


module.exports = app;
