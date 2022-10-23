const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    title :{
        type : String,
        required : true,
        unique :true,
        trim :true,
        minLength :3
    },
    subtitles :{
        type : String,
        required : true,
        unique :false,
        trim :true,
        minLength :3
    },
    summary :{
        type : String,
        required : true,
        unique :false,
        trim :true,
        minLength :3
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
    }



}, { timestamps: true });
const Course = mongoose.model('Course', courseSchema);
module.exports = Course;