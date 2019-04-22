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

router.post('/post_send_email_to_sup', (req, res, next) => {
    let supervisorEmail = req.body.email
    let supervisorName = req.body.supervisorName
    let supervisorLink = "TEST_LINK"
    res.send({code:1, response: "yeah"})
    
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
        to: supervisorEmail,
        subject: 'Evaultion Form for the internship student - Kasetsart university',
        text: `
Dear `+supervisorName+`,

We have got your email from our internship student whose name is...
This is a process for you to evaluate the internship student's scores. You are able to submit only once, please carefully consider it.
Please submit your evaluation following this link `+supervisorLink+`
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

router.post('/data_previous_form', (req, res, next) => {
    let username = req.body.username
    let defaultForm = req.body.defaultForm
    const DB_ASSIGNMENT_STUDENT = req.app.locals.DB_ASSIGNMENT_STUDENT
    if(defaultForm === 6 || defaultForm === 11){
        DB_ASSIGNMENT_STUDENT.find({defaultForm: 4, username: username}, {projection: {formData: 1}}).toArray()
        .then(response => {
            let formData = response[0].formData
            let data = {
                f4_fullName: formData.f4_fullName,
                f4_id: formData.f4_id,
                f4_department: formData.f4_department,
                f4_faculty: formData.f4_faculty,
                f4_companyName: formData.f4_companyName,
            }
            res.send({code: 1, data: data})
        })
        .catch(() => res.send({code: 0}))
    }else if(defaultForm === 7){
        DB_ASSIGNMENT_STUDENT.find({defaultForm: 4, username: username}, {projection: {formData: 1}}).toArray()
        .then(response => {
            let formData = response[0].formData
            let data = {
                f4_fullName: formData.f4_fullName,
                f4_id: formData.f4_id,
                f4_department: formData.f4_department,
                f4_faculty: formData.f4_faculty,
                f4_companyName: formData.f4_companyName,
            }
            DB_ASSIGNMENT_STUDENT.find({defaultForm: 5, username: username}, {projection: {formData: 1}}).toArray()
            .then(tmp => {
                let tmpData = tmp[0].formData
                let newData = data
                newData["f5_address"] = tmpData.f5_address
                newData["f5_amphur"] = tmpData.f5_amphur
                newData["f5_call"] = tmpData.f5_call
                newData["f5_phone"] = tmpData.f5_phone
                newData["f5_postcode"] = tmpData.f5_postcode
                newData["f5_province"] = tmpData.f5_province
                newData["f5_soi"] = tmpData.f5_soi
                newData["f5_street"] = tmpData.f5_street
                newData["f5_tambon"] = tmpData.f5_tambon
                res.send({code: 1, data: newData})
            })
            .catch(() => res.send({code: 0}))
        })
        .catch(() => res.send({code: 0}))
    }else if(defaultForm === 8){
        DB_ASSIGNMENT_STUDENT.find({defaultForm: 4, username: username}, {projection: {formData: 1}}).toArray()
        .then(response => {
            let formData = response[0].formData
            let data = {
                f4_fullName: formData.f4_fullName,
                f4_id: formData.f4_id,
                f4_department: formData.f4_department,
                f4_faculty: formData.f4_faculty,
                f4_companyName: formData.f4_companyName,
            }
            DB_ASSIGNMENT_STUDENT.find({defaultForm: 5, username: username}, {projection: {formData: 1}}).toArray()
            .then(tmp => {
                let tmpData = tmp[0].formData
                let newData = data
                newData["f5_sup_name"] = tmpData.f5_sup_name
                newData["f5_sup_position"] = tmpData.f5_sup_position
                newData["f5_sup_division"] = tmpData.f5_sup_division
                res.send({code: 1, data: newData})
            })
            .catch(() => res.send({code: 0}))
        })
        .catch(() => res.send({code: 0}))
    }
})

module.exports = router
