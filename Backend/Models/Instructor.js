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
    }
}, { timestamps: true });
const Instructor = mongoose.model('Instructor', instructorSchema);
module.exports = Instructor;