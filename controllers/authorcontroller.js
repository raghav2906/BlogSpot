require('dotenv').config()
const Author = require('../model/author')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


exports.create = async (req,res)=>{
    if(!req.body.username || !req.body.password || !req.body.fullName){
        return res.status(500).json({"error":"Fill all the blanks"})
    }
    
    try{
        const oldauthor =await  Author.findOne({username: req.body.username})
        if(oldauthor){
            return res.status(422).json({"error":"Username is already taken"})
        } 
        const hashedpwd = await bcrypt.hash(req.body.password,12)
        // console.log("HELLO")
        const newAuthor = new Author({
            username:req.body.username,
            password:hashedpwd,
            fullName:req.body.fullName
        })
        console.log(newAuthor)
        const author = await newAuthor.save()
        res.status(201).json({"msg":"Succesfully Singup","author":author})
    }catch(error){
        if(error) return res.status(500).json(error)
    }
    
}

exports.signin = async (req,res)=>{
    if(!req.body.username || !req.body.password ){
        return res.status(500).json({"error":"Fill all the blanks"})
    }
    
    try{
        const savedauthor =await  Author.findOne({username: req.body.username})
        if(!savedauthor){
            return res.status(422).json({"error":"Invalid username or password"})
        } 
        console.log(savedauthor.password)
        const DOMatch = await bcrypt.compare(req.body.password, savedauthor.password)
        if(DOMatch){
            const token = jwt.sign({_id:savedauthor._id},process.env.JWT_SECRET)
            const  {_id,username,fullName} = savedauthor
            res.status(201).json({token,author:{_id,username,fullName}})
        }else{
            return res.status(422).json({"error":"Invalid username or password"})
        }
    }catch(error){
        if(error) return res.status(500).json(error)
    }
}

exports.message = async (req,res)=>{
    res.json({"msg":"HEY AUTHOR"})
}