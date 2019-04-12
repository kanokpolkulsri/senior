var express = require('express');
var router = express.Router();
let mongo = require('mongodb')

/* GET home page. */
router.get('/', (req, res, next) => {
    const DB_ASSIGNMENT_ADMIN = req.app.locals.DB_ASSIGNMENT_ADMIN
    DB_ASSIGNMENT_ADMIN.find({}).toArray()
    .then(response => res.send({code: 1, data: response}))
    .catch(() => res.send({code: 0, data: ""}))
});

router.post('/id', (req, res, next) => {
    // status: 0 = missing, 1 = turned in, -1 = late
    const DB_ASSIGNMENT_ADMIN = req.app.locals.DB_ASSIGNMENT_ADMIN
    DB_ASSIGNMENT_ADMIN.find({id: req.body.id}).toArray()
    .then(response => res.send({code: 1, data: response}))
    .catch(() => res.send({code: 0, data: ""}))
});

router.post('/year', (req, res, next) => {
    const DB_ASSIGNMENT_ADMIN = req.app.locals.DB_ASSIGNMENT_ADMIN
    DB_ASSIGNMENT_ADMIN.find({year: req.body.year}).toArray()
    .then(response => res.send({code: 1, data: response}))
    .catch(() => res.send({code: 0, data: ""}))
});

router.post('/new', (req, res, next) => {
    // status: 0 = missing, 1 = turned in, -1 = late
    const DB_REGISTER = req.app.locals.DB_REGISTER
    const DB_ASSIGNMENT_ADMIN = req.app.locals.DB_ASSIGNMENT_ADMIN
    const DB_ASSIGNMENT_STUDENT = req.app.locals.DB_ASSIGNMENT_STUDENT
    let body = req.body
    let promiseList = []
    DB_ASSIGNMENT_ADMIN.insertOne(body)
    .then(() => {
        DB_REGISTER.find({year: body.year}, {projection: {username: 1}}).toArray()
        .then(register => {
            register.map( tmp => {
                promiseList.push(new Promise((resolve, reject) => {
                    delete body["_id"]
                    body["username"] = tmp.username
                    DB_ASSIGNMENT_STUDENT.insertOne(body)
                    .then(() => resolve())
                    .catch(() => reject())
                }))
            })
            Promise.all(promiseList).then(() => res.send({code: 1}))
        })
        .catch(() => res.send({code: 0}))
    })
    .catch(() => res.send({code: 0}))
});

router.post('/delete', (req, res, next) => {
    const DB_ASSIGNMENT_ADMIN = req.app.locals.DB_ASSIGNMENT_ADMIN
    DB_ASSIGNMENT_ADMIN.remove({id: req.body.id})
    .then(() => res.send({code: 1}))
    .catch(() => res.send({code: 0}))
});

module.exports = router;
