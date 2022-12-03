const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    title :{
        type : String,
        required : true
    },
    subtitles :{
        type : [String],
        required : true
    },
    summary :{
        type : String,
        required : true
    },
    price :{
        type : Number,
        required : true
    },
    credithours :{
        type : Number,
        required :false
    },
    rating :{
        type :Number,
        required :false
    },
    taughtBy :{
        type: mongoose.Types.ObjectId,
        ref:'Instructor'
    },
    reviews :{
        type : String,
        required:false
    },
    link :{
        type: String
        
    },
    subtitleslinks :{
        type:[String],
        required:false
    },
    descriptions :{
        type:[String],
        required:false
    },
    subject :{
        type:String
    },
    instructorName :{
        type: String
    },
    discount : {
        type: mongoose.Types.ObjectId,
        ref:'Instructor'
    }


}, { timestamps: true });
const Course = mongoose.model('Course', courseSchema);
module.exports = Course;