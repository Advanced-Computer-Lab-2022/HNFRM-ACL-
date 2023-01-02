
# HNFRM 
HNFRM 
is an online learning system for the advanced computer lab 
The theme of the project, is to create an online learning system.
Hnfrm is a web application through which individuals can learn and register to different course,
Similar websites Coursera, Udemy.com.

Table of Contents
- Motivation
- Tools and Frameworks
- Coding Style
- Samples
- Screeshots
- Installation
- Features
- API References
   - Login
   - Log Out
   - View course
   - rate course 

## Motivation
This is the objectives of this project:

In the recent period there has been a huge demand of online learning platforms,
alot of students depend mainly on the online learning platforms,
thats why developers decided to do it 
this project is done using agile methodology 

## Build Status
users should not worry about  anything going wrong as this project is 
functining correctly.

## Coding Style
This project is divided into two main parts, frontend and backend.
Our backend is divide into controllers and models and there is a server page that contains all the Api.

## Tools and Frameworks
- This project is fully implemented using the MERN Stack. MERN stands for MongoDB, Express, React, Node.

- MongoDB is an open source NoSQL database management program. NoSQL is used as an alternative to traditional relational databases. NoSQL databases are quite useful for working with large sets of distributed data. MongoDB is a tool that can manage document-oriented information, store or retrieve information.
- Express is a Node. js web application server framework, designed for building single-page, multi-page, and hybrid web applications. It is the de facto standard server framework for node.
- ReactJS is an open-source JavaScript library that is used for building user interfaces specifically for single-page applications. It's used for handling the view layer for web and mobile apps. React also allows us to create reusable UI components.
- NodeJS is an open-source, cross-platform, back-end JavaScript runtime environment that runs on the V8 engine and executes JavaScript code outside a web browser.

## Features
Mainly this website provides an easy way to view and register to any course. 
Moreover, our website allows user to pay in order to register to the courses that want.
 
- More Features
   - User can write notes while watching the video 
   - User has freedom to chose how he will pay either(creditcard or using his wallet) 
   - User(Trainee) recieves a certificate as a pdf via mail once he finishs the course
   - user can see the most popular courses in the system along with the discounts applied on them

## Code Examples
- we use the MRC pattern(Module-Router-Controller)
- Here is an example of our schemas found in the models 
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


}, { timestamps: true });
const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
}

- Here is an example of method found in the controller part 

{

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
}}

- Here is an example on how we call it in the server.js 
{app.post('/createCourse',requireAuth,createCourse)}

- Here is an example of part of our front page as its so long we only 
took small part to show here 

{
    
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

}

## Screenshot
- Home page from individual prespective 
![image](https://user-images.githubusercontent.com/106152290/210184496-4342b0a8-86a8-4af3-838d-7938e55be531.png)
- Indivial sidebar 
![image](https://user-images.githubusercontent.com/106152290/210184534-02a2cad1-e724-48be-8c01-7bcf7d301cd4.png)

## Installation
In order to run our project, you should have the following installed in your machine:

-clone the file 
sh
$ git clone https://github.com/Advanced-Computer-Lab-2022/HNFRM-ACL-
- Node JS
make sure to install all the run this command in your Visual Studio Code terminal to install the latest version of npm
 - npm install npm@latest -g
 React JS or you can use NPM
 - Install NPM Packages in the frontend directory
sh
- $ cd frontend
- $ npm install
- MongoDB either locally or on a cloud. You have to create .env with the dbconnectionString.

## How to Use?
After installing everything you have to open 2 terminals so that you can
run the website correctly 
1) First terminal used for the backend is run through command 
`nodemon app`
sh
- $ cd src
- $ nodemon server 

2) Direct the second terminal to the root of the frontend directory, then run the command `npm start`
sh
- $ cd frontend
- $ npm start

Now you can access the website at `http://localhost:3000`

- All users are automatically directed to the start page 
- As a guest he will view the website but wont be allowed to register to any course so he has to sign in by email and a password and fill in rest of needed information
- As an trainee he can sign in using his email and password and register to any course 
- As an admin he can log in using email and password


## API reference
Our backend is divided into the following routes,
each route has a set of APIs with different functionalities.
Login
1) Login

