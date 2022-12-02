const router = require('express').Router();
let Course = require('../Models/Course');
//let Grades = require('../Models/Grades');
const { default: mongoose } = require('mongoose');
const Instructor = require('../Models/Instructor');

// To view all the titles of the courses available including the total hours of the course and course rating
// const viewCourses = async (req, res) => {
    
//     try{
//         const courses = await Course.find().select('title rating credithours');
//         console.log(courses);
//         res.render("viewCourses",{alert:"",results2:courses})
//     }catch(error){
//         res.status(400).json({error:error.message})

//     }
//   }

//   //view all the titles of the courses given by him/her 'Instructor'
//   const viewCoursesInstructor = async (req, res) => {
//     const instructorId = mongoose.Types.ObjectId(req.query.instructorId);
//     try{
//         const courses = await Course.find({taughtby:instructorId}).select('title rating credithours');
//         console.log(courses);
//         res.render("viewCourses",{alert:"",results2:courses})
//     }catch(error){
//         res.status(400).json({error:error.message})

//     }
//   }

//   //search for a course based on course title or subject or instructor
//   const searchCourse = async(req,res) => {
//     try{
//         const courses = await Course.find({"$or":[
//             {title:{$regex:`${req.body.search}`}}, 
//             {subject:{$regex:`${req.body.search}`}},
//             {taughtby:{$regex:`${req.body.search}`}}
//         ]
//         });
//         res.render("searchResults",{alert:"",results:courses})
//     }catch(error){
//         res.status(400).json({error:error.message})

//     }
//  }

//  //search for a course given by him/her based on course title or subject or instructor
//  const searchCourseInstructor = async(req,res) => {
//     const instructorId = mongoose.Types.ObjectId(req.query.instructorId);
//     try{
//         const courses = await Course.find({"$or":[
//             {title:{$regex:`${req.body.search}`}}, 
//             {subject:{$regex:`${req.body.search}`}},
//             {taughtby:instructorId}
//         ]
//         });
//         res.render("searchResults",{alert:"",results:courses})
//     }catch(error){
//         res.status(400).json({error:error.message})

//     }
//  }

//  //view the price of each course
//  const viewCoursePrice = async(req,res) =>{
//     const courseId = mongoose.Types.ObjectId(req.query.courseId);
    
//     try{ 
//         const course = await Course.findById(courseId).select('title price')
//         var courses=[];
//         courses.push(course);    
//         console.log(courses);

//         res.render("viewCoursePrice",{alert:"",results90:courses})
//     }catch(error){
//         res.status(400).json({error:error.message})

//     }
//   }

//   //choose a course from the results and view (but not open) its details including course subtitles, 
//   // excercises , total hours of each subtitle, total hours of the course and price
//   const viewCourse = async(req,res) =>{
//     const courseId = mongoose.Types.ObjectId(req.params.id); 
    
//     try{ 
//         const course = await Course.findById(courseId);
//         var courses=[];
//         courses.push(course);    
//         res.render("viewCourse",{alert:"",results89:courses})
//     }catch(error){
//         res.status(400).json({error:error.message})

//     }
//   }


//create a new course and fill in all its details inclding title, subtitles, price and
// short summary about the entire course
const createCourse = async(req,res) => {
    const title = req.body.title;
    const subtitles = req.body.subtitles;
    const price=Number(req.body.price);
    const summary=req.body.summary;
    const rating = '5';
    const credithours = '4';
    const link=" ";
    try{
        const course = await Course.create({title,subtitles,price,summary,rating,credithours,link});
        res.status(200).json(course)
    }catch(error){
        res.status(400).json({error:error.message})

    }
}

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





  const instructorViewCourses = async (req, res) => {
    //const instructorId = mongoose.Types.ObjectId(req.query.instructorId);
    try{
        //const courses = await Course.find({taughtby:instructorId}).select('title rating reviews');
        const courses = await Course.find().select('title rating price credithours');
        res.status(200).json(courses)
    }catch(error){
        res.status(400).json({error:error.message})

    }
  }
//////////////////////////////mohab//////////////////////////////////////
  const discount = async(req,res)=> {
    const title = req.body.title;
await Course.find({title: title}).then(async (result)=>{
   const userID = req.query.id ;
   const currentprice = req.body.price ;
   const discountt = req.body.discount;
   const newprice = Math.imul( currentprice,discountt);
   console.log(newprice);
   await Course.findByIdAndUpdate(result._id,{$set:{price:newprice}})
   return res.status(200).json({status:true,Message:"eldnya zy elfol"})
    }).catch((error) => {
    return res.status(400).json({status:false, error:error.message ,Message:"error"})
    })

  }
  
//////////////////////////////mohab//////////////////////////////////////

// //filter the courses based on a subject and/or rating and price
// const filterCourse = async(req,res) =>{
//     const filter = req.body.filter;
//     console.log(req.body.subject);
//     if(req.body.price){
//         const result = await Course.find({price:Number(filter)}).populate('price');
        
//         res.render("filterResults",{alert:"",results00:result})
//     }
//     else if(req.body.rating){
        
//         const result = await Course.find({rating:Number(filter)}).populate('rating');
        
//         res.render("filterResults",{alert:"",results00:result})
//     }
//     else if(req.body.subject){
//         console.log("Hano");
//         const result = await Course.find({subject:filter}).populate('subject');
//         console.log(result);
//         res.render("filterResults",{alert:"",results00:result})
//     }
//     else{
//         res.status(400).json({error:error.message})
//     }
// }

// //filter the courses given by him/her based on a subject or price 'Instructor'
// const filterCourseInstructor = async(req,res) =>{
//     const filter = req.body.filter;
//     const courseId = mongoose.Types.ObjectId(req.params.id);
//     console.log(req.body.subject);
//     if(req.body.price){
//         const result = await Course.find({"$or":[
//             {price:Number(filter)},
//             {taughtby:instructorId}
//         ]
//         }).populate('price');
        
//         res.render("filterResults",{alert:"",results00:result})
//     }
//     else if(req.body.subject){
//         const result = await Course.find({"$or":[
//             {subject:filter},
//             {taughtby:instructorId}
//         ]
//         }).populate('subject');
//         console.log(result);
//         res.render("filterResults",{alert:"",results00:result})
//     }
//     else{
//         res.status(400).json({error:error.message})
//     }
// }


// module.exports = {createCourse,viewCourses,viewCourse,viewCoursePrice,searchCourse,filterCourse,viewCoursesInstructor,filterCourseInstructor,searchCourseInstructor};
module.exports = {createCourse,instructorViewCourses,uploadVideo,discount};


