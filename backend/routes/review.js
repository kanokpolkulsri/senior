let express = require('express');
let router = express.Router();

let mongo = require('mongodb')

/* GET users listing. */
router.get('/', (req, res, next) => {
  const DB_REVIEW = req.app.locals.DB_REVIEW
  DB_REVIEW.find({}, {projection : {_id: 1, companyName: 1, jobDescriptionTitle: 1, payment: 1, transportationTitle: 1, star: 1, logo: 1}}).toArray()
  .then(response => res.send(response))
  .catch(error => res.send(error))
});

router.get('/:_id', (req, res, next) => {
  const DB_REVIEW = req.app.locals.DB_REVIEW
  DB_REVIEW.find({"_id" : mongo.ObjectID(req.params._id)}).toArray()
  .then(response => res.send(response))
  .catch(error => res.send(error))
});

module.exports = router;
