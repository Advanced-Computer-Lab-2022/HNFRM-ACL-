const router = require('express').Router()
let Exam = require('../Models/Exam')
let Question = require('../Models/Question')
let User= require('../Models/User');
const StudentAnswer = require('../Models/StudentAnswer')
const { default: mongoose } = require('mongoose');
const jwt = require('jsonwebtoken');


//create a multiple choice exam with 4 choices per question (Req 26) Post
const createExam = async(req,res) => {
   const subtitle = req.body.subtitle;
   try{
    const exam = await Exam.create({subtitle});
    res.status(200).json(exam)
}catch(error){
    res.status(400).json({error:error.message})

}
}


//set the answers (Req 27) post
const createQuestion = async(req,res) =>{
    const examId= mongoose.Types.ObjectId(req.query.examId);
    try{
        const question = req.body.question
        const choices = req.body.choices
        const correctAnswer = req.body.correctAnswer
        const result = await Question.create({examId,question,choices,correctAnswer});
        const examRes = await Exam.findById(examId).select('questions correctAnswers')
        const questions = examRes.questions;
        const correctAnswers = examRes.correctAnswers
        questions[questions.length] = result._id
        correctAnswers[correctAnswers.length] = correctAnswer
        try{
            const resi = await Exam.findByIdAndUpdate({_id:examId},{questions:questions,correctAnswers:correctAnswers})
            res.status(200).json(resi)
        }catch(error){
            res.status(400).json({error:error.message})
        }
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
}


//solve a multiple choice exercise by choosing the correct answer (Req 35) get
const viewExam = async (req, res) => {
    //const subtitle =req.query.subtitle;
    const examId= mongoose.Types.ObjectId(req.query.examId);
    try{
        const exam = await Exam.findOne({_id:examId});
        let questions = exam.questions;
        let result =[]
        for(let i=0;i<questions.length;i++){
            result[i]= await Question.findById({_id:questions[i]}) 
        }
        //const questions = await Question.findById({exam:id})
        res.status(200).json(result)
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
}


//submit the answers to the exercise after completing it (Req 36) post
const createStudentAnswer = async(req,res) =>{
    const examId=mongoose.Types.ObjectId(req.query.examId);
    const token = req.headers['token']
    const decodedToken = jwt.verify(token, "supersecret");
    //const decodedToken = '63b0c5f4035969ab0bb5912a'; 
    const userId = mongoose.Types.ObjectId(decodedToken)
    try{
        let grade=0;
        const studentAnswer = await StudentAnswer.create({answers:[],grade:grade,exam:examId,user:userId});
        res.status(200).json(studentAnswer)
    } 
    catch(error){
        res.status(400).json({error:error.message})
    }
}


//patch
const addToStudentAnswers = async(req,res) =>{
    const examId=mongoose.Types.ObjectId(req.query.examId);
    const token = req.headers['token']
    const decodedToken = jwt.verify(token, "supersecret") 
    const userId = mongoose.Types.ObjectId(decodedToken)
    const answer = req.body.answer
    const student = await StudentAnswer.findOne({examId:examId,userId:userId})
    const studentAnswers = student.answers
    const id =  student._id

    try{
        studentAnswers[studentAnswers.length] = answer;
        const result = await StudentAnswer.findByIdAndUpdate(id,{answers:studentAnswers},{new:true})

        res.status(400).json(result)

    }catch(error){
        res.status(400).json({error:error.message})
    }
}


//Patch
const checkAnswers = async(req,res) =>{
    const examId=mongoose.Types.ObjectId(req.query.examId);
    const token = req.headers['token']
    const decodedToken = jwt.verify(token, "supersecret");  
    const userId = mongoose.Types.ObjectId(decodedToken)
    const exams= await Exam.findOne({_id:examId}).select('correctAnswers')
    const correctAnswers = exams.correctAnswers;

    const studentAnswer = await StudentAnswer.findOne({examId:examId,userId:userId});
    const studentAnswers = studentAnswer.answers;
    var grade= studentAnswer.grade;
    const id = studentAnswer._id;

    try{
        for(let i=0;i<correctAnswers.length;i++){
            if(correctAnswers[i]==studentAnswers[i]){
                grade++;
            }
                
        }
        const update = await StudentAnswer.findByIdAndUpdate(id,{grade:grade},{new:true});

        res.status(200).json(update)

    }
    catch(error){
        res.status(400).json({error:error.message})
    }
    


}


//view his/her grade from the exercise (Req 37) get
const studentAnswer= async(req,res) =>{
    const examId=mongoose.Types.ObjectId(req.query.examId);
    const token = req.headers['token']
    const decodedToken = jwt.verify(token, "supersecret");  
    const userId = mongoose.Types.ObjectId(decodedToken)
    try{
        const result = await StudentAnswer.findOne({exam:examId,user:userId});
        res.status(200).json(result)
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
     
}


// view the questions with the correct solution to view the incorrect answers (Req 38) get
const correctAnswers = async(req,res) =>{
    const examId=mongoose.Types.ObjectId(req.query.examId);
    try{
        const result = await Exam.findOne(examId);
        res.status(200).json(result)
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
}


module.exports = {createExam,createQuestion,viewExam,createStudentAnswer,addToStudentAnswers,checkAnswers,studentAnswer,correctAnswers};