const express=require("express");
const port=8080;
const app=express();

app.get("/",(req,res)=>{
    res.send("server is working");
})

app.listen(port,()=>{
    console.log("port is listening on 8080");
})