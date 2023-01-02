const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

require('dotenv').config();
const { requireAuth } = require('./Middleware/authMiddleware');

const app = express();

const port = process.env.PORT || "8000";
app.use(cors());
app.use(express.json());
app.use(cookieParser());

MongoURI = process.env.ATLAS_URI;

mongoose.connect(MongoURI)
.then(()=>{
  console.log("MongoDB is now connected!")
 app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  })
})
.catch(err => console.log(err));

app.get("/home", (req, res) => {
  res.status(200).send("You have everything installed!");
});



const {login,isLogin,logout,createIndividualTrainee,policy,contract,changePrice,writeReviewInstructor,editInstructor,changePassword,resetPassword,rateInstructor,viewpreviouslyRepotedProblems,requestFollowUp,viewReportedProblems,solveProblem,refund,viewRefundRequest,createAdmin,createInstructor,createCorporateTrainee,viewCoursesRequest,grant,viewInstructor,trainee}= require('./Controller/userControl');

app.post("/login",login)
app.get("/isLogin",requireAuth,isLogin)
app.get('/logout',logout)
app.post('/addIndividualTrainee',createIndividualTrainee)
app.patch('/policy',requireAuth,policy)
app.patch('/contract',requireAuth,contract)
app.patch('/change',changePrice)
app.patch('/writeReviewInstructor',writeReviewInstructor)
app.patch('/edit',requireAuth,editInstructor)
app.patch('/changePassword',changePassword)
app.post('/recievePassword',resetPassword)
app.patch('/rateInstructor',rateInstructor)
app.get('/prevReportedProblems',requireAuth,viewpreviouslyRepotedProblems)
app.patch('/followUp',requestFollowUp)
app.get('/reportedProblems',viewReportedProblems)
app.patch('/solveProblem',solveProblem)
app.get('/refundRequests',viewRefundRequest)
app.post('/addAdmin',createAdmin)
app.post('/addInstructor',createInstructor)
app.post('/addCorporateTrainee',createCorporateTrainee)
app.get('/courseRequests',viewCoursesRequest)
app.patch('/grant',grant)
app.get('/view',requireAuth,viewInstructor)
app.patch('/refund',refund)
app.get('/trainee',trainee)



const {viewCourses,filter,searchAll,viewCourse,register,isRegisted,mostEnrolled,paid,viewSubtitle,instructorViewCourses,filterInstructor,searchInstructor,writeReviewCourse,createCourse,createSubtitle,uploadVideo,discount,rateCourse,sendingCertificate,downloadCertificate,writeNotes,downloadNotes,requestRefund,traineeViewCourses,reportProblem,requestAccess,progressIncrease, isTaught,viewVideo,getProgress}= require('./Controller/courseControl');

app.get('/courses',viewCourses)
app.get('/filter',filter)
app.get('/search',searchAll)
app.get('/course',viewCourse)
app.patch('/register',requireAuth,register)
app.get('/isRegistered',requireAuth,isRegisted)
app.get('/enrolled',mostEnrolled)
app.patch('/pay',paid)
app.get('/viewSubtitle',viewSubtitle)
app.get('/myCourses',requireAuth,instructorViewCourses)
app.get('/filterInstructor',requireAuth,filterInstructor)
app.get('/searchInstructor',requireAuth,searchInstructor)
app.patch('/writeReviewCourse',writeReviewCourse)
app.post('/createCourse',requireAuth,createCourse)
app.post('/createSubtitle',createSubtitle)
app.post('/uploadVideo',uploadVideo)
app.post('/discount',discount)
app.patch('/rateCourse',rateCourse)
app.get('/recieveCertificate',requireAuth,sendingCertificate)
app.get('/downloadCertificate',downloadCertificate)
app.post('/writeNotes',requireAuth,writeNotes)
app.get('/downloadNote',downloadNotes)
app.post('/requestRefund',requireAuth,requestRefund)
app.get('/traineeViewCourses',requireAuth,traineeViewCourses)
app.post('/reportProblem',requireAuth,reportProblem)
app.post('/requestAccess',requestAccess)
app.patch('/calculate',requireAuth,progressIncrease)
app.get('/isTaught',requireAuth,isTaught)
app.get('/viewVideo',viewVideo)
app.get('/getProgress',requireAuth,getProgress)


const {createExam,createQuestion,viewExam,createStudentAnswer,addToStudentAnswers,checkAnswers,studentAnswer,correctAnswers} = require("./Controller/examControl")

app.post('/createExam',createExam)
app.post('/createQuestion',createQuestion)
app.get('/viewExam',viewExam)
app.post('/createStudentAnswer',requireAuth,createStudentAnswer)
app.patch('/addStudentAnswer',requireAuth,addToStudentAnswers)
app.patch('/checkAnswers',requireAuth,checkAnswers)
app.get('/studentAnswers',requireAuth,studentAnswer)
app.get('/correctAnswers',correctAnswers)




