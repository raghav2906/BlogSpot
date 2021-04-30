const Author = require('../model/author')
const jwt = require('jsonwebtoken')

module.exports =  (req,res,next)=>{
    const { authorization} = req.headers
    if(!authorization){
        return res.status(401).json({"msg":"you must be logged in"})
    }
    const token = authorization.replace("Bearer ","")
    jwt.verify(token,"raghav",(err, payload)=> {
        if(err)
            return res.status(401).json({"msg":"you must logged in "})
        
            const {_id} = payload
            Author.findById(_id)
            .then(authordata => {
                req.author = authordata
                next()
            })
            
    })
}