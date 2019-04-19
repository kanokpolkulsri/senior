let express = require('express')
let router = express.Router()
let jwt = require('jsonwebtoken')
let withAuth = require('./middleware')

/* GET users listing. */
router.get('/', withAuth, (req, res, next) => {
  res.send({response: "register"})
})

router.post('/login', (req, res, next) => {
  const DB_REGISTER = req.app.locals.DB_REGISTER
  DB_REGISTER.find(req.body, {projection: {username: 1, firstname: 1, lastname: 1}}).toArray()
  .then(response => {
    if(response != []){
      let data = {username: response[0].username, firstname: response[0].firstname, lastname: response[0].lastname}
      let payload = {username: response[0].username, firstname: response[0].firstname, lastname: response[0].lastname}
      payload["status"] = response[0].username.includes("admin") ? "admin" : "student"
      let secret = "thisiskanokpol"
      let token = jwt.sign(payload, secret)
      res.send({code: 1, data: data, token: token})
    }else{
      res.send({code: 0, data: "username or password is wrong"})
    }
  })
  .catch(() => res.send({code: 0, response: ""}))
})

router.post('/add', (req, res, next) => {
  const DB_REGISTER = req.app.locals.DB_REGISTER
  const DB_ASSIGNMENT_ADMIN = req.app.locals.DB_ASSIGNMENT_ADMIN
  const DB_ASSIGNMENT_STUDENT = req.app.locals.DB_ASSIGNMENT_STUDENT

  let username = req.body.username
  let year = req.body.year
  
  DB_REGISTER.insertOne(req.body)
  .then(() => {
    DB_ASSIGNMENT_ADMIN.find({year: year}).toArray()
    .then(response => {
      let listPromise = []
      response.map(tmp => {
        listPromise.push(new Promise((resolve, reject) => {
          delete tmp["_id"]
          tmp["username"] = username
          DB_ASSIGNMENT_STUDENT.insertOne(tmp)
          .then(() => {resolve()})
          .catch(() => {resolve()})
        }))
      })
      Promise.all(listPromise).then(() => res.send({code: 1, data: {username: username}}))
    })
    .catch(() => res.send({code: 0, data: ""}))
  })
  .catch(() => res.send({code: 0, data: ""}))
})

router.post('/forget', (req, res, next) => {
  const DB_REGISTER = req.app.locals.DB_REGISTER
  let username = req.body.username
  DB_REGISTER.find({username: username}).toArray()
  .then(response => res.send({"forget": true, "password": response[0].password}))
  .catch(() => res.send({"forget": false}))
})

module.exports = router;
