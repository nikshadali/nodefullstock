const mongoose = require('mongoose')
const coverImageBasePath = 'uploads/bookCover';
const path = require('path')
const bookSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        
    },
   publishDate:{
        type:Date,
        required:true
        
    },
    pageCount:{
        type:Number,
        required:true
        
    },
    createdAt:{
        type:Date,
        required:true,
       default:Date.now()
        
    },
    coverImage:{
        type:String,
        required:true
        
    },
    auther:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Auther'
        
    }
})
bookSchema.virtual('coverImagePath').get(function(){
    if(this.coverImage != null){
        return path.join('/', coverImageBasePath, this.coverImage)

    }
})

module.exports = new mongoose.model('Book',bookSchema)
module.exports.coverImageBasePath = coverImageBasePath