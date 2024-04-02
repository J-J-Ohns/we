const express = require('express')
const bcrypt = require('bcrypt')
const { validUsername, usernameAvailable, validPassword } = require('../middlewares/index.middleware')
const User = require('../models/user')

const router = express.Router()

router.get('/', async (req, res, next) => {
    const userData = await (await fetch('http://localhost:3000/api/909090')).json()

    res.render('index', { list: userData.entries })
})

router.get('/addList', (req, res, next) => {
    res.render('addList')
})

router.get('/login', function (req, res, next) {
    res.render('auth', { register: false })
})

router.post('/login', [validUsername, validPassword], async function (req, res, next) {
    const { username, password } = req.body

    const user = await User.findOne({ username: username })
    const correctPassword = await bcrypt.compare(password, user?.password || '')

    if (!correctPassword) {
        res.status(401).json({ error: 'Username or Password is incorrect' })
        return
    }

    res.redirect('/')
})

router.get('/register', function (req, res, next) {
    res.render('auth', { register: true })
})

router.post('/register', [validUsername, usernameAvailable, validPassword], async function (req, res, next) {
    const { username, password } = req.body
    const pwHash = await bcrypt.hash(password, 10)
    try {
        await User.create({ username: username, password: pwHash })
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: 'An error occurred while creating the user' })
        return
    }
    res.redirect('/')
})

module.exports = router