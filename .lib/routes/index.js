const express = require('express')
const router = express.Router()

router.use('/authapi', require('./authapi'))

module.exports = router