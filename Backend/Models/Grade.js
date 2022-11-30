const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const{ObjectId}=mongoose.Schema;

const gradeSchema = new Schema({
    value:{
        type:Number,
        required:false
    },
    exam:{
        type:mongoose.Schema.Types.ObjectId,ref:'Exam',
        required:true
    }
}, { timestamps: true });
const grade = mongoose.model('grade', gradeSchema);
module.exports ={grade,gradeSchema};