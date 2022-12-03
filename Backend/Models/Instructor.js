const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const instructorSchema = new Schema({
    username :{
        type : String,
        required : true,
        unique :true,
        trim :true,
        minLength :3

    },
    password :{
        type : String,
        required : true,
        unique :false
    },
    email :{
        type : String,
        required : false,
        unique :false
    },
    biography :{
        type : String,
        required : false,
        unique :false
    },
    rating :{
        type:Number,
        required:false,
        unique:false
    },
    reviews :{
        type:[String],
        required:false,
        unique:false
    },
    contract:{
        type:String
    }

}, { timestamps: true });
const Instructor = mongoose.model('Instructor', instructorSchema);
module.exports = Instructor;