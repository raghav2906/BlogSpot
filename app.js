require('dotenv').config();

const express = require('express')
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const app=express();



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
app.get('/check',(req,res)=>{
    res.send('checking')
})

console.log(process.env.MONGO_URL);
const port = process.env.PORT || 3000

app.listen(port,(err)=>{
    if(err) console.log(err);
    else console.log(`ports live at : ${port}`)
})