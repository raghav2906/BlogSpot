const Blog=require('../model/models')

exports.getall=async (req,res)=>{
  
    let data;
    try{
        data = await Blog.find()
    }catch(error){
        if(error) return res.status(500).json(error)
    }
    if(!data){
        return res.status(404).json({"msg":"no data"})
    }
    res.status(200).json(data)
}

exports.create = async (req,res)=>{

    const newBlog=new Blog({
        title:req.body.title,
        author:req.body.author,
        desc:req.body.desc
    })
    console.log(newBlog)

    let blog;
    try{
        blog =await newBlog.save()
    }catch(error){
        if(error) return res.status(500).json(error)
    }
    res.status(201).json({"msg":"create","blog":blog})
    
} 

// find single blog by id
exports.getone =async (req,res)=>{
    let data;
    try{
        data = await Blog.findById(req.params.blogId)
    }catch(error){
        if(error) return res.status(500).json(error)
    }
    if(!data) return res.status(404).json({"msg":"Blog not found"})
    res.status(200).json(data)
    // Blog.findOne({author:req.params.author}).then().catch()
}

// to update a blog
exports.updateone =async (req,res)=>{
    if(!req.body.title || !req.body.desc || !req.body.author)
        return res.status(500).json({"msg":"fill all the blanks"})
    let data;
    try{
        data = await Blog.findByIdAndUpdate(req.params.blogId,{
            title:req.body.title,
            author:req.body.author,
            desc:req.body.desc
        },{new:true})

    }catch(error){
        if(error) return res.status(500).json(error)
    }
    
    if(!data) return res.status(404).json({"msg":"not found"})
    
    res.status(202).json({
                "msg":"Updated",
                "doc":data
                })
        
}

// to delete a blog
exports.deleteone =async (req,res)=>{
    let data
    try{
        data = await Blog.findByIdAndDelete(req.params.blogId)
    }
    catch(error){
        if(error) return res.status(500).json(error)
    }
    
    if(!data) return res.status(404).json({"msg":"nor found"})
    
    res.status(202).json({
            "msg":"deleted",
            "doc":data
        })
    
}

// get blogss by Author
exports.getByAuthor = async (req,res)=>{
    let data;
    try{
        data=await Blog.find({author:req.params.author})

    }
    catch(error){
        if(error) return res.status(500).json(error)
    }
    if(!data){
        return res.status(404).json({"msg":"Not found!"})
    }
    res.status(200).json(data)
}

// get a blog by Title
exports.getByTitle = async (req,res)=>{
    let data;
    try{
        data=await Blog.find({title:req.params.title})

    }
    catch(error){
        if(error) return res.status(500).json(error)
    }
    if(!data){
        return res.status(404).json({"msg":"Not found!"})
    }
    res.status(200).json(data)
}

// get a blog Description
exports.getByDesc = async (req,res)=>{
    let data;
    try{
        data=await Blog.find({desc:req.params.desc})

    }
    catch(error){
        if(error) return res.status(500).json(error)
    }
    if(!data){
        return res.status(404).json({"msg":"Not found!"})
    }
    res.status(200).json(data)
}