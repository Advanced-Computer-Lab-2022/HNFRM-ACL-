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
module.exports = {createCorporateTrainee};