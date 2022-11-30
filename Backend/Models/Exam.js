const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const{ObjectId}=mongoose.Schema;

const examSchema = new Schema({  
  name:{ 
    type : String,
    required : true,
    unique :false,
  },
    course:{
        type:mongoose.Schema.Types.ObjectId,ref:'Course',
        required:false,
    }
}, { timestamps: true });
const Exam = mongoose.model('Exam', examSchema);
module.exports = Exam;