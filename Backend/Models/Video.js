const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = new Schema({
    link :{
        type : String
    },
    description :{
        type : String
    },
    subtitle :{
        type:String
    }

}, { timestamps: true });
const Video = mongoose.model('Video', videoSchema );
module.exports = Video;