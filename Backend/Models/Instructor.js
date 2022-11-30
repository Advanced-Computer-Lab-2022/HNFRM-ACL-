const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const{ObjectId}=mongoose.Schema;


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
    },
    rating :{
        type :Number,
        required :false,
        unique :false
    }
}, { timestamps: true });
const Instructor = mongoose.model('Instructor', instructorSchema);
module.exports = Instructor;