var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  const DB_REVIEW = req.app.locals.DB_REVIEW
  DB_REVIEW.find({}).toArray()
  .then(response => res.send(response))
  .catch(error => res.send(error))
});

module.exports = router;

