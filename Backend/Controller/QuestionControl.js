const router = require('express').Router();
let Question = require('../Models/Question');
let Exam = require('../Models/Exam');
const { default: mongoose } = require('mongoose');

//add a question for an exam and the answer choices

const createQuestion = async(req,res) => {
    const exam=mongoose.Types.ObjectId(req.query.exam);
    const ques = req.body.ques;
    const choice1 = req.body.choice1;
    const choice2 = req.body.choice2;
    const choice3 = req.body.choice3;
    const choice4 = req.body.choice4;
    const correctAnswer = req.body.correctAnswer;
    try{
        const question = await Question.create({exam,ques,choice1,choice2,choice3,choice4,correctAnswer});
        res.status(200).json(question)
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

    const getQuestion = async (req, res) => {
        const exam =mongoose.Types.ObjectId(req.query.exam);
        try{
            const questions = await Question.find({exam:exam}).select('ques choice1 choice2 choice3 choice4');
            res.status(200).json(questions)
        }catch(error){
            res.status(400).json({error:error.message})
    
        }
      } 

 const getQuestionAnswers = async(req,res) =>{
        const exam =mongoose.Types.ObjectId(req.query.exam);
        
        try{
            const questions = await Question.find({exam:exam}).select('ques correctAnswer');
            res.status(200).json(questions)
        }catch(error){
            res.status(400).json({error:error.message})
    
        }
      }
module.exports = {createQuestion,getQuestion,getQuestionAnswers};