- Route /login/
- Request Type POST
- Request Body
{

    "username":"haneen1",
    "password": "1234"

}
- Response Body
{
   {
      "auth": true,

      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYjA5NGNmY2I2ZjBhZGI3ZWI3ZTFhNSIsImlhdCI6MTY3MjYwOTkxNywiZXhwIjoxNjcyODY5MTE3fQ.30oXcBa6jVE2B-pSutsPqjHvDZfXvGxmwwTmk3kWFK4",
     
      "result": {
        "_id": "63b094cfcb6f0adb7eb7e1a5",
        "username": "Haneen1",
        "password": "$2b$10$ZkYlAO3cTwzumqrRXB7xSuoP3BxABLMrfmid5ivzYTI5OupJLGaPC",
        "type": "Admin",
        "reviews": [],
        "registeredCourses": [],
        "createdAt": "2022-12-31T20:00:15.414Z",
        "updatedAt": "2022-12-31T20:00:15.414Z",
        "__v": 0
    }
}
}
2) Logout

- Route /logout/
- Request Type Get
- Response Body
{

    "logged Out "

}
3) view course 

- Route /course/
- Request Type Get
- Response Body
{

    "course": {
        "_id": "63b095db52b47810343520b8",
        "title": "Embedded Systems",
        "summary": "BLABLABLA",
        "defaultPrice": 4000,
        "price": 548720,
        "credithours": 4,
        "rating": 3.5,
        "taughtBy": "63b13355686ed0e66c6bb85c",
        "reviews": [],
        "link": "https://www.youtube.com/watch?v=9AZghsVgNvs",
        "subtitles": [
            "63b0974b52b47810343520e1"
        ],
        "subject": "Data Science",
        "subtitlesName": [],
        "instructorName": "Haneen12",
        "numberOfRates": 2,
        "numberOfEnrolled": 6,
        "createdAt": "2022-12-31T20:04:43.025Z",
        "updatedAt": "2023-01-01T21:15:22.167Z",
        "__v": 0
    },
    "discount": {
        "_id": "63b0b392d3a254c7d5d599f6",
        "amount": 70,
        "startDate": "2022-12-30T19:11:54.000Z",
        "endDate": "2023-01-03T19:11:54.000Z",
        "course": "63b095db52b47810343520b8",
        "createdAt": "2022-12-31T22:11:30.779Z",
        "updatedAt": "2022-12-31T22:11:30.779Z",
        "__v": 0
    }
}
3) rate course 

- Route /ratecourse/
- Request Type PATCH
- Response Body
{

    "_id": "63b095db52b47810343520b8",
    "title": "Embedded Systems",
    "summary": "BLABLABLA",
    "defaultPrice": 4000,
    "price": 548720,
    "credithours": 4,
    "rating": 1.8333333333333333,
    "taughtBy": "63b13355686ed0e66c6bb85c",
    "reviews": [],
    "link": "https://www.youtube.com/watch?v=9AZghsVgNvs",
    "subtitles": [
        "63b0974b52b47810343520e1"
    ],
    "subject": "Data Science",
    "subtitlesName": [],
    "instructorName": "Haneen12",
    "numberOfRates": 3,
    "numberOfEnrolled": 6,
    "createdAt": "2022-12-31T20:04:43.025Z",
    "updatedAt": "2023-01-01T22:18:35.794Z",
    "__v": 0
}

## Credits

- [Stack Overflow](https://stackoverflow.com/)
- [GeeksForGeeks](https://www.geeksforgeeks.org/)

- [Material UI](https://mui.com/)
- [React](https://reactjs.org/)
- [Axios](https://axios-http.com/)
- [NPM](https://www.npmjs.com/)
- [Mongoose](https://mongoosejs.com/)


## Authors
- [Haneen Gamal](https://www.linkedin.com/in/haneen-gamal-aab883224/)
- [Noussa Amer](https://www.linkedin.com/in/noussa-mahmoud-9507aa245/)
- [Mohab Elansary](https://www.linkedin.com/in/mohab-elansary-959bb7233/)
- [Rania Saleh](https://www.linkedin.com/in/rania-saleh-60699221b/)
- [Farah Fouad](https://www.linkedin.com/in/farah-fouad-b22093245/)
