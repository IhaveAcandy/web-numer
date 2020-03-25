let mongoose = require('mongoose');

//Schema Validation

let userSchema = mongoose.Schema({
    status : {type: Number},
    fx : {type: String},
    XR : {type: Number},
    XL : {type: Number},
    create_date:{type:Date , default:Date.now}
});

let Bisection = mongoose.model('Bisection',userSchema);
module.exports = Bisection;