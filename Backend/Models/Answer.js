const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const{ObjectId}=mongoose.Schema;


const answerSchema = new Schema({
    exam:{
        type:mongoose.Schema.Types.ObjectId,ref:'Exam'
    },
    studentAnswers:{
        type:[String]
    }
}, { timestamps: true });
const Answer = mongoose.model('Answer', answerSchema);
module.exports = Answer;