var express = require('express')
var router = express.Router()
let withAuth = require('./middleware')

/* GET home page. */
router.get('/', (req, res, next) => {
  res.send("response: index")
});

module.exports = router;
