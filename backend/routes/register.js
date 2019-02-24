let express = require('express');
let router = express.Router();

let mongo = require('mongodb')

/* GET users listing. */
router.get('/', (req, res, next) => {
  const DB_REGISTER = req.app.locals.DB_REGISTER
  DB_REGISTER.find({}).toArray()
  .then(response => res.send(response))
  .catch(error => res.send(error))
});

module.exports = router;
