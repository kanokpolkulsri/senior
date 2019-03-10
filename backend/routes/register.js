let express = require('express');
let router = express.Router();

// let mongo = require('mongodb')

/* GET users listing. */
router.get('/', (req, res, next) => {
  const DB_REGISTER = req.app.locals.DB_REGISTER
  DB_REGISTER.find({}).toArray()
  .then(response => res.send(response))
  .catch(error => res.send(error))
});

router.post('/login', (req, res, next) => {
    if(req.body.username !== undefined && req.body.password !== undefined){
      let username = req.body.username
      let password = req.body.password
      const DB_REGISTER = req.app.locals.DB_REGISTER
      DB_REGISTER.find({username: username, password: password}).toArray()
      .then(() => res.send({"login": true}))
      .catch(() => res.send({"login": false}))
    }else{
      res.send({"login": false})
    }
})

router.post('/new', (req, res, next) => {
    const DB_REGISTER = req.app.locals.DB_REGISTER
    DB_REGISTER.insertOne(req.body)
    .then(() => res.send({"newaccount": true}))
    .catch(() => res.send({"newaccount": false}))
})

router.post('/forget', (req, res, next) => {
  const DB_REGISTER = req.app.locals.DB_REGISTER
  let username = req.body.username
  DB_REGISTER.find({username: username}).toArray()
  .then(response => res.send({"forget": true, "password": response[0].password}))
  .catch(() => res.send({"forget": false}))
})

module.exports = router;
