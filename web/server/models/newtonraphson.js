let mongoose = require('mongoose');
let userSchema = mongoose.Schema({
    status : {type: Number},
    fx : {type: String},
    Xold : {type: Number},
    create_date:{type:Date , default:Date.now}
});

let Newtonraphson = mongoose.model('Newtonraphson',userSchema);
module.exports = Newtonraphson;
