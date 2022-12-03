const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let {gradeSchema} = require('../Models/Grade');

const individualTraineeSchema = new Schema({
    username :{
        type : String,
        required : true,
        unique :true

    },
    password :{
        type : String,
        required : true
    },
    grade:{
        type:[gradeSchema]
    },
    email:{
        type:String
    },
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    gender:{
        type:String
    }
}, { timestamps: true });
const IndividualTrainee = mongoose.model('Individual Trainee', individualTraineeSchema);
module.exports = IndividualTrainee;