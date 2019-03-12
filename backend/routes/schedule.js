var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  const DB_SCHEDULE = req.app.locals.DB_SCHEDULE
  DB_SCHEDULE.find({}).toArray()
  .then(response => res.send(response))
  .catch(error => res.send(error))
});

module.exports = router;
