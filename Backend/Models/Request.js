const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requestSchema = new Schema({
    type:{
        type:String
    },
    amount :{
        type:Number
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
    course:{
        type:mongoose.Types.ObjectId,
        ref:'Course'
    },
    accepted:{
        type:String
    }
}, { timestamps: true });
const Request = mongoose.model('Request', requestSchema);
module.exports =Request;