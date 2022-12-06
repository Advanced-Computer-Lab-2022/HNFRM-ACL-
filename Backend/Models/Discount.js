var mongoose = require('mongoose')
require('mongoose-double')(mongoose);
const Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;
const discountSchema = new Schema({

    amount :{
        type : SchemaTypes.Double,
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