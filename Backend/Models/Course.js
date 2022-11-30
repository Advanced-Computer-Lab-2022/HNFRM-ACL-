const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const{ObjectId}=mongoose.Schema;

const courseSchema = new Schema({
    title :{
        type : String,
        required : true,
        unique :true,
        trim :true
    },
    subtitles :{
        type : String,
        required : true,
        unique :false,
        trim :true
    },
    summary :{
        type : String,
        required : true,
        unique :false,
        trim :true
    },
    price :{
        type : Number,
        required : true,
        unique :false
    },
    credithours :{
        type : Number,
        required :false,
        unique :false
    },
    rating :{
        type :Number,
        required :false,
        unique :false
    },
    subject :{
        type : String,
        required : false,
        unique :false,
        trim :true
    },
    taughtby:{
        type: String,
        required:false,
        unique:true
    },
            }
 ,{ timestamps: true });
const Course = mongoose.model('Course', courseSchema);
module.exports = Course;