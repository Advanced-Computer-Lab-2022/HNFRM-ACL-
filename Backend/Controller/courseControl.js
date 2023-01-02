const router = require('express').Router();
let Course = require('../Models/Course');
const mongoose = require('mongoose')
require('mongoose-double')(mongoose);
const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const Discount = require('../Models/Discount');
const Subtitle = require('../Models/Subtitle');
const Note = require('../Models/Note');
const { response } = require('express');
const Video = require('../Models/Video');
const Exam = require('../Models/Exam');
const nodemailer = require ('nodemailer');
const PDFDcoument = require("pdfkit");
const { default: jsPDF } = require('jspdf');
const Problem = require('../Models/Problem');
const Request = require('../Models/Request');
let fs = require('fs');
const Progress = require('../Models/Progress');


//View All Courses (Req 7/8) Get
const viewCourses = async (req, res) => {
    try{
        const courses = await Course.find();
        res.status(200).json(courses)
    }catch(error){
        res.status(400).json({error:error.message})
    }
}


// filter from all the courses (Req 9/10) Post
const filter = async(req,res) =>{
    const subject = req.query.subject;
    const rating = req.query.rating;
    const price = req.query.price;
    if(subject!=''&&rating!=''&&price!=''){
       let newprice=Number(price)
       let newrating=Number(rating)
       try{
        const result = await Course.find({price:newprice,subject:subject,rating:newrating});
        res.status(200).json(result)
       }catch(error){
        res.status(400).json({error:error.message})
       }
    }else if(subject!=''&&rating!=''){
       let newrating=Number(rating)
       try{
        const result = await Course.find({subject:subject,rating:newrating});
        res.status(200).json(result)
       }catch(error){
        res.status(400).json({error:error.message})
       }

    }else if(rating!=''&&price!=''){
       let newprice=Number(price)
       let newrating=Number(rating)
       try{
        const result = await Course.find({price:newprice,rating:newrating});
        res.status(200).json(result)
       }catch(error){
        res.status(400).json({error:error.message})
       }

    }else if(subject!=''&&price!=''){
        let newprice=Number(price)
       try{
        const result = await Course.find({price:newprice,subject:subject});
        res.status(200).json(result)
       }catch(error){
        res.status(400).json({error:error.message})
       }

    }else if(subject!=''){
       try{
        const result = await Course.find({subject:subject});
        res.status(200).json(result)
       }catch(error){
        res.status(400).json({error:error.message})
       }

    }else if(rating!=''){
        let newrating=Number(rating)
       try{
        const result = await Course.find({rating:newrating});
        res.status(200).json(result)
       }catch(error){
        res.status(400).json({error:error.message})
       }

    }else if(price!=''){
        let newprice=Number(price)
       try{
        const result = await Course.find({price:newprice});
        res.status(200).json(result)
       }catch(error){
        res.status(400).json({error:error.message})
       }

    }
}


//Search from all the courses (Req 11) Post
const searchAll = async(req,res) => {
    const filter = req.query.filter;
    try{
        const courses = await Course.find({"$or":[
            {title:{$regex:filter}}, 
            {subject:{$regex:filter}},
            {instructorName:{$regex:filter}}
        ]
        })
        res.status(200).json(courses)
    }
    catch(error){
        res.json({error:error.message})
    }
}


