const router = require('express').Router();
let Exam = require('../Models/Exam');
const { default: mongoose } = require('mongoose');

//create an exam  of a course 
const createExam = async(req,res) => {
    const name=req.body.name;
    const course=mongoose.Types.ObjectId.apply(req.query.course);
   try{
    const exam = await Exam.create({name,course});
    res.status(200).json(exam)
}catch(error){
    res.status(400).json({error:error.message})

}
}
module.exports = {createExam};