const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
const Schema = mongoose.Schema;
let {subtitleSchema} = require('../Models/Subtitle');

const courseSchema = new Schema({
    title :{
        type : String,
        required : true,
        unique : true
    },
    summary :{
        type : String,
        required : true
    },
    defaultPrice :{
        type : Number,
        required : true
    },
    price:{
        type:Number
    },
    credithours :{
        type : Number
    },
    rating :{
        type :Number
    },
    taughtBy :{
        type: mongoose.Types.ObjectId,
        ref:'User'
    },
    reviews :{
        type : [String],
        required:false
    },
    link :{
        type: String
    },
    subtitles :{
        type:[mongoose.Types.ObjectId],
        ref:'Subtitle'
    },
    subject :{
        type:String
    },
    subtitlesName :{
        type:[String]
    },
    instructorName :{
        type: String
    },
    discount : {
        type: mongoose.Types.ObjectId,
        ref:'Discount'
    },
    certificate :{
        type: String
    },
    numberOfRates : {
        type :Number
    },
    numberOfEnrolled :{
        type:Number
    }


}, { timestamps: true });
const Course = mongoose.model('Course', courseSchema);
module.exports = Course;