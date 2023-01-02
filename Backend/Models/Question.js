const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema(
    {
    exam:{
        type:mongoose.Types.ObjectId,
        ref:'Exam'
    },
    question :{
        type : String
    }, 
    choices:{
        type :[String]
    }
    ,
    correctAnswer :{
        type :String,
}
    }  
);
const Question = mongoose.model('Question', questionSchema);
module.exports = Question;