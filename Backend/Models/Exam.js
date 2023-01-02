const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const examSchema = new Schema({  
  questions :{
    type:[mongoose.Types.ObjectId],
    ref:'Question'
  },
  correctAnswers:{
    type:[String]
  },
  subtitle:{
    type:String
  }

}, { timestamps: true });
const Exam = mongoose.model('Exam', examSchema);
module.exports = Exam;