const router = require('express').Router()
const User = require('./routeUser')
const searchFood = require('../helpers/searchFood')
const searchQuote = require('../helpers/searchQuote')

router.use('/users', User)
router.get('/search-food/:keyword', searchFood)
router.get('/quotes', searchQuote)

module.exports = router