require('dotenv').config();

const express = require('express')
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const app=express();
app.use(cors())



app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))


mongoose.Promise=global.Promise;
mongoose.connect(process.env.MONGO_URL,{useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log("DB is connected")
}).catch((err)=>{
    console.log(err)
    process.exit();
})

require('./routers/router')(app)
app.get('/',(req,res)=>{
    res.json({"mess":"ieluwbvb"})
})
app.use('*',(req,res,next)=>{
    res.status(404).json({"msg":"Not found"})
})

console.log(process.env.MONGO_URL);
const port = process.env.PORT || 3000

app.listen(port,(err)=>{
    if(err) console.log(err);
    else console.log(`ports live at : ${port}`)
})