let express = require('express');
let router = express.Router();

let mongo = require('mongodb')

/* GET users listing. */
router.get('/', (req, res, next) => {
  const DB_FEED = req.app.locals.DB_FEED
  DB_FEED.find({}).toArray()
  .then(response => res.send(response))
  .catch(error => res.send(error))
});

module.exports = router;
