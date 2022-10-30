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
module.exports = {createInstuctor};