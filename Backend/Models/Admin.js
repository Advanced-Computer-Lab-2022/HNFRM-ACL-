const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const{ObjectId}=mongoose.Schema;


const adminSchema = new Schema({
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
const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;