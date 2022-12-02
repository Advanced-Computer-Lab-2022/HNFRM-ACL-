const nodemailer = require ('nodemailer')
const router = require('express').Router();
let Admin = require('../Models/Admin');
let Instructor = require('../Models/Instructor');
let CorporateTrainee = require('../Models/CorporateTrainee');
const bcrypt = require("bcryptjs");
const { UserInfo } = require('git');
const IndividualTrainee = require('../Models/IndividualTrainee');
const { find } = require('../Models/Admin');

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

//////////////////////////////////////////Mohab/////////////////////////////////////////////////
const ChangePassword = async(req,res, next )=>{         //change password for instructor
    
    
    try{
        
        const userID = req.query.id ;
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password,salt);
       
        const instructor = await Instructor.find({_id: userID});
        const individual = await IndividualTrainee.findByIdAndUpdate({_id: userID},{password:password},{new:true});
        const corporateTrainee = await CorporateTrainee.findByIdAndUpdate({_id: userID},{password:password},{new:true});
        //console.log(userID+ "hey");
       if(instructor!=""){
        await Instructor.findByIdAndUpdate({_id: userID},{password:password},{new:true});
        console.log("change password successfully");
        return res.status(200).json({status: true});
       }
       else
       if(individual!=""){
        await IndividualTrainee.findByIdAndUpdate({_id: userID},{password:password},{new:true});
        return res.status(200).json({status: true});
       }
       else
       if(corporateTrainee!=""){
        await CorporateTrainee.findByIdAndUpdate({_id: userID},{password:password},{new:true});
        return res.status(200).json({status: true});
       }

    }
    catch(error){
        return res.status(400).json({status:false, error: error.message}); 
    }
} 




 const ResetPassword = async (req,res)=>{
const Email = req.body.Email;
await Instructor.find({Email: Email}).then(async (result)=>{
const neew = "1234_12345";
await Instructor.findByIdAndUpdate(result._id,{password:neew}).then((result)=>{
    const mail = {
        from: process.env.AUTH_EMAIL,
        to: Email,
        subject: "Password Reset",
        html: `<p>Nset elpassword yghaby ?.</p>
             <p>khod el password da mashy nafsak beh <strong> ${neew} </strong> w mtdhosh lhad <3.</p>`
    }

    let transporter = nodemailer.createTransport({
        service: 'hotmail',
        auth: {
            user: process.env.AUTH_EMAIL,
            pass: process.env.AUTH_PASS
        }
    })

    transporter.sendMail(mail).then((result)=>{
        return res.status(200).json({status:true,Message:"eldnya zy elfol"})
    }).catch((error) => {
        return res.status(400).json({status:false, error:error.message ,Message:"Error while sending an email"})
    })
}).catch((error)=>{
    return res.status(400).json({status:false, error:error.message,Message:"Error while updating the password"})
})
}).catch((error)=>{
    return res.status(400).json({status:false, error:error .message,Message:"this Email is not found or undefined"})
});


}

const Contract = async(req,res)=> {
    const id = await Instructor.findById(req.params.id);
    await Instructor.findByIdAndUpdate(({_id: id},{Contract:"true"}))
    }


//////////////////////////////////////////Mohab////////////////////////////////////////////////

module.exports = {createAdmin,createInstructor,createCorporateTrainee,ChangePassword,ResetPassword,Contract};