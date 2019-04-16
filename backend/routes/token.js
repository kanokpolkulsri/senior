let express = require('express')
let router = express.Router()
const withAuth = require('./middleware');

router.post('/', withAuth, (req, res, next) => {
    res.send({token_username: req.token_username, token_firstname: req.token_firstname, token_lastname: req.token_lastname, token_status: req.token_status})
})

module.exports = router;
