const router = require('express').Router()
let Exam = require('../Models/Exam')
let Question = require('../Models/Question')
let Answer = require('../Models/Answer')
let Grade = require('../Models/Grade')
let Course = require('../Models/Course')
let IndividualTrainee = require('../Models/IndividualTrainee');
let CorporateTrainee = require('../Models/CorporateTrainee');
const { default: mongoose } = require('mongoose');

const createExam = async(req,res) => {
    const name=req.body.name;
    const course=mongoose.Types.ObjectId(req.query.courseId);
   try{
    const exam = await Exam.create({name,course});
    res.status(200).json(exam)
}catch(error){
    res.status(400).json({error:error.message})

}
}

const createQuestion = async(req,res) => {
    const exam=mongoose.Types.ObjectId(req.query.examId);
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
    const exam =mongoose.Types.ObjectId(req.query.examId);
    try{
        const questions = await Question.find({exam:exam}).select('ques choice1 choice2 choice3 choice4');
        res.status(200).json(questions)
    }catch(error){
        res.status(400).json({error:error.message})
    
    }
} 

const getQuestionAnswers = async(req,res) =>{
    const exam =mongoose.Types.ObjectId(req.query.examId);
    try{
        const questions = await Question.find({exam:exam}).select('ques correctAnswer');
        res.status(200).json(questions)
    }catch(error){
        res.status(400).json({error:error.message})
    
    }
}
const createAnswer = async (req, res) => {
    const question = mongoose.Types.ObjectId(req.query.question);
    const corporateTrainee = mongoose.Types.ObjectId(req.query.corporateTrainee);
    const individualTrainee = mongoose.Types.ObjectId(req.query.individualTrainee);
    const studentAnswer = req.body.studentAnswer;
    if (corporateTrainee) {
        const answer = await Answer.create({ question, corporateTrainee, studentAnswer });

        res.status(200).json(answer)
    }
    else if (individualTrainee != null) {
        const answer = await Answer.create({ question, individualTrainee, studentAnswer });
        res.status(200).json(answer)
    }
    else {
        res.status(400).json({ error: error.message })
    }
}

const checkAnswer = async (req, res) => {
    const { corporateTrainee, question, individualTrainee } = req.query;
    const studentAnswer = req.body.studentAnswer;

    //get the exam ID
    const { exam } = await Question.findById(question).select('exam');
    console.log(exam)
    //correct answer
    let { correctAnswer } = await Question.findById(question).select('correctAnswer');
    //console.log(correctAnswer)

    if (corporateTrainee) {
        const answer = await Answer.create({ question, corporateTrainee, studentAnswer });
        res.status(200).json(answer)
            let corpgrades = await CorporateTrainee.findById(req.query.corporateTrainee).find({}).select('grade').sort({ createdAt: -1 })
            let grades = corpgrades[0].grade;

        if (studentAnswer == correctAnswer) {
            // console.log(grades)
            let index = 0;
            for (index = 0; index < grades.length; index++) {
                // console.log("ana hna")
                console.log(grades[index].exam + " exam index")
                //console.log(exam)
                if (grades[index].exam.equals(exam)) {
                    console.log("ana hna aho")
                    grades[index].value = (grades[index].value) + 1;
                    break;
                }
            }
            if (index == grades.length) {
                const newgrade = {
                    value: 1,
                    exam: exam
                }
                grades.push(newgrade);
                // console.log(grades.length)
            }
            const corporateTrainee = await CorporateTrainee.findByIdAndUpdate(req.query.corporateTrainee, { grade: grades });
        }

        else {
            console.log("ana msh hna")
            let index = 0
            for (index = 0; index < grades.length; index++) {
                console.log("ana msh hna")
                if (grades[index].exam.equals(exam)) {
                    break;
                }
            }
            if (index == grades.length) {
                const newgrade = {
                    value: 0,
                    exam: exam
                }
                grades.push(newgrade);
                console.log(grades.length)
            }
            const corporateTrainee = await CorporateTrainee.findByIdAndUpdate(req.query.corporateTrainee, { grade: grades });
        }
    }
    else if (individualTrainee) {
        const answer = await Answer.create({ question, corporateTrainee, studentAnswer });
        res.status(200).json(answer)
        let corpgrades = await IndividualTrainee.findById(req.query.individualTrainee).find({}).select('grade').sort({ createdAt: -1 })
        let grades = corpgrades[0].grade;
        if (studentAnswer == correctAnswer) {
            
            // console.log(grades)
            let index = 0;
            for (index = 0; index < grades.length; index++) {
                // console.log("ana hna")
                console.log(grades[index].exam + " exam index")
                //console.log(exam)
                if (grades[index].exam.equals(exam)) {
                    console.log("ana hna aho")
                    grades[index].value = (grades[index].value) + 1;
                    break;
                }
            }
            if (index == grades.length) {
                const newgrade = {
                    value: 1,
                    exam: exam
                }
                grades.push(newgrade);
                // console.log(grades.length)
            }
            const individualTrainee = await IndividualTrainee.findByIdAndUpdate(req.query.individualTrainee, { grade: grades });
        }

        else {
            console.log("ana msh hna")
            let index = 0
            for (index = 0; index < grades.length; index++) {
                console.log("ana msh hna")
                if (grades[index].exam.equals(exam)) {
                    break;
                }
            }
            if (index == grades.length) {
                const newgrade = {
                    value: 0,
                    exam: exam
                }
                grades.push(newgrade);
                console.log(grades.length)
            }
            const individualTrainee = await IndividualTrainee.findByIdAndUpdate(req.query.corporateTrainee, { grade: grades });
        }
    }
    
    else {
        res.status(400).json({ error: error.message })
    }
}
module.exports = {createExam,createQuestion,getQuestion,getQuestionAnswers,createAnswer, checkAnswer};