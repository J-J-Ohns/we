const express = require('express')
const bcrypt = require('bcrypt')
const { validUsername, usernameAvailable, validPassword } = require('../middlewares/index.middleware')
const User = require('../models/user')

const router = express.Router()

router.get('/', async (req, res, next) => {
    const userData = await (await fetch('http://localhost:3000/api/909090')).json()

    res.render('index', { list: userData.entries, username: req.user.username })
    console.log(req.user)
})

router.get('/addList', (req, res, next) => {
    res.render('addList')
})

module.exports = router