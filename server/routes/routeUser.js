const router = require('express').Router()
const Controller = require('../controllers/controllerUser')

router.post('/register', Controller.registerUser)
router.post('/login', Controller.loginUser)
router.post('/googleSign', Controller.googleSign)

module.exports = router