const express = require('express');
const router = express.Router();
const fs = require('fs')
const multer = require('multer')
const path = require('path')
const Book = require('../models/books')
// set uplaod image path
const uploadeImagePath = path.join('public', Book.coverImageBasePath)
const Auther = require('../models/auther');
const { fstat } = require('fs');
// check mime Type of Image
const imageMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']


// define multer function

const upload = multer({
   dest:uploadeImagePath,
   fileFilter: function(req, file, cb){
      cb(null, imageMimeTypes.includes(file.mimetype))
   }

}).single('coverImage')


 

 

// all Books routes
router.get('/', async (req,res) => {
let query = Book.find()
if(req.query.title != null && req.query.title != ''){
   query = query.regex('title', new RegExp(req.query.title, 'i'))
}
if(req.query.publishedBefore != null && req.query.publishedBefore != ''){
   query = query.lte('publishDate', req.query.publishedBefore)
}
if(req.query.publishedAfter != null && req.query.publishedAfter != ''){
   query = query.gte('publishDate', req.query.publishedAfter)
}
 try{
    const books = await query.exec()
    res.render(`book/index`, {
       books:books,
       serachOption:req.query
    })

 }catch(err){
    console.log(err)
    res.redirect('book/new')
 }
})

// new auther route
router.get('/new', async (req,res) => {
   renderNewPage(res, new Book())
})

// set post router of book
router.post('/', upload, async (req, res) => {
  
   const fileName = req.file != null ? req.file.filename : null
   console.log(req.body)
   const book = new Book({
      title: req.body.title,
      auther:req.body.auther,
      publishDate:new Date(req.body.publishDate),
      pageCount:req.body.pageCount,
      description: req.body.description,
      coverImage:fileName
   })
  try{
     const newBook = await book.save()
     res.redirect(`/book`)

  }catch{
     if(book.coverImage != null){
      removerBookCover(book.coverImage)
     }
    
   renderNewPage(res, book, true)
  }
  
})
function removerBookCover(fileName){
   fs.unlink(path.join(uploadeImagePath,fileName), err =>{
      if(err) console.error(err)
   }) 

  
}
 async function renderNewPage(res, book, hasError = false){
   try{
      const authers = await Auther.find({})
      const parms = {
         authers:authers,
         book:book
      }
     if(hasError) parms.errorMessage = `Error creating Book`
      res.render('book/new', parms)
       
     
  
   }catch(err){
      console.log(err)
     res.redirect('/book')
  
   }

 }
module.exports = router