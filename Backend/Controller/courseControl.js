const router = require('express').Router();
let Course = require('../Models/Course');
const { default: mongoose } = require('mongoose');

// To view all the titles of the courses available including the total hours of the course and course rating
const viewCourses = async (req, res) => {
    
    try{
        const courses = await Course.find().select('title rating credithours');
        res.status(200).json(courses)
    }catch(error){
        res.status(400).json({error:error.message})

    }
  }

  //view all the titles of the courses given by him/her 'Instructor'
  const viewCoursesInstructor = async (req, res) => {
    const instructorId =req.params.id;
    try{
        const courses = await Course.find({taughtby:instructorId}).select('title rating credithours');
        res.status(200).json(courses)
    }catch(error){
        res.status(400).json({error:error.message})

    }
  }

  //search for a course based on course title or subject or instructor
  const searchCourse = async(req,res) => {
    try{
        const courses = await Course.find({"$or":[
            {title:{$regex:`${req.body.search}`}}, 
            {subject:{$regex:`${req.body.search}`}},
            {taughtby:{$regex:`${req.body.search}`}}
        ]
        });
        res.render("searchResults",{alert:"",results:courses})
    }catch(error){
        res.status(400).json({error:error.message})

    }
 }

 //search for a course given by him/her based on course title or subject or instructor
 const searchCourseInstructor = async(req,res) => {
    const instructorId =req.params.id;
    try{
        const courses = await Course.find({"$or":[
            {title:{$regex:`${req.body.search}`}}, 
            {subject:{$regex:`${req.body.search}`}},
            {taughtby:instructorId}
        ]
        });
        res.render("searchResults",{alert:"",results:courses})
    }catch(error){
        res.status(400).json({error:error.message})

    }
 }

 //view the price of each course
 const viewCoursePrice = async(req,res) =>{
    const courseId = mongoose.Types.ObjectId(req.query.courseId);
    
    try{ 
        const course = await Course.findById(courseId).select('title price')
        var courses=[];
        courses.push(course);    
        

        res.render("viewCoursePrice",{alert:"",results90:courses})
    }catch(error){
        res.status(400).json({error:error.message})

    }
  }

  //choose a course from the results and view (but not open) its details including course subtitles, 
  // excercises , total hours of each subtitle, total hours of the course and price
  const viewCourse = async(req,res) =>{
    const courseId = mongoose.Types.ObjectId(req.params.id); 
    
    try{ 
        const course = await Course.findById(courseId);
        var courses=[];
        courses.push(course);    
        res.render("viewCourse",{alert:"",results89:courses})
    }catch(error){
        res.status(400).json({error:error.message})

    }
  }


//create a new course and fill in all its details inclding title, subtitles, price and
// short summary about the entire course
const createCourse = async(req,res) => {
    const title = req.body.title;
    const subtitles = req.body.subtitles;
    const price=Number(req.body.price);
    const summary=req.body.summary;
    const subject=req.body.subject;
    const taughtby=mongoose.Types.ObjectId.apply(req.query.instructorId);
    try{
        const course = await Course.create({title, subtitles ,price,summary,subject,taughtby});
        res.status(200).json(course)
    }catch(error){
        res.status(400).json({error:error.message})

    }
}

//filter the courses based on a subject and/or rating and price
const filterCourse = async(req,res) =>{
    const filter = req.body.filter;
    if(req.body.rating && req.body.subject){
        const result = await Course.find({"$or":[
            {price:Number(filter)},
            {subject:filter}
        ]
        })
        
        res.render("filterResults",{alert:"",results00:result})
    }
    else if(req.body.price){
        const result = await Course.find({price:Number(filter)}).populate('price');
        
        res.render("filterResults",{alert:"",results00:result})
    }
    else if(req.body.rating){
        
        const result = await Course.find({rating:Number(filter)}).populate('rating');
        
        res.render("filterResults",{alert:"",results00:result})
    }
    else if(req.body.subject){
        
        const result = await Course.find({subject:filter}).populate('subject');
        res.render("filterResults",{alert:"",results00:result})
    }
    else{
        res.status(400).json({error:error.message})
    }
}

//filter the courses given by him/her based on a subject or price 'Instructor'
const filterCourseInstructor = async(req,res) =>{
    const filter = req.body.filter;
    const instructorId =req.query.id;
    if(req.body.price){
        const result = await Course.find({"$and":[
            {price:Number(filter)},
            {taughtby:req.query.instructorId}
        ]
        });
        
        res.render("filterResults",{alert:"",results00:result})
    }
    else if(req.body.subject){
        const result = await Course.find({"$and":[
            {subject:filter},
            {taughtby:req.query.instructorId}
        ]
        });
        console.log(result);
        
        res.render("filterResults",{alert:"",results00:result})
    }
    else{
        res.status(400).json({error:error.message})
    }
}

const rateCourse = async(req,res) => {
    const courseId=req.query.courseId;
    if(courseId){
        const rating=Number(req.body.rating);
        const course = await Course.findByIdAndUpdate(courseId,{rating:rating});
        console.log(course);
        res.status(200).json(course)
    }else{
    res.status(400).json({error:"course Id is not found"})
} 
}


module.exports = {createCourse,viewCourses,viewCourse,viewCoursePrice,searchCourse,filterCourse,viewCoursesInstructor,filterCourseInstructor,searchCourseInstructor,rateCourse};



