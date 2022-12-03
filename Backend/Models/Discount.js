const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const discountSchema = new Schema({
    amount :{
        type : mongoose.Schema.Type.Double,
        required : true

    },
    howLong:{
        type : Number,
        required : true
    },
    courseId :{
        type : mongoose.Types.ObjectId,
        ref:'Course'
    }

}, { timestamps: true });
const Discount = mongoose.model('Discount', discountSchema);
module.exports = Discount;