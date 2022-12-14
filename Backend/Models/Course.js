const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
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
        ref:'User'
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
        ref:'Discount'
    },
    certificate :{
        type: String
    },
    notes :{
        type :[String]
    },
    promotion :{
        type : mongoose.Schema.Types.Double
    },
    numberOfRates : {
        type :Number
    }


}, { timestamps: true });
const Course = mongoose.model('Course', courseSchema);
module.exports = Course;