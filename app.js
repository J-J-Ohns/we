const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
 
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const shoppingListsRouter = require('./routes/shoppingLists')
 
const app = express()
 
// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
 
// WE Ergaenzungen
app.set('Hello', 'world')
console.log(app.get('Hello')) // 'world'
 
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
 
app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/shopping-lists', shoppingListsRouter)
 
//WE Ergaenzung
//app.use('/top-secret', req => console.log(req.originalUrl))
 
//WE Ergaenzung
app.use('/top-secret', (req, res, next) => {
    console.log(`Someone entered the secretroute: ${req.originalUrl}`)
    next()
    console.log('This is after next()')
})
 
app.use('/top-secret', (req, res, next) => {
    res.status(403).send('Access denied! 🚫');
    return
})
 
app.use('/next-test', (req, res, next) => {
    console.log('before next() 😺')
    next()
    console.log('after next() 🐡')
})
 
app.use('/next-test', (req, res, next) => {
    console.log('2nd middleware 🐶 wuff wuff !!!')
})
 
app.use('/get-route/:age', (req, res, next) => {
    if (req.params.age < 18) {
        res.status(403).send('Sorry, you have to be at least 18 years old to continue. 😥')
        return
    }
    next()
})
 
app.get('/get-route/:age', (req, res, next) => {
    res.send('Adult zone! 🍺')
})
 
app.post('/post-route', (req, res, next) => {
    res.send('data send successfully 🐱‍💻🏴‍☠️🔥🍮🐞')
})
 
app.post('/login-route1', (req, res, next) => {
    if (req.body.username === 'admin' && req.body.password === 'admin') {
        res.send('Login successful! 🎉')
        return
    }
    res.status(403).send('Login failed! 😥')
})
 
app.use('/login-route', (req, res, next) => {
    if (req.body.username && req.body.password) {
        console.log('username: ' + req.body.username)
        console.log('password: ' + req.body.password)
        next()
        return
    }
    res.status(422).send('cannot process data 🤔')
    return
})
 
app.post('/login-route', (req, res) => {
    res.send('login successful 🐱‍🏍')
})
 
// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404))
})
 
// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}
 
    // render the error page
    res.status(err.status || 500)
    res.render('error')
})
 
module.exports = app
