const express = require('express');
const router = express.Router();
const Book = require('../models/books')

// set home page route
router.get('/', async (req,res) => {
    let books
    try{
         books = await Book.find().sort({createdAt:'desc'}).limit(10).exec()
    }catch(err){
        console.log(err)
        books = []
    }
    res.render('index', {books:books})
})

module.exports = router