const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

const port = process.env.PORT || "8000";
app.use(cors());
app.use(express.json())

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

const {createAdmin,createCorporateTrainee,createIndividualTrainee,createInstructor,viewInstructor,viewGradeIndividual,viewGradeCorporate,rateInstructor,editInstructor,changePassword,resetPassword,contract}= require('./Controller/userControl');

app.post("/addAdmin",createAdmin)
app.post("/addCorporateTrainee",createCorporateTrainee)
app.post("/addIndividualTrainee",createIndividualTrainee)
app.post("/addInstructor",createInstructor)
app.get("/viewInstructor",viewInstructor)
app.get("/viewGradeIndividual",viewGradeIndividual)
app.get("/viewGradeCorporate",viewGradeCorporate)
app.patch("/rateInstructor",rateInstructor)
app.patch("/edit",editInstructor)
app.patch("/changepassword", changePassword );   
app.post("/resetpassword",resetPassword);
app.post("/Contract",contract);



const {createCourse,viewCourse,viewCourses,viewSubtitle,instructorViewCourses,uploadVideo,searchAll,searchInstructor,filter,filterInstructor,rateCourse,discount}= require('./Controller/courseControl');

app.post("/createCourse",createCourse)
app.get("/course",viewCourse)
app.get("/courses",viewCourses)
app.get("/viewVideo",viewSubtitle)
app.get("/myCourses",instructorViewCourses)
app.patch("/uploadVideo",uploadVideo)
app.get("/searchResults",searchAll)
app.get("/instructorsearchResults",searchInstructor)
app.get("/results",filter)
app.get("/instructorresults",filterInstructor)
app.patch("/rateCourse",rateCourse)
app.post("/discount",discount)

const {createExam,createQuestion,createAnswer,getQuestion,getQuestionAnswers,checkAnswer} = require("./Controller/examControl");

app.post('/createExam',createExam);
app.post('/createQuestion',createQuestion);
app.post('/createAnswer',createAnswer);
app.get('/getQuestion',getQuestion);
app.get('/getQuestionAnswers',getQuestionAnswers);
app.post('/checkAnswer',checkAnswer);