//View Course info (Req 12) Get
const viewCourse = async (req,res) =>{
    const courseId = mongoose.Types.ObjectId(req.query.courseId);
    try{
        const course =await Course.findOne(courseId)
        const discount = await Discount.findOne({course:courseId})
        res.status(200).json({course:course, discount:discount})
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
}


//Register for course (Req 13) Patch
const register = async(req,res) =>{
    const token = req.headers['token']
    const decodedToken = jwt.verify(token, "supersecret") 
    const userId = mongoose.Types.ObjectId(decodedToken)
    const courseId = mongoose.Types.ObjectId(req.query.courseId);
    const course = await Course.findOne({_id:courseId})
    const numberOfEnrolled = course.numberOfEnrolled
    try{
        const user = await User.findOne({_id:userId});
        const array = user.registeredCourses;
        array[array.length] = courseId;  
        
        const result = await User.findByIdAndUpdate({_id:userId},{registeredCourses:array},{new:true});
        const course2 = await Course.findByIdAndUpdate({_id:courseId},{numberOfEnrolled : numberOfEnrolled+1},{new:true})
        const val=0;
        const progress = await Progress.create({value:val , userId,courseId})
        res.status(200).json(result)
    }catch(error){
        res.status(400).json({error:error.message})
    }
    
}


//Check whether registered or not (Auth) Get
const isRegisted = async(req,res) =>{
    const token = req.headers['token']
    const decodedToken = jwt.verify(token, "supersecret"); 
    const userId = mongoose.Types.ObjectId(decodedToken)
    const user = await User.findOne({ _id: userId});
    const courseId = mongoose.Types.ObjectId(req.query.courseId);
    try{
        let result;
        for(let i=0 ; i<user.registeredCourses.length ; i++){
            if((user.registeredCourses[i]).toString() === (courseId.toString()) ){
                result = "found"
            }
        }
        if(result=='found'){
            res.status(200).json({status:true});
        }
        else{
            res.status(400).json({status:false , message:"Bla"})
        }
        
    }
    catch(error){
        res.status(400).json({status:false , message:"Ioa"})
    }  
}


//Is this course taught by him "Additional req" Get
const isTaught = async(req,res) =>{
    const token = req.headers['token']
    const decodedToken = jwt.verify(token, "supersecret"); 
    const userId = mongoose.Types.ObjectId(decodedToken)
    const courseId = mongoose.Types.ObjectId(req.query.courseId);
    const courses = await Course.find({taughtBy:userId});

    try{
        let result;

        for(let i=0 ; i<courses.length ; i++){
            if((courses[i]._id).toString() === (courseId.toString()) ){
                result = "found"
            }
        }
        if(result=='found'){
            res.status(200).json({status:true});
        }
        else{
            res.status(400).json({status:false , message:"Bla"})
        }
        
    }
    catch(error){
        res.status(400).json({status:false , message:"Ioa"})
    }  
}


//View most Enrolled courses (Req 14) 'Must Test it' 
const mostEnrolled = async(req,res) =>{
    try {
        const result = await Course.find({}).sort({numberOfEnrolled:-1 })
        const course1 = result[0];
        const course2 = result[1];
        const courses = [course1,course2]
        res.status(200).json(courses);
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
}


//Pay for a course (Req 17) Get
const paid = async(req,res) =>{
    const courseId = mongoose.Types.ObjectId(req.query.courseId);
    const courses = await Course.findOne({_id:courseId})
    let price = courses.defaultPrice
    let userId = courses.taughtBy
    const instructor = await User.findOne({_id:userId})
    console.log(instructor)
    const wallet = instructor.defaultWallet
    console.log(wallet)



    try{
        const result = await User.findByIdAndUpdate(userId,{defaultWallet : wallet + price},{new:true}) 
        res.status(200).json({done:true});
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
}


//open all the items inside a course [Videos] (Req 17/39) Get
const viewSubtitle =async(req,res) =>{
    const subtitleId = mongoose.Types.ObjectId(req.query.subtitleId);
    try{
        const result = await Subtitle.findOne({_id:subtitleId});
        res.status(200).json(result);
    }catch{
        res.status(400).json({error:error.message})
    }
}


//open video
const viewVideo = async(req,res) =>{
    const subtitleId = mongoose.Types.ObjectId(req.query.subtitleId);
    const sub = await Subtitle.findOne({_id:subtitleId});
    try{
    let videos=[]
    for(let i=0;i<sub.videos.length;i++){
        const videoId = sub.videos[i];
        const video = await Video.findOne({_id:videoId})
        videos[i]=video
        
    }
        res.status(200).json({subtitle:sub,results:videos});
    }catch(error){
        res.status(400).json({error:error.message})
    }
}



// View Instructor courses (Req 18) Get
const instructorViewCourses = async(req, res) => {
    const token = req.headers['token']
    const decodedToken = jwt.verify(token, "supersecret");  
    const instructorId = mongoose.Types.ObjectId(decodedToken)
    try{
        const result = await Course.find({taughtBy:instructorId});
        res.status(200).json(result)
    }catch(error){
        res.status(400).json({error:error.message})
    }
}


//Filter from instructor courses (Req 19) Post
const filterInstructor = async(req,res) =>{
    const token = req.headers['token']
    const decodedToken = jwt.verify(token, "supersecret");  
    const instructorId = mongoose.Types.ObjectId(decodedToken)
    const subject = req.query.subject;
    const price = req.query.price;
    if(subject!=''&&price!=''){
       let newprice=Number(price)
       try{
        const result = await Course.find({taughtBy:instructorId,price:newprice,subject:subject});
        res.status(200).json(result)
       }catch(error){
        res.status(400).json({error:error.message})
       }
    }else if(subject!=''){
       try{
        const result = await Course.find({taughtBy:instructorId,subject:subject});
        res.status(200).json(result)
       }catch(error){
        res.status(400).json({error:error.message})
       }

    }else if(price!=''){
       let newprice=Number(price)
       try{
        const result = await Course.find({taughtBy:instructorId,price:newprice});
        res.status(200).json(result)
       }catch(error){
        res.status(400).json({error:error.message})
       }

    }
    
}


//Search from instructor courses (Req 20) Get
const searchInstructor = async(req,res) => {
    const filter = req.query.filter;
    const token = req.headers['token']
    const decodedToken = jwt.verify(token, "supersecret"); 
    const instructorId = mongoose.Types.ObjectId(decodedToken)

        try{
            const courses = await Course.find({
                "$and":[{
                    "$or":[
                        {title:{$regex:filter}}, 
                        {subject:{$regex:filter}},
                    ],
                },
            {taughtBy:instructorId},
        ] ,
    });
            res.status(200).json(courses)
        }catch(error){
            res.status(400).json({error:error.message})
    
        }
}


//Write Review for course "Additional Req" Patch
const writeReviewCourse = async(req,res) =>{
    const review = req.body.review;
    const courseId = mongoose.Types.ObjectId(req.query.courseId);
    const rews = await Course.findById(courseId)
    const reviews = rews.reviews
    try{
        reviews[reviews.length] = review;
        const result = await Course.findByIdAndUpdate(courseId,{reviews:reviews},{new:true})
        res.status(400).json(result)
    }catch(error){
        res.status(400).json({error:error.message})
    }
}


//create a new course post
const createCourse = async(req,res) => {
    const title = req.body.title;
    var defaultPrice;
    const numberOfEnrolled=0;
    const numberOfRates=0;

    //Price
    if(req.body.defaultPrice=='Free'){
        defaultPrice = Number(0);
    }
    else{
        defaultPrice=Number(req.body.defaultPrice);
    }
    
    //Instructor ID
    const token = req.headers['token']
    const decodedToken = jwt.verify(token, "supersecret"); 
    const taughtBy = mongoose.Types.ObjectId(decodedToken)

    //Instructor Name
    const instructor = await User.findOne({_id:taughtBy}).select("username")
    const instructorName = instructor.username;
    const summary=req.body.summary;
    const rating = '5';
    const credithours = '4';
    const link=req.body.link;
    const subject = req.body.subject;
    var price=defaultPrice;
    
    try{
        const course = await Course.create({title,defaultPrice,numberOfRates,price,summary,rating,credithours,link,subject,taughtBy,instructorName,numberOfEnrolled});
        res.status(200).json(course)
    }catch(error){
        res.status(400).json({error:error.message})

    }
}


//create a new subtitle (Req 23) post
const createSubtitle = async(req,res) =>{
    const name = req.body.name;
    const courseId = mongoose.Types.ObjectId(req.query.courseId);
    const credithour = req.body.credithour;
    let videos= await link(name)
    let links =[];
    for(let i=0;i<videos.length;i++){
        links[i] = videos[i]._id;
    }
    
    let exercises = await exercise(name);
    let exam =exercises._id
    const subtitle = await Course.findOne({_id:courseId})
    const subtitlesid=subtitle.subtitles
    const subtitlesname = subtitle.subtitlesName
    let totalhours=subtitle.credithours;
    let hours=0;
    try{
        const subtitle = await Subtitle.create({name,credithour,videos:links,exams:exam});
        hours = 1+ totalhours
        subtitlesid[subtitlesid.length] = subtitle.id;
        subtitlesname[subtitlesname.length] = name;
        const course = await Course.findByIdAndUpdate({_id:courseId},{subtitles:subtitlesid,subtitlesName:subtitlesname,credithour:hours},{new:true});
        res.status(200).json(subtitle)
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
    
}


//upload a video link from YouTube under each subtitle / short description of the video (Req 24) post
const uploadVideo = async(req,res) =>{
    const link = req.body.link
    const description= req.body.description
    const subtitle = req.body.subtitle
    try{
        const video = await Video.create({link,description,subtitle});
        res.status(200).json(video)
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
}


//return videos of subtitle 
const link = async(subtitle) =>{
    const video = await Video.find({subtitle:subtitle}).select('_id')
    return video
}


//return exams of subtitle
const exercise = async(subtitle) =>{
    const exam = await Exam.findOne({subtitle:subtitle}).select('_id')
    return exam;
}


// define a promotion for the course (% discount) (Req 30) post
const discount = async(req,res) => {
    const courseId = mongoose.Types.ObjectId(req.body.courseId);
    const amount = mongoose.Types.Double(req.body.amount);
    const startDate = req.body.startDate
    const endDate = req.body.endDate
    const course = await Course.findOne(courseId)
  
    try {
      // Create the discount
      const result = await Discount.create({amount:amount , startDate:startDate , endDate:endDate , course:courseId});
      
      
      
  
      // Parse the real time and calculate the delay in milliseconds until that time has passed
      const endTime = new Date(endDate);
      const startTime = new Date(startDate);
      const delay = endTime - startTime
      const defaultPrice = course.defaultPrice

      const newPrice = defaultPrice - ((defaultPrice)/amount)
      await Course.findByIdAndUpdate(courseId,{price:newPrice},{new:true})
  
      // Schedule the discount to expire after the calculated delay
      setTimeout(async () => {
        // Remove the discount from the course
        await Discount.findOneAndDelete({courseId: courseId});
        
        // Update the course price to remove the discount
        await Course.findByIdAndUpdate(courseId, {price: newPrice});
      }, delay);
      res.status(200).json(result);
    } catch(error) {
      res.status(400).json({error:error.message});
    } 
}


//Trainee rate the course (Req 34) patch
const rateCourse = async(req,res) => {
    const courseId=mongoose.Types.ObjectId(req.query.courseId);
    try{
        const rating=Number(req.body.rating);
        const course = await Course.findOne({_id:courseId});
        const number = Number(course.numberOfRates + 1);
        const averageRate =Number( Number(course.rating + rating) / number);
        const result = await Course.findByIdAndUpdate(courseId,{rating:averageRate , numberOfRates:number},{new:true});
        res.status(200).json(result)
    }catch(error){
        res.status(400).json({error:error.message})
    }
}


//receive a certificate as a PDF after completing the course via email (Req 41) Post
const sendingCertificate = async(req,res)=>{
    const token = req.headers['token']
    const decodedToken = jwt.verify(token, "supersecret");  
    const userId = mongoose.Types.ObjectId(decodedToken)
    const student=await User.findOne({_id:userId});

const Email = student.email;
await User.find({Email: Email}).then(async (result)=>{

        const mail = {
           from: process.env.AUTH_EMAIL,
           to: Email,
           subject: "Certificate",
           html: `<p>Here is ur certificate</p>`,
           attachments: [{
               filename: "Certificate.pdf",
               contentType: 'application/pdf', 
               path: './Certificate.pdf' 
            }]
        }

        let transporter = nodemailer.createTransport({
            service: 'hotmail',
            auth: {
               user: process.env.AUTH_EMAIL,
               pass: process.env.AUTH_PASS
            }
        })

        transporter.sendMail(mail).then(()=>{
            return res.status(200).json({status:true,Message:"eldnya zy elfol"})
        }).catch((error) => {
            return res.status(400).json({status:false, error:error.message ,Message:"Error while sending an email"})
        })
        } ).catch((error)=>{
            return res.status(400).json({status:false, error: error.message,Message:"this Email is not found or undefined"})
        } );
}


//download the certificate as a PDF from the website (Req 42) Get
const downloadCertificate = async (req, res) =>{
    
   
    /*if (student&&course){
    var doc = new jsPDF();
    doc.text(90,10,"Certificate") // 50 x axis
    doc.text(50,20,"Certificate of completion the course, CONGRATULATION!")
    doc.text(50,30,student.username);
    doc.text(50,40,"Has successfully completed");
    doc.text(50,50,course.title);
    doc.text(50,60,"which taught by");
    doc.text(50,70,course.instructorName);
    doc.save("Certificate.pdf");*/
    
    
    var file = fs.createReadStream('./certificate.pdf');
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=Certificate.pdf');
    file.pipe(res);
}


//write notes while watching the video (Req 43) post
const writeNotes = async(req,res) =>{
    const token = req.headers['token']
    const decodedToken = jwt.verify(token, "supersecret"); 
    const userId = mongoose.Types.ObjectId(decodedToken)
    const subtitleId = mongoose.Types.ObjectId(req.body.subtitleId)
    const contain = req.body.contain
    try{
        const note = await Note.create({user:userId,subtitle:subtitleId,contain:contain});
        res.status(200).json(note)

    }catch(error){
        res.status(400).json({error:error.message})
    }

}



//download the notes as a PDF (Req 44) get
const downloadNotes = async(req,res)=>{
    const noteId = mongoose.Types.ObjectId(req.query.noteId)
    const notes = await Note.findOne({_id:noteId});
    const note = notes.contain

    try{
            var doc = new jsPDF();
            doc.text(10,10,note);
            doc.save('notes.pdf');

            //var file = fs.createReadStream('notes.pdf');
            
            //res.setHeader('Content-Type', 'application/pdf');
            //res.setHeader('Content-Disposition', 'attachment; filename=notes.pdf');
            //file.pipe(res);
            res.send(doc)
        
    }
    catch(error) {
        return res.status(400).json({status:false ,Message:"no notes found"})
    }

}


//request a refund only if less than 50% of the course has been attended (Req 45) post
const requestRefund = async(req,res) =>{
    const token = req.headers['token']
    const decodedToken = jwt.verify(token, "supersecret"); 
    const userId = mongoose.Types.ObjectId(decodedToken)
    const courseId = mongoose.Types.ObjectId(req.query.courseId)

        try{
            const course= await Course.findOne({_id:courseId})
            const price = course.price
            const request = await Request.create({type:'refund',amount:price,user:userId,course:courseId,accepted:'false'})
            res.status(200).json(request)
        }
        catch(error){
            res.status(400).json({error:error.message})
        }
        
    
}


//View Enrolled (Req 46) get
const traineeViewCourses = async(req, res) => {
    const token = req.headers['token']
    const decodedToken = jwt.verify(token, "supersecret");  
    const userId = mongoose.Types.ObjectId(decodedToken)
    let result=[]
    try{
        const ids = await User.findById(userId).select('registeredCourses')
        const courses = ids.registeredCourses
        for(let i=0 ; i<courses.length ; i++){
            const re = await Course.findOne({_id:courses[i]});
            result[i]=re;
        }
        res.status(200).json(result)
    }catch(error){
        res.status(400).json({error:error.message})
    }
}


//Report a problem with of a course (Req 47) post
const reportProblem = async(req,res)=> {
    const token = req.headers['token']
    const decodedToken=jwt.verify(token,"supersecret");
    const userId  = mongoose.Types.ObjectId(decodedToken);
    const type=req.body.type;
    const theProblem=req.body.theProblem;
    const courseId = mongoose.Types.ObjectId(req.query.course);
    try{
        const problem = await Problem.create({type,course:courseId,user:userId,status:'unsolved',theProblem});
        res.status(200).json(problem)
    }catch(error){
        res.status(400).json({error:error.message})

    }
}


//request access to a specific course (Req 50) post
const requestAccess = async(req,res) =>{
    const token = req.headers['token']
    const decodedToken = jwt.verify(token, "supersecret"); 
    const userId = mongoose.Types.ObjectId(decodedToken)
    const courseId = mongoose.Types.ObjectId(req.query.courseId)
    try{

        const request = await Request.create({type:'access',user:userId,course:courseId,accepted:'false'})
        res.status(200).json(request)
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
        
    
}

//Calculate Course
const calculateProgress = async(courseId)=>{
    const course = await Course.findOne(courseId);
    let leng = course.subtitles.length
    let links=0
    for(let i=0;i<course.subtitles.length;i++){
        var subtitleId = course.subtitles[i];
        const subtitle = await Subtitle.findOne({_id:subtitleId});
        links = Number(subtitle.videos.length + links)
    }
    let all = links + leng

    let insidesubtitleprogress = Number(100/Number(all))
    return insidesubtitleprogress
}

//see his/her progress in the course as a percentage of how much of the course has been completed so far (Req 40)
//Increasing in progress Patch
const progressIncrease = async(req,res) =>{
    const token = req.headers['token']
    const decodedToken = jwt.verify(token, "supersecret");  
    const userId = mongoose.Types.ObjectId(decodedToken)
    const courseId = mongoose.Types.ObjectId(req.query.courseId)
    let cal = await calculateProgress(courseId) 
    try{
        const progress = await Progress.findOne({courseId:courseId,userId:userId})
        let value = Number(progress.value + cal);
        let id = progress._id;
        const result = await Progress.findByIdAndUpdate({_id:id},{value:value},{new:true})
        res.status(200).json(result)
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
    
}

const getProgress = async(req,res) =>{
    const token = req.headers['token']
    const decodedToken = jwt.verify(token, "supersecret");  
    const userId = mongoose.Types.ObjectId(decodedToken)
    const courseId = mongoose.Types.ObjectId(req.query.courseId)
    const progress = await Progress.findOne({courseId:courseId,userId:userId})
    const value = progress.value;
    res.status(200).json({value:value})
    

}



module.exports = {viewCourses,filter,searchAll,viewCourse,register,isRegisted,mostEnrolled,paid,viewSubtitle,instructorViewCourses,filterInstructor,searchInstructor,writeReviewCourse,createCourse,createSubtitle,uploadVideo,discount,rateCourse,sendingCertificate,downloadCertificate,writeNotes,downloadNotes,requestRefund,traineeViewCourses,reportProblem,requestAccess,progressIncrease,isTaught,viewVideo,getProgress};


