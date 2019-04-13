var express = require('express')
var router = express.Router()
let withAuth = require('./middleware')

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond : report');
});

module.exports = router;
