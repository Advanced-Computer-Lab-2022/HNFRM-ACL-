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
        unique :false,
        trim :true,
        minLength :3
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,ref:'Course',
        required:false,
        unique:true
    }
}, { timestamps: true });
const Instructor = mongoose.model('Instructor', instructorSchema);
module.exports = Instructor;