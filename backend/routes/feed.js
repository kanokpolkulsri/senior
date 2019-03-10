let express = require('express');
let router = express.Router();

// let mongo = require('mongodb')


/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('/:path')
});

router.get('/event', (req, res, next) => {
  const DB_FEED_EVENT = req.app.locals.DB_FEED_EVENT
  DB_FEED_EVENT.find({}).toArray()
  .then(response => res.send(response))
  .catch(error => res.send(error))
});

router.get('/annoucement', (req, res, next) => {
  const DB_FEED_ANNOUCEMENT = req.app.locals.DB_FEED_ANNOUCEMENT
  DB_FEED_ANNOUCEMENT.find({}).toArray()
  .then(response => res.send(response))
  .catch(error => res.send(error))
});

router.get('/company', (req, res, next) => {
  const DB_FEED_COMPANY = req.app.locals.DB_FEED_COMPANY
  DB_FEED_COMPANY.find({}).toArray()
  .then(response => res.send(response))
  .catch(error => res.send(error))
});

module.exports = router;
