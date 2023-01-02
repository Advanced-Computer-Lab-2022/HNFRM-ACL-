const router = require('express').Router();
let User = require('../Models/User');
let Problem = require('../Models/Problem');
let Request = require('../Models/Request');
const { default: mongoose } = require('mongoose');
const express = require("express");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const CC = require('currency-converter-lt');
const Course = require('../Models/Course');
const nodemailer = require ('nodemailer');
const PDFDcoument = require("pdfkit");
let currencyConverter = new CC()

//Token 
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, 'supersecret', {
        expiresIn: maxAge
    });
};

//Login (Req 1) Post
const login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username});
    if (await bcrypt.compare(password, user.password)){
            const token = createToken(user._id);
            res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
            res.status(200).json({auth:true , token:token , result:user})
        } else {
            res.json({auth:false , message:"wrong password"})  
        }
}


//Check whether logged or not (Auth) Get
const isLogin = async(req,res) =>{
    const token = req.headers['token']
    const decodedToken = jwt.verify(token, "supersecret"); 
    const userId = mongoose.Types.ObjectId(decodedToken)
    const user = await User.findOne({ _id: userId});
    res.json(user);
}


//Log Out (Req 2) Post
const logout = async (req, res) => {
    try{
        res.cookie('jwt', "", { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json("Logged Out")
    }
    catch(error){
        res.status(400).json({ error: error.message })
    }
}


// SignUp as Individual (Req 3) Post
const createIndividualTrainee = async(req,res) =>{
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const gender = req.body.gender;
    const policy = "false";
    const type="Individual Trainee"
    const defaultWallet=0;
    const wallet = defaultWallet;
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const individualTrainee = await User.create({username, email , password:hashedPassword ,firstName,lastName,gender,type,policy,defaultWallet,wallet})
        const token = createToken(individualTrainee._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
        res.status(200).json({auth:true , token:token , result:individualTrainee})
    }catch(error){
        res.status(400).json({error:error.message})

    }

}


// Policy [Instructor/Individual] (Req 4) Patch
const policy = async(req,res)=> {
    const token = req.headers['token']
    const decodedToken = jwt.verify(token, "supersecret");  
    const userId = mongoose.Types.ObjectId(decodedToken)
    const accept = req.body.accept
    const inst =await User.findByIdAndUpdate({_id: userId},{policy:accept},{new:true})
    res.status(200).json(inst);
}

// Contract [Instructor] (Req 5) Patch
const contract = async(req,res)=> {
    //const instructorId = mongoose.Types.ObjectId(req.query.instructorId)
    const token = req.headers['token']
    const decodedToken = jwt.verify(token, "supersecret");  
    const userId = mongoose.Types.ObjectId(decodedToken)
    const accept = req.body.accept;
    const inst =await User.findByIdAndUpdate({_id: userId},{contract:accept},{new:true})
    res.status(200).json(inst);
}


//Change price accounding to country (Req 6) Patch
const changePrice = async(req,res) =>{
    const change = req.body.change;
    
    const courses  = await Course.find({});
    const users  = await User.find({});

    try{
        for(let i =0 ; i<courses.length ; i++){
            let price;
            await currencyConverter.from("USD").to(change).amount(courses[i].defaultPrice).convert().then((response) => {
                price=response
                })
                let courseId= courses[i]._id
                let result =  await Course.findByIdAndUpdate({_id:courseId},{price:price},{new:true})
           }
        for(let i=0 ; i<users.length ;i++){
            let price;
            await currencyConverter.from("USD").to(change).amount(users[i].defaultWallet).convert().then((response) => {
                wallet=response
                })
                let userId= users[i]._id
                let result =  await User.findByIdAndUpdate({_id:userId},{wallet:wallet},{new:true})

        }   
           res.status(200).json({status:true})
    }catch(error){
           res.status(400).json({error:error.message})
    }
}


//Write Review for instructor "Additional Req"  Patch
const writeReviewInstructor = async(req,res) =>{
    const review = req.body.review;
    const instructorId = mongoose.Types.ObjectId(req.query.instructorId);
    const ins = await User.findOne({_id:instructorId})
    let reviews = ins.reviews
    try{
        reviews[reviews.length] = review;
        const result = await User.findByIdAndUpdate(instructorId,{reviews:reviews},{new:true})
        res.status(400).json(result)
    }catch(error){
        res.status(400).json({error:error.message})
    }
}


//Edit Instructor email and biography (Req 29) Patch
const editInstructor = async(req,res) =>{
    const token = req.headers['token']
    const decodedToken = jwt.verify(token, "supersecret");  
    const instructorId = mongoose.Types.ObjectId(decodedToken)
    const email = req.body.email;
    const biography = req.body.biography
    try{
        const instructor = await User.findByIdAndUpdate(instructorId,{email:email,biography:biography},{new:true});
        res.status(200).json(instructor)
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
}


//Change password (Req 31) Patch
const changePassword = async(req,res) =>{
    const username = req.body.username;
    const salt = await bcrypt.genSalt(10);
    const newpassword = await bcrypt.hash(req.body.password,salt);
    try{
        const result = await User.findOneAndUpdate({username:username},{password:newpassword},{new:true})
        res.status(200).json(result)
    }catch(error){
        res.status(400).json({error: error.message});
    }
}


//Receive Email for password (Req 32) Post
const resetPassword = async (req,res)=>{
    const Email = req.body.email;
    
    await User.findOne({email: Email}).then(async (result)=>{
    const neew = "updated123";
    const salt = await bcrypt.genSalt(10);
    const newpassword = await bcrypt.hash(neew,salt);

    await User.findByIdAndUpdate(result._id,{password:newpassword}).then((result)=>{
        const mail = {
            from: process.env.AUTH_EMAIL,
            to: Email,
            subject: "Password Reset",
            html: `<p> As you want to reset your password ?.</p>
                 <p> Here's your new password <strong> ${neew} </strong> Never share it with your friends</p>`
        }
    
        let transporter = nodemailer.createTransport({
            service: 'hotmail',
            auth: {
                user: process.env.AUTH_EMAIL,
                pass: process.env.AUTH_PASS
            }
        })
    
        transporter.sendMail(mail).then((result)=>{
            return res.status(200).json({status:true})
        }).catch((error) => {
            //Error while sending email 
            return res.status(400).json({status:false,error:error.message ,Message:"Error while sending an email"})
        })
    }).catch((error)=>{
           //Error while updating the password
        return res.status(400).json({status:false ,error:error.message ,Message:"Error while updating the password"})
    })
    }).catch((error)=>{
           //This Email is not found or undefined
        return res.status(400).json({status:false ,error:error.message ,Message:"this Email is not found or undefined"})
    });

}


//Trainee rate the instructor (Req 33) Patch
const rateInstructor = async(req,res) => {
    const instructorId=mongoose.Types.ObjectId(req.query.instructorId);
    try{
        const rating=Number(req.body.rating);
        const user = await User.findOne({_id:instructorId})
        const rates = Number(user.numberofRates + 1)
        const courseRating = user.rating;
        const averageRate = Number(Number((courseRating + rating)) / rates);
        const result = await User.findByIdAndUpdate(instructorId,{rating:averageRate,numberOfRates:rates},{new:true});
        res.status(200).json(result)
    }catch(error){
        res.status(400).json({error:error.message})
    }
}


//View  previously repoted problems (Req 48) Get
const viewpreviouslyRepotedProblems = async (req, res) => {
    const token=req.headers['token']
    const decodedToken=jwt.verify(token,"supersecret");
    const userId  = mongoose.Types.ObjectId(decodedToken);
    try{
        const problems = await Problem.find({user:userId})
        res.status(200).json(problems)
    }catch(error){
        res.status(400).json({error:error.message})

    }
}


//follow up on an unresolved problem (Req 49) Patch
const requestFollowUp = async (req, res) => {
    //const token=req.headers['token']
    ///const decodedToken=jwt.verify(token,"supersecret");
    //const userId = mongoose.Types.ObjectId(decodedToken);
    const problemId=mongoose.Types.ObjectId(req.body.problem);;
    const followUp=req.body.followup;
    const Problems= await Problem.findById(problemId).select('followUp')
    const followUps = Problems.followUp;
    try{
        followUps[followUps.length] = followUp
        const problem = await Problem.findByIdAndUpdate(problemId,{followUp:followUps},{new:true});
        res.status(200).json(problem)
    }catch(error){
        res.status(400).json({error:error.message})

    }
}


//View reported problems (Req 51) Get
const viewReportedProblems = async (req, res) => {
    try{
        const problems = await Problem.find({"$or":[
            {status:'pending'}, 
            {status:'unsolved'}
        ]
        })
        res.status(200).json(problems)
    }catch(error){
        res.status(400).json({error:error.message})

    }
}


//Mark reported problems (Req 52) Patch
const solveProblem = async(req,res) =>{
    const problemId=mongoose.Types.ObjectId(req.body.problem)
    const status=req.body.status;
    try{
        const problem = await Problem.findByIdAndUpdate(problemId,{status:status},{new:true});
        res.status(200).json(problem)
    }catch(error){
        res.status(400).json({error:error.message})

    }
}


//Refund to Trainee (Req 53) Patch
const refund = async(req,res) =>{
    
    const requestId = mongoose.Types.ObjectId(req.query.requestId)
    const request = await Request.findOne({_id:requestId})
    const state = req.body.state;
    const userId= request.user;
    const courseId = request.course;
    const course = await Course.findOne({_id:courseId})
    const price= course.price
    const instructorId = course.taughtBy
    const user = await User.findOne({_id:userId})
    const userwallet = user.wallet
    const instructor = await User.findOne({_id:instructorId})
    const instructorwallet = instructor.wallet
    if(state=='accepted'){
        try{
            const newWalletU = price + userwallet;
            const newWalletI = price + instructorwallet
            const user = await User.findByIdAndUpdate(userId,{wallet:newWalletU},{new:true})
            const user2 = await User.findByIdAndUpdate(instructorId,{wallet:newWalletI},{new:true})
            const req = await Request.deleteOne({_id:requestId})
            res.status(200).json(user)
        }
        catch(error){
            res.status(400).json({error:error.message})
        }

    }
    else{
        const req = await Request.deleteOne({_id:requestId})
    }
    
    
    
}


//Get
const viewRefundRequest = async(req,res) =>{
    try{
        const requests = await Request.find({accepted:'false' , type:'refund'})
        res.status(200).json(requests)
    }catch(error){
        res.status(400).json({error:error.message})

    }
}


// Add Admin (Req 55) Post
const createAdmin = async(req,res) => {
    const username = req.body.username;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const type = "Admin"
    const email ="haneengamall111@gmail.com"
    try{
        const admin = await User.create({username, password:hashedPassword , type,email});
        res.status(200).json(admin)
    }catch(error){
        res.status(400).json({error:error.message})

    }
}

//Add Instructor (Req 56) Post
const createInstructor = async(req,res) => {
    const username = req.body.username;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const biography = ""
    const rating ="5"
    const loggedFirst = 'false'
    const contract = "false"
    const type ="Instructor"
    const policy ="false"
    const defaultWallet =0;
    const wallet = defaultWallet
    const numberOfRates = 0;
    const email='haneengamall111@gmail.com'
    try{
        const instructor = await User.create({username, password:hashedPassword,email,biography,rating,loggedFirst,contract,type,policy,wallet,defaultWallet,numberOfRates,email});
        res.status(200).json(instructor)
    }catch(error){
        res.status(400).json({error:error.message})

    }
}


// Add Corporate Trainee (Req 57) Post
const createCorporateTrainee = async(req,res) => {
    const username = req.body.username;
    const company = req.body.company;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const type ="Corporate Trainee"
    const email ="haneengamall111@gmail.com"
    try{
        const corporateTrainee = await User.create({username, password:hashedPassword,type,company,email});
        res.status(200).json(corporateTrainee)
    }catch(error){
        res.status(400).json({error:error.message})

    }
}


//view course requests (Req 58) Get
const viewCoursesRequest = async(req,res) =>{
    try{
        const requests = await Request.find({accepted:'false' , type:'access'})
        res.status(200).json(requests)
    }catch(error){
        res.status(400).json({error:error.message})

    }
}



//grant corporate trainees access  Patch
const grant = async(req,res) =>{ 

    const requestId = mongoose.Types.ObjectId(req.query.requestId);
    const request = await Request.findOne({_id:requestId})
    const state = req.body.state;
    const userId= request.user;
    const courseId = request.course;
    const course = await Course.findOne({_id:courseId})
    var numberOfEnrolled = course.numberOfEnrolled
    if(state=='accepted'){
        try{
            const user = await User.findOne({_id:userId});
            const array = user.registeredCourses;
            array[array.length] = courseId;
            const result = await User.findByIdAndUpdate(userId,{registeredCourses:array},{new:true});
            const course = await Course.findByIdAndUpdate(courseId,{numberOfEnrolled : numberOfEnrolled+1},{new:true})
            const req = await Request.deleteOne({_id:requestId})
            res.status(200).json(result)
        }catch(error){
            res.status(400).json({error:error.message})
        }

    }
    else{
        const req = await Request.deleteOne({_id:requestId})
    }
     
    
    
}


// View Instructor Info "Additional Req"  Get
const viewInstructor =async(req,res) =>{
    const token=req.headers['token']
    const decodedToken = jwt.verify(token, "supersecret");  
    const userId = mongoose.Types.ObjectId(decodedToken)
    try{
        const instructor = await User.findOne({_id:userId});
        res.status(200).json(instructor)
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
    
}



const trainee = async(req,res) =>{
    //const userId = mongoose.Types.ObjectId(req.query.userId)
    const instructorId=mongoose.Types.ObjectId(req.query.userId);
    console.log(instructorId)
    try{
        const instructor = await User.findOne({_id:instructorId})

        //console.log(instructor)
        res.status(200).json(instructor)
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
}


//module.exports = {login,createAdmin,createInstructor,createCorporateTrainee,viewInstructor,editInstructor,rateInstructor,createIndividualTrainee,viewGradeCorporate,viewGradeIndividual,changePassword,resetPassword,contract,policy,isLogin,logout,change};
module.exports = {login,isLogin,logout,createIndividualTrainee,policy,contract,changePrice,writeReviewInstructor,editInstructor,changePassword,resetPassword,rateInstructor,viewpreviouslyRepotedProblems,requestFollowUp,viewReportedProblems,solveProblem,refund,viewRefundRequest,createAdmin,createInstructor,createCorporateTrainee,viewCoursesRequest,grant,viewInstructor,trainee}