const router = require('express').Router();
let CorporateTrainee = require('../Models/CorporateTrainee');

//add corporate trainees and create their usernames and passwords
const createCorporateTrainee = async(req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    try{
        const corporateTrainee = await CorporateTrainee.create({username, password});
        res.status(200).json(corporateTrainee)
    }catch(error){
        res.status(400).json({error:error.message})

    }
}
const viewGradeCorporate = async (req, res) => {
    const { corporateTrainee, exam } = req.query;
    try{
        let corpgrades = await CorporateTrainee.findById(req.query.corporateTrainee).find({}).select('grade').sort({ createdAt: -1 })
        let grades=corpgrades[0].grade;
         let index=0;
         let gradeVal=0;
    for (index=0;index<grades.length;index++) {
        if (grades[index].exam.equals(exam)) {
            gradeVal=grades[index].value;
             break;
        }
    }
    res.status(200).json({"yourgrade":gradeVal})
}
    catch (error){
    res.status(400).json({error:error.message})
}
}

module.exports = {createCorporateTrainee,viewGradeCorporate};