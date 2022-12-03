const router = require('express').Router();
let Admin = require('../Models/Admin');
let Instructor = require('../Models/Instructor');
let CorporateTrainee = require('../Models/CorporateTrainee');
let IndividualTrainee = require('../Models/IndividualTrainee');
const { default: mongoose } = require('mongoose');


// Add Admin 
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

//Add Instructor
const createInstructor = async(req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email =req.body.email;
    const biography = req.body.biography
    const rating ="5"
    const reviews=["Great Prof","Best Prof","Prof Zebalas"]
    try{
        const instructor = await Instructor.create({username, password,email,biography,rating,reviews});
        res.status(200).json(instructor)
    }catch(error){
        res.status(400).json({error:error.message})

    }
}


// Add Corporate Trainee
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

// Add Individual Trainee 
const createIndividualTrainee = async(req,res) =>{
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const gender = req.body.gender;
    try{
        const individualTrainee = await IndividualTrainee.create({username, email , password,firstName,lastName,gender});
        res.status(200).json(individualTrainee)
    }catch(error){
        res.status(400).json({error:error.message})

    }

}

// Edit Instructor email and biography
const editInstructor = async(req,res) =>{
    const instructorId = mongoose.Types.ObjectId(req.query.instructorId);
    const {email,biography} = req.body;
    try{
        const instructor = await Instructor.findByIdAndUpdate(instructorId,{email,biography},{new:true});
        res.status(200).json(instructor)
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
}

// View Instructor Info
const viewInstructor =async(req,res) =>{
    const instructorId = mongoose.Types.ObjectId(req.query.instructorId);
    try{
        const instructor = await Instructor.findOne({_id:instructorId});
        res.status(200).json(instructor)
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
    
}

// Trainee rate instructor
const rateInstructor = async(req,res) => {
    const instructorId = mongoose.Types.ObjectId(req.query.instructorId);
    if(instructorId){
        const rating=Number(req.body.rating);
        const instructor = await Instructor.findByIdAndUpdate(instructorId,{rating:rating});
        res.status(200).json(instructor)  
    }else{
    res.status(400).json({error:error.message})
} 
}

// View grade of corporate trainee
const viewGradeCorporate = async (req, res) => {
    const {corporateTrainee, exam } = req.query;
    try{
        let corpgrades = await CorporateTrainee.findById(corporateTrainee).find({}).select('grade').sort({ createdAt: -1 })
        let grades=corpgrades[0].grade;
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

//View Grade of Individual Trainee
const viewGradeIndividual = async (req, res) => {
    const { individualTrainee, exam } = req.query;
    try{
        let corpgrades = await IndividualTrainee.findById(individualTrainee).find({}).select('grade').sort({ createdAt: -1 })
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


//Change password 
const changePassword = async(req,res, next )=>{ 
    try{
        const userID = mongoose.Types.ObjectId(req.query.id)
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password,salt);
        const instructor = await Instructor.find({_id: userID});
        const individual = await IndividualTrainee.findByIdAndUpdate({_id: userID},{password:password},{new:true});
        const corporateTrainee = await CorporateTrainee.findByIdAndUpdate({_id: userID},{password:password},{new:true});
        if(instructor!=""){
           await Instructor.findByIdAndUpdate({_id: userID},{password:password},{new:true});
           console.log("change password successfully");
           return res.status(200).json({status: true});
       }
       else if(individual!=""){
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

const resetPassword = async (req,res)=>{
    const email = req.body.email;
    await Instructor.find({email: email}).then(async (result)=>{
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

const contract = async(req,res)=> {
    const id = mongoose.Types.ObjectId(req.query.id)
    const inst =await Instructor.findByIdAndUpdate(({_id: id},{contract:"true"}))
    res.status(200).json(inst);
}



module.exports = {createAdmin,createInstructor,createCorporateTrainee,viewInstructor,editInstructor,rateInstructor,createIndividualTrainee,viewGradeCorporate,viewGradeIndividual,changePassword,resetPassword,contract};