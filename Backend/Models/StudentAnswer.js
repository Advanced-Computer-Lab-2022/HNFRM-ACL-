const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentAnswerSchema = new Schema({
    answers:{
        type:[String]
    }
    ,grade:{
        type:Number,
    },
    exam:{
        type:mongoose.Types.ObjectId,
        ref:'Exam'
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    }

}, { timestamps: true });
const StudentAnswer = mongoose.model('StudentAnswer', studentAnswerSchema);
module.exports =StudentAnswer;