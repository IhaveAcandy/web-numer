let mongoose = require('mongoose');
let userSchema = mongoose.Schema({
    status : {type: Number},
    A : {type: Array},
    B : {type: Array},
    X : {type: Array},
    SIZE : {type: Number},
    create_date:{type:Date , default:Date.now}
});

let Jacobiiteration = mongoose.model('Jacobiiteration',userSchema);
module.exports = Jacobiiteration;
