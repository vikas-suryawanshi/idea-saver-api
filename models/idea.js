const mongoose=require("mongoose");
const { type } = require("node:os");

const ideaSchema=new mongoose.Schema({
    author:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    likes:{
        type:Number,
        default:0,
    },
});

const idea= mongoose.model("idea",ideaSchema);
module.exports=idea;