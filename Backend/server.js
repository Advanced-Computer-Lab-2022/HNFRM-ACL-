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

const {createAdmin,createInstructor,createCorporateTrainee}= require('./Controller/userControl');
app.post("/addAdmin",createAdmin);
app.post("/addInstructor",createInstructor);
app.post("/addCorporateTrainee",createCorporateTrainee);

const {createCourse,instructorViewCourses,uploadVideo}= require('./Controller/courseControl');
app.post("/createCourse",createCourse);
app.get("/myCourses",instructorViewCourses);
app.patch("/uploadVideo",uploadVideo);

//To Select a country
// const countrySelection = async(req,res) =>{
//   count = req.body.country;
//   res.render('/',{alert:req.query.alert});
// };

// app.get('/countrySelect',function(req,res){
  
//   res.render('countrySelect',{alert:req.query.alert});
// });
// app.post('/countrySelect',countrySelection)
