const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    contain :{
        type : String
    },
    subtitle :{
        type: mongoose.Types.ObjectId ,
        ref: 'Subtitle'
    },
    user :{
        type: mongoose.Types.ObjectId ,
        ref: 'user'
    }
}, { timestamps: true });
const Note = mongoose.model('Note', noteSchema );
module.exports = Note;