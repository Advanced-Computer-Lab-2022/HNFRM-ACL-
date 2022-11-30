const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const{ObjectId}=mongoose.Schema;
let {gradeSchema} = require('../Models/Grade');

const corporateTraineeSchema = new Schema({
    username :{
        type : String,
        required : true,
        unique :true,
        trim :true,
        minLength :3
    },
    password :{
        type : String,
        required : true,
        unique :false,
        trim :true,
        minLength :3
    },
    grade:{
         type:[gradeSchema]
        }
}, { timestamps: true });
const CorporateTrainee = mongoose.model('Corporate Trainee', corporateTraineeSchema);
module.exports = CorporateTrainee;