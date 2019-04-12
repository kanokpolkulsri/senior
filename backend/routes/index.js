var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  if(!req.session.username){
    res.send("response: no session")
  }else{
    res.send(req.session)
  }
});

module.exports = router;
