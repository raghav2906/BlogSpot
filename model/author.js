const mongoose = require('mongoose')

const AuthorSchema = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    fullName:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

module.exports = mongoose.model('Author',AuthorSchema) 