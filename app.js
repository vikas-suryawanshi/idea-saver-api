const express=require("express");
const port=8080;
const app=express();
const mongoose=require("mongoose");
const { create } = require("./models/idea");
const Idea=reuire("./models/idea.js");




// mongoose connect to database
main().then(()=>{
    console.log("connection succesfull");
}).catch((err)=>{
    console.log(err);
})

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/ideas');
}

// initalize one 
idea1=new Idea({
    author:"vikas",
    title:"ai interview platform",
    description:"it is require to indian students",
    likes:80,

});

idea1.save().then((data)=>{
    console.log(data);
}).catch((err)=>{
    console.log(err);
})

app.get("/",(req,res)=>{
    res.send("server is working");
})

app.listen(port,()=>{
    console.log("port is listening on 8080");
})