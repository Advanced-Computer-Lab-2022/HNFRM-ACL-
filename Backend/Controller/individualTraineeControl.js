const router = require('express').Router();
let IndividualTrainee = require('../Models/IndividualTrainee');

//add corporate trainees and create their usernames and passwords
const createIndividualTrainee = async(req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    try{
        const individualTrainee = await IndividualTrainee.create({username, password});
        res.status(200).json(individualTrainee)
    }catch(error){
        res.status(400).json({error:error.message})

    }
}
const viewGradeIndividual = async (req, res) => {
    const { individualTrainee, exam } = req.query;
    try{
        let corpgrades = await IndividualTrainee.findById(req.query.individualTrainee).find({}).select('grade').sort({ createdAt: -1 })
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
module.exports = {createIndividualTrainee,viewGradeIndividual};