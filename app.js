const express=require("express");
const port=8080;
const app=express();
const mongoose=require("mongoose");
const methodOverride=require("method-override");
const { create } = require("./models/idea");
const Idea=require("./models/idea.js");
const Review=require("./models/review.js");
const path=require("path")
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
// ejs mate require & use
const ejsMate=require("ejs-mate");
app.engine("ejs",ejsMate);
// reuire expresserror handling files
const ExpressError=require("./utils/ExpressError.js");
const wrapAsync = require("./utils/wrapAsync.js");
// require schema validation files
const {ideaSchema,reviewSchema} =require("./schema/schema.js");
const {updateIdeaSchema} = require("./schema/schema.js");




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

// new form validation schema middlewares
const validateIdea=(req,res,next)=>{
    let {error}=ideaSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    };
    next();
};

// update validation middleware
const validateUpdateIdea=(req,res,next)=>{
    let {error}=updateIdeaSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    };
    next();
};


// index route
app.get("/ideas",wrapAsync(async(req,res)=>{
    let ideas=await Idea.find();
    res.render("home.ejs",{ideas});
}));

// new get route
app.get("/ideas/new",(req,res)=>{
    res.render("new.ejs");
})

// post route for add
app.post("/ideas",validateIdea,wrapAsync(async(req,res)=>{
    let {author,title,description}=req.body;
    let idea=new Idea({
        author:author,
        title:title,
        description:description,
        createdAt:Date.now(),
    });
    await idea.save().then((data)=>{
        console.log(data);
    }).catch((err)=>{
        console.log(err);
})
res.redirect("/ideas");
}));


// show route 
app.get("/ideas/:id",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        throw new ExpressError(404,"invalid id");
    }
    let idea=await Idea.findById(id);
    if(!idea){
        throw new ExpressError(404,"idea is not found");
    }
    res.render("show.ejs",{idea});

}));

// edit route for serve form
app.get("/ideas/:id/edit",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    let idea= await Idea.findById(id);
    res.render("edit.ejs",{idea});
}));


// update route for update description
app.put("/ideas/:id",validateUpdateIdea,wrapAsync(async(req,res)=>{
    let {id}=req.params;
    let {description:newdescription}=req.body;
    let idea=await Idea.findByIdAndUpdate(id,{description:newdescription});
    res.redirect("/ideas");
}));


// delete for delete a idea
app.delete("/ideas/:id",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    let idea= await Idea.findByIdAndDelete(id);
    res.redirect("/ideas");
}));


// reviews post route
app.post("/ideas/:id/reviews",async(req,res)=>{
    let ideas=await Idea.findById(req.params.id);
    let newReview= new Review(req.body.review);

    ideas.reviews.push(newReview);
    await newReview.save();
    await ideas.save();
    res.redirect(`/ideas/${req.params.id}`);
})

app.get("/",(req,res)=>{
    res.send("server is working");
})

// page not found middleware
app.use((req,res,next)=>{
    next(new ExpressError(404,"page not found"));
})


// global middleware define
app.use((err,req,res,next)=>{
    let {status=500,message="something went wrong"}=err;
    res.status(status).render("error.ejs",{message});
});



app.listen(port,()=>{
    console.log("port is listening on 8080");
})