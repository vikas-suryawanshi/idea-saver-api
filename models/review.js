const mongoose=require("mongoose");

const reviewSchema = new mongoose.Schema({
    comment:String,
    rating:{
        type:Number,
        min:1,
        max:5,
    },
    created_At:{
        type:Date,
        default:Date.now(),

    },
});
const Review= new mongoose.model("Review",reviewSchema);