const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const problemSchema = new Schema({
    type :{
        type : String
    },
    status :{
        type : String
    },
    followUp:{
        type: [String]
    },
    course :{
        type: mongoose.Types.ObjectId ,
        ref: 'Course'
    },
    user :{
        type: mongoose.Types.ObjectId ,
        ref: 'User'
    },
    theProblem:{
        type:String
    }

}, { timestamps: true });
const Problem = mongoose.model('Problem', problemSchema);
module.exports = Problem;