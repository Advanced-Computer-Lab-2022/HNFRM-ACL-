const express = require("express");
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || "8000";
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


MongoURI = process.env.ATLAS_URI;

mongoose.connect(MongoURI)
.then(()=>{
  console.log("MongoDB is now connected!")
 app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  })
})
.catch(err => console.log(err));


const adminRouter = require('./Controller/adminControl');
app.use('/admin',adminRouter);

const instructorRouter = require('./Controller/instructorControl');
app.use('/instructor',instructorRouter);

const corporateTraineeRouter = require('./Controller/corporateTraineeControl');
app.use('/corporateTrainee',corporateTraineeRouter);

const courseRouter = require('./Controller/courseControl');
app.use('/course',courseRouter);
