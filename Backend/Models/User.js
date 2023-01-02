const mongoose = require('mongoose');
const Schema = mongoose.Schema;


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
        type:[mongoose.Types.ObjectId],
        ref:'Course'
    },
    wallet :{
        type:Number
    },
    defaultWallet :{
        type:Number
    },
    policy:{
        type:String
    },
    company:{
        type:String
    },
    numberofRates:{
        type:Number
    },
    loggedFirst:{
        type:String
    },
    numberOfRates:{
        type:Number
    }

}, { timestamps: true });
const User = mongoose.model('User', userSchema);
module.exports = User;