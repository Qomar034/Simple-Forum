const router = require('express').Router()
const Controller = require('../controllers/index')

router.post('/forum/', Controller.postTopic)

router.get('/forum/:title', Controller.getForum)
router.post('/forum/:title', Controller.postMessage)

module.exports = router