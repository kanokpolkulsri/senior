let express = require('express')
let router = express.Router()
let multer = require('multer')
let storage = multer.diskStorage({
  destination: function (req, file, cb) {cb(null, 'public/images')},
  filename: function (req, file, cb) {cb(null, Date.now() + '-' +file.originalname )}
})
let upload = multer({ storage: storage }).single('file')

router.get('/', (req, res, next) => {
  res.send("response: index")
})

router.post('/upload', (req, res, next) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
        return res.status(500).json(err)
    } else if (err) {
        return res.status(500).json(err)
    }
    return res.status(200).send(req.file)
  })
})

module.exports = router
