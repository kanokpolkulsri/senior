var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', (req, res, next) => {
    const DB_ASSIGNMENT_ADMIN = req.app.locals.DB_ASSIGNMENT_ADMIN
    DB_ASSIGNMENT_ADMIN.find({}).toArray()
    .then(response => res.send({code: 1, data: response}))
    .catch(() => res.send({code: 0, data: ""}))
})

router.post('/report_year', (req, res, next) => {
    const DB_ASSIGNMENT_ADMIN = req.app.locals.DB_ASSIGNMENT_ADMIN
    DB_ASSIGNMENT_ADMIN.find({year: req.body.year}, {projection: {id: 1, assignmentName: 1, defaultForm: 1}}).toArray()
    .then(response => {
        let columns = [{title: "name", dataIndex: "name", defaultForm: "name"}]
        let data = response
        data.map(tmp => {
            let tmpList = {
                title: tmp.assignmentName,
                dataIndex: tmp.id,
                defaultForm: tmp.defaultForm
            }
            columns.push(tmpList)
        })
        res.send({code: 1, data: columns})
    })
    .catch(() => res.send({code: 0, data: ""}))
})

router.post('/id', (req, res, next) => {
    // status: 0 = missing, 1 = turned in, -1 = late
    const DB_ASSIGNMENT_ADMIN = req.app.locals.DB_ASSIGNMENT_ADMIN
    DB_ASSIGNMENT_ADMIN.find({id: req.body.id}).toArray()
    .then(response => res.send({code: 1, data: response}))
    .catch(() => res.send({code: 0, data: ""}))
})

router.post('/update', (req, res, next) => {
    
    const DB_ASSIGNMENT_ADMIN = req.app.locals.DB_ASSIGNMENT_ADMIN
    const DB_ASSIGNMENT_STUDENT = req.app.locals.DB_ASSIGNMENT_STUDENT

    let id = req.body.id
    let body = req.body
    let formNewData = req.body.formData
    
    DB_ASSIGNMENT_ADMIN.updateOne({id: id}, {$set: body})
    .then(() => {
        DB_ASSIGNMENT_STUDENT.find({id: id}).toArray()
        .then(response => {
            let listPromise = []
            response.map(student => {
                listPromise.push(new Promise((resolve, reject) => {
                    let mapOldData = {}
                    let formOldData = student.formData
                    formOldData.map(tmpOld => {
                        mapOldData[tmpOld.title] = tmpOld
                    })
                    let listUpdateData = []
                    formNewData.map(tmpNew => {
                        if(tmpNew.title in mapOldData){
                            mapOldData[tmpNew.title].option = tmpNew.option
                            listUpdateData.push(mapOldData[tmpNew.title])
                        }else{
                            listUpdateData.push(tmpNew)
                        }
                    })
                    DB_ASSIGNMENT_STUDENT.updateOne({id: id, username: student.username}, {$set: {formData: listUpdateData}})
                    .then(() => {
                        resolve()
                    })
                }))
            })

            Promise.all(listPromise).then(() => {
                res.send({code: 1, data: ""})
            })
        })
    })
    .catch(() => res.send({code: 0}))
})

router.post('/year', (req, res, next) => {
    const DB_ASSIGNMENT_ADMIN = req.app.locals.DB_ASSIGNMENT_ADMIN
    DB_ASSIGNMENT_ADMIN.find({year: req.body.year}).toArray()
    .then(response => res.send({code: 1, data: response}))
    .catch(() => res.send({code: 0, data: ""}))
})

router.get('/year_assignment', (req, res, next) => {
    const DB_ASSIGNMENT_ADMIN = req.app.locals.DB_ASSIGNMENT_ADMIN
    DB_ASSIGNMENT_ADMIN.distinct("year")
    .then(response => res.send({code: 1, data: response}))
    .catch(() => res.send({code: 0, data: ""}))
})

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
})

router.post('/delete', (req, res, next) => {
    const DB_ASSIGNMENT_ADMIN = req.app.locals.DB_ASSIGNMENT_ADMIN
    const DB_ASSIGNMENT_STUDENT = req.app.locals.DB_ASSIGNMENT_STUDENT
    DB_ASSIGNMENT_ADMIN.remove({id: req.body.id})
    .then(() => {
        DB_ASSIGNMENT_STUDENT.remove({id: req.body.id})
        .then(() => {
            res.send({code: 1})
        })
        .catch(() => res.send({code: 0}))
    })
    .catch(() => res.send({code: 0}))
})

router.post('/sendemail', (req, res, next) => {
    let nodemailer = require('nodemailer')
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'kanokpol.k@ku.th',
            pass: 'Mypassword.1'
        }
    })
    let mailOptions = {
        from: 'kanokpol.k@ku.th',
        to: 'kanokpolkulsri@gmail.com',
        subject: 'Evaultion Form for the internship student - Kasetsart university',
        text: `
        Dear...,
    
        We have got your email from our internship student whose name is...
        This is a process for you to evaluate the internship student's scores. You are able to submit only once, please carefully consider it.
        Please submit your evaluation following this link...
        This email is an auto message system, please do not reply. 
    
        Best regards,
        Internship Evaluation System
        Department of Computer Engineering and Software Engineering
        Kasetsart university
    
        `
    }
    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error)
    } else {
        console.log('Email sent: ' + info.response)
    }
    })
})

module.exports = router
