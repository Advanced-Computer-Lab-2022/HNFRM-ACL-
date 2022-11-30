const router = require('express').Router();
let Instructor = require('../Models/Instructor');

//add instructors and create their usernames and passwords 'Admin'

const createInstuctor = async(req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    try{
        const admin = await Instructor.create({username, password});
        res.status(200).json(admin)
    }catch(error){
        res.status(400).json({error:error.message})

    }
}
//rate of an instructor
const rateInstructor = async(req,res) => {
    const instructorId=req.query.instructorId;
    if(instructorId){
        const rating=Number(req.body.rating);
        const instructor = await Instructor.findByIdAndUpdate(instructorId,{rating:rating});
        res.status(200).json(instructor)  
    }else{
    res.status(400).json({error:"Instructor Id is not found"})
} 
}
module.exports = {createInstuctor,rateInstructor};