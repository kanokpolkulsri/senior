let express = require('express')
let path = require('path')
let logger = require('morgan')
let cookieParser = require('cookie-parser')
let bodyParser = require('body-parser')
let cors = require('cors')
let session = require('express-session')

let index = require('./routes/index')
let register = require('./routes/register')
let feed = require('./routes/feed')
let report = require('./routes/report')
let review = require('./routes/review')
let schedule = require('./routes/schedule')
let faq = require('./routes/faq')
let assignment_admin = require('./routes/assignment_admin')
let assignment_student = require('./routes/assignment_student')

let app = express()

let MongoClient = require('mongodb').MongoClient
let Config = require('./config.json')
let MongoURL = Config.MongoURL

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())

app.use('/', index)
app.use('/register', register)
app.use('/feed', feed)
app.use('/report', report)
app.use('/review', review)
app.use('/schedule', schedule)
app.use('/faq', faq)
app.use('/assignment_student', assignment_student)
app.use('/assignment_admin', assignment_admin)

app.use(function(req, res, next) {
  let err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use(function(err, req, res, next) {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  res.status(err.status || 500)
  res.render('error')
})

MongoClient.connect(MongoURL, { useNewUrlParser: true })
.then(client => {
  const db = client.db("Backend")
  const review = db.collection("Review")
  const register = db.collection("Register")
  const feed_event = db.collection("Feed_Event")
  const feed_announcement = db.collection("Feed_Announcement")
  const feed_company = db.collection("Feed_Company")
  const schedule = db.collection("Schedule")
  const faq = db.collection("Faq")
  const assignment_student = db.collection("Assignment_Student")
  const assignment_admin = db.collection("Assignment_Admin")
  app.locals.DB_REVIEW = review
  app.locals.DB_REGISTER = register
  app.locals.DB_FEED_EVENT = feed_event
  app.locals.DB_FEED_ANNOUNCEMENT = feed_announcement
  app.locals.DB_FEED_COMPANY = feed_company
  app.locals.DB_SCHEDULE = schedule
  app.locals.DB_FAQ = faq
  app.locals.DB_ASSIGNMENT_STUDENT = assignment_student
  app.locals.DB_ASSIGNMENT_ADMIN = assignment_admin
})
.catch(error => console.error(error))


module.exports = app
