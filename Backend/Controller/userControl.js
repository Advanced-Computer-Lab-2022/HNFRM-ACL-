const router = require('express').Router();
let Admin = require('../Models/Admin');
let Instructor = require('../Models/Instructor');
let CorporateTrainee = require('../Models/CorporateTrainee');

const createAdmin = async(req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    try{
        const admin = await Admin.create({username, password});
        res.status(200).json(admin)
    }catch(error){
        res.status(400).json({error:error.message})

    }
}


const createInstructor = async(req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    try{
        const instructor = await Instructor.create({username, password});
        res.status(200).json(instructor)
    }catch(error){
        res.status(400).json({error:error.message})

    }
}



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

module.exports = {createAdmin,createInstructor,createCorporateTrainee};