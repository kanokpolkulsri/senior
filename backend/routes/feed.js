let express = require('express');
let router = express.Router();

let mongo = require('mongodb')

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('/:path')
});

/* EVENT */
router.get('/event', (req, res, next) => {
  const DB_FEED_EVENT = req.app.locals.DB_FEED_EVENT
  DB_FEED_EVENT.find({}).toArray()
  .then(response => res.send(response))
  .catch(error => res.send(error))
});

router.post('/event/new', (req, res, next) => {
  const DB_FEED_EVENT = req.app.locals.DB_FEED_EVENT
  DB_FEED_EVENT.insertOne(req.body)
  .then(() => res.send({"new": true}))
  .catch(() => res.send({"new": false}))
});

router.post('/event/update', (req, res, next) => {
  const DB_FEED_EVENT = req.app.locals.DB_FEED_EVENT
  req.body._id = mongo.ObjectID(req.body._id)
  DB_FEED_EVENT.updateOne({_id: req.body._id}, {$set: req.body})
  .then(() => res.send({"update": true}))
  .catch(() => res.send({"update": false}))
});

router.post('/event/delete', (req, res, next) => {
  const DB_FEED_EVENT = req.app.locals.DB_FEED_EVENT
  req.body._id = mongo.ObjectID(req.body._id)
  DB_FEED_EVENT.remove({_id: req.body._id})
  .then(() => res.send({"delete": true}))
  .catch(() => res.send({"delete": false}))
});

/* ANNOUCEMENT */
router.get('/annoucement', (req, res, next) => {
  const DB_FEED_ANNOUCEMENT = req.app.locals.DB_FEED_ANNOUCEMENT
  DB_FEED_ANNOUCEMENT.find({}).toArray()
  .then(response => res.send(response))
  .catch(error => res.send(error))
});

router.post('/annoucement/new', (req, res, next) => {
  const DB_FEED_ANNOUCEMENT = req.app.locals.DB_FEED_ANNOUCEMENT
  DB_FEED_ANNOUCEMENT.insertOne(req.body)
  .then(() => res.send({"new": true}))
  .catch(() => res.send({"new": false}))
});

router.post('/annoucement/update', (req, res, next) => {
  const DB_FEED_ANNOUCEMENT = req.app.locals.DB_FEED_ANNOUCEMENT
  req.body._id = mongo.ObjectID(req.body._id)
  DB_FEED_ANNOUCEMENT.updateOne({_id: req.body._id}, {$set: req.body})
  .then(() => res.send({"update": true}))
  .catch(() => res.send({"update": false}))
});

router.post('/annoucement/delete', (req, res, next) => {
  const DB_FEED_ANNOUCEMENT = req.app.locals.DB_FEED_ANNOUCEMENT
  req.body._id = mongo.ObjectID(req.body._id)
  DB_FEED_ANNOUCEMENT.remove({_id: req.body._id})
  .then(() => res.send({"delete": true}))
  .catch(() => res.send({"delete": false}))
});

/* COMPANY */
router.get('/company', (req, res, next) => {
  const DB_FEED_COMPANY = req.app.locals.DB_FEED_COMPANY
  DB_FEED_COMPANY.find({}).toArray()
  .then(response => res.send(response))
  .catch(error => res.send(error))
});

router.post('/company/new', (req, res, next) => {
  const DB_FEED_COMPANY = req.app.locals.DB_FEED_COMPANY
  DB_FEED_COMPANY.insertOne(req.body)
  .then(() => res.send({"new": true}))
  .catch(() => res.send({"new": false}))
});

router.post('/company/update', (req, res, next) => {
  const DB_FEED_COMPANY = req.app.locals.DB_FEED_COMPANY
  req.body._id = mongo.ObjectID(req.body._id)
  DB_FEED_COMPANY.updateOne({_id: req.body._id}, {$set: req.body})
  .then(() => res.send({"update": true}))
  .catch(() => res.send({"update": false}))
});

router.post('/company/delete', (req, res, next) => {
  const DB_FEED_COMPANY = req.app.locals.DB_FEED_COMPANY
  req.body._id = mongo.ObjectID(req.body._id)
  DB_FEED_COMPANY.remove({_id: req.body._id})
  .then(() => res.send({"delete": true}))
  .catch(() => res.send({"delete": false}))
});

module.exports = router;
