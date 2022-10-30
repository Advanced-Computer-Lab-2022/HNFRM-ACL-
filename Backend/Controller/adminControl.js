const router = require('express').Router();
let Admin = require('../Models/Admin');

//add another administrator with a set username and password
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
module.exports = {createAdmin};