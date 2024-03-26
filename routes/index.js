var express = require('express')
var router = express.Router()

// router.get('/', function (req, res, next) {
    // res.render('index', { title: 'Express', words: ['EJS', 'is', '<span style="font-weight: bold">awesome</span>']})
// })

router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Express',content: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
    })
})

module.exports = router
