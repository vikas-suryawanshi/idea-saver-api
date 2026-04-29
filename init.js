const mongoose=require("mongoose");

const Idea=require("./models/idea.js");


// / mongoose connect to database
main().then(()=>{
    console.log("connection succesfull");
}).catch((err)=>{
    console.log(err);
})

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/ideas');
}

// initalize database

let users = [
    {
        author:"akash",
        title:"Smart Study Planner",
        description:"A system that creates personalized study schedules for students based on their syllabus and available time.",
        likes:50,   
    },
    {
        author:"shushant",
        title:"Local Skill Sharing App",
        description:"An app where people can teach and learn skills locally like cooking, coding, or music.",
        likes:800,   
    },
    {
        author:"gyanoji",
        title:"Expense Tracker for Students",
        description:"A simple app to track daily expenses and manage budget effectively for students",
        likes:280,   
    },
    {
        author:"rahul",
        title:"Voting Platform",
        description:"A platform where users can share ideas and others can vote on the best ones.",
        likes:80,   
    },
];

Idea.insertMany(users);