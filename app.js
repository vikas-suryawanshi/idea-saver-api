const express=require("express");
const port=8080;
const app=express();
const mongoose=require("mongoose");
const { create } = require("./models/idea");
const Idea=require("./models/idea.js");
const path=require("path")
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));




// mongoose connect to database
main().then(()=>{
    console.log("connection succesfull");
}).catch((err)=>{
    console.log(err);
})

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/ideas');
}

// // initalize one 
// idea1=new Idea({
//     author:"vikas",
//     title:"ai interview platform",
//     description:"it is require to indian students",
//     likes:80,

// });

// idea1.save().then((data)=>{
//     console.log(data);
// }).catch((err)=>{
//     console.log(err);
// })


// index route
app.get("/ideas",async(req,res)=>{
    let ideas=await Idea.find();
    res.render("home.ejs",{ideas});
});

// new get route
app.get("/ideas/new",(req,res)=>{
    res.render("new.ejs");
})

// post route for add
app.post("/ideas",(req,res)=>{
    let {author,title,description}=req.body;
    let idea=new Idea({
        author:author,
        title:title,
        description:description,
        createdAt:Date.now(),
    });
    idea.save().then((data)=>{
        console.log(data);
    }).catch((err)=>{
        console.log(err);
})
res.redirect("/ideas");
})


// show route 
app.get("/ideas/:id",async(req,res)=>{
    let {id}=req.params;
    let idea=await Idea.findById(id);
    res.render("show.ejs",{idea});

})


app.get("/",(req,res)=>{
    res.send("server is working");
})

app.listen(port,()=>{
    console.log("port is listening on 8080");
})