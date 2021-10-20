
const express = require('express')
const app = express();
const dotenv = require('dotenv').config()
const expresslayout = require('express-ejs-layouts');
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser')
require('./db/connect')
//import router 
const indexRouter = require('./routes/index')
const autherRouter = require('./routes/authers')
const bookRouther = require('./routes/book')
const imageRouter = require('./routes/Image')
// set egine template path as ejs
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
console.log(process.env.NAME)

// use body prser

app.use(bodyParser.urlencoded({extended:false}))

// set layout path of express layout
app.set('layout','layouts/layout')
app.use(expresslayout)

// set public folder path as static
app.use(express.static('public'))

// use router of home page
app.use('/', indexRouter)
app.use('/authers',autherRouter)
app.use('/book', bookRouther)
app.use('/image', imageRouter)


// create sever listener
app.listen(PORT, () =>{
    console.log(`This server runging on ${PORT}...`)
})