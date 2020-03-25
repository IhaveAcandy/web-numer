let mongoose = require('mongoose');
let userSchema = mongoose.Schema({
    status : {type: Number},
    X : {type: String},
    FX : {type: String},
    create_date:{type:Date , default:Date.now}
});

let Spline = mongoose.model('Spline',userSchema);
module.exports = Spline;
