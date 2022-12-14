const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let {gradeSchema} = require('../Models/Grade');
let {courseSchema} = require('../Models/Course');

const userSchema = new Schema({
    username :{
        type : String,
        required : true,
        unique :true

    },
    password :{
        type : String,
        required : true
    },
    type :{
        type :String,
        required : true
    },
    grade:{
        type:[gradeSchema]
    },
    email:{
        type:String
    },
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    gender:{
        type:String
    },
    biography :{
        type : String
    },
    rating :{
        type:Number
    },
    reviews :{
        type:[String]
    },
    contract:{
        type:String
    },
    registeredCourses : {
        type: [courseSchema]
    },
    wallet :{
        type:Number
    },
    policy:{
        type:String
    },
    amountOwned:{
        type:Number
    }

}, { timestamps: true });
const User = mongoose.model('User', userSchema);
module.exports = User;