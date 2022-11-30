const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const{ObjectId}=mongoose.Schema;

const questionSchema = new Schema(
    {
   exam:{
            type:mongoose.Schema.Types.ObjectId,ref:'Exam',
            required :true
    },
        ques :{
        type : String,
        required : true
    },
    choice1 :{
        type : String,
        required : true
    },
    choice2 :{
        type : String,
        required : true
    },
    choice3 :{
        type : String,
        required : true
    },
    choice4 :{
        type : String,
        required : true
    },
    correctAnswer :{
        type :String,
        required :true
}
    }  
);
const Question = mongoose.model('Question', questionSchema);
module.exports = Question;