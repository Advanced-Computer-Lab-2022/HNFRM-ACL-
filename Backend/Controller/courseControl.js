const router = require('express').Router();
let Course = require('../Models/Course');
const { default: mongoose } = require('mongoose');
const Instructor = require('../Models/Instructor');
const Discount = require('../Models/Discount');

//create a new course
const createCourse = async(req,res) => {
    const title = req.body.title;
    const subtitles = req.body.subtitles;
    const price=Number(req.body.price);
    const taughtBy = mongoose.Types.ObjectId(req.query.instructorId)
    const instructor = await Instructor.findOne({_id:taughtBy}).select("username")
    const summary=req.body.summary;
    const rating = '5';
    const credithours = '4';
    const link=" ";
    const reviews = req.body.reviews;
    const subject = req.body.subject;
    const instructorName = instructor.username;
    try{
        const course = await Course.create({title,subtitles,price,summary,rating,credithours,taughtBy,link,reviews,subject,instructorName});
        res.status(200).json(course)
    }catch(error){
        res.status(400).json({error:error.message})

    }
}

//View Course info
const viewCourse = async (req,res) =>{
    const courseId = mongoose.Types.ObjectId(req.query.courseId);
    try{
        const course =await Course.findOne(courseId)
        res.status(200).json(course)
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
}

//View All Courses
const viewCourses = async (req, res) => {
    try{
        const courses = await Course.find().select('title rating price credithours');
        res.status(200).json(courses)
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

//Search from all the courses
const searchAll = async(req,res) => {
    const filter = req.query.filter;
    try{
        const result = await Course.find({"$or":[
            {title:{$regex:filter}}, 
            {subject:{$regex:filter}},
            {instructorName:{$regex:filter}}
        ]
        })
        res.status(400).json(result)
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
}

// filter from all the courses
const filter = async(req,res) =>{
    const check = req.query.check;
    if(check=="price"){
        try{
            const filter = Number(req.query.filter);
            const result = await Course.find({price:filter}).populate('price')
            res.status(200).json(result)
        }
        catch(error){
            res.status(400).json({error:error.message})
        }
    }
    else if(check=="subject"){
        try{
            const filter = req.query.filter;
            const result = await Course.find({subject:filter}).populate('subject')
            res.status(200).json(result)
        }
        catch(error){
            res.status(400).json({error:error.message})
        }
    }
    else if(check=="rating"){
        try{
            const filter = Number(req.query.filter);
            const result = await Course.find({rating:filter}).populate('rating')
            res.status(200).json(result)
        }
        catch(error){
            res.status(400).json({error:error.message})
        }
    }
    
}


// View Instructor courses
const instructorViewCourses = async (req, res) => {
    const instructorId = mongoose.Types.ObjectId(req.query.instructorId);
    try{
        const courses = await Course.find({taughtBy:instructorId}).select('title rating price credithours');
        res.status(200).json(courses)
    }catch(error){
        res.status(400).json({error:error.message})

    }
}

//Search from instructor courses
const searchInstructor = async(req,res) => {
    const filter = req.query.filter;
    const instructorId = mongoose.Types.ObjectId(req.query.instructorId);

        try{
            const courses = await Course.find({"or$":[
                {title:{$regex:`${filter}`}}, 
                {subject:{$regex:`${filter}`}},
                {instructor:{$regex:`${filter}`}}
            ],taughtBy:instructorId
            });
            res.status(400).json(courses)
        }catch(error){
            res.status(400).json({error:error.message})
    
        }
}

//Filter from instructor courses
const filterInstructor = async(req,res) =>{
    const instructorId = mongoose.Types.ObjectId(req.query.instructorId);
    const check = req.query.check;
    if(check=="price"){
        try{
            const filter = Number(req.query.filter);
            const result = await Course.find({price:filter , taughtBy:instructorId}).populate('price')
            res.status(200).json(result)
        }
        catch(error){
            res.status(400).json({error:error.message})
        }
    }
    else if(check=="subject"){
        try{
            const filter = req.query.filter;
            const result = await Course.find({subject:filter , taughtBy:instructorId}).populate('subject')
            res.status(200).json(result)
        }
        catch(error){
            res.status(400).json({error:error.message})
        }
    }
    
}

//Upload Videos to the course
const uploadVideo =async (req,res) =>{
    const courseId = mongoose.Types.ObjectId(req.query.courseId);
    const {link,subtitleslinks,descriptions} =req.body;
    try{
        const course = await Course.findByIdAndUpdate(courseId,{link,subtitleslinks,descriptions},{new:true});
        res.status(200).json(course)
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
}

//View Video of each subtitle
const viewSubtitle =async (req,res) =>{
    const courseId = mongoose.Types.ObjectId(req.query.courseId);
    const subtitle = req.query.subtitle;
    if(subtitle == "1"){
        try{
            const course = await Course.findOne(courseId).select('subtitleslinks')
            res.status(200).send(course.subtitleslinks[0])
       }
       catch(error){
           res.status(400).json({error:error.message})
       }
    }else if(subtitle =="2"){
        try{
            const course = await Course.findOne(courseId).select('subtitleslinks')
            res.status(200).send(course.subtitleslinks[1])
       }
       catch(error){
           res.status(400).json({error:error.message})
       }
    }else if(subtitle =="3"){
        try{
            const course = await Course.findOne(courseId).select('subtitleslinks')
            res.status(200).send(course.subtitleslinks[2])
       }
       catch(error){
           res.status(400).json({error:error.message})
       }
    }else if(subtitle =="4"){
        try{
            const course = await Course.findOne(courseId).select('subtitleslinks')
            res.status(200).send(course.subtitleslinks[3])
       }
       catch(error){
           res.status(400).json({error:error.message})
       }
    }else{
        res.status(400).json({error:error.message})
    }
}

//Trainee rate the course
const rateCourse = async(req,res) => {
    const courseId=mongoose.Types.ObjectId(req.query.courseId);
    try{
        const rating=Number(req.body.rating);
        const course = await Course.findByIdAndUpdate(courseId,{rating:rating},{new:true});
        console.log(course);
        res.status(200).json(course)
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

const discount = async(req,res)=> {
    const courseId=mongoose.Types.ObjectId(req.query.courseId);
    const amount = mongoose.Schema.Type.Double(req.body.amount)
    const howLong = Number(req.body.howLong)
    try{
        const result = await Discount.create({amount:amount , howLong:howLong , courseId:courseId})
        console.log(result);
        res.status(200).json(result)
    }catch(error){
        res.status(400).json({error:error.message})
    }

  }
module.exports = {createCourse,viewCourse,rateCourse,instructorViewCourses,uploadVideo,searchAll,filter,viewSubtitle,viewCourses,discount,searchInstructor,filterInstructor};


