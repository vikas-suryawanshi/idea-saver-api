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
        author:"neha",
        title:"AI Resume Analyzer",
        description:"A tool that analyzes resumes and gives suggestions to improve job chances.",
        likes:420,
    },
    {
        author:"rohit",
        title:"Fitness Tracker App",
        description:"An app that tracks daily workouts, calories burned, and provides fitness tips.",
        likes:300,
    },
    {
        author:"sneha",
        title:"Mental Health Support App",
        description:"A platform that provides daily motivation, therapy chat, and stress relief exercises.",
        likes:650,
    },
    {
        author:"amit",
        title:"Book Recommendation System",
        description:"A system that suggests books based on user interests and reading habits.",
        likes:210,
    },
    {
        author:"pooja",
        title:"Food Waste Management App",
        description:"An app that connects restaurants with NGOs to donate leftover food.",
        likes:720,
    },
    {
        author:"karan",
        title:"Travel Planner",
        description:"A tool that helps users plan trips with budget, destinations, and itinerary suggestions.",
        likes:390,
    },
    {
        author:"anita",
        title:"Language Learning App",
        description:"An interactive app to learn new languages using quizzes and voice practice.",
        likes:500,
    },
    {
        author:"vikas",
        title:"AI Interview Platform",
        description:"An intelligent platform that simulates interviews and provides feedback on performance.",
        likes:900,
    },
    {
        author:"deepak",
        title:"Job Alert System",
        description:"A system that notifies users about new job openings based on their preferences.",
        likes:310,
    },
    {
        author:"kiran",
        title:"E-Library Platform",
        description:"An online platform where users can access and read books anytime.",
        likes:275,
    },
    {
        author:"manoj",
        title:"Event Management App",
        description:"An app to organize events, manage invitations, and track attendance.",
        likes:180,
    },
    {
        author:"ramesh",
        title:"Online Grocery App",
        description:"A platform to order groceries online with fast delivery options.",
        likes:430,
    },
    {
        author:"tina",
        title:"Pet Care App",
        description:"An app that helps pet owners manage health, food, and appointments for pets.",
        likes:260,
    },
    {
        author:"nitesh",
        title:"AI Code Assistant",
        description:"A tool that helps developers write and debug code using AI suggestions.",
        likes:780,
    },
    {
        author:"meena",
        title:"Daily Habit Tracker",
        description:"An app that helps users build and maintain daily habits with reminders.",
        likes:340,
    },
    {
        author:"sachin",
        title:"Freelancer Marketplace",
        description:"A platform connecting freelancers with clients for various projects.",
        likes:600,
    }
];

Idea.insertMany(users);