let mongoose = require('mongoose');
let userSchema = mongoose.Schema({
    status : {type: Number},
    X : {type: String},
    FX : {type: String},
    POINT : {type: Number},
    x : {type: Number},
    create_date:{type:Date , default:Date.now}
});

let Lagrange = mongoose.model('Lagrange',userSchema);
module.exports = Lagrange;
