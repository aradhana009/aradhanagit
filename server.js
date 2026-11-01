const express = require("express");
const mongoose=require("mongoose");
const path=require("path");

const app=express();

app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));

//connect to mongodb

mongoose.connect("mongodb://localhost:27017/courseDB")
.then(() =>console.log("mongodb connected"))
.catch(err => console.log(err));

//course schema

const courseSchema = new mongoose.Schema({
    courseId:Number,
    courseCode:String,
    courseName:String,
    credits:Number,
    capacity:Number
});
//course model
const Course = mongoose.model("Course",courseSchema);

//get display all

app.get("/api/courses",async(req,res)=>{
    const courses = await Course.find();
    res.json(courses);
});

//post -add a course

app.post("/api/courses",async(req,res)=>{
    const course = new Course(req.body);
    await course.save();
    res.json({message:"course added successfully"});
});
//put update a course

app.put("/api/courses/:courseId",async(req,res)=>{
    await Course.findOneAndUpdate(
        {courseId:Number(req.params.courseId)},
        {
            credits:req.body.credits,
            capacity:req.body.capacity
        }
    ) ;
    res.json({message:"Course updated successcfully"});
});

//start server

mongoose.connection.once("open",()=>{
    app.listen(3000,()=>{
        console.log("server listening at http://localhost:3000");
    });
});