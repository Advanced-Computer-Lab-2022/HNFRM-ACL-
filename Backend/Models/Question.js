const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const{ObjectId}=mongoose.Schema;

const questionSchema = new Schema(
    {
   exam:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Exam'
    },
    ques :{
        type : String,
        required : true
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