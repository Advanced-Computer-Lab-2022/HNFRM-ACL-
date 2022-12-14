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

const {login,createAdmin,createCorporateTrainee,createIndividualTrainee,createInstructor,viewInstructor,viewGradeIndividual,viewGradeCorporate,rateInstructor,editInstructor,changePassword,resetPassword,contract,policy}= require('./Controller/userControl');

app.post("/login",login)
app.post("/addAdmin",createAdmin)
app.post("/addCorporateTrainee",createCorporateTrainee)
app.post("/addIndividualTrainee",createIndividualTrainee)
app.post("/addInstructor",createInstructor)
app.get("/viewInstructor",requireAuth,viewInstructor)
app.get("/viewGradeIndividual",requireAuth,viewGradeIndividual)
app.get("/viewGradeCorporate",requireAuth,viewGradeCorporate)
app.patch("/rateInstructor",requireAuth,rateInstructor)
app.patch("/edit",requireAuth,editInstructor)
app.patch("/changepassword", requireAuth,changePassword );   
app.post("/resetpassword",resetPassword);
app.patch("/contract",requireAuth,contract);
app.patch("/policy",requireAuth,policy);


const {createCourse,viewCourse,viewCourses,viewSubtitle,instructorViewCourses,uploadVideo,searchAll,searchInstructor,filter,filterInstructor,rateCourse,discount}= require('./Controller/courseControl');

app.post("/createCourse",requireAuth,createCourse)
app.get("/course",viewCourse)
app.get("/courses",viewCourses)
app.get("/viewVideo",requireAuth,viewSubtitle)
app.get("/myCourses",requireAuth,instructorViewCourses)
app.patch("/uploadVideo",uploadVideo)
app.get("/searchResults",searchAll)
app.get("/instructorsearchResults",searchInstructor)
app.get("/results",filter)
app.get("/instructorresults",filterInstructor)
app.patch("/rateCourse",rateCourse)
app.post("/discount",discount)

const {createExam,createQuestion,createAnswer,getQuestion,getQuestionAnswers,checkAnswer,viewExams} = require("./Controller/examControl");

app.post('/createExam',createExam);
app.post('/createQuestion',createQuestion);
app.post('/createAnswer',createAnswer);
app.get('/getQuestion',getQuestion);
app.get('/getQuestionAnswers',getQuestionAnswers);
app.post('/checkAnswer',checkAnswer);
app.get('/viewExams',viewExams);



