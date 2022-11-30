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


const {createAdmin} = require('./Controller/adminControl');
app.post('/addAdmin',createAdmin);

const {createInstuctor,rateInstructor} = require('./Controller/instructorControl');
app.post('/addInstructor',createInstuctor);

const {createCorporateTrainee,viewGradeCorporate } = require('./Controller/corporateTraineeControl');
app.post('/addCorporateTrainee',createCorporateTrainee );

const {createIndividualTrainee,viewGradeIndividual } = require('./Controller/individualTraineeControl');
app.post('/createIndividualTrainee',createIndividualTrainee );


const {createCourse,viewCourses,viewCoursePrice,searchCourse,viewCourse,filterCourse,viewCoursesInstructor,searchCourseInstructor,filterCourseInstructor,rateCourse} = require('./Controller/courseControl');
app.post('/addCourse',createCourse);
app.post('/search',searchCourse);
app.post('/searchInstructor/:id',searchCourseInstructor);
app.post('/filterInstructor/:id',filterCourseInstructor);




app.get('/viewCourses',viewCourses)
app.get('/viewCoursesInstructor/:id',viewCoursesInstructor)
app.get('/viewCoursePrice',viewCoursePrice)
app.get('/viewCourse/:id',viewCourse)

//To rate a course
app.post('/rateCourse',rateCourse);
//To rate an instructor
app.post('/rateInstructor',rateInstructor);

const { createQuestion,getQuestion,getQuestionAnswers} = require("./Controller/QuestionControl");
const { createExam } = require("./Controller/examControl");

//To add a question
app.post('/createQuestion',createQuestion);
app.get('/getQuestion',getQuestion);
app.get('/getQuestionAnswers',getQuestionAnswers);
//to add an Exam
app.post('/createExam',createExam);
//create answer
const { checkAnswer,createAnswer } = require("./Controller/answerControl");

app.post('/checkAnswer',checkAnswer);

app.post('/createAnswer',createAnswer);

app.get('/viewGradeCorporate',viewGradeCorporate);

app.get('/viewGradeIndividual',viewGradeIndividual);