const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const { getCurrentStudent,registerStudent,loginStudent } = require('../controllers/studentController')

router.get('/current', protect ,getCurrentStudent)

router.post('/',registerStudent)

router.post('/login',loginStudent)

module.exports = router