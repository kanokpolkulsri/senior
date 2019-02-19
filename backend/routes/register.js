var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  console.log(req)
  res.send('respond : register');
});

module.exports = router;
