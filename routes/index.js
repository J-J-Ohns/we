const express = require('express')

const router = express.Router()

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', { title: 'Express' })
})

router.get('/addList', function (req, res, next) {
    res.render('addList')
})

module.exports = router
