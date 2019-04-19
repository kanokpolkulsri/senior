let express = require('express')
let router = express.Router()
let mongo = require('mongodb')
let moment = require('moment');

/* GET home page. */
router.get('/', (req, res, next) => {
    const DB_ASSIGNMENT_STUDENT = req.app.locals.DB_ASSIGNMENT_STUDENT
    DB_ASSIGNMENT_STUDENT.find({}).toArray()
    .then(response => res.send({code: 1, data: response}))
    .catch(() => res.send({code: 0, data: ""}))
})

router.post('/year', (req, res, next) => {
    const DB_ASSIGNMENT_STUDENT = req.app.locals.DB_ASSIGNMENT_STUDENT
    DB_ASSIGNMENT_STUDENT.find({year: req.body.year}).toArray()
    .then(response => {
        let data = []
        response.map(tmp => {
            if(tmp.submitDate === "" && moment().isAfter(moment(tmp.deadline))){
                tmp["statusDescription"] = "missing"
            }
            data.push(tmp)
        })
        res.send({code: 1, data: data})
    })
    .catch(() => res.send({code: 0, data: ""}))
})

router.post('/id', (req, res, next) => {
    const DB_ASSIGNMENT_STUDENT = req.app.locals.DB_ASSIGNMENT_STUDENT
    DB_ASSIGNMENT_STUDENT.find({username: req.body.username, id: req.body.id}).toArray()
    .then(response => res.send({code: 1, data: response}))
    .catch(() => res.send({code: 0, data: ""}))
})

router.post('/student', (req, res, next) => {
    const DB_ASSIGNMENT_STUDENT = req.app.locals.DB_ASSIGNMENT_STUDENT
    DB_ASSIGNMENT_STUDENT.find({username: req.body.username}).toArray()
    .then(response => {
        let data = []
        response.map(tmp => {
            if(tmp.submitDate === "" && moment().isAfter(moment(tmp.deadline))){
                tmp["statusDescription"] = "missing"
            }
            data.push(tmp)
        })
        res.send({code: 1, data: data})
    })
    .catch(() => res.send({code: 0, data: ""}))
})

router.post('/new', (req, res, next) => {
    const DB_ASSIGNMENT_STUDENT = req.app.locals.DB_ASSIGNMENT_STUDENT
    DB_ASSIGNMENT_STUDENT.insertOne(req.body)
    .then(() => res.send({code: 1}))
    .catch(() => res.send({code: 0}))
})

router.post('/update', (req, res, next) => {
    const DB_ASSIGNMENT_STUDENT = req.app.locals.DB_ASSIGNMENT_STUDENT
    req.body._id = mongo.ObjectID(req.body._id)
    DB_ASSIGNMENT_STUDENT.updateOne({_id: req.body._id}, {$set: req.body})
    .then(() => res.send({code: 1}))
    .catch(() => res.send({code: 0}))
})

module.exports = router
