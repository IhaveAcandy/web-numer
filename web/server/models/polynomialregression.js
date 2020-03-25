let mongoose = require('mongoose');
let userSchema = mongoose.Schema({
    status : {type: Number},
    X : {type: String},
    FX : {type: String},
    SIZE : {type: Number},
    create_date:{type:Date , default:Date.now}
});

let Polynomialregression = mongoose.model('Polynomialregression',userSchema);
module.exports = Polynomialregression;