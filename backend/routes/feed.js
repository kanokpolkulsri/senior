let express = require('express')
let router = express.Router()
let withAuth = require('./middleware')

let mongo = require('mongodb')

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('/:categorization/:function')
});

/* EVENT */
router.get('/event', (req, res, next) => {
  const DB_FEED_EVENT = req.app.locals.DB_FEED_EVENT
  DB_FEED_EVENT.find({}).toArray()
  .then(response => res.send({code: 1, data: response}))
  .catch(() => res.send({code: 0, data: ""}))
});

router.post('/event', (req, res, next) => {
  let username = req.body.username
  const DB_FEED_EVENT = req.app.locals.DB_FEED_EVENT
  DB_FEED_EVENT.find( {members: {$in: [username]}} ).toArray()
  .then(response => {res.send({code: 1, data: response})})
  .catch(() => res.send({code: 0, data: ""}))
});

router.post('/event/new', withAuth, (req, res, next) => {
  const DB_FEED_EVENT = req.app.locals.DB_FEED_EVENT
  DB_FEED_EVENT.insertOne(req.body)
  .then(() => res.send({code: 1}))
  .catch(() => res.send({code: 0}))
});

router.post('/event/update', (req, res, next) => {
  const DB_FEED_EVENT = req.app.locals.DB_FEED_EVENT
  req.body._id = mongo.ObjectID(req.body._id)
  DB_FEED_EVENT.updateOne({_id: req.body._id}, {$set: req.body})
  .then(() => res.send({code: 1}))
  .catch(() => res.send({code: 0}))
});

router.post('/event/delete', (req, res, next) => {
  const DB_FEED_EVENT = req.app.locals.DB_FEED_EVENT
  req.body._id = mongo.ObjectID(req.body._id)
  DB_FEED_EVENT.remove({_id: req.body._id})
  .then(() => res.send({code: 1}))
  .catch(() => res.send({code: 0}))
});

/* ANNOUCEMENT */
router.get('/announcement', (req, res, next) => {
  const DB_FEED_ANNOUCEMENT = req.app.locals.DB_FEED_ANNOUNCEMENT
  DB_FEED_ANNOUCEMENT.find({}).toArray()
  .then(response => res.send({code: 1, data: response}))
  .catch(() => res.send({code: 0, data: ""}))
});

router.post('/announcement/new', (req, res, next) => {
  const DB_FEED_ANNOUCEMENT = req.app.locals.DB_FEED_ANNOUNCEMENT
  DB_FEED_ANNOUCEMENT.insertOne(req.body)
  .then(() => res.send({code: 1}))
  .catch(() => res.send({code: 0}))
});

router.post('/annoucnement/update', (req, res, next) => {
  const DB_FEED_ANNOUCEMENT = req.app.locals.DB_FEED_ANNOUNCEMENT
  req.body._id = mongo.ObjectID(req.body._id)
  DB_FEED_ANNOUCEMENT.updateOne({_id: req.body._id}, {$set: req.body})
  .then(() => res.send({code: 1}))
  .catch(() => res.send({code: 0}))
});

router.post('/announcement/delete', (req, res, next) => {
  const DB_FEED_ANNOUCEMENT = req.app.locals.DB_FEED_ANNOUNCEMENT
  req.body._id = mongo.ObjectID(req.body._id)
  DB_FEED_ANNOUCEMENT.remove({_id: req.body._id})
  .then(() => res.send({code: 1}))
  .catch(() => res.send({code: 0}))
});

/* COMPANY */
router.get('/company', (req, res, next) => {
  const DB_FEED_COMPANY = req.app.locals.DB_FEED_COMPANY
  DB_FEED_COMPANY.find({}).toArray()
  .then(response => res.send({code: 1, data: response}))
  .catch(() => res.send({code: 0, data: ""}))
});

router.post('/company/new', (req, res, next) => {
  const DB_FEED_COMPANY = req.app.locals.DB_FEED_COMPANY
  DB_FEED_COMPANY.insertOne(req.body)
  .then(() => res.send({code: 1}))
  .catch(() => res.send({code: 0}))
});

router.post('/company/update', (req, res, next) => {
  const DB_FEED_COMPANY = req.app.locals.DB_FEED_COMPANY
  req.body._id = mongo.ObjectID(req.body._id)
  DB_FEED_COMPANY.updateOne({_id: req.body._id}, {$set: req.body})
  .then(() => res.send({code: 1}))
  .catch(() => res.send({code: 0}))
});

router.post('/company/delete', (req, res, next) => {
  const DB_FEED_COMPANY = req.app.locals.DB_FEED_COMPANY
  req.body._id = mongo.ObjectID(req.body._id)
  DB_FEED_COMPANY.remove({_id: req.body._id})
  .then(() => res.send({code: 1}))
  .catch(() => res.send({code: 0}))
});

module.exports = router;
