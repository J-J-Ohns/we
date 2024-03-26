var express = require('express')
var router = express.Router()

router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express', words: ['EJS', 'is', '<span style="font-weight: bold">awesome</span>']})
})

router.get('/addList', function (req, res, next) {
    res.render('addList')
})

module.exports = router
