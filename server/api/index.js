const router = require('express').Router()

router.use('/definitions', require('./definitions'))
// router.use('/antonyms', require('./antonyms'))

module.exports = router
