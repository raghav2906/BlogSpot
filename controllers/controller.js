const Blog=require('../model/models')

exports.getall=async (req,res)=>{
    
    // Blog.find()
    //     .then((data)=>{
    //         res.status(200).json(data)
    //     })
    //     .catch((err)=>{
    //         if(err) res.status(500).json(err);
    //     })

    let data;
    try{
        data = await Blog.find()
    }catch (error){
        if(error) return res.status(500).json(error)
    }
    res.status(200).json(data)
} 

// create a blog
exports.create=(req,res)=>{
    const newBlog=new Blog({
        title:req.body.title,
        author:req.body.author,
        desc:req.body.desc
    })
    console.log(newBlog)
    newBlog.save().then((blog)=>{
        res.status(201).json({"msg":"create","blog":blog})
    }).catch((err)=>{
        return res.status(500).json(err)
    })
} 

// find single blog by id
exports.getone = (req,res)=>{
    Blog.findById(req.params.blogId)
        .then(data=>{
            if(!data) return res.status(404).json({"msg":"Blog not found"})
            res.status(200).json(data)
        })
        .catch(err=>{
            if(err) res.status(500).json(err)
        })

    // Blog.findOne({author:req.params.author}).then().catch()
}

// to update a blog
exports.updateone = (req,res)=>{
    if(!req.body.title || !req.body.desc || !req.body.author)
        return res.status(500).json({"msg":"fill all the blanks"})
    Blog.findByIdAndUpdate(req.params.blogId,{
        title:req.body.title,
        author:req.body.author,
        desc:req.body.desc
    },{new:true})
        .then(data=>{
            if(!data) return res.status(404).json({"msg":"not found"})
            res.status(202).json({
                "msg":"Updated",
                "doc":data
            })
        })
        .catch(err=>{
            if (err) res.status(500).json(err)
        })
}

// to delete a blog
exports.deleteone = (req,res)=>{
    Blog.findByIdAndDelete(req.params.blogId).then(data=>{
        if(!data) return res.status(404).json({"msg":"nor found"})
        res.status(202).json({
            "msg":"deleted",
            "doc":data
        })
    }).catch(err=>{
        if(err) res.status(500).json(err)
    })
}

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