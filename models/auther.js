const mongoose = require('mongoose')
const autherSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    }
})

module.exports = new mongoose.model('Auther',autherSchema)