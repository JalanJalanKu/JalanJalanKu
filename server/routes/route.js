const router = require('express').Router()
const User = require('./routeUser')
const searchFood = require('../helpers/searchFood')

router.use('/users', User)
router.get('/search-food/:keyword', searchFood)

module.exports = router