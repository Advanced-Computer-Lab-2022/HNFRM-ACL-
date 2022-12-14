const router = require('express').Router();
let User = require('../Models/User');
const { default: mongoose } = require('mongoose');
const express = require("express");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');


//Token 
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, 'supersecret', {
        expiresIn: maxAge
    });
};

//Login 
const login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username});
    if (await bcrypt.compare(password, user.password)){
            const token = createToken(user._id);
            res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
            res.status(200).json(user)
        } else {
            res.send("not logged ")  
        }
}


// Add Admin 
const createAdmin = async(req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    const type = "Admin"
    try{
        const admin = await User.create({username, password , type});
        res.status(200).json(admin)
    }catch(error){
        res.status(400).json({error:error.message})

    }
}

//Add Instructor
const createInstructor = async(req,res) => {
    const username = req.body.username;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const email ="";
    const biography = ""
    const rating ="5"
    const reviews=["Great Prof","Best Prof","Prof Zebalas"];
    const contract = "false"
    const type ="Instructor"
    const policy ="false"
    try{
        const instructor = await User.create({username, password:hashedPassword,email,biography,rating,reviews,contract,type,policy});
        res.status(200).json(instructor)
    }catch(error){
        res.status(400).json({error:error.message})

    }
}


// Add Corporate Trainee
const createCorporateTrainee = async(req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    const type ="Corporate Trainee"
    try{
        const corporateTrainee = await User.create({username, password,type});
        res.status(200).json(corporateTrainee)
    }catch(error){
        res.status(400).json({error:error.message})

    }
}

// Add Individual Trainee  Using SignUp
const createIndividualTrainee = async(req,res) =>{
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const gender = req.body.gender;
    const type="Individual Trainee"
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const individualTrainee = await User.create({username, email , password:hashedPassword ,firstName,lastName,gender,type})
        const token = createToken(individualTrainee.username);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
        res.status(200).json(individualTrainee)
    }catch(error){
        res.status(400).json({error:error.message})

    }

}

//Log Out
const logout = async (req, res) => {
    try{
        res.cookie('jwt', "", { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json("Logged Out")
    }
    catch(error){
        res.status(400).json({ error: error.message })
    }
}

// Edit Instructor email and biography
const editInstructor = async(req,res) =>{
    const token = req.cookies.jwt;
    const decodedToken = jwt.verify(token, "supersecret");  
    const instructorId = mongoose.Types.ObjectId(decodedToken)
    const {email,biography} = req.body;
    try{
        const instructor = await User.findByIdAndUpdate({_id:instructorId},{email,biography},{new:true});
        res.status(200).json(instructor)
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
}

// View Instructor Info
const viewInstructor =async(req,res) =>{
    const token = req.cookies.jwt;
    const decodedToken = jwt.verify(token, "supersecret");  
    const instructorId = mongoose.Types.ObjectId(decodedToken)
    try{
        const instructor = await User.findOne({_id:instructorId});
        res.status(200).json(instructor)
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
    
}

// Trainee rate instructor
const rateInstructor = async(req,res) => {
    const token = req.cookies.jwt;
    const decodedToken = jwt.verify(token, "supersecret");  
    const instructorId = mongoose.Types.ObjectId(decodedToken)
    try{
        const rating=Number(req.body.rating);
        const instructor = await User.findByIdAndUpdate({_id:instructorId},{rating:rating});
        res.status(200).json(instructor)  
    }catch(error){
    res.status(400).json({error:error.message})
} 
}

// View grade of corporate trainee
const viewGradeCorporate = async (req, res) => {
    const {corporateTrainee, exam } = req.query;
    try{
        let corpgrades = await User.findById(corporateTrainee).find({}).select('grade').sort({ createdAt: -1 })
        let grades=corpgrades[0].grade;
         let index=0;
         let yourgrade=0;
    for (index=0;index<grades.length;index++) {
        if (grades[index].exam.equals(exam)) {
            yourgrade=grades[index].value;
             break;
        }
    }
    res.status(200).json({yourgrade})
}
    catch (error){
    res.status(400).json({error:error.message})
}
}

//View Grade of Individual Trainee
const viewGradeIndividual = async (req, res) => {
    const { individualTrainee, exam } = req.query;
    try{
        let corpgrades = await User.findById(individualTrainee).find({}).select('grade').sort({ createdAt: -1 })
        let grades = corpgrades[0].grade;
        let index=0;
        let yourgrade=0;
   for (index=0;index<grades.length;index++) {
       if (grades[index].exam.equals(exam)) {
           yourgrade=grades[index].value;
            break;
       }
   }
   res.status(200).json({yourgrade})
}
   catch (error){
   res.status(400).json({error:error.message})
}
}


//Change password 

const changePassword = async(req,res) =>{
    const username = req.body.username;
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password,salt);
    try{
        const user = await User.findOneAndUpdate({username:username},{password},{new:true})
        res.status(200).json(user);
    }catch(error){
        res.status(400).json({status:false, error: error.message});
    }
}


const resetPassword = async (req,res)=>{
    const email = req.body.email;
    await User.find({email: email}).then(async (result)=>{
    const neew = "1234_12345";
    await User.findByIdAndUpdate(result._id,{password:neew}).then((result)=>{
        const mail = {
            from: process.env.AUTH_EMAIL,
            to: Email,
            subject: "Password Reset",
            html: `<p>Nset elpassword yghaby ?.</p>
                 <p>khod el password da mashy nafsak beh <strong> ${neew} </strong> w mtdhosh lhad <3.</p>`
        }
    
        let transporter = nodemailer.createTransport({
            service: 'hotmail',
            auth: {
                user: process.env.AUTH_EMAIL,
                pass: process.env.AUTH_PASS
            }
        })
    
        transporter.sendMail(mail).then((result)=>{
            return res.status(200).json({status:true,Message:"eldnya zy elfol"})
        }).catch((error) => {
            return res.status(400).json({status:false, error:error.message ,Message:"Error while sending an email"})
        })
    }).catch((error)=>{
        return res.status(400).json({status:false, error:error.message,Message:"Error while updating the password"})
    })
    }).catch((error)=>{
        return res.status(400).json({status:false, error:error .message,Message:"this Email is not found or undefined"})
    });

}

const contract = async(req,res)=> {
    const instructorId = mongoose.Types.ObjectId(req.query.instructorId)
    const accept = "true";
    const inst =await User.findByIdAndUpdate({_id: instructorId},{contract:accept},{new:true})
    res.status(200).json(inst);
}

const policy = async(req,res)=> {
    const token = req.cookies.jwt;
    const decodedToken = jwt.verify(token, "supersecret");  
    const userId = mongoose.Types.ObjectId(decodedToken)
    const accept = "true";
    const inst =await User.findByIdAndUpdate({_id: userId},{policy:accept},{new:true})
    res.status(200).json(inst);
}




module.exports = {login,createAdmin,createInstructor,createCorporateTrainee,viewInstructor,editInstructor,rateInstructor,createIndividualTrainee,viewGradeCorporate,viewGradeIndividual,changePassword,resetPassword,contract,policy};