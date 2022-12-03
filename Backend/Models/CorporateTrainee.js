const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let {gradeSchema} = require('../Models/Grade');

const corporateTraineeSchema = new Schema({
    username :{
        type : String,
        required : true

    },
    password :{
        type : String,
        required : true
    },
    grade:{
        type:[gradeSchema]
       }
}, { timestamps: true });
const CorporateTrainee = mongoose.model('Corporate Trainee', corporateTraineeSchema);
module.exports = CorporateTrainee;