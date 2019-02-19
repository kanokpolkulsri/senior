var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  console.log(req.body)
  res.send('respond : index')
});

module.exports = router;
