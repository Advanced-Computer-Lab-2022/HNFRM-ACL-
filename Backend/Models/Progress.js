const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const progressSchema = new Schema({
    value:{
        type:Number
    }
    ,userId:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
    courseId:{
        type:mongoose.Types.ObjectId,
        ref:'Course'
    }
}, { timestamps: true });
const Progress = mongoose.model('Progress', progressSchema);
module.exports =Progress;