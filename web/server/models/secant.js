let mongoose = require('mongoose');
let userSchema = mongoose.Schema({
    status : {type: Number},
    fx : {type: String},
    Xold : {type: Number},
    Xnew : {type: Number},
    create_date:{type:Date , default:Date.now}
});

let Secant = mongoose.model('Secant',userSchema);
module.exports = Secant;
