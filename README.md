
# HNFRM 
![image](https://user-images.githubusercontent.com/116195301/210827477-469bbcd2-bd70-4f7f-b431-5f020e4101c5.png)
![image](https://user-images.githubusercontent.com/116195301/210828332-ce349d03-3530-4f9e-9ab3-0fed80e8ebf8.png)
![image](https://user-images.githubusercontent.com/116195301/210828481-bea35e75-63ff-4970-aed7-bbf8d5c8fc67.png)
![image](https://user-images.githubusercontent.com/116195301/210828561-eecf7192-bbfc-47b8-a2f5-d26478151ab2.png)



## Table of Contents
- Project Description
- Tools and Frameworks
- Features
- Code Example
- Installation and Setup
- Screenshots
- Environment Variables
- API References and Tests
- How to Use
- Contribute
- Credits


# Project Description
HNFRM is an online learning system for the advanced computer lab 

### Theme 
The theme of the project, is to create an online learning system where you can sign uo as a individual trainee or enter as corporate trainee based on your company ,  where you can register tp a wide varity of courses in most of fields taught by top instructors with option of taking exams and in the end take your certificate , also the instructor can add any new course and all its material and the money will be transfered to his wallet according to the policy and contract agreed on. Similat to websites (Coursera , Udemy and Udacity)


### Motivation
This is the objectives of this project:
In the recent period there has been a huge demand of online learning platforms,
alot of students depend mainly on the online learning platforms,
thats why developers decided to do it 
this project is done using agile methodology which involves breaking the project into sprint with each sprint has specific goals


### Build Status
The project is currently in development.



## Tools and Frameworks
- [React](https://reactjs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [NodeJS](https://nodejs.org/en/)
- [Postman](https://www.postman.com/)
- [Material UI](https://mui.com/)
- [Axios](https://axios-http.com/)
- [NPM](https://www.npmjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [VSCode](https://code.visualstudio.com/)




## Features
* Authentication and Authorization 
* Easy online Payment for the Courses either by credit card or mastercard
* Can Write and Download Notes
* Corporate Trainee can request access to the courses they want
* Refund option
* User can change/reset his password
* User can change his information
* Reporting System
* Admin Dashboard

## Code Examples  We use the MRC pattern(Module-Router-Controller)
`
{
const mongoose = require('mongoose');

require('mongoose-double')(mongoose);

const Schema = mongoose.Schema;

let {subtitleSchema} = require('../Models/Subtitle');

const courseSchema = new Schema({

    title :{
        
        type : String,
        required : true,
        unique : true
    },
    summary :{
        type : String,
        required : true
    },
    defaultPrice :{
        type : Number,
        required : true
    },
    price:{
        type:Number
    },
    credithours :{
        type : Number
    },
    rating :{
        type :Number
    },
    taughtBy :{
        type: mongoose.Types.ObjectId,
        ref:'User'
    },
    reviews :{
        type : [String],
        required:false
    },
    link :{
        type: String
    },
    subtitles :{
        type:[mongoose.Types.ObjectId],
        ref:'Subtitle'
    },
    subject :{
        type:String
    },
    subtitlesName :{
        type:[String]
    },
    instructorName :{
        type: String
    },
    discount : {
        type: mongoose.Types.ObjectId,
        ref:'Discount'
    },
    certificate :{
        type: String
    },
    numberOfRates : {
        type :Number
    },
    numberOfEnrolled :{
        type:Number
    }


}, { timestamps: true })
const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
}`



`{

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
}}`

> Here is an example on how we call it in the server.js  {app.post('/createCourse',requireAuth,createCourse)}




`{
    
    import axios from 'axios';
    import Avatar from '@mui/material/Avatar';
    import Button from '@mui/material/Button';
    import CssBaseline from '@mui/material/CssBaseline';
    import TextField from '@mui/material/TextField';
    import Box from '@mui/material/Box';
    import Grid from '@mui/material/Grid';
    import Typography from '@mui/material/Typography';
    import { createTheme, ThemeProvider } from '@mui/material/styles';
    import AddIcon from '@mui/icons-material/Add';
    import Container from '@mui/material/Container';
    import FormControl from '@mui/material/FormControl';
    import Select from '@mui/material/Select';
    import MenuItem from '@mui/material/MenuItem';
    import InputLabel from '@mui/material/InputLabel';
    import Dialog from '@mui/material/Dialog';
    import Header from '../Headers/header';
    import Footer from '../Headers/footer';
    
    const theme = createTheme({
      palette: {
    primary: {
      main: '#800000',
      light : '#963129',
      dark: '#963129'
    },
    secondary: {
      light: '#d32f2f',
      main: '#ef5350',
      contrastText: '#ffcc00',
    },
    custom: {
      light: '#ffa726',
      main: '#f57c00',
      dark: '#ef6c00',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
    },
    });
    const CreateCourse = () => {
  
    const [type, setType] = useState('');
    useEffect(()=>{
    axios.get('http://localhost:8000/isLogin' ,{
        headers: {
            "token" :  localStorage.getItem("token")
        },
    }).then(
    (res) => { 
        const user = res.data;
        setType(user.type)
        })
    });

    let Add;
    if(type=='Instructor'){
      Add =<Check></Check>
    }
    else{
      Add =<PageNotFound></PageNotFound>
    }

    return(
      <Box>
        {Add}
      </Box>
    )
    }
    export default CreateCourse;

}`

## Installation
In order to run our project, you should have the following installed in your machine:

-clone the file 
` git clone https://github.com/Advanced-Computer-Lab-2022/HNFRM-ACL- `

- Node JS make sure to install all the run this command in your Visual Studio Code terminal to install the latest version of npm

 `npm install npm@latest -g `
 
 React JS or you can use NPM
 
 Install NPM Packages in the frontend directory
 
`cd frontend` 

`npm install `

- MongoDB either locally or on a cloud. You have to create .env with the dbconnectionString.

## How to Use?
After installing everything you have to open 2 terminals so that you can
run the website correctly 
1) First terminal used for the backend is run through command 

`cd backend`

`nodemon server `

2) Direct the second terminal to the root of the frontend directory, then run the command `npm start`
sh

` cd frontend`

` npm start `

Now you can access the website at `http://localhost:3000`

- All users are automatically directed to the start page 
- As a guest he will view the website but wont be allowed to register to any course so he has to sign in by email and a password and fill in rest of needed information
- As an trainee he can sign in using his email and password and register to any course 
- As an admin he can log in using email and password

## Screenshot
Login 
![image](https://user-images.githubusercontent.com/116195301/210831234-3527e036-5761-4a7a-9de8-444adf8e6bd6.png)
Sign up
![Screenshot (101)](https://user-images.githubusercontent.com/116195301/210831402-123e61e7-ea1b-422c-961f-c1bbd662761c.png)
Course Before Registeration
![Screenshot (103)](https://user-images.githubusercontent.com/116195301/210833039-a4fa90e2-a522-4b74-99d3-1eb880640e88.png)
Define Discount
![Screenshot (112)](https://user-images.githubusercontent.com/116195301/210833083-cca90493-ea74-41d2-a39c-c3669b844074.png)
Instructor Courses
![Screenshot (113)](https://user-images.githubusercontent.com/116195301/210833092-55d09c99-a9e9-4320-b48d-c9bc055239d5.png)
Create New Course
![Screenshot (114)](https://user-images.githubusercontent.com/116195301/210833109-a769a4cf-0842-484a-bc13-5f8730e6bded.png)
Course after completion
![Screenshot (115)](https://user-images.githubusercontent.com/116195301/210833122-68d2928e-c9d1-4ed0-9855-e22a502020cf.png)
Instructor profile
![Screenshot (116)](https://user-images.githubusercontent.com/116195301/210833134-16a2129f-07bb-446d-9486-482159033486.png)
Certificate
![Screenshot (117)](https://user-images.githubusercontent.com/116195301/210833146-a6bbc91b-eb03-4c70-931f-eb14f219b949.png)
Payment by Visa or Mastercard
![Screenshot (118)](https://user-images.githubusercontent.com/116195301/210833154-1ea6f77b-24e1-46ab-af3f-92304d5fd19d.png)
Solve Exercise
![Screenshot (119)](https://user-images.githubusercontent.com/116195301/210833165-d66d8d68-9bb4-4e08-9c39-0e625e0a6fb0.png)
Menu 1 Trainee
![Screenshot (123)](https://user-images.githubusercontent.com/116195301/210965406-029b6f12-09fa-48d6-9b22-8e32bebd0df1.png)
Menu 2 Individual Trainee
![Screenshot (124)](https://user-images.githubusercontent.com/116195301/210965434-6c542fd4-b007-4991-8aee-9d8003198973.png)
Admin Menu
![Screenshot (125)](https://user-images.githubusercontent.com/116195301/210965465-d9de4b51-051f-48de-97fa-2dd82f70557d.png)





## Environment variable
You need to add those variables to .env file

`ATLAS_URI`

`MONGO_URI`

`SERVER_PORT`

`AUTH_EMAIL` 

`AUTH_PASS`

## API reference and tests
Our backend is divided into the following routes,
each route has a set of APIs with different functionalities.

Test are done using postman and their is the routes and its tests

Login

` POST \login`

| Headers | Type | Description |
| --- | -- | --- |
| `Authorization`| `String` | Required.  Bearer token is added.|

| Body | Type | Description |
| --- | -- | --- |
| `username`| `String` | Required. username of user|
| `password`| `String` | Required. password of user|

> Response

`
{
    "auth": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYjMzNGI1ZmYxOWE1ZTYzZjU3ZGExOSIsImlhdCI6MTY3MjkzNzAxMCwiZXhwIjoxNjczMTk2MjEwfQ.XiaLlVKPZ2w4808vb1s8fbVEMqEXIuAnrtS5BOvVJEk",
    "result": {
        "_id": "63b334b5ff19a5e63f57da19",
        "username": "Admin",
        "password": "$2b$10$tUIvGiUZyfG/OMKoO9mlzOc0q9ZeHj99V6UvGWNCR28nAfjzgOWJO",
        "type": "Admin",
        "email": "haneengamall111@gmail.com",
        "reviews": [],
        "registeredCourses": [],
        "createdAt": "2023-01-02T19:47:01.147Z",
        "updatedAt": "2023-01-03T09:10:47.042Z",
        "__v": 0
    }
}
`
 
Logout

`GET \logout`

> Response

`"Logged Out"`

Sign up

`POST \addIndividualTrainee`

| Headers | Type | Description |
| --- | -- | --- |
| `Authorization`| `String` | Required.  Bearer token is added.|

| Body | Type | Description |
| --- | -- | --- |
| `username`| `String` | Required. username of IndividualTrainee|
| `password`| `String` | Required. password of IndividualTrainee|
| `email`| `String` | Required. email of IndividualTrainee|
| `firstName`| `String` | Required. first name of IndividualTrainee|
| `lastName`| `String` | Required. last name of IndividualTrainee|

> Response

`
{
    "auth": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYjcwMWE0YzZjMDg2ODllM2RkOTM3MSIsImlhdCI6MTY3MjkzNzg5MiwiZXhwIjoxNjczMTk3MDkyfQ.yY5g_1_Vj-JA0PRNJcSkfft9h701JPJ8QorCoeD5Y8U",
    "result": {
        "username": "Haneen00",
        "password": "$2b$10$ICoRXHbcVChq3YeQJfdy3.sTQuWa313V2Ai4EqJAbvIMnRG5oQ/US",
        "type": "Individual Trainee",
        "email": "Haneen789",
        "firstName": "Haneen",
        "lastName": "gamal",
        "reviews": [],
        "registeredCourses": [],
        "wallet": 0,
        "defaultWallet": 0,
        "policy": "false",
        "_id": "63b701a4c6c08689e3dd9371",
        "createdAt": "2023-01-05T16:58:12.159Z",
        "updatedAt": "2023-01-05T16:58:12.159Z",
        "__v": 0
    }
}
`

Add Admin


`POST \addAdmin`

| Headers | Type | Description |
| --- | -- | --- |
| `Authorization`| `String` | Required. Bearer token of the Admin.|

| Body | Type | Description |
| --- | -- | --- |
| `username`| `String` | Required. username of Admin|
| `password`| `String` | Required. password of Admin|

> Response

`{
    "username": "Haneen990",
    "password": "$2b$10$/tmGOwImoFajbhiE.a6r.OTJ6ggWMZ3V9bfEne4/qkyQWki.3vmV2",
    "type": "Admin",
    "email": "haneengamall111@gmail.com",
    "reviews": [],
    "registeredCourses": [],
    "_id": "63b7023ec6c08689e3dd9ab9",
    "createdAt": "2023-01-05T17:00:46.803Z",
    "updatedAt": "2023-01-05T17:00:46.803Z",
    "__v": 0
}`



Add Corporate Trainee


`POST \addCorporateTrainee`

| Headers | Type | Description |
| --- | -- | --- |
| `Authorization`| `String` | Required. Bearer token of the Admin.|

| Body | Type | Description |
| --- | -- | --- |
| `username`| `String` | Required. username of Corporate Trainee|
| `password`| `String` | Required. password of Corporate Trainee|

> Response

` {
    "username": "Haneen90",
    "password": "$2b$10$FjJd6dtIY9U3fOLSepm9H.3cj2B0axZVFM09CbeRBhgvH.TIUarPO",
    "type": "Corporate Trainee",
    "email": "haneengamall111@gmail.com",
    "reviews": [],
    "registeredCourses": [],
    "_id": "63b7029bc6c08689e3dd9f25",
    "createdAt": "2023-01-05T17:02:19.151Z",
    "updatedAt": "2023-01-05T17:02:19.151Z",
    "__v": 0
} `


Add Instructor


`POST \addInstructor`

| Headers | Type | Description |
| --- | -- | --- |
| `Authorization`| `String` | Required. Bearer token of the Admin.|

| Body | Type | Description |
| --- | -- | --- |
| `username`| `String` | Required. username of Instructor|
| `password`| `String` | Required. password of Instructor|

> Response

`{
    "username": "Hanen90",
    "password": "$2b$10$ZZdI.m.aPvCxlmloku2vT.dRAKxvzlgYSmOZInaJRRbyLdA/tEm/q",
    "type": "Instructor",
    "email": "haneengamall111@gmail.com",
    "biography": "",
    "rating": 5,
    "reviews": [],
    "contract": "false",
    "registeredCourses": [],
    "wallet": 0,
    "defaultWallet": 0,
    "policy": "false",
    "loggedFirst": "false",
    "numberOfRates": 0,
    "_id": "63b7032ec6c08689e3dda634",
    "createdAt": "2023-01-05T17:04:46.236Z",
    "updatedAt": "2023-01-05T17:04:46.236Z",
    "__v": 0
} `

Change Password

`PATCH \changePassword`

| Headers | Type | Description |
| --- | -- | --- |
| `Authorization`| `String` | Required. Bearer token of the User.|

| Body | Type | Description |
| --- | -- | --- |
| `password`| `String` | Required. password of User|
| `newPassword`| `String` | Required. newPassword of User|

> Response

`
{
    "_id": "63b7032ec6c08689e3dda634",
    "username": "Hanen90",
    "password": "$2b$10$N/icnvFRT0nAeBJDzZvoOO31p5SO.DdWXi6aB1kju8ouVtLyjDxDG",
    "type": "Instructor",
    "email": "haneengamall111@gmail.com",
    "biography": "",
    "rating": 5,
    "reviews": [],
    "contract": "false",
    "registeredCourses": [],
    "wallet": 0,
    "defaultWallet": 0,
    "policy": "false",
    "loggedFirst": "false",
    "numberOfRates": 0,
    "createdAt": "2023-01-05T17:04:46.236Z",
    "updatedAt": "2023-01-05T17:06:31.370Z",
    "__v": 0
}`


View Course

`GET \course`

| query | Type | Description |
| --- | -- | --- |
| `courseId`| `String` | Required. Id of course.|

> Response

`
{
    "course": {
        "_id": "63b33a75ff19a5e63f57daa2",
        "title": "Databases",
        "summary": "A database is an organized collection of structured information, or data, typically stored electronically in a computer system",
        "defaultPrice": 4000,
        "price": 3960,
        "credithours": 4,
        "rating": 0.8333333333333334,
        "taughtBy": "63b334c8ff19a5e63f57da35",
        "reviews": [],
        "link": "https://www.youtube.com/watch?v=Zc14ZkWVhhs&t=32s",
        "subtitles": [
            "63b33b08ff19a5e63f57dac2"
        ],
        "subject": "Data Science",
        "subtitlesName": [
            "ER DIAGRAM"
        ],
        "instructorName": "Instructor",
        "numberOfRates": 3,
        "numberOfEnrolled": 4,
        "createdAt": "2023-01-02T20:11:33.860Z",
        "updatedAt": "2023-01-03T10:49:54.854Z",
        "__v": 0
    },
    "discount": {
        "_id": "63b3f462b0c2558949676139",
        "amount": 50,
        "startDate": "2023-01-03T19:11:54.000Z",
        "endDate": "2023-01-04T19:11:54.000Z",
        "course": "63b33a75ff19a5e63f57daa2",
        "createdAt": "2023-01-03T09:24:50.083Z",
        "updatedAt": "2023-01-03T09:24:50.083Z",
        "__v": 0
    }
}
`


Create Course

`POST \createCourse`
 
| Headers | Type | Description |
| --- | -- | --- |
| `Authorization`| `String` | Required. Bearer token of the Instructor.|

| Body | Type | Description |
| --- | -- | --- |
| `title`| `String` | Required. title of Course|
| `summary`| `String` | Required. summary of Course|
| `defaultPrice`| `String` | Required. summary of Course|
| `subject`| `String` | Required. summary of Course|
| `link`| `String` | Required. summary of Course|

> Response

`
{
    "title": "course1",
    "summary": "A database is an organized collection of structured information, or data, typically stored electronically in a computer system",
    "defaultPrice": 4000,
    "price": 4000,
    "credithours": 4,
    "rating": 5,
    "taughtBy": "63b334c8ff19a5e63f57da35",
    "reviews": [],
    "link": "https://www.youtube.com/watch?v=Zc14ZkWVhhs&t=32s",
    "subtitles": [],
    "subject": "Data Science",
    "subtitlesName": [],
    "instructorName": "Instructor",
    "numberOfRates": 0,
    "numberOfEnrolled": 0,
    "_id": "63b706fffe2a043a98264812",
    "createdAt": "2023-01-05T17:21:03.652Z",
    "updatedAt": "2023-01-05T17:21:03.652Z",
    "__v": 0
}
`
Create Subtitle

`POST \createSubtitle`
 
| Headers | Type | Description |
| --- | -- | --- |
| `Authorization`| `String` | Required. Bearer token of the Instructor.|

| Body | Type | Description |
| --- | -- | --- |
| `name`| `String` | Required. title of Subtitle|
| `credithour`| `String` | Required. credithour of Subtitle|

| query | Type | Description |
| --- | -- | --- |
| `courseId`| `String` | Required. Id of course|

> Response

`{
    "name": "1",
    "videos": [],
    "_id": "63b707beaf27ca4250cf2651",
    "createdAt": "2023-01-05T17:24:14.283Z",
    "updatedAt": "2023-01-05T17:24:14.283Z",
    "__v": 0
}`


Rate Course

`PATCH \rateCourse`

| query | Type | Description |
| --- | -- | --- |
| `courseId`| `String` | Required. Id of course|

| Headers | Type | Description |
| --- | -- | --- |
| `Authorization`| `String` | Required. Bearer token of the Trainee.|

| Body | Type | Description |
| --- | -- | --- |
| `rating`| `Number` | Required. rating from user|

>Response

`
{
    "_id": "63b706fffe2a043a98264812",
    "title": "course1",
    "summary": "A database is an organized collection of structured information, or data, typically stored electronically in a computer system",
    "defaultPrice": 4000,
    "price": 4000,
    "credithours": 4,
    "rating": 3.4,
    "taughtBy": "63b334c8ff19a5e63f57da35",
    "reviews": [],
    "link": "https://www.youtube.com/watch?v=Zc14ZkWVhhs&t=32s",
    "subtitles": [
        "63b707beaf27ca4250cf2651"
    ],
    "subject": "Data Science",
    "subtitlesName": [
        "1"
    ],
    "instructorName": "Instructor",
    "numberOfRates": 1,
    "numberOfEnrolled": 0,
    "createdAt": "2023-01-05T17:21:03.652Z",
    "updatedAt": "2023-01-05T17:25:14.701Z",
    "__v": 0
}`

Register


`PATCH \register`

| query | Type | Description |
| --- | -- | --- |
| `courseId`| `String` | Required. Id of course|

| Headers | Type | Description |
| --- | -- | --- |
| `Authorization`| `String` | Required. Bearer token of the Trainee.|

| Body | Type | Description |
| --- | -- | --- |
| `rating`| `Number` | Required. rating from user|

> Response

`
{
    "_id": "63b706fffe2a043a98264812",
    "title": "course1",
    "summary": "A database is an organized collection of structured information, or data, typically stored electronically in a computer system",
    "defaultPrice": 4000,
    "price": 4000,
    "credithours": 4,
    "rating": 3.4,
    "taughtBy": "63b334c8ff19a5e63f57da35",
    "reviews": [],
    "link": "https://www.youtube.com/watch?v=Zc14ZkWVhhs&t=32s",
    "subtitles": [
        "63b707beaf27ca4250cf2651"
    ],
    "subject": "Data Science",
    "subtitlesName": [
        "1"
    ],
    "instructorName": "Instructor",
    "numberOfRates": 1,
    "numberOfEnrolled": 1,
    "createdAt": "2023-01-05T17:21:03.652Z",
    "updatedAt": "2023-01-05T17:25:14.701Z",
    "__v": 0
}`

Rate Course

`PATCH \rateCourse`

| query | Type | Description |
| --- | -- | --- |
| `courseId`| `String` | Required. Id of course|

| Headers | Type | Description |
| --- | -- | --- |
| `Authorization`| `String` | Required. Bearer token of the Trainee.|

| Body | Type | Description |
| --- | -- | --- |
| `rating`| `Number` | Required. rating from user|

>Response

`
{
    "_id": "63b706fffe2a043a98264812",
    "title": "course1",
    "summary": "A database is an organized collection of structured information, or data, typically stored electronically in a computer system",
    "defaultPrice": 4000,
    "price": 4000,
    "credithours": 4,
    "rating": 3.4,
    "taughtBy": "63b334c8ff19a5e63f57da35",
    "reviews": [],
    "link": "https://www.youtube.com/watch?v=Zc14ZkWVhhs&t=32s",
    "subtitles": [
        "63b707beaf27ca4250cf2651"
    ],
    "subject": "Data Science",
    "subtitlesName": [
        "1"
    ],
    "instructorName": "Instructor",
    "numberOfRates": 1,
    "numberOfEnrolled": 0,
    "createdAt": "2023-01-05T17:21:03.652Z",
    "updatedAt": "2023-01-05T17:25:14.701Z",
    "__v": 0
}`

View All Coueses

`GET \courses`


> Response

` [
    {
        "_id": "63b33a75ff19a5e63f57daa2",
        "title": "Databases",
        "summary": "A database is an organized collection of structured information, or data, typically stored electronically in a computer system",
        "defaultPrice": 4000,
        "price": 3960,
        "credithours": 4,
        "rating": 0.8333333333333334,
        "taughtBy": "63b334c8ff19a5e63f57da35",
        "reviews": [],
        "link": "https://www.youtube.com/watch?v=Zc14ZkWVhhs&t=32s",
        "subtitles": [
            "63b33b08ff19a5e63f57dac2"
        ],
        "subject": "Data Science",
        "subtitlesName": [
            "ER DIAGRAM"
        ],
        "instructorName": "Instructor",
        "numberOfRates": 3,
        "numberOfEnrolled": 4,
        "createdAt": "2023-01-02T20:11:33.860Z",
        "updatedAt": "2023-01-03T10:49:54.854Z",
        "__v": 0
    },
    {
        "_id": "63b33d006529cf9017236009",
        "title": "Advanced Computer Lab",
        "summary": "Website using MernStack",
        "defaultPrice": 3500,
        "price": 3500,
        "credithours": 4,
        "rating": 5,
        "taughtBy": "63b334c8ff19a5e63f57da35",
        "reviews": [],
        "link": "https://www.youtube.com/watch?v=jeNXbJq5o5g",
        "subtitles": [
            "63b33d836529cf9017236027",
            "63b33e246529cf9017236041",
            "63b33e8a6529cf9017236059",
            "63b33efb6529cf9017236073"
        ],
        "subject": "Computer Science",
        "subtitlesName": [
            "Mongodb",
            "Express JS",
            "Node JS",
            "React JS"
        ],
        "instructorName": "Instructor",
        "numberOfRates": 0,
        "numberOfEnrolled": 3,
        "createdAt": "2023-01-02T20:22:24.770Z",
        "updatedAt": "2023-01-03T09:55:45.905Z",
        "__v": 0
    },
    {
        "_id": "63b3f258b0c2558949675600",
        "title": "ACL",
        "summary": "Hello",
        "defaultPrice": 1000,
        "price": 1000,
        "credithours": 4,
        "rating": 5,
        "taughtBy": "63b3edbd32863ff0d25b5f2c",
        "reviews": [],
        "link": "https://www.youtube.com/watch?v=YxWlaYCA8MU&list=RDntC3sO-VeJY&index=2",
        "subtitles": [
            "63b3f289b0c255894967561b"
        ],
        "subject": "Computer Science",
        "subtitlesName": [
            "Week 1"
        ],
        "instructorName": "nada",
        "numberOfRates": 0,
        "numberOfEnrolled": 1,
        "createdAt": "2023-01-03T09:16:08.017Z",
        "updatedAt": "2023-01-03T09:28:36.946Z",
        "__v": 0
    },
    {
        "_id": "63b3fe01d5b944794c507278",
        "title": "Math 301",
        "summary": "Hello",
        "defaultPrice": 1000,
        "price": 1000,
        "credithours": 4,
        "rating": 5,
        "taughtBy": "63b3fda1d5b944794c5071d9",
        "reviews": [],
        "link": "https://www.youtube.com/watch?v=-0exw-9YJBo\"",
        "subtitles": [
            "63b3fe7cd5b944794c5072a0"
        ],
        "subject": "Math and Logic",
        "subtitlesName": [
            "Subtitle1"
        ],
        "instructorName": "Haneen10",
        "numberOfRates": 0,
        "numberOfEnrolled": 3,
        "createdAt": "2023-01-03T10:05:53.192Z",
        "updatedAt": "2023-01-05T16:35:03.100Z",
        "__v": 0
    },
    {
        "_id": "63b706fffe2a043a98264812",
        "title": "course1",
        "summary": "A database is an organized collection of structured information, or data, typically stored electronically in a computer system",
        "defaultPrice": 4000,
        "price": 4000,
        "credithours": 4,
        "rating": 7,
        "taughtBy": "63b334c8ff19a5e63f57da35",
        "reviews": [],
        "link": "https://www.youtube.com/watch?v=Zc14ZkWVhhs&t=32s",
        "subtitles": [
            "63b707beaf27ca4250cf2651"
        ],
        "subject": "Data Science",
        "subtitlesName": [
            "1"
        ],
        "instructorName": "Instructor",
        "numberOfRates": 1,
        "numberOfEnrolled": 0,
        "createdAt": "2023-01-05T17:21:03.652Z",
        "updatedAt": "2023-01-05T17:25:14.701Z",
        "__v": 0
    }
]`



View My Coueses

`GET \myCourses`


| Headers | Type | Description |
| --- | -- | --- |
| `Authorization`| `String` | Required. Bearer token of the Trainee.|


> Response

`[
    {
        "_id": "63b33a75ff19a5e63f57daa2",
        "title": "Databases",
        "summary": "A database is an organized collection of structured information, or data, typically stored electronically in a computer system",
        "defaultPrice": 4000,
        "price": 3960,
        "credithours": 4,
        "rating": 0.8333333333333334,
        "taughtBy": "63b334c8ff19a5e63f57da35",
        "reviews": [],
        "link": "https://www.youtube.com/watch?v=Zc14ZkWVhhs&t=32s",
        "subtitles": [
            "63b33b08ff19a5e63f57dac2"
        ],
        "subject": "Data Science",
        "subtitlesName": [
            "ER DIAGRAM"
        ],
        "instructorName": "Instructor",
        "numberOfRates": 3,
        "numberOfEnrolled": 4,
        "createdAt": "2023-01-02T20:11:33.860Z",
        "updatedAt": "2023-01-03T10:49:54.854Z",
        "__v": 0
    },
    {
        "_id": "63b33d006529cf9017236009",
        "title": "Advanced Computer Lab",
        "summary": "Website using MernStack",
        "defaultPrice": 3500,
        "price": 3500,
        "credithours": 4,
        "rating": 5,
        "taughtBy": "63b334c8ff19a5e63f57da35",
        "reviews": [],
        "link": "https://www.youtube.com/watch?v=jeNXbJq5o5g",
        "subtitles": [
            "63b33d836529cf9017236027",
            "63b33e246529cf9017236041",
            "63b33e8a6529cf9017236059",
            "63b33efb6529cf9017236073"
        ],
        "subject": "Computer Science",
        "subtitlesName": [
            "Mongodb",
            "Express JS",
            "Node JS",
            "React JS"
        ],
        "instructorName": "Instructor",
        "numberOfRates": 0,
        "numberOfEnrolled": 3,
        "createdAt": "2023-01-02T20:22:24.770Z",
        "updatedAt": "2023-01-03T09:55:45.905Z",
        "__v": 0
    }
] `


Report Problem

`POST \reportProblem`
 
| Headers | Type | Description |
| --- | -- | --- |
| `Authorization`| `String` | Required. Bearer token of the User.|

| Body | Type | Description |
| --- | -- | --- |
| `type`| `String` | Required. type of Problem|
| `theProblem`| `String` | Required. body of Problem|

| query | Type | Description |
| --- | -- | --- |
| `courseId`| `String` | Required. Id of course|

> Response

`{
    "type": "technical",
    "status": "unsolved",
    "followUp": [],
    "course": "63b71ecc01917a29474c14b7",
    "user": "63b334c8ff19a5e63f57da35",
    "theProblem": "BlaBla",
    "_id": "63b71ecc01917a29474c14b8",
    "createdAt": "2023-01-05T19:02:36.050Z",
    "updatedAt": "2023-01-05T19:02:36.050Z",
    "__v": 0
}`



View Reported Problems

`GET \reportedProblems`
 
| Headers | Type | Description |
| --- | -- | --- |
| `Authorization`| `String` | Required. Bearer token of the User.|




> Response

`
[
    {
        "_id": "63b71ecc01917a29474c14b8",
        "type": "technical",
        "status": "unsolved",
        "followUp": [],
        "course": "63b71ecc01917a29474c14b7",
        "user": "63b334c8ff19a5e63f57da35",
        "theProblem": "BlaBla",
        "createdAt": "2023-01-05T19:02:36.050Z",
        "updatedAt": "2023-01-05T19:02:36.050Z",
        "__v": 0
    }
]
`


isLogin 

`GET \isLogin`


| Headers | Type | Description |
| --- | -- | --- |
| `Authorization`| `String` | Required. Bearer token of the User.|

> Response

`
{
    "_id": "63b334c8ff19a5e63f57da35",
    "username": "Instructor",
    "password": "$2b$10$YtRmAFz4bTlm/HJuxM/Hm.KjnI8czvz9JUji5eoQa0nUs1I65zcnW",
    "type": "Instructor",
    "email": "haneengamall111@gmail.com",
    "biography": "",
    "rating": 5,
    "reviews": [],
    "contract": "true",
    "registeredCourses": [],
    "wallet": 3960,
    "defaultWallet": 11000,
    "policy": "true",
    "loggedFirst": "false",
    "numberOfRates": 0,
    "createdAt": "2023-01-02T19:47:20.850Z",
    "updatedAt": "2023-01-03T10:53:35.530Z",
    "__v": 0
`

Accept Policy

`POST \policy`

| Headers | Type | Description |
| --- | -- | --- |
| `Authorization`| `String` | Required. Bearer token of the User.|


| Body | Type | Description |
| --- | -- | --- |
| `accepted`| `String` | Required. Accepted or Not for Policy|


> Response

`
{
    "_id": "63b334c8ff19a5e63f57da35",
    "username": "Instructor",
    "password": "$2b$10$YtRmAFz4bTlm/HJuxM/Hm.KjnI8czvz9JUji5eoQa0nUs1I65zcnW",
    "type": "Instructor",
    "email": "haneengamall111@gmail.com",
    "biography": "",
    "rating": 5,
    "reviews": [],
    "contract": "true",
    "registeredCourses": [],
    "wallet": 3960,
    "defaultWallet": 11000,
    "policy": "true",
    "loggedFirst": "false",
    "numberOfRates": 0,
    "createdAt": "2023-01-02T19:47:20.850Z",
    "updatedAt": "2023-01-03T10:53:35.530Z",
    "__v": 0
}
`



Accept Contract

`POST \contract`

| Headers | Type | Description |
| --- | -- | --- |
| `Authorization`| `String` | Required. Bearer token of the Instructor.|


| Body | Type | Description |
| --- | -- | --- |
| `accepted`| `String` | Required. Accepted or Not for Contract|


> Response

`
{
    "_id": "63b334c8ff19a5e63f57da35",
    "username": "Instructor",
    "password": "$2b$10$YtRmAFz4bTlm/HJuxM/Hm.KjnI8czvz9JUji5eoQa0nUs1I65zcnW",
    "type": "Instructor",
    "email": "haneengamall111@gmail.com",
    "biography": "",
    "rating": 5,
    "reviews": [],
    "contract": "true",
    "registeredCourses": [],
    "wallet": 3960,
    "defaultWallet": 11000,
    "policy": "true",
    "loggedFirst": "false",
    "numberOfRates": 0,
    "createdAt": "2023-01-02T19:47:20.850Z",
    "updatedAt": "2023-01-03T10:53:35.530Z",
    "__v": 0
}
`


Change Currency 

`PATCH \change`

`require('currency-converter-lt')`



| Body | Type | Description |
| --- | -- | --- |
| `change`| `String` | Required. Code of country for Currency converter|


> Response

`
{
    "status": true
}
`

Write Review to Instructor 

`PATCH \writeReviewInstructor`




| Body | Type | Description |
| --- | -- | --- |
| `review`| `String` | Required. Review to be Written to Instructor|


| query | Type | Description |
| --- | -- | --- |
| `instructorId`| `String` | Required. Id of instructor|


> Response

`
{
    "_id": "63b334c8ff19a5e63f57da35",
    "username": "Instructor",
    "password": "$2b$10$YtRmAFz4bTlm/HJuxM/Hm.KjnI8czvz9JUji5eoQa0nUs1I65zcnW",
    "type": "Instructor",
    "email": "haneengamall111@gmail.com",
    "biography": "",
    "rating": 5,
    "reviews": [
        null,
        "1234"
    ],
    "contract": "true",
    "registeredCourses": [],
    "wallet": 5440,
    "defaultWallet": 11000,
    "policy": "true",
    "loggedFirst": "false",
    "numberOfRates": 0,
    "createdAt": "2023-01-02T19:47:20.850Z",
    "updatedAt": "2023-01-06T06:31:49.093Z",
    "__v": 0
}
`



Write Review to Course 

`PATCH \writeReviewCourse`


| Body | Type | Description |
| --- | -- | --- |
| `review`| `String` | Required. Review to be Written to Course|

| query | Type | Description |
| --- | -- | --- |
| `courseId`| `String` | Required. Id of course|


> Response

`
{
    "_id": "63b706fffe2a043a98264812",
    "title": "course1",
    "summary": "A database is an organized collection of structured information, or data, typically stored electronically in a computer system",
    "defaultPrice": 4000,
    "price": 5440,
    "credithours": 4,
    "rating": 3,
    "taughtBy": "63b334c8ff19a5e63f57da35",
    "reviews": [
        "1234"
    ],
    "link": "https://www.youtube.com/watch?v=Zc14ZkWVhhs&t=32s",
    "subtitles": [
        "63b707beaf27ca4250cf2651"
    ],
    "subject": "Data Science",
    "subtitlesName": [
        "1"
    ],
    "instructorName": "Instructor",
    "numberOfRates": 1,
    "numberOfEnrolled": 0,
    "createdAt": "2023-01-05T17:21:03.652Z",
    "updatedAt": "2023-01-06T06:36:14.625Z",
    "__v": 0
}
`

Edit Instructor Info

`PATCH \edit`


| Body | Type | Description |
| --- | -- | --- |
| `email`| `String` | Required. email of Instructor|
| `biography`| `String` | Required. biography of Instructor|

| query | Type | Description |
| --- | -- | --- |
| `courseId`| `String` | Required. Id of course|


> Response

`
{
    "_id": "63b334c8ff19a5e63f57da35",
    "username": "Instructor",
    "password": "$2b$10$YtRmAFz4bTlm/HJuxM/Hm.KjnI8czvz9JUji5eoQa0nUs1I65zcnW",
    "type": "Instructor",
    "email": "haneengamall11@gmail.com",
    "biography": "Bla12Bla",
    "rating": 5,
    "reviews": [
        null,
        "1234"
    ],
    "contract": "true",
    "registeredCourses": [],
    "wallet": 5440,
    "defaultWallet": 11000,
    "policy": "true",
    "loggedFirst": "false",
    "numberOfRates": 0,
    "createdAt": "2023-01-02T19:47:20.850Z",
    "updatedAt": "2023-01-06T06:31:49.093Z",
    "__v": 0
}
`


View Reported Problems

`GET /prevReportedProblems`
 
| Headers | Type | Description |
| --- | -- | --- |
| `Authorization`| `String` | Required. Bearer token of the User.|




> Response

`
[
    {
        "_id": "63b71ecc01917a29474c14b8",
        "type": "technical",
        "status": "unsolved",
        "followUp": [],
        "course": "63b71ecc01917a29474c14b7",
        "user": "63b334c8ff19a5e63f57da35",
        "theProblem": "BlaBla",
        "createdAt": "2023-01-05T19:02:36.050Z",
        "updatedAt": "2023-01-05T19:02:36.050Z",
        "__v": 0
    }
]
`

Add Follow Up

`PATCH \followUp`


| Body | Type | Description |
| --- | -- | --- |
| `problem`| `String` | Required. problem ID of Problem|
| `followUp`| `String` | Required. followup of Problem|


> Response 

`
{
    "_id": "63b71ecc01917a29474c14b8",
    "type": "technical",
    "status": "unsolved",
    "followUp": [
        "123"
    ],
    "course": "63b71ecc01917a29474c14b7",
    "user": "63b334c8ff19a5e63f57da35",
    "theProblem": "BlaBla",
    "createdAt": "2023-01-05T19:02:36.050Z",
    "updatedAt": "2023-01-06T06:44:59.021Z",
    "__v": 0
}
`


Request Refund

`PATCH \requestRefund`

| Headers | Type | Description |
| --- | -- | --- |
| `Authorization`| `String` | Required. Bearer token of the User.|

| query | Type | Description |
| --- | -- | --- |
| `courseId`| `String` | Required. Id of course|

> Response

`
{
    "type": "refund",
    "amount": 5440,
    "user": "63b334c8ff19a5e63f57da35",
    "course": "63b33a75ff19a5e63f57daa2",
    "accepted": "false",
    "_id": "63b7c56af4620a79baa07db7",
    "createdAt": "2023-01-06T06:53:30.933Z",
    "updatedAt": "2023-01-06T06:53:30.933Z",
    "__v": 0
}`


View Refund Requests

`GET \refundRequests`

| Headers | Type | Description |
| --- | -- | --- |
| `Authorization`| `String` | Required. Bearer token of the User.|


> Response

`
[
    {
        "_id": "63b7c56af4620a79baa07db7",
        "type": "refund",
        "amount": 5440,
        "user": "63b334c8ff19a5e63f57da35",
        "course": "63b33a75ff19a5e63f57daa2",
        "accepted": "false",
        "createdAt": "2023-01-06T06:53:30.933Z",
        "updatedAt": "2023-01-06T06:53:30.933Z",
        "__v": 0
    }
]`



Refund Request

`PATCH \refund`

| Headers | Type | Description |
| --- | -- | --- |
| `Authorization`| `String` | Required. Bearer token of the User.|


| Body | Type | Description |
| --- | -- | --- |
| `state`| `String` | Required. whether Problem accepted or not|




> Response

`
[
    {
        "_id": "63b7c56af4620a79baa07db7",
        "type": "refund",
        "amount": 5440,
        "user": "63b334c8ff19a5e63f57da35",
        "course": "63b33a75ff19a5e63f57daa2",
        "accepted": "true",
        "createdAt": "2023-01-06T06:53:30.933Z",
        "updatedAt": "2023-01-06T06:53:30.933Z",
        "__v": 0
    }
]`


Solve Problem

`PATCH \solve`


| Body | Type | Description |
| --- | -- | --- |
| `problem`| `String` | Required. problem ID of Problem|
| `status`| `String` | Required. status of Problem|

> Response

`
{
    "_id": "63b71ecc01917a29474c14b8",
    "type": "technical",
    "status": "accepted",
    "followUp": [
        "123"
    ],
    "course": "63b71ecc01917a29474c14b7",
    "user": "63b334c8ff19a5e63f57da35",
    "theProblem": "BlaBla",
    "createdAt": "2023-01-05T19:02:36.050Z",
    "updatedAt": "2023-01-06T07:01:55.872Z",
    "__v": 0
}`

Request Access

`PATCH \requestAccess`

| Headers | Type | Description |
| --- | -- | --- |
| `Authorization`| `String` | Required. Bearer token of the User.|

| query | Type | Description |
| --- | -- | --- |
| `courseId`| `String` | Required. Id of course|


> Response

`
{
    "type": "access",
    "user": "63b334c8ff19a5e63f57da35",
    "course": "63b33a75ff19a5e63f57daa2",
    "accepted": "false",
    "_id": "63b7c927f4620a79baa07dbb",
    "createdAt": "2023-01-06T07:09:27.816Z",
    "updatedAt": "2023-01-06T07:09:27.816Z",
    "__v": 0
}
`

Course Requests

`GET \courseRequests`


| Headers | Type | Description |
| --- | -- | --- |
| `Authorization`| `String` | Required. Bearer token of the User.|

> Response

`
[
    {
        "_id": "63b7c927f4620a79baa07dbb",
        "type": "access",
        "user": "63b334c8ff19a5e63f57da35",
        "course": "63b33a75ff19a5e63f57daa2",
        "accepted": "false",
        "createdAt": "2023-01-06T07:09:27.816Z",
        "updatedAt": "2023-01-06T07:09:27.816Z",
        "__v": 0
    }
`


Grant Access

`PATCH \grant`

| Body | Type | Description |
| --- | -- | --- |
| `state`| `String` | Required. state of Request|

| query | Type | Description |
| --- | -- | --- |
| `requestId`| `String` | Required. Id of Request|

> Response

`
{
        "_id": "63b7c927f4620a79baa07dbb",
        "type": "access",
        "user": "63b334c8ff19a5e63f57da35",
        "course": "63b33a75ff19a5e63f57daa2",
        "accepted": "true",
        "createdAt": "2023-01-06T07:09:27.816Z",
        "updatedAt": "2023-01-06T07:09:27.816Z",
        "__v": 0
    }
`


Filter all courses

`GET \filter`

| query | Type | Description |
| --- | -- | --- |
| `price`| `String` | Required. Price to be filter|
| `rating`| `String` | Required. Rating to be filter|
| `subject`| `String` | Required. Subject to be filter|


> Response

`
 [
    {
        "_id": "63b33a75ff19a5e63f57daa2",
        "title": "Databases",
        "summary": "A database is an organized collection of structured information, or data, typically stored electronically in a computer system",
        "defaultPrice": 4000,
        "price": 3960,
        "credithours": 4,
        "rating": 0.8333333333333334,
        "taughtBy": "63b334c8ff19a5e63f57da35",
        "reviews": [],
        "link": "https://www.youtube.com/watch?v=Zc14ZkWVhhs&t=32s",
        "subtitles": [
            "63b33b08ff19a5e63f57dac2"
        ],
        "subject": "Data Science",
        "subtitlesName": [
            "ER DIAGRAM"
        ],
        "instructorName": "Instructor",
        "numberOfRates": 3,
        "numberOfEnrolled": 4,
        "createdAt": "2023-01-02T20:11:33.860Z",
        "updatedAt": "2023-01-03T10:49:54.854Z",
        "__v": 0
    },
    {
        "_id": "63b33d006529cf9017236009",
        "title": "Advanced Computer Lab",
        "summary": "Website using MernStack",
        "defaultPrice": 3500,
        "price": 3500,
        "credithours": 4,
        "rating": 5,
        "taughtBy": "63b334c8ff19a5e63f57da35",
        "reviews": [],
        "link": "https://www.youtube.com/watch?v=jeNXbJq5o5g",
        "subtitles": [
            "63b33d836529cf9017236027",
            "63b33e246529cf9017236041",
            "63b33e8a6529cf9017236059",
            "63b33efb6529cf9017236073"
        ],
        "subject": "Computer Science",
        "subtitlesName": [
            "Mongodb",
            "Express JS",
            "Node JS",
            "React JS"
        ],
        "instructorName": "Instructor",
        "numberOfRates": 0,
        "numberOfEnrolled": 3,
        "createdAt": "2023-01-02T20:22:24.770Z",
        "updatedAt": "2023-01-03T09:55:45.905Z",
        "__v": 0
    }
]`


Filter all Instructor Courses

`GET \filterInstructor`

| Headers | Type | Description |
| --- | -- | --- |
| `Authorization`| `String` | Required. Bearer token of the User.|

| query | Type | Description |
| --- | -- | --- |
| `price`| `String` | Required. Price to be filter|
| `rating`| `String` | Required. Rating to be filter|
| `subject`| `String` | Required. Subject to be filter|


> Response

`
 [
    {
        "_id": "63b33a75ff19a5e63f57daa2",
        "title": "Databases",
        "summary": "A database is an organized collection of structured information, or data, typically stored electronically in a computer system",
        "defaultPrice": 4000,
        "price": 3960,
        "credithours": 4,
        "rating": 0.8333333333333334,
        "taughtBy": "63b334c8ff19a5e63f57da35",
        "reviews": [],
        "link": "https://www.youtube.com/watch?v=Zc14ZkWVhhs&t=32s",
        "subtitles": [
            "63b33b08ff19a5e63f57dac2"
        ],
        "subject": "Data Science",
        "subtitlesName": [
            "ER DIAGRAM"
        ],
        "instructorName": "Instructor",
        "numberOfRates": 3,
        "numberOfEnrolled": 4,
        "createdAt": "2023-01-02T20:11:33.860Z",
        "updatedAt": "2023-01-03T10:49:54.854Z",
        "__v": 0
    },
    {
        "_id": "63b33d006529cf9017236009",
        "title": "Advanced Computer Lab",
        "summary": "Website using MernStack",
        "defaultPrice": 3500,
        "price": 3500,
        "credithours": 4,
        "rating": 5,
        "taughtBy": "63b334c8ff19a5e63f57da35",
        "reviews": [],
        "link": "https://www.youtube.com/watch?v=jeNXbJq5o5g",
        "subtitles": [
            "63b33d836529cf9017236027",
            "63b33e246529cf9017236041",
            "63b33e8a6529cf9017236059",
            "63b33efb6529cf9017236073"
        ],
        "subject": "Computer Science",
        "subtitlesName": [
            "Mongodb",
            "Express JS",
            "Node JS",
            "React JS"
        ],
        "instructorName": "Instructor",
        "numberOfRates": 0,
        "numberOfEnrolled": 3,
        "createdAt": "2023-01-02T20:22:24.770Z",
        "updatedAt": "2023-01-03T09:55:45.905Z",
        "__v": 0
    }
]`


Search all courses

`GET \search`

| query | Type | Description |
| --- | -- | --- |
| `search`| `String` | Required. Search to be searched|



> Response

`
 [
    {
        "_id": "63b33a75ff19a5e63f57daa2",
        "title": "Databases",
        "summary": "A database is an organized collection of structured information, or data, typically stored electronically in a computer system",
        "defaultPrice": 4000,
        "price": 3960,
        "credithours": 4,
        "rating": 0.8333333333333334,
        "taughtBy": "63b334c8ff19a5e63f57da35",
        "reviews": [],
        "link": "https://www.youtube.com/watch?v=Zc14ZkWVhhs&t=32s",
        "subtitles": [
            "63b33b08ff19a5e63f57dac2"
        ],
        "subject": "Data Science",
        "subtitlesName": [
            "ER DIAGRAM"
        ],
        "instructorName": "Instructor",
        "numberOfRates": 3,
        "numberOfEnrolled": 4,
        "createdAt": "2023-01-02T20:11:33.860Z",
        "updatedAt": "2023-01-03T10:49:54.854Z",
        "__v": 0
    },
    {
        "_id": "63b33d006529cf9017236009",
        "title": "Advanced Computer Lab",
        "summary": "Website using MernStack",
        "defaultPrice": 3500,
        "price": 3500,
        "credithours": 4,
        "rating": 5,
        "taughtBy": "63b334c8ff19a5e63f57da35",
        "reviews": [],
        "link": "https://www.youtube.com/watch?v=jeNXbJq5o5g",
        "subtitles": [
            "63b33d836529cf9017236027",
            "63b33e246529cf9017236041",
            "63b33e8a6529cf9017236059",
            "63b33efb6529cf9017236073"
        ],
        "subject": "Computer Science",
        "subtitlesName": [
            "Mongodb",
            "Express JS",
            "Node JS",
            "React JS"
        ],
        "instructorName": "Instructor",
        "numberOfRates": 0,
        "numberOfEnrolled": 3,
        "createdAt": "2023-01-02T20:22:24.770Z",
        "updatedAt": "2023-01-03T09:55:45.905Z",
        "__v": 0
    }
]`



Search all courses

`GET \searchInstructor`


| Headers | Type | Description |
| --- | -- | --- |
| `Authorization`| `String` | Required. Bearer token of the User.|

| query | Type | Description |
| --- | -- | --- |
| `search`| `String` | Required. Search to be searched|



> Response

`
 [
    {
        "_id": "63b33a75ff19a5e63f57daa2",
        "title": "Databases",
        "summary": "A database is an organized collection of structured information, or data, typically stored electronically in a computer system",
        "defaultPrice": 4000,
        "price": 3960,
        "credithours": 4,
        "rating": 0.8333333333333334,
        "taughtBy": "63b334c8ff19a5e63f57da35",
        "reviews": [],
        "link": "https://www.youtube.com/watch?v=Zc14ZkWVhhs&t=32s",
        "subtitles": [
            "63b33b08ff19a5e63f57dac2"
        ],
        "subject": "Data Science",
        "subtitlesName": [
            "ER DIAGRAM"
        ],
        "instructorName": "Instructor",
        "numberOfRates": 3,
        "numberOfEnrolled": 4,
        "createdAt": "2023-01-02T20:11:33.860Z",
        "updatedAt": "2023-01-03T10:49:54.854Z",
        "__v": 0
    },
    {
        "_id": "63b33d006529cf9017236009",
        "title": "Advanced Computer Lab",
        "summary": "Website using MernStack",
        "defaultPrice": 3500,
        "price": 3500,
        "credithours": 4,
        "rating": 5,
        "taughtBy": "63b334c8ff19a5e63f57da35",
        "reviews": [],
        "link": "https://www.youtube.com/watch?v=jeNXbJq5o5g",
        "subtitles": [
            "63b33d836529cf9017236027",
            "63b33e246529cf9017236041",
            "63b33e8a6529cf9017236059",
            "63b33efb6529cf9017236073"
        ],
        "subject": "Computer Science",
        "subtitlesName": [
            "Mongodb",
            "Express JS",
            "Node JS",
            "React JS"
        ],
        "instructorName": "Instructor",
        "numberOfRates": 0,
        "numberOfEnrolled": 3,
        "createdAt": "2023-01-02T20:22:24.770Z",
        "updatedAt": "2023-01-03T09:55:45.905Z",
        "__v": 0
    }
]`



View Trainee Courses

`GET \traineeViewCourses`


| Headers | Type | Description |
| --- | -- | --- |
| `Authorization`| `String` | Required. Bearer token of the User.|




> Response

`
 [
    {
        "_id": "63b33a75ff19a5e63f57daa2",
        "title": "Databases",
        "summary": "A database is an organized collection of structured information, or data, typically stored electronically in a computer system",
        "defaultPrice": 4000,
        "price": 3960,
        "credithours": 4,
        "rating": 0.8333333333333334,
        "taughtBy": "63b334c8ff19a5e63f57da35",
        "reviews": [],
        "link": "https://www.youtube.com/watch?v=Zc14ZkWVhhs&t=32s",
        "subtitles": [
            "63b33b08ff19a5e63f57dac2"
        ],
        "subject": "Data Science",
        "subtitlesName": [
            "ER DIAGRAM"
        ],
        "instructorName": "Instructor",
        "numberOfRates": 3,
        "numberOfEnrolled": 4,
        "createdAt": "2023-01-02T20:11:33.860Z",
        "updatedAt": "2023-01-03T10:49:54.854Z",
        "__v": 0
    },
    {
        "_id": "63b33d006529cf9017236009",
        "title": "Advanced Computer Lab",
        "summary": "Website using MernStack",
        "defaultPrice": 3500,
        "price": 3500,
        "credithours": 4,
        "rating": 5,
        "taughtBy": "63b334c8ff19a5e63f57da35",
        "reviews": [],
        "link": "https://www.youtube.com/watch?v=jeNXbJq5o5g",
        "subtitles": [
            "63b33d836529cf9017236027",
            "63b33e246529cf9017236041",
            "63b33e8a6529cf9017236059",
            "63b33efb6529cf9017236073"
        ],
        "subject": "Computer Science",
        "subtitlesName": [
            "Mongodb",
            "Express JS",
            "Node JS",
            "React JS"
        ],
        "instructorName": "Instructor",
        "numberOfRates": 0,
        "numberOfEnrolled": 3,
        "createdAt": "2023-01-02T20:22:24.770Z",
        "updatedAt": "2023-01-03T09:55:45.905Z",
        "__v": 0
    }
]`



isRegister

`GET \isRegister`


| Headers | Type | Description |
| --- | -- | --- |
| `Authorization`| `String` | Required. Bearer token of the User.|

> Response

`{
status:true
}
`

Most Enrolled

`GET \enrolled`

> Response

`
 [
    {
        "_id": "63b33a75ff19a5e63f57daa2",
        "title": "Databases",
        "summary": "A database is an organized collection of structured information, or data, typically stored electronically in a computer system",
        "defaultPrice": 4000,
        "price": 3960,
        "credithours": 4,
        "rating": 0.8333333333333334,
        "taughtBy": "63b334c8ff19a5e63f57da35",
        "reviews": [],
        "link": "https://www.youtube.com/watch?v=Zc14ZkWVhhs&t=32s",
        "subtitles": [
            "63b33b08ff19a5e63f57dac2"
        ],
        "subject": "Data Science",
        "subtitlesName": [
            "ER DIAGRAM"
        ],
        "instructorName": "Instructor",
        "numberOfRates": 3,
        "numberOfEnrolled": 4,
        "createdAt": "2023-01-02T20:11:33.860Z",
        "updatedAt": "2023-01-03T10:49:54.854Z",
        "__v": 0
    },
    {
        "_id": "63b33d006529cf9017236009",
        "title": "Advanced Computer Lab",
        "summary": "Website using MernStack",
        "defaultPrice": 3500,
        "price": 3500,
        "credithours": 4,
        "rating": 5,
        "taughtBy": "63b334c8ff19a5e63f57da35",
        "reviews": [],
        "link": "https://www.youtube.com/watch?v=jeNXbJq5o5g",
        "subtitles": [
            "63b33d836529cf9017236027",
            "63b33e246529cf9017236041",
            "63b33e8a6529cf9017236059",
            "63b33efb6529cf9017236073"
        ],
        "subject": "Computer Science",
        "subtitlesName": [
            "Mongodb",
            "Express JS",
            "Node JS",
            "React JS"
        ],
        "instructorName": "Instructor",
        "numberOfRates": 0,
        "numberOfEnrolled": 3,
        "createdAt": "2023-01-02T20:22:24.770Z",
        "updatedAt": "2023-01-03T09:55:45.905Z",
        "__v": 0
    }
]`


View Subtitle

`GET \viewSubtitle`

| query | Type | Description |
| --- | -- | --- |
| `subtitleId`| `String` | Required. Subtitle Id of Subtitle|

> Response

`
{
    "_id": "63b33b08ff19a5e63f57dac2",
    "name": "ER DIAGRAM",
    "credithour": "1",
    "videos": [
        "63b33a9dff19a5e63f57daad",
        "63b33ab0ff19a5e63f57daaf"
    ],
    "exams": "63b33ab1ff19a5e63f57dab1",
    "createdAt": "2023-01-02T20:14:00.020Z",
    "updatedAt": "2023-01-02T20:14:00.020Z",
    "__v": 0
}
`

Upload Link

`POST \uploadLink`

| Body | Type | Description |
| --- | -- | --- |
| `link`| `String` | Required. link of Video|
| `description`| `String` | Required. description of Video|
| `subtitle`| `String` | Required. name of Subtitle|


> Response

`
{
    "link": "https://www.youtube.com/watch?v=1FGFtyTkjZk",
    "description": "blabla",
    "subtitle": "ER DIAGRAM",
    "_id": "63b7d01bc52b3f70a3ac5554",
    "createdAt": "2023-01-06T07:39:07.039Z",
    "updatedAt": "2023-01-06T07:39:07.039Z",
    "__v": 0
}`


Set Discount

`POST \discount`

| Body | Type | Description |
| --- | -- | --- |
| `discount`| `String` | Required. Discount Amount|
| `startDate`| `String` | Required. startdate of Discount|
| `endDate`| `String` | Required. enddate of Discount|

| query | Type | Description |
| --- | -- | --- |
| `courseId`| `String` | Required. Id of Course|


> Response



`
{
        "_id": "63b3f462b0c2558949676139",
        "amount": 50,
        "startDate": "2023-01-03T19:11:54.000Z",
        "endDate": "2023-01-04T19:11:54.000Z",
        "course": "63b33a75ff19a5e63f57daa2",
        "createdAt": "2023-01-03T09:24:50.083Z",
        "updatedAt": "2023-01-03T09:24:50.083Z",
        "__v": 0
 }`
 
 IsTaught
 
 `GET \isTaught`
 
| Headers | Type | Description |
| --- | -- | --- |
| `Authorization`| `String` | Required. Bearer token of the User.|
 
| query | Type | Description |
| --- | -- | --- |
| `courseId`| `String` | Required. Id of Course|

> Response

`
{status:true}`


View Video

 `GET \viewVideo`


| query | Type | Description |
| --- | -- | --- |
| `subtitleId`| `String` | Required. Id of Subtitle|




> Response

` {
    "subtitle": {
        "_id": "63b33b08ff19a5e63f57dac2",
        "name": "ER DIAGRAM",
        "credithour": "1",
        "videos": [
            "63b33a9dff19a5e63f57daad",
            "63b33ab0ff19a5e63f57daaf"
        ],
        "exams": "63b33ab1ff19a5e63f57dab1",
        "createdAt": "2023-01-02T20:14:00.020Z",
        "updatedAt": "2023-01-02T20:14:00.020Z",
        "__v": 0
    },
    "results": [
        {
            "_id": "63b33a9dff19a5e63f57daad",
            "link": "https://www.youtube.com/watch?v=QpdhBUYk7Kk",
            "description": "Entity Relationship Diagram (ERD) Tutorial - Part 1",
            "subtitle": "ER DIAGRAM",
            "createdAt": "2023-01-02T20:12:13.217Z",
            "updatedAt": "2023-01-02T20:12:13.217Z",
            "__v": 0
        },
        {
            "_id": "63b33ab0ff19a5e63f57daaf",
            "link": "https://www.youtube.com/watch?v=-CuY5ADwn24",
            "description": "Entity Relationship Diagram (ERD) Tutorial - Part 2",
            "subtitle": "ER DIAGRAM",
            "createdAt": "2023-01-02T20:12:32.635Z",
            "updatedAt": "2023-01-02T20:12:32.635Z",
            "__v": 0
        }
    ]
} `
 
 
Get Progress

 `GET \getProgress`

| Headers | Type | Description |
| --- | -- | --- |
| `Authorization`| `String` | Required. Bearer token of the User.|
 
| query | Type | Description |
| --- | -- | --- |
| `courseId`| `String` | Required. Id of Course|

> Response

`
{
    "value": 33.33333333333334
}` 

Create Student Answer

 `POST \createStudentAnswer`

| Headers | Type | Description |
| --- | -- | --- |
| `Authorization`| `String` | Required. Bearer token of the User.|
 
| query | Type | Description |
| --- | -- | --- |
| `examId`| `String` | Required. Id of Exam|

> Response


`{
    "answers": [],
    "grade": 0,
    "exam": "63b33ab1ff19a5e63f57dab1",
    "user": "63b334c8ff19a5e63f57da35",
    "_id": "63b7dafb604a70cfd5108271",
    "createdAt": "2023-01-06T08:25:31.490Z",
    "updatedAt": "2023-01-06T08:25:31.490Z",
    "__v": 0
}`


Get Student Answer and Grade

 `GET \studentAnswers`


| Headers | Type | Description |
| --- | -- | --- |
| `Authorization`| `String` | Required. Bearer token of the User.|
 
| query | Type | Description |
| --- | -- | --- |
| `examId`| `String` | Required. Id of Exam|


> Response

`
{
    "_id": "63b406ddd5b944794c50da3e",
    "answers": [
        "10",
        "11",
        "12"
    ],
    "grade": 3,
    "exam": "63b3fe15d5b944794c50728f",
    "user": "63b401edd5b944794c50933b",
    "createdAt": "2023-01-03T10:43:41.651Z",
    "updatedAt": "2023-01-03T10:50:23.425Z",
    "__v": 0
}
`


Get Correct Answers

| Headers | Type | Description |
| --- | -- | --- |
| `Authorization`| `String` | Required. Bearer token of the User.|
 
| query | Type | Description |
| --- | -- | --- |
| `examId`| `String` | Required. Id of Exam|


> Response

`
{
    "_id": "63b3fe15d5b944794c50728f",
    "questions": [
        "63b3fe5ed5b944794c507291",
        "63b3fe66d5b944794c507295",
        "63b3fe73d5b944794c507299"
    ],
    "correctAnswers": [
        "10",
        "11",
        "12"
    ],
    "subtitle": "Subtitle1",
    "createdAt": "2023-01-03T10:06:13.849Z",
    "updatedAt": "2023-01-03T10:07:47.975Z",
    "__v": 0
}
`
## How to use

First as a guest you can search for any course and filter by price , subject or rating , then you can sign up as a Individual Trainee or if you're a already exists user you can login either as individual trainee , corporate trainee , instructor or admin

If you signed up as a individual trainee , you must accept the terms and policy then you can register for any course either by credit card or using your wallet then after registering each week you have a class you have to watch all videos and Write then download notes while watching videos to take the week exam , if you're under 50% progress you can refund , the admin then either would accept your request or not ,after completing the course you can download your certificate or send it via email. you can report problem whether the course by clicking on report , then you choose the type of problem , the admin would solve it , if not solved in time you send a follow up to it , individual trainee can change his password

If you logged in as a corporate trainee , you can enter the courses that you have access to only , if you don't have access you can request access , then the process inside is the same as the individual trainee except that you can't request a refund , corporate trainee can change his password


If you logged in as a instructor , if for the first time you must accept payment term and the contract , you can search and filter your courses according to their price and subject , you can create a course and define a discount for your courses , any new trainee registered for your course the course price is transferred into your wallet, if trainee refund then it would withdrawn from your wallet , you can report issue with the course , Instructor can change his password , edit his email and biography


If you logged in as admin , you can add admin , instructor , corporate trainee to database system , also you solve the problem mark it as solved or pending , you accept or reject the corporate trainee request according to its company / the individual trainee request of refund and also can set promotion for courses



## Contribute

If you have any suggestion or faced any issue please contract us at [Haneen Elzawawy](Haneen.elzawawy@student.guc.edu.eg)


## Credits

* [Mongoose Doc](https://mongoosejs.com/docs/)

* [NPM Doc](https://docs.npmjs.com/)

* [React Doc](https://beta.reactjs.org/)

* [Material UI Doc](https://mui.com/material-ui/getting-started/overview/)





























## Authors
- [Haneen Gamal](https://www.linkedin.com/in/haneen-gamal-aab883224/)
- [Noussa Amer](https://www.linkedin.com/in/noussa-mahmoud-9507aa245/)
- [Mohab Elansary](https://www.linkedin.com/in/mohab-elansary-959bb7233/)
- [Rania Saleh](https://www.linkedin.com/in/rania-saleh-60699221b/)
- [Farah Fouad](https://www.linkedin.com/in/farah-fouad-b22093245/)
