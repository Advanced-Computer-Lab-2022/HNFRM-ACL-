const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const subtitleSchema = new Schema({
    name :{
        type : String
    },
    credithour:{
        type : String
    },
    videos :{
        type: [mongoose.Types.ObjectId] ,
        ref: 'Video'
    },
    exams :{
        type: mongoose.Types.ObjectId ,
        ref: 'Exam'
    },
    course :{
        type: String
    }

}, { timestamps: true });
const Subtitle = mongoose.model('Subtitle', subtitleSchema );
module.exports = Subtitle;