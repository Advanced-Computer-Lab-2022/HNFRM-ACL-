const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const{ObjectId}=mongoose.Schema;


const answerSchema = new Schema({
    question:{
        type:mongoose.Schema.Types.ObjectId,ref:'Question',
        required:true
    },
    studentAnswer:{
        type:String,
        required:true
    },
    corporateTrainee:{
        type:mongoose.Schema.Types.ObjectId,ref:'CorporateTrainee',
        required:false
    },
    individualTrainee:{
        type:mongoose.Schema.Types.ObjectId,ref:'IndividualTrainee',
        required:false
    }
}, { timestamps: true });
const Answer = mongoose.model('Answer', answerSchema);
module.exports = Answer;