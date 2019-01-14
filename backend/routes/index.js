var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('respond: READY to serve api')
});

module.exports = router;
