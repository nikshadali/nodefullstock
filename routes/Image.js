const express = require('express')
const router = express.Router()
const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
    destination : './public/uplads',
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname) )
    }
})
// define multer function 

const upload = multer({
    storage:storage,
    fileFilter: function(req, file, cb){
        checkFileType(file, cb)
    }
}).single('coverImage')

// define checkFileType function

function checkFileType(file, cb){
    const fileType = /jpg|jpeg|png|gif/
    const extName = fileType.test(path.extname(file.originalname).toLowerCase())
    const mimeType = fileType.test(file.mimetype)
    if(extName && mimeType){
        cb(null, true)
    }
    else{
        cb('Only Image')
    }
}

router.get('/', (req, res) => {
    res.send('This is Image router')
})
 router.post('/', (req, res) => {
    upload(req, res, (err) => {
        if(err){
            res.json({error:err})
        }
        else{
            if(req.file == undefined){
                res.json({error:'file Not selected'})
            }
            else{
                res.render('/',{error: 'file upload', imageName:`uploads/${req.file.filename}`})
            }
        }
    })
 })
module.exports = router