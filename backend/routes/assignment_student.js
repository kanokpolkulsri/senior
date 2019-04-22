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

router.post('/student_year', (req, res, next) => {

    const DB_ASSIGNMENT_STUDENT = req.app.locals.DB_ASSIGNMENT_STUDENT
    const DB_REGISTER = req.app.locals.DB_REGISTER
    
    DB_ASSIGNMENT_STUDENT.aggregate([{ $match : { 'year' : req.body.year } },{ $group : { _id : "$username", job : { $push : { id : "$id", status : "$status", statusDescription : "$statusDescription", submitDate : "$submitDate", deadline : "$deadline"  }  } } }]).toArray()
    .then(response => {
        let listPromise = []
        let data = []
        response.map(tmpRes => {
            listPromise.push(new Promise((resolve, reject) => {
                let username = tmpRes._id
                let job = tmpRes.job
                let tmpJobList = {username: username}
                job.map(tmpJob => {
                    if(tmpJob.submitDate !== ""){
                        tmpJobList[tmpJob.id] = tmpJob.statusDescription
                    }else if(tmpJob.submitDate === "" && moment().isAfter(moment(tmpJob.deadline))){
                        tmpJobList[tmpJob.id] = "missing"
                    }else{
                        tmpJobList[tmpJob.id] = "assigned"
                    }
                })
                DB_REGISTER.find({username: username}, {projection: {firstname: 1, lastname: 1}}).toArray()
                .then(response => {
                    tmpJobList["name"] = response[0].firstname + " " + response[0].lastname
                    data.push(tmpJobList)
                    resolve()
                }) 
            }))
        })
        Promise.all(listPromise).then(() => res.send({code: 1, data: data}))
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

router.post('/update_form', (req, res, next) => {
    let username = req.body.username
    let defaultForm = req.body.defaultForm
    let formData = req.body.formData
    let status = req.body.status
    let statusDescription = req.body.statusDescription
    let submitDate = req.body.submitDate
    const DB_ASSIGNMENT_STUDENT = req.app.locals.DB_ASSIGNMENT_STUDENT
    DB_ASSIGNMENT_STUDENT.updateOne({defaultForm: defaultForm, username: username}, {$set: {formData: formData, status: status, statusDescription: statusDescription, submitDate: submitDate}})
    .then(() => res.send({code: 1}))
    .catch(() => res.send({code: 0}))
})

router.post('/form_data', (req, res, next) => {
    let username = req.body.username
    let defaultForm = req.body.defaultForm
    const DB_ASSIGNMENT_STUDENT = req.app.locals.DB_ASSIGNMENT_STUDENT
    DB_ASSIGNMENT_STUDENT.find({defaultForm: defaultForm, username: username}, {projection: {formData: 1, status: 1, deadline: 1}}).toArray()
    .then(response => res.send({code: 1, data: response}))
    .catch(() => res.send({code: 0}))
})

module.exports = router
