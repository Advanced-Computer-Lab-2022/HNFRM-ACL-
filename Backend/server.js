const express = require("express");
const mongoose = require('mongoose');
const { openDelimiter } = require('ejs');
var path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || "8000";
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').__express);
app.use(express.static(__dirname + '../public'));

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
app.get('/addAdmin',function(req,res){
  
  res.render('addAdmin',{alert:req.query.alert});
});
app.post('/addAdmin',createAdmin);

const {createInstuctor} = require('./Controller/instructorControl');
app.get('/addInstructor',function(req,res){
  
  res.render('addInstructor',{alert:req.query.alert});
});
app.post('/addInstructor',createInstuctor);

const {createCorporateTrainee } = require('./Controller/corporateTraineeControl');
app.get('/addCorporateTrainee',function(req,res){
  
  res.render('addCorporateTrainee',{alert:req.query.alert});
});
app.post('/addCorporateTrainee',createCorporateTrainee );


const {createCourse,viewCourses,viewCoursePrice,searchCourse,viewCourse,filterCourse,viewCoursesInstructor,searchCourseInstructor,filterCourseInstructor} = require('./Controller/courseControl');
app.get('/addCourse',function(req,res){
  
  res.render('addCourse',{alert:req.query.alert});
});
app.post('/addCourse',createCourse);

app.get('/search',function(req,res){
  
  res.render('search',{alert:req.query.alert});
});
app.post('/search',searchCourse);

app.get('/searchInstructor/:id',function(req,res){
  
  res.render('searchInstructor',{alert:req.query.alert});
});
app.post('/searchInstructor/:id',searchCourseInstructor);


app.get('/filterInstructor/:id',function(req,res){
  
  res.render('filterInstructor',{alert:req.query.alert});
});
app.post('/filterInstructor/:id',filterCourseInstructor);



app.get('/viewCourses',viewCourses)
app.get('/viewCoursesInstructor/:id',viewCoursesInstructor)
app.get('/viewCoursePrice',viewCoursePrice)
app.get('/viewCourse/:id',viewCourse)


//To Select a country
const countrySelection = async(req,res) =>{
  count = req.body.country;
  res.render('/',{alert:req.query.alert});
};

app.get('/countrySelect',function(req,res){
  
  res.render('countrySelect',{alert:req.query.alert});
});
app.post('/countrySelect',countrySelection)
