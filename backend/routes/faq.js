var express = require('express');
var router = express.Router();
let mongo = require('mongodb')

/* GET home page. */
router.get('/', (req, res, next) => {
    const DB_FAQ = req.app.locals.DB_FAQ
    DB_FAQ.find({}).toArray()
    .then(response => res.send({code: 1, data: response}))
    .catch(() => res.send({code: 0, data: ""}))
});

router.post('/new', (req, res, next) => {
    const DB_FAQ = req.app.locals.DB_FAQ
    DB_FAQ.insertOne(req.body)
    .then(() => res.send({code: 1}))
    .catch(() => res.send({code: 0}))
});

router.post('/update', (req, res, next) => {
    const DB_FAQ = req.app.locals.DB_FAQ
    req.body._id = mongo.ObjectID(req.body._id)
    DB_FAQ.updateOne({_id: req.body._id}, {$set: req.body})
    .then(() => res.send({code: 1}))
    .catch(() => res.send({code: 0}))
});

router.post('/delete', (req, res, next) => {
    const DB_FAQ = req.app.locals.DB_FAQ
    req.body._id = mongo.ObjectID(req.body._id)
    DB_FAQ.remove({_id: req.body._id})
    .then(() => res.send({code: 1}))
    .catch(() => res.send({code: 0}))
});

module.exports = router;
